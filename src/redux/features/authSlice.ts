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
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const COOKIE_NAME = "aqua-access-token";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: TUser; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      if (token) {
        Cookies.set(COOKIE_NAME, token, {
          path: "/",
          expires: 7,
          sameSite: "Lax",
        });
      }
    },

    switchRoleSuccess: (
      state,
      action: PayloadAction<{ user: TUser; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      if (token) {
        Cookies.set(COOKIE_NAME, token, {
          path: "/",
          expires: 7,
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
