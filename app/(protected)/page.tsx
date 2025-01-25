"use client";

import { useGetProfileQuery } from "@/lib/redux/services/api";
import { FiUser } from "react-icons/fi";

export default function Home() {
  const { data: profile, isLoading, error } = useGetProfileQuery();

  if (isLoading) {
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
              <FiUser className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {profile?.name}!
              </h1>
              <p className="text-gray-500">{profile?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
