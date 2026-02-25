import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axiosClient from "./utils/axiosClient"
import { act } from "react";

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post('/user/register', userData,{ withCredentials: true });
            return response.data.user
        }
        catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post("/user/login", credentials,{ withCredentials: true })
            return response.data.user
        }
        catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const checkUser = createAsyncThunk(
    'auth/check',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axiosClient.get("/user/check", { withCredentials: true })
            return data.user;
        }
        catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post("/user/logout",{ withCredentials: true });
            return response.data.message;
        }
        catch (error) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)




const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = ! !action.payload
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'something went wrong';
                state.isAuthenticated = false;
                state.user = null;
            })

            // login user 
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = ! !action.payload;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'something went wrong ';
                state.isAuthenticated = false;
                state.user = null;
            })

            // to check the user
            .addCase(checkUser.pending, (state) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(checkUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = !!action.payload;
                state.user = action.payload;
            })
            .addCase(checkUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "something went wrong"
                state.isAuthenticated = false
                state.user = null;
            })

            // logout user 

            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Something went worng";
                state.isAuthenticated = false;
                state.user = null;
            })

    }
})

export default authSlice.reducer

