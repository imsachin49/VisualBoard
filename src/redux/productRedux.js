import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // get all products
    getProductsStart: (state) => {
      state.isFetching = true;
    },
    getProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    getProductsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // create product
    createProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createProductSuccess: (state, action) => {
      state.products.push(action.payload);
      state.isFetching = false;
      state.error = false;
    },
    createProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // update product
    updateProductStart: (state) => {
      state.isFetching = true;
    },
    updateProductSuccess: (state, action) => {
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
      state.isFetching = false;
      state.error = false;
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // delete product
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      // state.products = state.products.filter(
      //   (product) => product._id !== action.payload
      // );
      state?.products?.splice(
        state?.products?.findIndex((item) => item?._id === action.payload),
        1
      )
      state.isFetching = false;
      state.error = false;
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
    getProductsStart,
    getProductsSuccess,
    getProductsFailure,
    createProductStart,
    createProductSuccess,
    createProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
} = productSlice.actions;
export default productSlice.reducer;
