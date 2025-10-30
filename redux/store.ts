import { configureStore } from "@reduxjs/toolkit";
import landlordReducer from './slices/landlordSlice'

export const store = configureStore({
    reducer:{
        landlord:landlordReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;