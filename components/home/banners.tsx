"use client";

import { useGetBannerQuery } from "@/lib/redux/services/information-api";
import Image from "next/image";
import ServiceSkeleton from "./service-skeleton";

const Banners = () => {
  const { data, isLoading, error } = useGetBannerQuery();

  if (error) return <div>Error loading services</div>;

  return (
    <section className="flex flex-col gap-4 min-w-screen">
      <p className="text-sm font-bold">Temukan Promo Menarik</p>
      <ul className="flex space-x-4 overflow-x-auto">
        {isLoading || !data
          ? Array.from({ length: 5 }).map((_, i) => <ServiceSkeleton key={i} />)
          : data.map(({ banner_image, banner_name }, i) => (
              <li key={i} className="relative min-w-64 h-28 border-r">
                <Image
                  src={banner_image}
                  alt={banner_name}
                  fill
                  className="object-cover"
                />
              </li>
            ))}
      </ul>
    </section>
  );
};

export default Banners;
