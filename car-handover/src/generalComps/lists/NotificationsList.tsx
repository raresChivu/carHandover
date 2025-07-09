import React, { useEffect, useState } from "react";
import NotificationElement from "../NotificationElement";

export default function NotificationsList() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Get current user
    let currentUser = null;
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('currentUser');
      if (userStr) {
        try {
          currentUser = JSON.parse(userStr);
        } catch {}
      }
    }
    if (currentUser) {
      // Get all users and find notifications for current user
      const usersRaw = localStorage.getItem('registeredUsers');
      if (usersRaw) {
        try {
          const users = JSON.parse(usersRaw);
          const user = users.find((u: any) => u.email === currentUser.email);
          setNotifications(user?.notifications || []);
        } catch {}
      }
    }
  }, []);

  if (!notifications.length) {
    return <div className="text-center text-gray-500 mt-8">No notifications.</div>;
  }

  return (
    <div className="space-y-4 mt-4">
      {notifications.slice().reverse().map((notif) => (
        <NotificationElement key={notif.id} notification={notif} />
      ))}
    </div>
  );
}
