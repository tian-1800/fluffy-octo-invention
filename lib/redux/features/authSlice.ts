import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token?: string;
  isAuthenticated: boolean;
}

const getStoredToken = () => {
  if (typeof window === "undefined") return;

  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("tokenExpiry");

  if (!token || !expiry) return;

  if (new Date().getTime() > parseInt(expiry)) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    return;
  }

  return token;
};

const initialState: AuthState = {
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      if (!action.payload.token) return;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      const expiryHours = process.env.NEXT_PUBLIC_TOKEN_EXPIRY_HOURS || "24";
      const expiryTime =
        new Date().getTime() + parseInt(expiryHours) * 60 * 60 * 1000;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("tokenExpiry", expiryTime.toString());
    },
    logout: (state) => {
      state.token = undefined;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
