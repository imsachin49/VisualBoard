import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // set all products
    setAllProducts: (state, action) => {
      state.products = action.payload;
    },
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
      const updatedProduct=state.products.map((product)=>{
        if(product._id===action.payload._id){
          return action.payload;
        }
        return product;
      }
      );
      state.products=updatedProduct;
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
      const updatedProducts=state.products.filter((product)=>product._id!==action.payload);
      state.products=updatedProducts;
      state.isFetching=false;
      state.error=false;
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    resetProducts: (state) => {
      state.products = [];
      state.isFetching = false;
      state.error = false;
    }
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
    resetProducts,
} = productSlice.actions;
export default productSlice.reducer;
