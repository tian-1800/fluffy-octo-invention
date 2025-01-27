import { ReactNode } from "react";
import Image from "next/image";
import LoginIllustration from "@/assets/images/Illustrasi Login.png";
import ErrorSnackbar from "@/components/ui/error-snackbar";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex w-full h-screen">
      <div className="relative w-1/2 flex flex-col justify-center items-center p-4">
        <div className=" w-full h-screen flex justify-center items-center">
          {children}
        </div>
        <div className="w-full px-8">
          <div className="relative w-full">
            <ErrorSnackbar />
          </div>
        </div>
      </div>
      <div className="w-1/2 relative">
        <Image
          src={LoginIllustration}
          alt="Illustration"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    </main>
  );
}
