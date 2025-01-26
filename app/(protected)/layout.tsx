import { ReactNode } from "react";
import NavBar from "@/components/layout/navbar";
import Welcome from "@/components/layout/welcome";
import Balance from "@/components/layout/balance";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <div className="flex w-full justify-between gap-4 py-6 page-padding">
        <Welcome />
        <Balance />
      </div>
      <main>{children}</main>
    </>
  );
}
