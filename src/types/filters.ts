export type BodyType = 'panelTruck' | 'fullyIntegrated' | 'alcove' | '';

export type FeatureKey = | 'AC' | 'bathroom' | 'kitchen' | 'TV' | 'radio' | 'refrigerator' | 'microwave' | 'gas' | 'water';

export interface CatalogFilters {
    location: string;
    bodyType: BodyType;
    features: FeatureKey[];
}