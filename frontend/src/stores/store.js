import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authslice"
import cartReducer from "../cartSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    }
})