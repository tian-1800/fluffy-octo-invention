import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../utils/base-query";
import {
  BalanceData,
  Response,
  TransactionData,
  TransactionHistoryData,
} from "../utils/types";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery,
  tagTypes: ["Balance"],
  endpoints: (builder) => ({
    getBalance: builder.query<BalanceData, void>({
      query: () => "/balance",
      transformResponse: (response: Response<BalanceData>) => response.data,
      providesTags: ["Balance"],
    }),
    createTopup: builder.mutation<
      Response<BalanceData>,
      { top_up_amount: string }
    >({
      query: (payload) => ({
        url: "/topup",
        method: "POST",
        body: { top_up_amount: Number(payload.top_up_amount) },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            transactionApi.util.updateQueryData(
              "getBalance",
              undefined,
              (draft) => {
                draft.balance = data.data.balance;
              }
            )
          );
        } catch (error) {
          console.error("Topup failed:", error);
        }
      },
    }),
    getTransactionHistory: builder.query<Array<TransactionHistoryData>, void>({
      query: () => "/transaction/history",
      transformResponse: (
        response: Response<{ records: Array<TransactionHistoryData> }>
      ) => response.data.records,
    }),
    createTransaction: builder.mutation<
      Response<TransactionData>,
      { service_code: string }
    >({
      query: (payload) => ({
        url: "/transaction",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useCreateTopupMutation,
  useGetBalanceQuery,
  useGetTransactionHistoryQuery,
  useCreateTransactionMutation,
} = transactionApi;
