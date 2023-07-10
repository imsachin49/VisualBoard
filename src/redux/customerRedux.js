import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // get all Customers
    getCustomersStart: (state) => {
      state.isFetching = true;
    },
    getCustomersSuccess: (state, action) => {
      state.customers = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    getCustomersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // create Customer
    createCustomerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    createCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.customers = [action.payload, ...state.customers];
    },
    createCustomerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // update Customer
    updateCustomerStart: (state) => {
      state.isFetching = true;
    },
    updateCustomerSuccess: (state, action) => {
      const updatedCustomer = state.customers.map((customer) => {
        if (customer._id === action.payload._id) {
          return action.payload;
        }
        return customer;
      });
      state.customers = updatedCustomer;
      state.isFetching = false;
      state.error = false;
    },
    updateCustomerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // delete Customer
    deleteCustomerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCustomerSuccess: (state, action) => {
      state.customers = state.customers.filter(
        (customer) => customer._id !== action.payload
      );
      state.isFetching = false;
      state.error = false;
    },
    deleteCustomerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    resetCustomers: (state) => {
      state.customers = [];
      state.isFetching = false;
      state.error = false;
    }
  },
});

export const {
    getCustomersStart,
    getCustomersSuccess,
    getCustomersFailure,
    createCustomerStart,
    createCustomerSuccess,
    createCustomerFailure,
    updateCustomerStart,
    updateCustomerSuccess,
    updateCustomerFailure,
    deleteCustomerStart,
    deleteCustomerSuccess,
    deleteCustomerFailure,
    resetCustomers
} = customerSlice.actions;

export default customerSlice.reducer;
