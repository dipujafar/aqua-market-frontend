import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const userProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/update-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateProfileMutation } = userProfileApi;
