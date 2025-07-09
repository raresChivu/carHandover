import React from "react";
import NotificationsList from "../../generalComps/lists/NotificationsList";

export default function Notifications() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Notifications</h2>
      <NotificationsList />
    </div>
  );
}
