"use client";

import TopupAlert from "@/components/topup/topup-alert";
import { useCreateTopupMutation } from "@/lib/redux/services/transaction-api";
import { useState } from "react";
import { LuBatteryFull } from "react-icons/lu";

const minTopup = 10000;
const maxTopup = 1000000;

export default function Transaction() {
  const [, { isLoading }] = useCreateTopupMutation();

  const [amount, setAmount] = useState<number | undefined>();
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleTopup = async () => {
    if (!amount || amount < minTopup) {
      setErrorMessage("Minimal topup Rp10.000");
      return;
    }
    if (amount > maxTopup) {
      setErrorMessage("Maksimal topup Rp1.000.000");
      return;
    }
    setShowConfirmation(true);
  };

  return (
    <section className="flex flex-col gap-1 page-padding">
      <p className="">Silakan Masukkan</p>
      <p className="text-2xl font-semibold">Nominal Top Up</p>
      <div className="grid grid-cols-8 gap-4 mt-8">
        <div className="col-span-5 appearance-none border border-gray-300 font-medium py-2 px-4 rounded relative">
          <input
            type="number"
            name="nominal"
            value={amount}
            className="w-full pl-4 focus:outline-none focus:border-none"
            onChange={(e) => {
              setAmount(parseInt(e.target.value));
              setErrorMessage("");
            }}
            placeholder="masukkan nominal top up"
          />
          <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
            <LuBatteryFull
              className={`h-4 w-4 ${amount ? "text-black" : "text-gray-400"}`}
            />
          </div>
        </div>
        <ButtonSet amount={10000} setAmount={setAmount} />
        <ButtonSet amount={20000} setAmount={setAmount} />
        <ButtonSet amount={50000} setAmount={setAmount} />
        <button
          className="col-span-5 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded disabled:bg-red-300"
          disabled={!amount || isLoading}
          onClick={handleTopup}
        >
          Top Up
        </button>
        <ButtonSet amount={100000} setAmount={setAmount} />
        <ButtonSet amount={250000} setAmount={setAmount} />
        <ButtonSet amount={500000} setAmount={setAmount} />
        {errorMessage && (
          <p className="col-span-5 mt-2 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>
      {showConfirmation && amount && (
        <TopupAlert
          amount={amount}
          onClose={() => setShowConfirmation(false)}
        />
      )}
    </section>
  );
}

const ButtonSet = ({
  amount,
  setAmount,
}: {
  amount: number;
  setAmount: (amount: number) => void;
}) => {
  return (
    <button
      className="border border-gray-300 font-medium py-2 px-4 rounded"
      onClick={() => setAmount(amount)}
    >
      Rp{amount.toLocaleString("id-ID")}
    </button>
  );
};
