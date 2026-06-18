import type { ImageMetadata } from 'astro';

const photoFiles = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/*.webp',
  { eager: true }
);

export function getPhoto(name: string): ImageMetadata {
  const entry = photoFiles[`/src/assets/photos/${name}.webp`];
  if (!entry) {
    throw new Error(`Photo not found: ${name}`);
  }
  return entry.default;
}
