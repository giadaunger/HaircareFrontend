import { create } from "zustand";

const useStore = create((set) => ({
  errorMsg: "",
  setErrorMsg: (value) => set({ errorMsg: value }),

  selectedProducts: [],
  setSelectedProducts: (value) => set({ selectedProducts: value }),

  selectedFocus: {},
  setSelectedFocus: (value) => set({ selectedFocus: value }),
}));

export default useStore;