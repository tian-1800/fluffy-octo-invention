"use client";

import TransactionItem from "@/components/transaction/transaction-item";
import { useGetTransactionHistoryQuery } from "@/lib/redux/services/transaction-api";
import { getMonthNames } from "@/lib/utils/transaction-item";
import { useState } from "react";

export default function Transaction() {
  const [offset, setOffset] = useState(0);
  const limit = 5;

  const {
    data: transactions,
    isLoading,
    error,
    isFetching,
  } = useGetTransactionHistoryQuery({ limit, offset });

  const handleShowMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  if (error) return <div>Error loading Transactions</div>;
  if (!isLoading && !transactions)
    return (
      <section className="page-padding">
        <p className="font-semibold">Semua Transaksi</p>
        <ul className="flex gap-4 mt-2">
          {getMonthNames().map((month, i) => (
            <li
              key={month}
              className={`font-bold  ${
                i === 3 ? "text-gray-700" : "text-gray-300"
              }`}
            >
              {month}
            </li>
          ))}
        </ul>
        <div className="flex w-full justify-center mt-24 text-sm text-gray-300">
          Maaf tidak ada histori transaksi saat ini
        </div>
      </section>
    );

  return (
    <section className="flex flex-col gap-4 bg-gray-50 page-padding">
      <p className="font-semibold">Semua Transaksi</p>
      <ul className="flex flex-col gap-4 overflow-x-auto">
        {isLoading && offset === 0
          ? Array.from({ length: 5 }).map((_, i) => <div key={i} />)
          : transactions?.map((transaction, i) => (
              <TransactionItem key={i} data={transaction} />
            ))}
      </ul>
      {!isLoading && transactions?.length === offset + limit && (
        <button
          onClick={handleShowMore}
          disabled={isFetching}
          className="mt-4 px-4 py-2 text-red-500 font-semi-bold"
        >
          {isFetching ? "Loading..." : "Show More"}
        </button>
      )}
    </section>
  );
}
