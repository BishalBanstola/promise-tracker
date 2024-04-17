import create from 'zustand';

export const useStore = create((set) => ({
  promises: [],
  setPromises: (promises) => set({ promises }),
}));
