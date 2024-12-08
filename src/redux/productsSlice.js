import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import FavoriteService from "../services/FavoriteService";
import appConfig from "../config/apiURL";

const initialState = {
    products: [],
    queryString: "",
    selectedCategory: "",
    cart: [],
    favoriteProducts: [],
    selectedProduct: null,
    loading: false,
    error: null,
};


export const fetchProducts = createAsyncThunk(
    "productSlice/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(appConfig.BASE_URL);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        setQueryString: (state, action) => {
            return { ...state, queryString: action.payload };
        },
        updateCart: (state, action) => {
            const product = action.payload;
            const existingIndex = state.cart.findIndex((item) => item.id === product.id);

            if (product.quantity === 0) {
                state.cart = state.cart.filter((item) => item.id !== product.id);
            } else if (existingIndex !== -1) {
                state.cart[existingIndex] = product;
            } else {
                state.cart.push(product);
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.cart = state.cart.filter((item) => item.id !== productId);
        },
        selectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        removeSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        updateFavoriteCart: (state, action) => {
            const product = action.payload;
            const existingIndex = state.favoriteProducts.findIndex((item) => item.id === product.id);

            if (product.quantity === 0) {
                state.favoriteProducts = state.favoriteProducts.filter((item) => item.id !== product.id);
            } else if (existingIndex !== -1) {
                state.favoriteProducts[existingIndex] = product;
            } else {
                state.favoriteProducts.push(product);
            }
            FavoriteService.saveOrder(state.favoriteProducts);
        },
        removeFromFavoriteCart: (state, action) => {
            const productId = action.payload;
            state.favoriteProducts = state.favoriteProducts.filter(item => item.id !== productId);
            FavoriteService.saveOrder(state.favoriteProducts);
        },
        selectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setQueryString,
    updateCart,
    selectedProduct,
    removeSelectedProduct,
    updateFavoriteCart,
    removeFromFavoriteCart,
    selectedCategory
} = productSlice.actions;

export default productSlice.reducer;
