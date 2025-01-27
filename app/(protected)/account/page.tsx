"use client";

import Image from "next/image";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadProfileImageMutation,
} from "@/lib/redux/services/member-api";
import { ProfileData } from "@/lib/redux/utils/types";
import { useForm } from "react-hook-form";

import { FiMail, FiUser } from "react-icons/fi";
import { useState } from "react";
import { logout } from "@/lib/redux/features/authSlice";
import { useDispatch } from "react-redux";
import SuccessAlert from "@/components/account/success-alert";

export default function AccountPage() {
  const dispatch = useDispatch();

  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateProfileMutation();
  const [uploadProfileImage, { isLoading: isUploadingImage }] =
    useUploadProfileImageMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>();

  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const onSubmit = async (data: ProfileData) => {
    try {
      await updateProfile(data).unwrap();
      setIsEditing(false);
      setShowSuccessAlert(true);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        await uploadProfileImage(formData).unwrap();
      } catch (err) {
        console.error("Failed to upload image:", err);
      }
    }
  };

  const onLogout = () => dispatch(logout());

  if (profileLoading || !profile) {
    return (
      <div className="bg-gray-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg p-6">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-indigo-100 text-sm p-3 rounded-full w-32 h-32 mb-6 flex items-center justify-center relative overflow-hidden">
              <Image
                src={profile.profile_image}
                alt="Profile Image"
                fill
                className="object-cover rounded-full"
              />
              <input
                type="file"
                accept="image/*"
                disabled={isUploadingImage}
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {profile.name}
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("email", {
                    required: "Mohon isi email",
                    pattern: /^\S+@\S+$/i,
                  })}
                  defaultValue={profile.email}
                  disabled={!isEditing}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700"
              >
                Nama Depan
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("first_name", {
                    required: "Mohon masukkan name depan",
                  })}
                  disabled={!isEditing}
                  defaultValue={profile.first_name}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {errors.first_name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-gray-700"
              >
                Nama Belakang
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("last_name", {
                    required: "Mohon masukkan name belakang",
                  })}
                  disabled={!isEditing}
                  defaultValue={profile.last_name}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {errors.last_name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.last_name.message}
                </p>
              )}
            </div>
            {isEditing && (
              <button
                type="submit"
                disabled={updateLoading}
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-red-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Simpan
              </button>
            )}
          </form>
          {!isEditing && (
            <div className="flex flex-col gap-8 mt-8">
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={false}
                onClick={() => setIsEditing(true)}
              >
                Edit Profil
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="w-full flex justify-center py-2 px-4 border border-red-500 rounded-md shadow-sm text-sm text-red-500 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          )}
          {showSuccessAlert && (
            <SuccessAlert onClose={() => setShowSuccessAlert(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
