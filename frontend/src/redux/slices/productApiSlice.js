import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({

      getAllProducts: builder.query({
         query: () => "/products",
         providesTags: ["Products"]
      }),

      getProductDetails: builder.query({
         query: (id) => `/product/${id}`,
         providesTags: ["Products"]
      }),
   })
})

export const { useGetAllProductsQuery, useGetProductDetailsQuery } = productApiSlice
