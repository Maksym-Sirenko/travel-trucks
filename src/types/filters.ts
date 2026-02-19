export type FeatureKey =
  | 'AC'
  | 'bathroom'
  | 'kitchen'
  | 'TV'
  | 'radio'
  | 'refrigerator'
  | 'microwave'
  | 'gas'
  | 'water';

export type BodyType = '' | 'panelTruck' | 'fullyIntegrated' | 'alcove';
export type TransmissionType = '' | 'automatic' | 'manual';
export type EngineType = '' | 'petrol' | 'diesel' | 'hybrid';

export type CatalogFilters = {
  location: string;
  bodyType: BodyType;
  transmission: TransmissionType;
  engine: EngineType;
  features: FeatureKey[];
};

export const initialFilters: CatalogFilters = {
  location: '',
  bodyType: '',
  transmission: '',
  engine: '',
  features: [],
};

