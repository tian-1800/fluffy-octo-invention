"use client";

import Image from "next/image";
import { useGetProfileQuery } from "@/lib/redux/services/member-api";

export default function Welcome() {
  const { data: profile, isLoading, error } = useGetProfileQuery();

  if (isLoading || !profile || error) {
    return null;
  }

  return (
    <div className="flex flex-col w-2/5 gap-1">
      <div className="bg-indigo-100 text-sm rounded-full w-16 h-16 mb-6">
        <Image
          src={profile.profile_image}
          alt={profile.name}
          width={48}
          height={48}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>
      <p className="text-gray-900">Selamat Datang,</p>
      <p className="text-2xl font-bold  text-gray-800">{profile.name}</p>
    </div>
  );
}
