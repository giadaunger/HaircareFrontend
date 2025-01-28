import { create } from "zustand";

const useStore = create((set, get) => ({
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
  setErrorMsg: (value) => set({ errorMsg: value }),

  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),

  recommendations: [],
  setRecommendations: (value) => set({ recommendations: value}),
  fetchRecommendations: async () => {
    const { formData } = get();
    try {
      const response = await fetch("http://localhost:8000/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hair_porosity: formData.hairPorosity,
          product_focus: formData.selectedFocus
        })
      });

      const data = await response.json();
      set({ recommendations: data });
    } catch (error) {
      set({ errorMsg: "Failed to fetch recommendations" });
    }
  },
}));

export default useStore;