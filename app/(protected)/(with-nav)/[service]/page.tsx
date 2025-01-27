"use client";

import ConfirmationModal from "@/components/ui/confirmation-modal";
import { useGetServicesQuery } from "@/lib/redux/services/information-api";
import { useCreateTransactionMutation } from "@/lib/redux/services/transaction-api";
import { slugify } from "@/lib/redux/utils/slugify";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function Service({ params }: { params: { service: string } }) {
  const slug = params.service;
  const { data, isLoading: loadingService, error } = useGetServicesQuery();
  const [createTransaction] = useCreateTransactionMutation();

  const service = useMemo(() => {
    const item = data?.find((s) => slugify(s.service_name) === slug);
    if (item?.service_name === "Listrik")
      return { ...item, service_name: "Listrik Prabayar" };
    return item;
  }, [data, slug]);

  const [, { isLoading }] = useCreateTransactionMutation();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handlePay = async () => {
    setShowConfirmation(true);
  };
  if (loadingService) return null;
  if (!service || error) return <div>Service not found</div>;

  const tariffString = service.service_tariff.toLocaleString("id-ID");

  return (
    <section className="flex flex-col gap-2 bg-gray-50 page-padding w-full">
      <p className="">Pembayaran</p>
      <div className="flex items-center gap-1">
        <Image
          src={service.service_icon}
          alt={service.service_name}
          width={40}
          height={40}
        />
        <p className="font-semibold">{service.service_name}</p>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <input
          name="nominal"
          value={tariffString}
          className="col-span-5 appearance-none border border-gray-300 font-medium py-2 px-4 rounded"
          disabled
        />
        <button
          className="col-span-5 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded disabled:bg-red-300"
          disabled={isLoading}
          onClick={handlePay}
        >
          Bayar
        </button>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          primaryMessage={`Pembayaran ${service.service_name.toLowerCase()} sebesar`}
          proceedMessage="Ya, lanjutkan Bayar"
          amount={service.service_tariff}
          onClose={() => setShowConfirmation(false)}
          proceed={async () => {
            await createTransaction({ service_code: service.service_code });
          }}
        >
          <p className="text-sm">Beli {service.service_name} senilai</p>
          <p className="font-bold text-xl">Rp{tariffString}?</p>
        </ConfirmationModal>
      )}
    </section>
  );
}
