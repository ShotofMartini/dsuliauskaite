// One-time script: adds two new FAQ items commonly asked by people looking for a photographer.
// Usage: SANITY_PROJECT_ID=xxx SANITY_DATASET=production SANITY_TOKEN=xxx node scripts/add-faqs.mjs
import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_TOKEN;

if (!projectId || !token) {
  console.error('Reikia SANITY_PROJECT_ID ir SANITY_TOKEN (write token) aplinkos kintamųjų.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

const newFaqs = [
  {
    question: 'Kiek kainuoja fotosesija?',
    answer: 'Kaina priklauso nuo sesijos tipo, trukmės ir vietos — tikslią kainą aptariame individualiai po pirmo susisiekimo.',
    order: 6,
  },
  {
    question: 'Prieš kiek laiko reikia rezervuoti datą?',
    answer: 'Populiariausiu sezonu (gegužė–rugsėjis) rekomenduoju rezervuotis bent 2–3 mėnesius iš anksto, ypač vestuvėms — datų tuo laiku būna nedaug.',
    order: 7,
  },
];

async function run() {
  for (const faq of newFaqs) {
    const doc = await client.create({ _type: 'faqItem', ...faq });
    console.log(`✓ faqItem "${faq.question}" -> ${doc._id}`);
  }
  console.log('\nViskas atlikta!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
