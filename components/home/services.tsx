"use client";

import { useGetServicesQuery } from "@/lib/redux/services/information-api";
import Image from "next/image";
import ServiceSkeleton from "./service-skeleton";
import Link from "next/link";
import { slugify } from "@/lib/redux/utils/slugify";

const Services = () => {
  const { data, isLoading, error } = useGetServicesQuery();

  if (error) return <div>Error loading services</div>;

  return (
    <ul className="flex space-x-4">
      {isLoading || !data
        ? Array.from({ length: 5 }).map((_, i) => <ServiceSkeleton key={i} />)
        : data.map((service, i) => (
            <li key={i} className="w-32 ">
              <Link
                href={`/${slugify(service.service_name)}`}
                className="flex flex-col gap-4 items-center"
              >
                <Image
                  src={service.service_icon}
                  alt={service.service_name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <p className="text-xs text-center">{service.service_name}</p>
              </Link>
            </li>
          ))}
    </ul>
  );
};

export default Services;
