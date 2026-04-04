import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export type TUser = {
  email: string;
  role: string;
  iat: number;
  exp: number;
  _id: string;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
  refreshToken: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  refreshToken: null,
};

const COOKIE_NAME = "aqua-access-token";
const REFRESHTOKEN_NAME = "aqua-refresh-token";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: TUser;
        token: string;
        refreshToken: string;
      }>,
    ) => {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;

      if (token) {
        Cookies.set(COOKIE_NAME, token, {
          path: "/",
          expires: 7,
          sameSite: "Lax",
        });
        Cookies.set(REFRESHTOKEN_NAME, refreshToken, {
          path: "/",
          expires: 70,
          sameSite: "Lax",
        });
      }
    },

    switchRoleSuccess: (
      state,
      action: PayloadAction<{
        user: TUser;
        token: string;
        refreshToken: string;
      }>,
    ) => {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;

      if (token) {
        Cookies.set(COOKIE_NAME, token, {
          path: "/",
          expires: 7,
          sameSite: "Lax",
        });
        Cookies.set(REFRESHTOKEN_NAME, refreshToken, {
          path: "/",
          expires: 70,
          sameSite: "Lax",
        });
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove(COOKIE_NAME, { path: "/" });
    },
  },
});

export const { setUser, logout, switchRoleSuccess } = authSlice.actions;
export default authSlice.reducer;

// ✅ Selectors
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
