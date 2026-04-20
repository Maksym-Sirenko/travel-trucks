import { ENGINE_META, FEATURE_META, TRANSMISSION_META } from '@/lib/ui/featureMeta';
import type { Camper } from '@/types/camper';
import type { FeatureKey } from '@/types/filters';

export type CamperOptionItem = {
  icon: string;
  label: string;
  key: string;
};

const FEATURE_ORDER: FeatureKey[] = [
  'kitchen',
  'AC',
  'bathroom',
  'TV',
  'radio',
  'refrigerator',
  'microwave',
  'gas',
  'water',
];

function isFeatureEnabled(camper: Camper, key: FeatureKey) {
  return (camper as Record<string, unknown>)[key] === true;
}

export function getCamperOptionItems(camper: Camper): CamperOptionItem[] {
  const items: CamperOptionItem[] = [];

  const transmissionMeta = TRANSMISSION_META[camper.transmission];
  if (transmissionMeta) {
    items.push({ ...transmissionMeta, key: `t-${camper.transmission}` });
  }

  const engineMeta = ENGINE_META[camper.engine];
  if (engineMeta) {
    items.push({ ...engineMeta, key: `e-${camper.engine}` });
  }

  for (const feature of FEATURE_ORDER) {
    if (!isFeatureEnabled(camper, feature)) continue;
    const meta = FEATURE_META[feature];
    if (meta) {
      items.push({ ...meta, key: `f-${feature}` });
    }
  }

  return items;
}
