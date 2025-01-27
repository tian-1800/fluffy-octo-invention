"use client";

import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/lib/redux/services/member-api";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { FiLock } from "react-icons/fi";
import LoginFooter from "@/components/footer/login";
import { useState } from "react";
import { LoginPayload } from "@/lib/redux/utils/types";
import VisibilityButton from "@/components/ui/visibility-button";
import Logo from "@/assets/images/Logo.png";
import Image from "next/image";
import { FaAt } from "react-icons/fa6";
import InputErrorMessage from "@/components/ui/input-error-message";
import { setError } from "@/lib/redux/features/errorSlice";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginPayload) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials({ token: result }));
      router.push("/");
    } catch (err) {
      console.error("Failed to login:", err);
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
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="px-12 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="flex gap-2 items-center justify-center mt-6 text-center text-xl font-semibold text-gray-900">
          <Image src={Logo} alt={"Logo"} width={28} height={28} />
          SIMS PPOB
        </h2>
        <p className="mt-6 text-center text-2xl font-semibold text-gray-900">
          Masuk atau buat akun untuk memulai
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-sm relative">
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaAt className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  {...register("email", {
                    required: "Mohon masukkan email",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Format email tidak valid",
                    },
                  })}
                  className={inputStyle(!!errors.email?.message)}
                  placeholder="masukkan email anda"
                />
              </div>
              <InputErrorMessage message={errors.email?.message} />
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
                  })}
                  className={inputStyle(!!errors.password?.message)}
                  placeholder="masukkan password anda"
                />
                <VisibilityButton
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  showSecret={showPassword}
                  setShowSecret={setShowPassword}
                />
              </div>
              <InputErrorMessage message={errors.password?.message} />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-center py-2 px-4 border border-transparent rounded-md text-sm text-white bg-red-500 disabled:opacity-50"
              >
                Masuk
              </button>
            </div>
          </form>
          <LoginFooter type="login" />
        </div>
      </div>
    </div>
  );
}
