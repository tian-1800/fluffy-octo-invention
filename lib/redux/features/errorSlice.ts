import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<{ error_mesage: string }>) => {
      state.message = action.payload.error_mesage;
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
    },
  },
});

export const { setError } = authSlice.actions;
export default authSlice.reducer;
