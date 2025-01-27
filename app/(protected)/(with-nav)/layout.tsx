import { ReactNode } from "react";
import Welcome from "@/components/layout/welcome";
import Balance from "@/components/layout/balance";

export default function NavLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex w-full justify-between gap-4 py-6 page-padding mb-12">
        <Welcome />
        <Balance />
      </div>
      <>{children}</>
    </>
  );
}
