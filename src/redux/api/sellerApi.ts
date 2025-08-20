import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const sellerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFish: builder.mutation({
      query: (data) => ({
        url: "/seller/create-fish",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.fish, tagTypes.seller],
    }),

    getMyFish: builder.query({
      query: (params) => ({
        url: "/seller/my-fish",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useAddFishMutation, useGetMyFishQuery } = sellerApi;
