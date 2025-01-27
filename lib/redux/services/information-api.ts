import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/base-query";
import { BannerData, Response, ServiceData } from "../utils/types";

export const informationApi = createApi({
  reducerPath: "informationApi",
  baseQuery,
  endpoints: (builder) => ({
    getBanner: builder.query<Array<BannerData>, void>({
      query: () => "/banner",
      transformResponse: (response: Response<Array<BannerData>>) =>
        response.data,
    }),
    getServices: builder.query<Array<ServiceData>, void>({
      query: () => "/services",
      transformResponse: (response: Response<Array<ServiceData>>) =>
        response.data,
    }),
  }),
});

export const { useGetBannerQuery, useGetServicesQuery } = informationApi;
