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
  
  updateMainRecommendation: (productType, newProduct) => 
    set((state) => {
      const updatedRecommendations = { ...state.recommendations };
      if (updatedRecommendations.recommendations) {
        const oldMain = updatedRecommendations.recommendations[productType].main_recommendation;
        updatedRecommendations.recommendations[productType].main_recommendation = newProduct;        
        updatedRecommendations.recommendations[productType].similar_products = 
          updatedRecommendations.recommendations[productType].similar_products
            .filter(p => p.id !== newProduct.id)
            .concat([oldMain]); 
      }
      return { recommendations: updatedRecommendations };
    }),

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

  productInfo: null,
  setProductInfo: (value) => set({ productInfo: value}),
  fetchProductInfo: async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/product/${id}`);
      const data = await response.json();
      set({ productInfo: data });
    } catch (error) {
      console.error('Error fetching product info:', error);
    }
  },

  isCartOpen: false,
  setIsCartOpen: (value) => set({ isCartOpen: value }),

  shoppingCart: [],
    
  addAllRecommendationsToCart: () => {
    const { recommendations } = get();
    if (recommendations?.recommendations) {
      const recommendedProducts = Object.values(recommendations.recommendations)
        .map(rec => rec.main_recommendation);
      
      set((state) => ({
        shoppingCart: [...state.shoppingCart, ...recommendedProducts]
      }));
    }
  },

  removeFromCart: (productId) =>
    set((state) => ({
      shoppingCart: state.shoppingCart.filter(item => item.id !== productId)
    })),

  clearCart: () => set({ shoppingCart: [] }),

  addAllRecommendationsToCart: () => {
    const { recommendations } = get();
    if (recommendations?.recommendations) {
      const recommendedProducts = Object.values(recommendations.recommendations)
        .map(rec => ({
          ...rec.main_recommendation,
          price: 95
        }));
      
      set((state) => ({
        shoppingCart: [...state.shoppingCart, ...recommendedProducts]
      }));
    }
  },
}));

export default useStore;