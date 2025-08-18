import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAllFish: builder.query({
      query: () => ({
        url: `/user/my-buy-fish`,
        method: "GET",
      }),
      providesTags: [tagTypes.orders],
    }),
  }),
});

export const { useGetMyAllFishQuery } = cartApi;
