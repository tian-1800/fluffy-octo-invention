"use client";

import Link from "next/link";

const LoginFooter = ({ type }: { type: "login" | "register" }) => {
  return (
    <div className="mt-6 justify-center text-sm flex gap-1 w-full">
      <span className="bg-white text-gray-500">
        {type === "login"
          ? "belum punya akun? daftar"
          : "sudah punya akun? login"}
      </span>
      <span>
        <Link
          href={type === "login" ? "/register" : "/login"}
          className="border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          di sini
        </Link>
      </span>
    </div>
  );
};

export default LoginFooter;
