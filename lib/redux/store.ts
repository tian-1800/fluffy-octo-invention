import { configureStore } from "@reduxjs/toolkit";
import { memberApi } from "./services/member-api";
import authReducer from "./features/authSlice";
import errorReducer from "./features/errorSlice";
import { transactionApi } from "./services/transaction-api";
import { informationApi } from "./services/information-api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorReducer,
    [informationApi.reducerPath]: informationApi.reducer,
    [memberApi.reducerPath]: memberApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(informationApi.middleware)
      .concat(memberApi.middleware)
      .concat(transactionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
