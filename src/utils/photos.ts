import type { ImageMetadata } from 'astro';

const photoFiles = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/*.{webp,jpg,jpeg,png}',
  { eager: true }
);

const photosByName = new Map(
  Object.entries(photoFiles).map(([path, mod]) => [
    path.replace(/^.*\/photos\//, '').replace(/\.[^.]+$/, ''),
    mod.default,
  ])
);

export function getPhoto(name: string): ImageMetadata {
  const photo = photosByName.get(name);
  if (!photo) {
    throw new Error(`Photo not found: ${name}`);
  }
  return photo;
}
