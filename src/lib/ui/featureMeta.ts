import type { BodyType, EngineType, FeatureKey, TransmissionType } from '@/types/filters';

export const TRANSMISSION_META: Record<Exclude<TransmissionType, ''>, { icon: string; label: string }> = {
  automatic: { icon: 'icon-automatic-gearbox', label: 'Automatic' },
  manual: { icon: 'icon-manual-gearbox', label: 'Manual' },
};

export const ENGINE_META: Record<Exclude<EngineType, ''>, { icon: string; label: string }> = {
  petrol: { icon: 'icon-petrol', label: 'Petrol' },
  diesel: { icon: 'icon-disel', label: 'Diesel' },
  hybrid: { icon: 'icon-hybrid', label: 'Hybrid' },
};

export const BODY_META: Record<Exclude<BodyType, ''>, { icon: string; label: string }> = {
  panelTruck: { icon: 'icon-grid_1x2', label: 'Van' },
  fullyIntegrated: { icon: 'icon-grid_2x2', label: 'Fully Integrated' },
  alcove: { icon: 'icon-grid_3x3_gap', label: 'Alcove' },
};

export const FEATURE_META: Record<FeatureKey, { icon: string; label: string }> = {
  kitchen: { icon: 'icon-kitchen', label: 'Kitchen' },
  AC: { icon: 'icon-wind', label: 'AC' },
  bathroom: { icon: 'icon-shower', label: 'Bathroom' },
  TV: { icon: 'icon-tv', label: 'TV' },
  radio: { icon: 'icon-radio', label: 'Radio' },
  refrigerator: { icon: 'icon-fridge', label: 'Refrigerator' },
  microwave: { icon: 'icon-microwave', label: 'Microwave' },
  gas: { icon: 'icon-gas', label: 'Gas' },
  water: { icon: 'icon-water', label: 'Water' },
};

