// One-time script: sets descriptive Lithuanian alt text on all photo documents.
// Usage: SANITY_PROJECT_ID=xxx SANITY_DATASET=production SANITY_TOKEN=xxx node scripts/patch-alt-text.mjs
import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_TOKEN;

if (!projectId || !token) {
  console.error('Reikia SANITY_PROJECT_ID ir SANITY_TOKEN (write token) aplinkos kintamųjų.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

const altByTitle = {
  portrait_flower_crown: 'Moters portretas su gėlių vainiku ant galvos',
  portrait_blossom_kiss: 'Moters portretas, besilaikanti žydinčios vyšnios žiedų auksinės valandos šviesoje',
  portrait_plaid_scarf: 'Portretinė fotosesija lauke — mergina su languotu šaliu žiemos fone',
  portrait_window_mask: 'Juodai balta portretinė fotosesija — mergina su veido kauke prie lango',
  portrait_autumn_leaves: 'Portretinė fotosesija rudenį — mergina su languotu šaliu prie veido',
  portrait_golden_hour: 'Moters portretas auksinės valandos šviesoje rudenėjančiame parke',
  portrait_eye_leaves: 'Artima portreto fotografija — akis tarp rudens klevo lapų',
  nature_mushroom: 'Raudona muchomorka tarp dobilų lapų miško prieblandoje',
  nature_frost_branch: 'Šerkšnu apšalusi augalo šaka žiemą',
  nature_field_flowers: 'Mėlyni lauko žiedai vasaros pievoje',
  nature_forest_path: 'Pušynas su saulės šviesos takeliu tarp medžių',
  nature_dew_leaves_1: 'Rasos lašai ant žalių lapų ryto šviesoje',
  nature_dew_leaves_2: 'Rasos lašai ant rožės lapų',
  concept_red_fabric_figure: 'Meninė fotosesija — figūra, apgaubta raudonu audeklu',
  concept_red_fabric_hands: 'Konceptuali fotosesija — rankos, laikančios raudoną audeklą',
  concept_window_ruins: 'Meninė fotosesija apgriuvusio pastato lange su juoda kauke',
  concept_thread_mask_portrait: 'Konceptualus portretas — galva apvyniota juodais siūlais',
  concept_thread_mask_forest: 'Konceptuali fotosesija miške — figūra su siūlų kauke, nugara į kamerą',
  concept_fire_spin_1: 'Ugnies suktuko ilgos ekspozicijos fotografija naktį',
  concept_fire_spin_2: 'Ugnies šviesos pėdsakų fotografija ilga ekspozicija',
  'photo_0': 'Deimantė Šuliauskaitė, fotografė',
  press_valdovurumai_1: 'Pokalbis-diskusija apie Vakarų Europos tapybos kolekcijas Valdovų rūmuose',
  press_madeinvilnius_1: 'Vilniaus gimtadienio šventė Valdovų rūmų muziejuje',
  press_15min_zmones_1: 'M. Jacovskio parodos atidarymo svečiai',
  press_panele_1: 'Kultūrinių renginių koordinatorė Viktorija Liubinaitė Užgavėnių šventėje',
  press_15min_kultura_1: 'Botticellio ir Tiziano kūrinių paroda Valdovų rūmuose',
  press_valdovurumai_2: 'Kunigaikščio Aleksandro Jogailaičio skulptūros atidengimas Valdovų rūmuose',
};

async function run() {
  const photos = await client.fetch('*[_type == "photo"]{_id, title}');
  let updated = 0;
  for (const photo of photos) {
    const key = photo.title?.trim();
    const alt = altByTitle[key];
    if (!alt) {
      console.log(`⚠ Nėra alt teksto: ${key}`);
      continue;
    }
    await client.patch(photo._id).set({ alt }).commit();
    console.log(`✓ ${key} -> "${alt}"`);
    updated++;
  }
  console.log(`\nAtnaujinta ${updated}/${photos.length} nuotraukų.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
