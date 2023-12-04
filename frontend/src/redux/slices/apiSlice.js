import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../../config";


const baseQuery = fetchBaseQuery({ baseUrl: baseURL });
export const apiSlice = createApi({
   baseQuery,
   tagTypes: ["User", "Products", "Product"],
   // based upon this tags we will update the cached data of whatever is stored 
   endpoints: (builder) => ({}),
})

