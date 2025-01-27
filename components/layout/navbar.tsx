"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/images/Logo.png";
import Image from "next/image";

const links = [
  { href: "/topup", label: "Top Up" },
  { href: "/transaction", label: "Transaction" },
  { href: "/account", label: "Akun" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow border-b">
      <div className="page-padding">
        <div className="flex justify-between h-16 w-full">
          <Link
            href="/"
            className="flex gap-2 items-center text-gray-800 hover:text-gray-700 focus:outline-none "
          >
            <Image src={Logo} alt={"Logo"} width={20} height={20} />
            <span>
              <b>SIMS PPOB</b>-Septian
            </span>
          </Link>
          <ul className="flex gap-8 items-center">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`inline-flex items-center text-gray-800 hover:text-black focus:outline-none  ${
                      isActive
                        ? "text-red-500 hover:text-red-600 font-semibold"
                        : ""
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
