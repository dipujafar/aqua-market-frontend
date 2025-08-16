import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postFishReview: builder.mutation({
      query: ({ data, id }) => ({
        url: `/user/provide-review/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.fish],
    }),

    // Buy Fish
    buyFish: builder.mutation({
      query: (data) => ({
        url: `/user/buy-fish`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.orders],
    }),

    getMyAllFish: builder.query({
      query: () => ({
        url: `/user/my-buy-fish`,
        method: "GET",
      }),
      providesTags: [tagTypes.orders],
    }),

    // Follow Seller & Unfollow
    followSeller: builder.mutation({
      query: ({ data, id }) => ({
        url: `/user/unfollow-seller/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),

    myFollowing: builder.query({
      query: () => ({
        url: `/user/my-following`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),

    getSellerBaseFollowing: builder.query({
      query: (id) => ({
        url: `/user/get-seller-base-following/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
  }),
});

export const {
  usePostFishReviewMutation,
  useBuyFishMutation,
  useFollowSellerMutation,
  useMyFollowingQuery,
  useGetSellerBaseFollowingQuery,
  useGetMyAllFishQuery,
} = userApi;
