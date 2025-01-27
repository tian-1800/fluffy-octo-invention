import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  LoginPayload,
  ProfileData,
  RegistrationPayload,
  Response,
} from "../utils/types";

export const memberApi = createApi({
  reducerPath: "memberApi",
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
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    login: builder.mutation<string, LoginPayload>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: Response<{ token: string }>) => {
        return response.data.token;
      },
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          message: "Gagal login. Silakan coba lagi",
        };
      },
    }),
    register: builder.mutation<{ status: string }, RegistrationPayload>({
      query: (userData) => ({
        url: "/registration",
        method: "POST",
        body: userData,
      }),
    }),
    getProfile: builder.query<ProfileData, void>({
      query: () => "/profile",
      transformResponse: (response: Response<ProfileData>) => {
        return {
          ...response.data,
          name: `${response.data.first_name} ${response.data.last_name}`,
        };
      },
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<ProfileData, ProfileData>({
      query: (userData) => ({
        url: "/profile/update",
        method: "PUT",
        body: userData,
      }),
      onQueryStarted: async (userData, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            memberApi.util.updateQueryData("getProfile", undefined, (draft) => {
              Object.assign(draft, {
                ...data,
                name: `${data.first_name} ${userData.last_name}`,
              });
            })
          );
        } catch (err) {
          console.error("Failed to update profile cache:", err);
        }
      },
      invalidatesTags: ["Profile"],
    }),
    uploadProfileImage: builder.mutation<{ imageUrl: string }, FormData>({
      query: (formData) => ({
        url: "/profile/image",
        method: "PUT",
        body: formData,
      }),
      onQueryStarted: async (formData, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            memberApi.util.updateQueryData("getProfile", undefined, (draft) => {
              draft.profile_image = data.imageUrl;
            })
          );
        } catch (err) {
          console.error("Failed to update profile cache:", err);
        }
      },
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
} = memberApi;
