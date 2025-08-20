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
      providesTags: [tagTypes.fish, tagTypes.seller],
    }),

    deleteMyFish: builder.mutation({
      query: (id) => ({
        url: `/seller/delete-fish/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.fish, tagTypes.seller],
    }),

    getMyFollowers: builder.query({
      query: (id) => ({
        url: `/seller/find-all-my-followers/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile, tagTypes.fish],
    }),

    addAdvertise: builder.mutation({
      query: ({ data, id }) => ({
        url: `/seller/add-advertise/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.advertise, tagTypes.seller],
    }),
  }),
});

export const {
  useAddFishMutation,
  useGetMyFishQuery,
  useDeleteMyFishMutation,
  useGetMyFollowersQuery,
  useAddAdvertiseMutation,
} = sellerApi;
