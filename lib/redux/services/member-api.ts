import { createApi } from "@reduxjs/toolkit/query/react";
import {
  LoginPayload,
  ProfileData,
  RegistrationPayload,
  Response,
} from "../utils/types";
import { baseQuery } from "../utils/base-query";

export const memberApi = createApi({
  reducerPath: "memberApi",
  baseQuery,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    login: builder.mutation<string, LoginPayload>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Profile"],
      transformResponse: (response: Response<{ token: string }>) => {
        return response.data.token;
      },
      transformErrorResponse: (response) => {
        return (response.data as Response<string>).message;
      },
    }),
    register: builder.mutation<{ status: string }, RegistrationPayload>({
      query: (userData) => ({
        url: "/registration",
        method: "POST",
        body: userData,
      }),
      transformErrorResponse: (response) => {
        return (response.data as Response<string>).message;
      },
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
