import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import { UPLOAD_URL } from "../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: PRODUCTS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddProductMutation, useUploadProductImageMutation } =
  productsApiSlice;
