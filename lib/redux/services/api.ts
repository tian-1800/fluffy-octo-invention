import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export type LoginData = {
  email: string;
  password: string;
};
export type RegistrationData = {
  email: string;
  name: string;
  password: string;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, LoginData>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<{ status: string }, RegistrationData>({
      query: (newUserData) => ({
        url: "/registration",
        method: "POST",
        body: newUserData,
      }),
    }),
    getProfile: builder.query<{ name: string; email: string }, void>({
      query: () => "/profile",
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } =
  apiSlice;
