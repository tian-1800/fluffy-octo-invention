"use client";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/lib/redux/services/transaction-api";
import { ProfileData } from "@/lib/redux/utils/types";
import { useForm } from "react-hook-form";

import { FiMail, FiUser } from "react-icons/fi";

export default function AccountPage() {
  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateProfileMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
    },
  });

  const onSubmit = async (data: ProfileData) => {
    try {
      await updateProfile(data).unwrap();
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Account Settings
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("name", { required: "Name is required" })}
                  defaultValue={profile?.name}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.name.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^\S+@\S+$/i,
                  })}
                  defaultValue={profile?.email}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={updateLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {updateLoading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
