// One-time script: uploads existing local photos + series + about content into Sanity.
// Usage: SANITY_PROJECT_ID=xxx SANITY_DATASET=production SANITY_TOKEN=xxx node scripts/migrate-to-sanity.mjs
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const photosDir = join(__dirname, '..', 'src', 'assets', 'photos');

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_TOKEN;

if (!projectId || !token) {
  console.error('Reikia SANITY_PROJECT_ID ir SANITY_TOKEN (write token) aplinkos kintamųjų.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

// Tas pats turinys, kuris šiuo metu yra src/data/series.ts ir puslapiuose — perkeliamas į Sanity kaip pradinis turinys.
const series = [
  {
    title: 'Portretai',
    slug: 'portretai',
    cover: 'portrait_flower_crown',
    photos: ['portrait_flower_crown', 'portrait_blossom_kiss', 'portrait_plaid_scarf', 'portrait_window_mask', 'portrait_autumn_leaves', 'portrait_golden_hour', 'portrait_eye_leaves'],
  },
  {
    title: 'Gamta',
    slug: 'gamta',
    cover: 'nature_mushroom',
    photos: ['nature_mushroom', 'nature_field_flowers', 'nature_frost_branch', 'nature_forest_path', 'nature_dew_leaves_1', 'nature_dew_leaves_2'],
  },
  {
    title: 'Konceptualu',
    slug: 'konceptualu',
    cover: 'concept_red_fabric_figure',
    photos: ['concept_red_fabric_figure', 'concept_red_fabric_hands', 'concept_window_ruins', 'concept_thread_mask_portrait', 'concept_thread_mask_forest', 'concept_fire_spin_1', 'concept_fire_spin_2'],
  },
];

const allPhotoNames = [...new Set(series.flatMap((s) => s.photos)), 'photo_0'];
const extensions = ['jpg', 'jpeg', 'png', 'webp'];

function findFile(name) {
  for (const ext of extensions) {
    try {
      const path = join(photosDir, `${name}.${ext}`);
      readFileSync(path);
      return path;
    } catch {
      // try next extension
    }
  }
  throw new Error(`Nerastas failas nuotraukai: ${name}`);
}

async function uploadPhoto(name) {
  const path = findFile(name);
  const buffer = readFileSync(path);
  const asset = await client.assets.upload('image', buffer, { filename: `${name}${path.slice(path.lastIndexOf('.'))}` });
  const doc = await client.create({
    _type: 'photo',
    title: name,
    image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
  });
  console.log(`✓ photo ${name} -> ${doc._id}`);
  return doc;
}

async function run() {
  console.log(`Keliama ${allPhotoNames.length} nuotraukų...`);
  const photoDocs = {};
  for (const name of allPhotoNames) {
    photoDocs[name] = await uploadPhoto(name);
  }

  console.log('Sukuriamos serijos...');
  for (const s of series) {
    const doc = await client.create({
      _type: 'series',
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
      cover: { _type: 'reference', _ref: photoDocs[s.cover]._id },
      photos: s.photos.map((p) => ({ _type: 'reference', _ref: photoDocs[p]._id, _key: photoDocs[p]._id })),
    });
    console.log(`✓ series ${s.title} -> ${doc._id}`);
  }

  console.log('Sukuriami svetainės nustatymai...');
  const settings = await client.create({
    _type: 'siteSettings',
    heroPhoto: { _type: 'reference', _ref: photoDocs['nature_dew_leaves_1']._id },
    introText: '23 metų fotografė iš Bartninkų. Fotografuoju žmones, akimirkas ir nuotaikas — ieškau tylos tarp kadrų ir to, kas nepasakoma žodžiais.',
    bioPhoto: { _type: 'reference', _ref: photoDocs['photo_0']._id },
    bioText: [
      'Esu 23 metų fotografė, gimusi ir augusi Bartninkuose. Fotografuoti pradėjau fotografijos būrelyje Vilkaviškyje — ir nuo tada su fotoaparatu esu neišskiriama.',
      'Fotografija man — būdas sustabdyti akimirką ir įžiūrėti tai, kas dažniausiai praslysta nepastebėta: žvilgsnį, šviesą, tylą tarp žodžių. Labiausiai mėgstu fotografuoti tikras emocijas — todėl renkuosi portretus ir dokumentinę fotografiją, situacijas, kuriose žmogus atsiskleidžia natūraliai, be pozos.',
      'Kiekvienas kadras man yra maža istorija, kurią noriu papasakoti nuoširdžiai.',
    ].join('\n'),
  });
  console.log(`✓ siteSettings -> ${settings._id}`);

  console.log('\nViskas perkelta! Atsiliepimų ir spaudos įrašų sąmoningai NEkėliau — juos pridėkite Studio rankiniu būdu su tikru turiniu.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
