import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apislice";
import Cartslice from "./Cartslice";
import authSlice from './authslice'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: Cartslice,
    auth:authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
