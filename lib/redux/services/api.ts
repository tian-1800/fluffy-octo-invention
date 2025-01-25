import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export type LoginData = {
  email: string;
  password: string;
};
export type RegistrationData = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};
export type ProfileData = {
  name: string;
  email: string;
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
      query: (userData) => ({
        url: "/registration",
        method: "POST",
        body: userData,
      }),
    }),
    getProfile: builder.query<ProfileData, void>({
      query: () => "/profile",
    }),
    updateProfile: builder.mutation<{ status: string }, ProfileData>({
      query: (userData) => ({
        url: "/profile/update",
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = apiSlice;
