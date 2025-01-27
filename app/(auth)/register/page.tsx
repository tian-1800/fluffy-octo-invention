"use client";

import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/lib/redux/services/member-api";
import { useRouter } from "next/navigation";
import { FiLock, FiUser } from "react-icons/fi";
import LoginFooter from "@/components/footer/login";
import Logo from "@/assets/images/Logo.png";
import Image from "next/image";
import { useState } from "react";
import { RegistrationPayload } from "@/lib/redux/utils/types";
import VisibilityButton from "@/components/ui/visibility-button";
import { FaAt } from "react-icons/fa6";
import InputErrorMessage from "@/components/ui/input-error-message";
import { setError } from "@/lib/redux/features/errorSlice";
import { useDispatch } from "react-redux";

type FormData = RegistrationPayload & {
  confirmPassword: string;
};

export default function RegisterPage() {
  const dispatch = useDispatch();

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
      if (typeof err === "string") {
        dispatch(setError({ error_mesage: err }));
      }
    }
  };

  const inputStyle = (hasError: boolean) =>
    `appearance-none block w-full pl-10 px-3 py-2 border ${
      hasError ? "border-red-500" : "border-gray-300"
    } rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`;

  return (
    <div className="flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="flex gap-2 items-center justify-center mt-6 text-center text-xl font-semibold text-gray-900">
          <Image src={Logo} alt={"Logo"} width={28} height={28} />
          SIMS PPOB
        </h2>
        <p className="px-2 mt-6 text-center text-3xl font-semibold text-gray-900">
          Lengkapi Data Untuk Membuat Akun
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md py-8 px-4 sm:px-10">
        <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-sm relative">
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaAt className="h-4 w-4 text-gray-400" />
              </div>
              <input
                {...register("email", {
                  required: "Mohon masukkan email",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Format email tidak valid",
                  },
                })}
                className={inputStyle(!!errors.email)}
                placeholder="masukkan email anda"
              />
            </div>
            <InputErrorMessage message={errors.email?.message} />
          </div>

          <div className="text-sm relative">
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-4 w-4 text-gray-400" />
              </div>
              <input
                {...register("first_name", {
                  required: "Mohon masukkan nama depan",
                })}
                className={inputStyle(!!errors.first_name)}
                placeholder="nama depan"
              />
            </div>
            <InputErrorMessage message={errors.first_name?.message} />
          </div>

          <div className="text-sm relative">
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-4 w-4 text-gray-400" />
              </div>
              <input
                {...register("last_name", {
                  required: "Mohon masukkan nama belakang",
                })}
                className={inputStyle(!!errors.last_name)}
                placeholder="nama belakang"
              />
            </div>
            <InputErrorMessage message={errors.last_name?.message} />
          </div>

          <div className="text-sm relative">
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Mohon masukkan password",
                  minLength: {
                    value: 8,
                    message: "Password minimal 8 karakter",
                  },
                })}
                className={inputStyle(!!errors.password)}
                placeholder="buat passwords"
              />
              <VisibilityButton
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                showSecret={showPassword}
                setShowSecret={setShowPassword}
              />
            </div>
            <InputErrorMessage message={errors.password?.message} />
          </div>

          <div className="text-sm relative">
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
                className={inputStyle(!!errors.confirmPassword)}
                placeholder="konfirmasi password"
              />
              <VisibilityButton
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                showSecret={showConfirmPassword}
                setShowSecret={setShowConfirmPassword}
              />
            </div>
            <InputErrorMessage message={errors.confirmPassword?.message} />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-center py-2 px-4 border border-transparent rounded-md text-sm text-white bg-red-500 disabled:opacity-50"
            >
              Registrasi
            </button>
          </div>
        </form>
        <LoginFooter type="register" />
      </div>
    </div>
  );
}
