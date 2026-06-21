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

const altByName: Record<string, string> = {
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
  photo_0: 'Deimantė Šuliauskaitė, fotografė',
};

export function getPhotoAlt(name: string): string {
  return altByName[name] || '';
}
