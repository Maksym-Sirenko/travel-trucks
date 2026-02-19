import type { CatalogFilters } from '../../types/filters';
import type { Camper, CampersResponse } from '../../types/camper';
import { buildCampersQuery } from './catalogQuery';

export async function fetchCampers(
  filters: CatalogFilters,
  page: number,
  limit: number
): Promise<CampersResponse> {
  const qs = buildCampersQuery(filters, page, limit);

  const res = await fetch(`/api/catalog?${qs}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`Failed to load campers: ${res.status}`);
  }

  const data = (await res.json()) as unknown;

  if (typeof data === 'object' && data !== null && 'items' in data && 'total' in data) {
    const d = data as { items?: unknown; total?: unknown };

    return {
      items: Array.isArray(d.items) ? (d.items as Camper[]) : [],
      total: typeof d.total === 'number' ? d.total : 0,
    };
  }

  return { items: [], total: 0 };
}

export async function fetchCamperById(id: string): Promise<Camper> {
  const res = await fetch(`/api/catalog/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`Failed to load camper ${id}: ${res.status}`);
  }

  return (await res.json()) as Camper;
}






