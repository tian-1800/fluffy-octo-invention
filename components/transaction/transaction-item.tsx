"use client";

import {
  formatTransactionAmount,
  formatTransactionDate,
  formatTransactionDescription,
} from "@/lib/redux/utils/transaction-item";
import { TransactionHistoryData } from "@/lib/redux/utils/types";

type Props = { data: TransactionHistoryData };

const TransactionItem = ({
  data: { transaction_type, description, total_amount, created_on },
}: Props) => {
  const date = formatTransactionDate(created_on);
  const amount = formatTransactionAmount(total_amount, transaction_type);
  const formattedDescription = formatTransactionDescription(description);

  return (
    <li className="flex justify-between border w-full p-2">
      <div className="flex flex-col gap-2">
        <p
          className={`${
            amount.startsWith("-") ? "text-red-500" : "text-green-500"
          } text-xl font-semibold`}
        >
          {amount}
        </p>
        <p className="text-xs text-gray-400">{date} WIB</p>
      </div>
      <p className="text-xs text-gray-700">{formattedDescription}</p>
    </li>
  );
};

export default TransactionItem;
