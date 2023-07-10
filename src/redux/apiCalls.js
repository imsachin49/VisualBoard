import { publicRequest,userRequest,localRequest } from "../requestMethods";
import { loginFailure,loginStart,loginSuccess } from "./userRedux";
import { getProductsStart, getProductsSuccess, getProductsFailure} from "./productRedux";
import { deleteProductStart,deleteProductFailure,deleteProductSuccess } from "./productRedux";
import { createProductStart,createProductFailure,createProductSuccess } from "./productRedux";
import { updateProductStart,updateProductFailure,updateProductSuccess } from "./productRedux";
import {
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
    deleteCustomerFailure
} from "../redux/customerRedux"

export const login = async (dispatch,user,navigate) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
        console.log(res.data)
        navigate('/');
    } catch (err) {
        dispatch(loginFailure());
    }
}

export const getProducts = async (dispatch) => {
    dispatch(getProductsStart());
    try {
        const res = await userRequest.get("/products/all");
        dispatch(getProductsSuccess(res.data));
    } catch (err) {
        dispatch(getProductsFailure());
    }
}

export const deleteProduct = async (id,dispatch) => {
    console.log(id+"hei............")
    dispatch(deleteProductStart());
    try {
        // const res=await publicRequest.delete("/products/"+id);
        const res=await userRequest.delete("/products"+id);
        dispatch(deleteProductSuccess(id));
        window.location.reload();
        console.log(res.data);
    } catch (err) {
        dispatch(deleteProductFailure());
    }
}

export const addProduct = async (product,dispatch) => {
    dispatch(createProductStart());
    try {
        const res = await userRequest.post("/products", product);
        dispatch(createProductSuccess(res.data));
        console.log(res.data)
        window.location.replace("/");
    } catch (err) {
        dispatch(createProductFailure());
    }
}

export const updateProduct = async (id,product,dispatch,navigate) => {
    dispatch(updateProductStart());
    try {
        const res = await userRequest.put("/products/"+id, product);
        dispatch(updateProductSuccess({product:res.data}));
        navigate("/products");
        console.log(res.data);
    } catch (err) {
        dispatch(updateProductFailure());
    }
}

export const getCustomers=async(dispatch)=>{
    dispatch(getCustomersStart());
    try {
        const res = await userRequest.get("/users");
        dispatch(getCustomersSuccess(res.data));
    } catch (err) {
        dispatch(getCustomersFailure());
    }   
}

export const deleteCustomer=async(id,dispatch)=>{
    dispatch(deleteCustomerStart());
    try {
        const res = await userRequest.delete("/users/"+id);
        dispatch(deleteCustomerSuccess(id));
        window.location.reload();
    } catch (err) {
        dispatch(deleteCustomerFailure());
    }   
}

export const addCustomer=async(customer,dispatch,navigate)=>{
    dispatch(createCustomerStart());
    try {
        const res = await publicRequest.post("/auth/register",customer);
        dispatch(createCustomerSuccess(res.data.savedUser));
        navigate("/users");
    } catch (err) {
        dispatch(createCustomerFailure());
    }   
}

export const updateCustomer=async(id,customer,dispatch,navigate)=>{
    dispatch(updateCustomerStart());
    try {
        const res = await userRequest.put("/users/"+id,customer);
        dispatch(updateCustomerSuccess({customer:res.data}));
        console.log(res.data);
        navigate("/users");
    } catch (err) {
        dispatch(updateCustomerFailure());
    }   
}
