import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAbout: build.query({
      query: () => ({
        url: "/admin/get-about",
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),

    getPrivacyPolicy: build.query({
      query: () => ({
        url: "/admin/get-privacy-policy",
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),

    getTermsConditions: build.query({
      query: () => ({
        url: "/admin/get-terms-of-condition",
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useGetAboutQuery,
  useGetPrivacyPolicyQuery,
  useGetTermsConditionsQuery,
} = adminApi;
