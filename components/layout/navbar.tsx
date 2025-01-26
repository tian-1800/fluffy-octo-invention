import Link from "next/link";
import { FiHome, FiUser } from "react-icons/fi";

export default function NavBar() {
  return (
    <nav className="bg-white shadow border-b">
      <div className="max-w-7xl page-padding">
        <div className="flex justify-between h-16">
          <div className="flex gap-2">
            <Link
              href="/"
              className="inline-flex items-center py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FiHome className="h-5 w-5 mr-2" />
              Home
            </Link>
            <Link
              href="/account"
              className="inline-flex items-center py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FiUser className="h-5 w-5 mr-2" />
              Account
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
