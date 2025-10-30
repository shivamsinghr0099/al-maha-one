import { configureStore } from "@reduxjs/toolkit";
import landlordReducer from './slices/landlordSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
    reducer:{
        landlord:landlordReducer,
        auth:authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;