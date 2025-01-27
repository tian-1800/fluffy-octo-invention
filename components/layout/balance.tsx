"use client";

import BackgroundImage from "@/assets/backgrounds/BackgroundSaldo.png";
import { useGetBalanceQuery } from "@/lib/redux/services/transaction-api";
import Image from "next/image";
import VisibilityButton from "../ui/visibility-button";
import { useState } from "react";

function Balance() {
  const { data, isLoading, error } = useGetBalanceQuery();
  const [showBalance, setShowBalance] = useState(true);

  if (isLoading || !data || error) return null;

  const censoredDots = "•".repeat(String(data.balance).length);
  const balanceText = showBalance
    ? data.balance.toLocaleString("id-ID")
    : censoredDots;

  return (
    <div className="relative p-5 w-3/5">
      <Image
        src={BackgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-1 flex flex-col gap-4 text-white">
        <p>Saldo anda</p>
        <div className="text-2xl font-bold">Rp {balanceText}</div>
        <div className="flex gap-2 text-xs">
          <span>{showBalance ? "Tutup saldo" : "Lihat saldo"}</span>
          <VisibilityButton
            iconClassName="text-white"
            showSecret={showBalance}
            setShowSecret={setShowBalance}
          />
        </div>
      </div>
    </div>
  );
}

export default Balance;
