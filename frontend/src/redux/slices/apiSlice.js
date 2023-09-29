import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../config";


const baseQuery = fetchBaseQuery({ baseUrl: baseURL });
export const apiSlice = createApi({
   baseQuery,
   tagTypes: ["User", "Products", "Product"],
   endpoints: (builder) => ({}),
})

