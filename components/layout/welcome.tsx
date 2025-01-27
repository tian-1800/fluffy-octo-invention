"use client";

import { useGetProfileQuery } from "@/lib/redux/services/member-api";
import ProfileImage from "../ui/profile-image";

export default function Welcome() {
  const { data: profile, isLoading, error } = useGetProfileQuery();

  if (isLoading || !profile || error) {
    return null;
  }

  return (
    <div className="flex flex-col w-2/5 gap-1">
      <div className="bg-indigo-100 text-sm rounded-full w-16 h-16 mb-6 relative">
        <ProfileImage />
      </div>
      <p className="text-gray-900">Selamat Datang,</p>
      <p className="text-2xl font-bold  text-gray-800">{profile.name}</p>
    </div>
  );
}
