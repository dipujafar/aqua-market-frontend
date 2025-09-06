import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const fishApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFish: builder.query({
      query: (params) => ({
        url: "/fish",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.fish],
    }),

    getFishDetails: builder.query({
      query: (id: string) => ({
        url: `/fish/details/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.fish],
    }),

    getFishBaseReview: builder.query({
      query: (id: string) => ({
        url: `/fish/reviews/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.fish],
    }),

    getFishBaseAverageReview: builder.query({
      query: (id: string) => ({
        url: `/fish/average-rating/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.fish],
    }),

    getFishMaxPrice: builder.query({
      query: () => ({
        url: `/fish/max-price`,
        method: "GET",
      }),
      providesTags: [tagTypes.fish],
    }),

    sellerFish: builder.query({
      query: (id: string) => ({
        url: `/fish/seller-fish/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.fish, tagTypes.seller],
    }),
  }),
});

export const {
  useGetAllFishQuery,
  useGetFishDetailsQuery,
  useGetFishBaseReviewQuery,
  useGetFishBaseAverageReviewQuery,
  useGetFishMaxPriceQuery,
  useSellerFishQuery,
} = fishApi;
