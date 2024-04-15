import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseAPI = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:5000/api/v1"}),
    endpoints: (builder) =>({
        getApi: builder.query({
            query: "/"
        })
    })
})