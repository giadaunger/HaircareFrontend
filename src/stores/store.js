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
  
  updateMainRecommendation: async (productType, newProduct) => {
    const { formData } = get();
    set((state) => {
      const updatedRecommendations = { ...state.recommendations };
      if (updatedRecommendations.recommendations) {
        // Uppdatera huvudrekommendationen direkt
        updatedRecommendations.recommendations[productType].main_recommendation = newProduct;
      }
      return { recommendations: updatedRecommendations };
    });

    // Hämta nya rekommendationer för denna produkttyp
    try {
      const response = await fetch("http://localhost:8000/product-recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hair_porosity: formData.hairPorosity,
          product_type: productType,
          focus_area: formData.selectedFocus[productType],
          current_product_id: newProduct.id  // För att undvika att få samma produkt igen
        })
      });

      const data = await response.json();
      console.log(data);
      
      
      // Uppdatera similar_products för denna produkttyp
      set((state) => {
        const updatedRecommendations = { ...state.recommendations };
        if (updatedRecommendations.recommendations) {
          updatedRecommendations.recommendations[productType].similar_products = data.similar_products;
        }
        return { recommendations: updatedRecommendations };
      });
    } catch (error) {
      set({ errorMsg: "Failed to fetch new recommendations" });
    }
  },

  fetchRecommendations: async () => {
    const { formData } = get();

    const formattedFocus = {};
    Object.entries(formData.selectedFocus).forEach(([type, focus]) => {
      formattedFocus[type.replace(/-/g, ' ')] = focus;
    });

    try {
      const response = await fetch("http://localhost:8000/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hair_porosity: formData.hairPorosity,
          product_focus: formattedFocus
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