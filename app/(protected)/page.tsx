"use client";

import { useGetProfileQuery } from "@/lib/redux/services/member-api";
import Image from "next/image";

export default function Home() {
  const { data: profile, isLoading, error } = useGetProfileQuery();

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">Error loading profile</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Image
                src={profile.profile_image}
                alt={profile.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {profile.name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
