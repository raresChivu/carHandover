
import React, { useState } from "react";
import { useRouter } from "next/router";
import NotificationsList from "../lists/NotificationsList";

export default function AccountOptions() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const accountOptions = [
    { label: "Profile", action: () => router.push("/screens/Profile") },
    { label: "Change Password", action: () => router.push("/screens/ChangePassword") },
    {
      label: "Notifications",
      action: () => router.push("/screens/Notifications"),
    },
    { label: "Privacy Settings", action: () => router.push("/screens/PrivacySettings") },
    {
      label: "Logout",
      action: () => {
        router.push("/"); // Redirect to initial screen
      },
    },
    {
      label: "Sign Out",
      action: () => {
        localStorage.removeItem("rememberedUser");
        localStorage.removeItem("currentUser");
        router.push("/");
      },
    },
  ];

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col py-8 px-4 shadow-md relative">
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
      {/* Notifications panel removed; handled by router navigation */}
    </aside>
  );
}
