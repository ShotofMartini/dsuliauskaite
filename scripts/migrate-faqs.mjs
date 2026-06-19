// One-time script: uploads the existing FAQ (DUK) content into Sanity.
// Usage: SANITY_PROJECT_ID=xxx SANITY_DATASET=production SANITY_TOKEN=xxx node scripts/migrate-faqs.mjs
import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_TOKEN;

if (!projectId || !token) {
  console.error('Reikia SANITY_PROJECT_ID ir SANITY_TOKEN (write token) aplinkos kintamųjų.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

const faqs = [
  {
    question: 'Ar atvažiuoji fotografuoti į kitą miestą?',
    answer: 'Taip, fotografuoju įvairiose Lietuvos vietose. Kelionės sąlygas aptariame individualiai, atsižvelgiant į atstumą.',
  },
  {
    question: 'Per kiek laiko gaunu nuotraukas?',
    answer: 'Paruoštas nuotraukas pristatau per 1–4 savaites — terminas priklauso nuo sesijos apimties ir sezono.',
  },
  {
    question: 'Ar nuotraukos apdorojamos?',
    answer: 'Taip, kiekvieną atrinktą nuotrauką apdoroju (spalvos, šviesa, subtilus retušas), išlaikydama natūralų ir gyvą rezultatą.',
  },
  {
    question: 'Kiek nuotraukų gausiu?',
    answer: 'Nuotraukų skaičius priklauso nuo sesijos tipo ir trukmės — tikslų skaičių aptariame prieš fotosesiją.',
  },
  {
    question: 'Ar gausiu neapdorotas (RAW) nuotraukas?',
    answer: 'Ne — pristatau tik atrinktas ir apdorotas nuotraukas. Neretušuoti (RAW) originalai klientams neteikiami, nes apdorojimas yra neatsiejama mano darbo ir stiliaus dalis.',
  },
  {
    question: 'Kaip užsisakyti fotosesiją?',
    answer: 'Parašyk man el. paštu arba per Instagram / Facebook. Suderinsime datą ir visas detales.',
  },
];

async function run() {
  console.log(`Keliama ${faqs.length} DUK įrašų...`);
  for (const [i, faq] of faqs.entries()) {
    const doc = await client.create({ _type: 'faqItem', question: faq.question, answer: faq.answer, order: i });
    console.log(`✓ faqItem "${faq.question}" -> ${doc._id}`);
  }
  console.log('\nViskas perkelta!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
