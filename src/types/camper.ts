import type { BodyType, EngineType, TransmissionType } from './filters';

export interface GalleryItem {
  thumb: string;
  original: string;
}

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;

  location: string;
  description: string;

  form: BodyType;
  transmission: Exclude<TransmissionType, ''>;
  engine: Exclude<EngineType, ''>;

  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;

  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;

  gallery: GalleryItem[];
  reviews: Review[];
};

export type CampersResponse = {
  items: Camper[];
  total: number;
};


