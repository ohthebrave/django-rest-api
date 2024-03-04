import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const rootApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://django-rest-api-x6mz.onrender.com/farm/' }),
    endpoints: (builder) => ({

    })
})