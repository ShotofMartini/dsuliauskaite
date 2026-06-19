// One-time script: attaches a representative photo to each existing press item.
// Usage: SANITY_PROJECT_ID=xxx SANITY_DATASET=production SANITY_TOKEN=xxx node scripts/patch-press-photos.mjs
import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_TOKEN;

if (!projectId || !token) {
  console.error('Reikia SANITY_PROJECT_ID ir SANITY_TOKEN (write token) aplinkos kintamųjų.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

const assignments = [
  { pressId: '1u9iY0s9jtUgL018CRNQEv', photoId: '1u9iY0s9jtUgL018CQQRmv' }, // Pasidalijo naujausiais... -> portrait_golden_hour
  { pressId: 'PA6quqXzfrcc3lAA1S0hsW', photoId: '1u9iY0s9jtUgL018CQQTC1' }, // Valdovų rūmų muziejus švęs Vilniaus gimtadienį -> nature_mushroom
  { pressId: '1u9iY0s9jtUgL018CRNQbV', photoId: 'JjjY3To9JKokKf0NH4AGNW' }, // M.Jacovskio parodą... -> concept_red_fabric_figure
  { pressId: '1u9iY0s9jtUgL018CRNQy5', photoId: '1u9iY0s9jtUgL018CQQPoL' }, // Į Valdovų rūmus grįžta Užgavėnės... -> portrait_flower_crown
  { pressId: '1u9iY0s9jtUgL018CRNRHR', photoId: 'PA6quqXzfrcc3lAA1RJSoC' }, // Pirmą kartą Lietuvoje – Botticellio... -> nature_field_flowers
  { pressId: 'JjjY3To9JKokKf0NH4hvHV', photoId: 'JjjY3To9JKokKf0NH4AHDS' }, // Valdovas, kurio atminimas... -> concept_thread_mask_forest
];

async function run() {
  for (const { pressId, photoId } of assignments) {
    await client.patch(pressId).set({ photo: { _type: 'reference', _ref: photoId } }).commit();
    console.log(`✓ ${pressId} -> photo ${photoId}`);
  }
  console.log('\nViskas atlikta!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
