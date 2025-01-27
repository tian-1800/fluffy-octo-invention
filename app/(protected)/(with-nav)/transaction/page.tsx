"use client";

import { useGetTransactionHistoryQuery } from "@/lib/redux/services/transaction-api";

export default function Transaction() {
  const { data, isLoading, error } = useGetTransactionHistoryQuery();

  if (error) return <div>Error loading services</div>;

  return (
    <section className="flex flex-col gap-16 bg-gray-50 page-padding">
      <p className="">Semua Transaksi</p>
      <ul className="flex space-x-4 overflow-x-auto">
        {isLoading || !data
          ? Array.from({ length: 5 }).map((_, i) => <div key={i} />)
          : data.map((transaction, i) => (
              <li key={i} className="relative min-w-64 h-28 border-r">
                heheh
              </li>
            ))}
      </ul>
    </section>
  );
}
