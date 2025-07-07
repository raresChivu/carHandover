import React from "react";
import { useRouter } from "next/router";

// You can customize these links as needed
const navLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Cars", path: "/cars" },
  { label: "Orders", path: "/orders" },
  { label: "Reports", path: "/reports" },
  { label: "Settings", path: "/settings" },
];

export default function NavBar() {
  const router = useRouter();
  return (
    <nav className="h-screen w-56 bg-white border-r border-gray-200 flex flex-col py-8 px-4 shadow-md">
      <div className="mb-10 text-2xl font-bold text-center text-blue-700">
        Car Handover
      </div>
      <ul className="flex flex-col gap-4 flex-1">
        {navLinks.map((link) => (
          <li key={link.path}>
            <button
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 text-black font-medium transition-colors"
              onClick={() => router.push(link.path)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
