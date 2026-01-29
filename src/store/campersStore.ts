import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Camper } from '@/types/camper';
import type { CatalogFilters } from '@/types/filters';
import { getCamperById, getCampers } from '@/services/api';

const DEFAULT_LIMIT = 4;

const initialFilters: CatalogFilters = {
  location: '',
  bodyType: '',
  features: [],
};

interface CampersState {
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
  resetSearch: () => void;

  fetchCampers: () => Promise<void>;
  loadMore: () => Promise<void>;
  fetchCamperById: (id: string) => Promise<void>;

  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

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

      setFilters: (next) => {
        set((state) => ({
          filters: { ...state.filters, ...next },
        }));
      },

      resetSearch: () => {
        set({
          campers: [],
          page: 1,
          total: 0,
          hasMore: true,
          error: null,
        });
      },

      fetchCampers: async () => {
        const { filters, page, limit } = get();
        set({ isLoading: true, error: null });

        try {
          const data = await getCampers(filters, page, limit);
          set({
            campers: data.items,
            total: data.total,
            hasMore: data.items.length < data.total,
            isLoading: false,
          });
        } catch {
          set({ isLoading: false, error: 'Failed to load campers' });
        }
      },

      loadMore: async () => {
        const { filters, page, limit, campers, hasMore, isLoading } = get();
        if (!hasMore || isLoading) return;

        set({ isLoading: true, error: null });

        try {
          const nextPage = page + 1;
          const data = await getCampers(filters, nextPage, limit);
          const updatedCampers = [...campers, ...data.items];

          set({
            campers: updatedCampers,
            page: nextPage,
            total: data.total,
            hasMore: updatedCampers.length < data.total,
            isLoading: false,
          });
        } catch {
          set({ isLoading: false, error: 'Failed to load more campers' });
        }
      },

      fetchCamperById: async (id) => {
        set({ isLoading: true, error: null, selectedCamper: null });

        try {
          const data = await getCamperById(id);
          set({ selectedCamper: data, isLoading: false });
        } catch {
          set({ isLoading: false, error: 'Failed to load camper details' });
        }
      },

      toggleFavorite: (id) => {
        set((state) => {
          const exists = state.favorites.includes(id);
          return {
            favorites: exists
              ? state.favorites.filter((favId) => favId !== id)
              : [...state.favorites, id],
          };
        });
      },

      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: 'travel-trucks-favorites',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);

