/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../features/authSlice";
import { toast } from "sonner";
import { envConfig } from "@/config";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: envConfig.baseUrl,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth.token ||
      document?.cookie
        ?.split("; ")
        .find((row) => row.startsWith("aqua-access-token="))
        ?.split("=")[1];

    if (token) headers.set("authorization", token);
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log("result", result);

  if (result?.error?.status == 404) {
    toast.error((result?.error.data as { message: string }).message);
  }

  if (result?.error?.status == 401) {
    const res = await fetch(`${envConfig.baseUrl}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (data?.data?.token) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          // @ts-ignore
          user,
          token: data?.data?.token,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "auth",
    "user",
    "getUser",
    "profile",
    "orders",
    "fish",
    "admin",
    "bids",
    "seller",
    "advertise",
    "payment",
  ],
  endpoints: () => ({}),
});
