import { configureStore } from "@reduxjs/toolkit";
import landlordReducer from './slices/landlordSlice'

export const store = configureStore({
    reducer:{
        landlord:landlordReducer,
    }
})