import React, { useState } from "react";
import { useRouter } from "next/router";
import NotificationsList from "../lists/NotificationsList";

export default function AccountOptions() {
  const router = useRouter();
  // Notification counter logic
  const [unreadCount, setUnreadCount] = useState(0);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("currentUser");
      const usersRaw = localStorage.getItem("registeredUsers");
      if (userStr && usersRaw) {
        try {
          const currentUser = JSON.parse(userStr);
          const users = JSON.parse(usersRaw);
          const user = users.find((u: any) => u.email === currentUser.email);
          const notifications = user?.notifications || [];
          setUnreadCount(
            notifications.filter((n: any) => n.read === false).length,
          );
        } catch {}
      }
    }
  }, []);

  const accountOptions = [
    { label: "Profile", action: () => router.push("/screens/Profile") },
    {
      label: "Change Password",
      action: () => router.push("/screens/ChangePassword"),
    },
    {
      label: "Notifications",
      action: () => router.push("/screens/Notifications"),
      showCounter: true,
    },
    {
      label: "Privacy Settings",
      action: () => router.push("/screens/PrivacySettings"),
    },
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
          <li key={option.label} className="relative">
            <button
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-100 text-black font-medium transition-colors flex items-center"
              onClick={option.action}
            >
              {option.label}
              {option.showCounter && unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
