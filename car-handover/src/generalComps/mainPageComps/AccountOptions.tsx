import React from "react";
import { useRouter } from "next/router";

export default function AccountOptions() {
  const router = useRouter();
  const accountOptions = [
    { label: "Profile", action: () => {} },
    { label: "Change Password", action: () => {} },
    { label: "Notifications", action: () => {} },
    { label: "Privacy Settings", action: () => {} },
    {
      label: "Logout",
      action: () => {
        router.push("/"); // Redirect to initial screen
      },
    },
  ];

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col py-8 px-4 shadow-md">
      <div className="mb-10 text-xl font-bold text-center text-blue-700">
        Account
      </div>
      <ul className="flex flex-col gap-4 flex-1">
        {accountOptions.map((option) => (
          <li key={option.label}>
            <button
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 text-black font-medium transition-colors"
              onClick={option.action}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
