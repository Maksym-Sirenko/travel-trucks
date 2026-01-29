import axios from 'axios';
import type { CatalogFilters } from '@/types/filters';
import type { PaginatedResponse } from '@/types/api';
import type { Camper } from '@/types/camper';

const api = axios.create({
  baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
  timeout: 10000,
});

export default api;

function buildCampersParams(filters: CatalogFilters, page: number, limit: number) {
  const params: Record<string, string | number | boolean> = { page, limit };

  const location = filters.location.trim();
  if (location) params.location = location;

  if (filters.bodyType) params.form = filters.bodyType;

  filters.features.forEach((key) => {
    params[key] = true;
  });

  return params;
}

export async function getCampers(
  filters: CatalogFilters,
  page: number,
  limit: number
): Promise<PaginatedResponse<Camper>> {
  const params = buildCampersParams(filters, page, limit);
  const { data } = await api.get<PaginatedResponse<Camper>>('/campers', { params });
  return data;
}

export async function getCamperById(id: string): Promise<Camper> {
  const { data } = await api.get<Camper>(`/campers/${id}`);
  return data;
}



