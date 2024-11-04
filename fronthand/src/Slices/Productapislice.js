import { apiSlice } from "./apislice";

export const Productapislice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ pageNumber, keyword }) => ({
        url: "/api/product",
        params: {
          pageNumber,
          keyword,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductdetails: builder.query({
      query: (productId) => ({
        url: `/api/product/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createproduct: builder.mutation({
      query: () => ({
        url: "api/product/",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),
    Updateproduct: builder.mutation({
      query: (data) => ({
        url: `api/product/${data.id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
    PhotoUpload: builder.mutation({
      query: (data) => ({
        url: "/api/upload/",
        method: "POST",
        body: data,
      }),
    }),
    Deleteproduct: builder.mutation({
      query: (id) => ({
        url: `/api/product/${id}`,
        method: "DELETE",
      }),
      providesTags: ["Product"],
    }),
    Createreview: builder.mutation({
      query: (data) => ({
        url: `/api/product/${data?.id}/reviews`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["product"],
    }),
    Gettopproduct: builder.query({
      query: () => ({
        url: "/api/product/top",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductdetailsQuery,
  useCreateproductMutation,
  useUpdateproductMutation,
  usePhotoUploadMutation,
  useDeleteproductMutation,
  useCreatereviewMutation,
  useGettopproductQuery
} = Productapislice;
