"use client";

import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/lib/redux/services/member-api";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiUser, FiEyeOff, FiEye } from "react-icons/fi";
import LoginFooter from "@/components/footer/login";
import { useState } from "react";
import { RegistrationPayload } from "@/lib/redux/utils/types";

type FormData = RegistrationPayload & {
  confirmPassword: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch("password");

  const onSubmit = async (data: RegistrationPayload) => {
    try {
      await registerUser(data).unwrap();
      router.push("/login");
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="px-2 mt-6 text-center text-3xl font-semibold text-gray-900">
          Lengkapi Data Untuk Membuat Akun
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-sm">
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  {...register("email", {
                    required: "Mohon masukkan email",
                    pattern: /^\S+@\S+$/i,
                  })}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="masukkan email anda"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="text-sm">
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  {...register("first_name", {
                    required: "Mohon masukkan nama depan",
                  })}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="nama depan"
                />
              </div>
              {errors.first_name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="text-sm">
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  {...register("last_name", {
                    required: "Mohon masukkan nama belakang",
                  })}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="nama belakang"
                />
              </div>
              {errors.last_name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            <div className="text-sm">
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Mohon masukkan password",
                    minLength: 6,
                  })}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="buat password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <FiEye className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="text-sm">
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Mohon konfirmasi password",
                    validate: (value) =>
                      value === password || "password tidak sama",
                  })}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="konfirmasi password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <FiEye className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                Registrasi
              </button>
            </div>
          </form>

          <LoginFooter type="register" />
        </div>
      </div>
    </div>
  );
}
