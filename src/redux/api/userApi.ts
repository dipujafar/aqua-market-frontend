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
  }),
});

export const { usePostFishReviewMutation } = userApi;
