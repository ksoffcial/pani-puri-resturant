import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "./utils/axiosClient";

export const getCartData = createAsyncThunk(
    'cart/getdata',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get("/cart/cartDetails");
            return response.data.cart[0].items;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

export const removeData = createAsyncThunk(
    'cart/remove',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosClient.delete(`/cart/remove/${id}`);
            return response.data.cart[0].items;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartData:[],
        cartLoading: false,
        cartError: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCartData.pending, (state) => {
                state.cartLoading = true;
                state.cartError = null;
            })
            .addCase(getCartData.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cartData = action.payload;
                state.cartError = null;
            })
            .addCase(getCartData.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = action.payload?.message || "some thing went worng"
            })

            // to remove the data for the cart
            .addCase(removeData.pending, (state) => {
                state.cartLoading = true;
                state.cartError = null;
            })
            .addCase(removeData.fulfilled, (state, action) => {
                state.cartLoading = false;
                state.cartData =  action.payload
            })
            .addCase(removeData.rejected, (state, action) => {
                state.cartLoading = false;
                state.cartError = action.payload?.message || "some thing went worng"
            })
    }
})

export default cartSlice.reducer;