import Image from "next/image";
import { useCreateTopupMutation } from "@/lib/redux/services/transaction-api";
import Modal from "../ui/modal";
import { useState } from "react";
import Logo from "@/assets/images/Logo.png";
import { FaCheck, FaXmark } from "react-icons/fa6";

interface AlertProps {
  onClose: () => void;
  amount: number;
}

const TopupAlert: React.FC<AlertProps> = ({ amount, onClose }) => {
  const [createTopup] = useCreateTopupMutation();
  const [stage, setStage] = useState<"confirm" | "success" | "failed">(
    "confirm"
  );

  const onProceed = async () => {
    try {
      await createTopup({ top_up_amount: String(amount) });
      setStage("success");
    } catch {
      setStage("failed");
    }
  };

  const amountString = amount.toLocaleString("id-ID");

  if (stage !== "confirm") {
    return (
      <Modal className="gap-2">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-full ${
            stage === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {stage === "success" ? (
            <FaCheck className="w-6 h-6" />
          ) : (
            <FaXmark className="w-6 h-6" />
          )}
        </div>
        <p className="text-sm">Top Up sebesar</p>
        <p className="font-bold text-xl">Rp{amountString}</p>
        <p className="text-sm">{stage === "success" ? "berhasil" : "gagal"}!</p>
        <button
          className="mt-1 text-red-500 font-semibold"
          type="button"
          onClick={onClose}
        >
          Kembali ke beranda
        </button>
      </Modal>
    );
  }

  return (
    <Modal className="gap-6">
      <div className="flex flex-col gap-2 items-center">
        <Image
          src={Logo}
          alt={"Logo"}
          width={48}
          height={48}
          className="mb-2"
        />
        <p className="text-sm">Anda yakin untuk Top Up sebesar</p>
        <p className="font-bold text-xl">Rp{amountString}?</p>
      </div>
      <button
        type="button"
        className="text-sm text-red-500 font-bold"
        onClick={onProceed}
      >
        Ya, lanjutkan Top Up
      </button>
      <button
        type="button"
        className="text-sm text-gray-400 font-semibold"
        onClick={onClose}
      >
        Batalkan
      </button>
    </Modal>
  );
};

export default TopupAlert;
