// here we will create Redux Store

import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import { apiSlice } from "./slices/apiSlice"

export const store = configureStore({
   reducer: {
      auth: authSlice,
      [apiSlice.reducerPath]: apiSlice.reducer
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),

   devTools: true
})
