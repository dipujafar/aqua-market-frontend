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
  }),
});

export const { useGetAllFishQuery } = fishApi;
