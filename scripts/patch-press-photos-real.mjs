// One-time script: replaces press item photos with the actual photos from each article.
// Usage: SANITY_PROJECT_ID=xxx SANITY_DATASET=production SANITY_TOKEN=xxx node scripts/patch-press-photos-real.mjs
import { createClient } from '@sanity/client';
import { readFileSync } from 'node:fs';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_TOKEN;

if (!projectId || !token) {
  console.error('Reikia SANITY_PROJECT_ID ir SANITY_TOKEN (write token) aplinkos kintamųjų.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

const items = [
  { pressId: '1u9iY0s9jtUgL018CRNQEv', file: 'C:/Users/marty/AppData/Local/Temp/press-photos/valdovurumai_1.jpg', title: 'press_valdovurumai_1' },
  { pressId: 'PA6quqXzfrcc3lAA1S0hsW', file: 'C:/Users/marty/AppData/Local/Temp/press-photos/madeinvilnius_1.jpg', title: 'press_madeinvilnius_1' },
  { pressId: '1u9iY0s9jtUgL018CRNQbV', file: 'C:/Users/marty/AppData/Local/Temp/press-photos/15min_zmones_1.webp', title: 'press_15min_zmones_1' },
  { pressId: '1u9iY0s9jtUgL018CRNQy5', file: 'C:/Users/marty/AppData/Local/Temp/press-photos/panele_1.jpg', title: 'press_panele_1' },
  { pressId: '1u9iY0s9jtUgL018CRNRHR', file: 'C:/Users/marty/AppData/Local/Temp/press-photos/15min_kultura_1.jpg', title: 'press_15min_kultura_1' },
  { pressId: 'JjjY3To9JKokKf0NH4hvHV', file: 'C:/Users/marty/AppData/Local/Temp/press-photos/valdovurumai_2.jpg', title: 'press_valdovurumai_2' },
];

async function run() {
  for (const item of items) {
    const buffer = readFileSync(item.file);
    const asset = await client.assets.upload('image', buffer, { filename: item.title });
    const photoDoc = await client.create({
      _type: 'photo',
      title: item.title,
      image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
    });
    await client.patch(item.pressId).set({ photo: { _type: 'reference', _ref: photoDoc._id } }).commit();
    console.log(`✓ ${item.title} -> photo ${photoDoc._id} -> pressItem ${item.pressId}`);
  }
  console.log('\nViskas atlikta!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
