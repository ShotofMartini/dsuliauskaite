import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || 'production';

export const hasSanity = Boolean(projectId);

export const sanityClient: SanityClient | null = hasSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: unknown) {
  if (!builder) throw new Error('Sanity not configured');
  return builder.image(source as never);
}

export interface SanityPhoto {
  _id: string;
  title: string;
  alt?: string;
  image: unknown;
}

export interface SanitySeries {
  _id: string;
  title: string;
  slug: { current: string };
  cover: SanityPhoto;
  photos: SanityPhoto[];
}

export interface SanityTestimonial {
  _id: string;
  text: string;
  author: string;
  occasion?: string;
  sourceUrl?: string;
}

export interface SanityPressItem {
  _id: string;
  outlet: string;
  title: string;
  url: string;
  date: string;
  photo?: SanityPhoto;
}

const photoProjection = `{ _id, title, alt, image }`;

export async function getSeries(): Promise<SanitySeries[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "series"] | order(order asc) {
      _id, title, slug,
      cover -> ${photoProjection},
      photos[] -> ${photoProjection}
    }`
  );
}

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "testimonial" && featured == true] | order(order asc) {
      _id, text, author, occasion, sourceUrl
    }`
  );
}

export async function getPressItems(): Promise<SanityPressItem[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "pressItem"] | order(date desc) {
      _id, outlet, title, url, date,
      photo -> ${photoProjection}
    }`
  );
}

export interface SanityFaqItem {
  _id: string;
  question: string;
  answer: string;
}

export async function getFaqItems(): Promise<SanityFaqItem[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch(
    `*[_type == "faqItem"] | order(order asc) { _id, question, answer }`
  );
}

export interface SanitySiteSettings {
  heroPhoto?: SanityPhoto;
  introText?: string;
  bioPhoto?: SanityPhoto;
  bioText?: string;
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  if (!sanityClient) return null;
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0] {
      heroPhoto -> ${photoProjection},
      introText,
      bioPhoto -> ${photoProjection},
      bioText
    }`
  );
}
