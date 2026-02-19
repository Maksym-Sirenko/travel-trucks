import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { CatalogFilters } from '../types/filters';
import { initialFilters } from '../types/filters';
import type { Camper } from '../types/camper';
import { fetchCampers, fetchCamperById } from '../lib/api/catalog';

const DEFAULT_LIMIT = 4;

type CampersState = {
  campers: Camper[];
  selectedCamper: Camper | null;

  filters: CatalogFilters;
  favorites: string[];

  page: number;
  limit: number;
  total: number;
  hasMore: boolean;

  isLoading: boolean;
  error: string | null;

  setFilters: (next: Partial<CatalogFilters>) => void;
  resetFilters: () => void;

  fetchCampersList: () => Promise<void>;
  loadMore: () => Promise<void>;
  fetchCamperDetails: (id: string) => Promise<void>;
  applyFilters: (filters: CatalogFilters) => Promise<void>;

  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useCampersStore = create<CampersState>()(
  persist(
    (set, get) => ({
      campers: [],
      selectedCamper: null,

      filters: initialFilters,
      favorites: [],

      page: 1,
      limit: DEFAULT_LIMIT,
      total: 0,
      hasMore: true,

      isLoading: false,
      error: null,

      setFilters: (next) =>
        set((state) => ({
          filters: { ...state.filters, ...next },
        })),

      resetFilters: () =>
        set({
          filters: initialFilters,
          campers: [],
          page: 1,
          total: 0,
          hasMore: true,
          error: null,
        }),

      fetchCampersList: async () => {
        const { filters, page, limit } = get();
        set({ isLoading: true, error: null });

        try {
          const data = await fetchCampers(filters, page, limit);
          set({
            campers: data.items ?? [],
            total: data.total ?? 0,
            hasMore: page * limit < (data.total ?? 0),
            isLoading: false,
          });
        } catch (e) {
          set({
            isLoading: false,
            error: e instanceof Error ? e.message : 'Failed to load campers',
            campers: [],
          });
        }
      },

      applyFilters: async (nextFilters) => {
        set({
          filters: nextFilters,
          campers: [],
          page: 1,
          total: 0,
          hasMore: true,
          isLoading: true,
          error: null,
        });

        try {
          const { limit } = get();
          const data = await fetchCampers(nextFilters, 1, limit);

          set({
            campers: data.items ?? [],
            total: data.total ?? 0,
            hasMore: limit < (data.total ?? 0),
            isLoading: false,
          });
        } catch (e) {
          set({
            isLoading: false,
            error: e instanceof Error ? e.message : 'Failed to apply filters',
            campers: [],
          });
        }
      },

      loadMore: async () => {
        const { filters, page, limit, campers, hasMore, isLoading } = get();
        if (!hasMore || isLoading) return;

        set({ isLoading: true, error: null });

        try {
          const nextPage = page + 1;
          const data = await fetchCampers(filters, nextPage, limit);
          const nextItems = data.items ?? [];
          const updated = [...campers, ...nextItems];

          set({
            campers: updated,
            page: nextPage,
            total: data.total ?? updated.length,
            hasMore: updated.length < (data.total ?? updated.length),
            isLoading: false,
          });
        } catch (e) {
          set({
            isLoading: false,
            error: e instanceof Error ? e.message : 'Failed to load more campers',
          });
        }
      },

      fetchCamperDetails: async (id) => {
        set({ isLoading: true, error: null, selectedCamper: null });

        try {
          const data = await fetchCamperById(id);
          set({ selectedCamper: data, isLoading: false });
        } catch (e) {
          set({
            isLoading: false,
            error: e instanceof Error ? e.message : 'Failed to load camper details',
          });
        }
      },

      toggleFavorite: (id) =>
        set((state) => {
          const exists = state.favorites.includes(id);
          return {
            favorites: exists
              ? state.favorites.filter((favId) => favId !== id)
              : [...state.favorites, id],
          };
        }),

      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: 'travel-trucks-favorites',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);








