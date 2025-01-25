import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/base-query";
import { BalanceData, Response } from "../utils/types";

export const transactionApi = createApi({
  reducerPath: "transaction-api",
  baseQuery,
  endpoints: (builder) => ({
    getBalance: builder.query<BalanceData, void>({
      query: () => "/balance",
      transformResponse: (response: Response<BalanceData>) => response.data,
    }),
    createTopup: builder.mutation<BalanceData, { topup_amount: string }>({
      query: (userData) => ({
        url: "/topup",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response: Response<BalanceData>) => response.data,
    }),
    // createTransaction: builder.mutation<{ service_code: string }, any>({
    //   query: (userData) => ({
    //     url: "/topup",
    //     method: "POST",
    //     body: userData,
    //   }),
    // }),
  }),
});

export const { useCreateTopupMutation, useGetBalanceQuery } = transactionApi;
