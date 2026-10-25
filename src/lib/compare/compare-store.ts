import { create } from "zustand";

export const MAX_COMPARE_ITEMS = 3;

export type CompareItem = {
  code: string;
  name: string;
};

type CompareState = {
  items: CompareItem[];
  toggle: (item: CompareItem) => void;
  remove: (code: string) => void;
  clear: () => void;
};

export const useCompareStore = create<CompareState>()((set) => ({
  items: [],

  toggle: (item) =>
    set((state) => {
      const isSelected = state.items.some(
        (current) => current.code === item.code,
      );

      if (isSelected) {
        return {
          items: state.items.filter((current) => current.code !== item.code),
        };
      }

      if (state.items.length >= MAX_COMPARE_ITEMS) {
        return state;
      }

      return { items: [...state.items, item] };
    }),

  remove: (code) =>
    set((state) => ({
      items: state.items.filter((item) => item.code !== code),
    })),

  clear: () => set({ items: [] }),
}));
