import { create } from "zustand";

const useStore = create((set) => ({
  formData: {
    hairPorosity: "",
    selectedProducts: [],
    selectedFocus: {}
  },

  updateFormField: (field, value) => 
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value
      }
    })),

  resetForm: () => 
    set({
      formData: {
        hairPorosity: "",
        selectedProducts: [],
        selectedFocus: {}
      }
    }),

  errorMsg: "",
  setErrorMsg: (value) => set({ errorMsg: value })
}));

export default useStore;