import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export type TUser = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      // Store token in Cookies for middleware authentication
      Cookies.set("aqua-access-token", token, {
        path: "/",
        expires: 7,
      });
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
