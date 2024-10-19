import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CartProduct, Product } from "../../types";

const initialState = {
  products: [] as Product[],
  totalProducts: 0,
  filteredProducts: [] as Product[],
  status: "idle",
  error: undefined as string | undefined,
  selectedProduct: {} as Product,
  cartProducts: [] as CartProduct[],
  favoritesProducts: [] as Product[],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await axios.get(
      `https://dummyjson.com/products?skip=${page * limit}&limit=${limit}`
    );
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      const product = state.filteredProducts.find(
        (product) => product.id === action.payload
      );
      return {
        ...state,
        selectedProduct: product || {},
      } as typeof initialState;
    },
    filterProducts: (state, action) => {
      const filteredProducts = state.products.filter((product) =>
        product.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        filteredProducts: filteredProducts,
      } as typeof initialState;
    },
    addToCart: (state, action) => {
      const existProduct = state.cartProducts.find(
        (product) => product.id === action.payload.id
      );
      const newFavoriteProducts = state.favoritesProducts.filter(
        (product) => product.id !== action.payload.id
      );
      if (existProduct) {
        return {
          ...state,
          cartProducts: state.cartProducts.map((product) =>
            product.id === action.payload.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        } as typeof initialState;
      }
      return {
        ...state,
        cartProducts: [
          ...state.cartProducts,
          { ...action.payload, quantity: 1 },
        ],
        favoritesProducts: [...newFavoriteProducts],
      } as typeof initialState;
    },
    addToFavorites: (state, action) => {
      const existProduct = state.favoritesProducts.find(
        (product) => product.id === action.payload.id
      );
      if (!existProduct) {
        return {
          ...state,
          favoritesProducts: [...state.favoritesProducts, action.payload],
        } as typeof initialState;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = [...state.products, ...action.payload.products];
        state.selectedProduct =
          Object.keys(state.selectedProduct).length > 0
            ? state.selectedProduct
            : state.products[0];
        state.filteredProducts = state.products;
        state.totalProducts = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { selectProduct, filterProducts, addToCart, addToFavorites } =
  productSlice.actions;
export default productSlice.reducer;
