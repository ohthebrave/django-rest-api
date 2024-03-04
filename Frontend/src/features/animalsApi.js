import { rootApi } from "../api/rootApi";

export const productApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        fetchAllproducts: builder.query({
            query: () => `animals/`,
            // provides the cache update
            providesTags: ['Animal']
        }),

        createProducts: builder.mutation({
            query: (payload) => ({
                url: `animals/`,
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            // mutation invalidate cache
            invalidatesTags: ['Animal'],
            onError: (error, variables, build) => {
                console.error('Error creating product:', error);
                // Handle error, e.g., show a notification to the user
            }
        }),
        getProductById: builder.query({
            query: (id) => `animals/${id}`,
        }),

    })

})

export const {useFetchAllproductsQuery , useCreateProductsMutation, useGetProductByIdQuery,} = productApi;


