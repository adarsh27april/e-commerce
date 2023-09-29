import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({

      getAllProducts: builder.query({
         query: () => "/products",
         providesTags: ["Products"]
      }),

   })
})

export const { useGetAllProductsQuery } = productApiSlice
