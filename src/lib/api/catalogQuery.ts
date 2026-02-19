import type { CatalogFilters } from '@/types/filters';

export function buildCampersQuery(filters: CatalogFilters, page: number, limit: number) {
  const sp = new URLSearchParams();
  sp.set('page', String(page));
  sp.set('limit', String(limit));

  const location = filters.location.trim();
  if (location) sp.set('location', location);

  if (filters.bodyType) sp.set('form', filters.bodyType);
  if (filters.transmission) sp.set('transmission', filters.transmission);
  if (filters.engine) sp.set('engine', filters.engine);

  for (const f of filters.features) {
    sp.set(f, 'true');
  }

  return sp.toString();
}






