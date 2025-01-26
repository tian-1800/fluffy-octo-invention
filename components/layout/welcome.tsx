"use client";

import Image from "next/image";
import { useGetProfileQuery } from "@/lib/redux/services/member-api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

export default function Welcome() {
  const router = useRouter();
  const { data: profile, isLoading, error } = useGetProfileQuery();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (isLoading || !profile || error) {
    return null;
  }

  return (
    <div className="flex flex-col w-2/5 gap-1">
      <div className="bg-indigo-100 text-sm p-3 rounded-full w-12 h-12 mb-6">
        <Image
          src={profile.profile_image}
          alt={profile.name}
          width={40}
          height={40}
          className="w-12 h-12 rounded-full"
        />
      </div>
      <p className="text-gray-900">Selamat Datang,</p>
      <p className="text-2xl font-bold  text-gray-800">{profile.name}</p>
    </div>
  );
}
