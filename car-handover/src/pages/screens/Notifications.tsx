import React, { useState, useEffect } from "react";
import NotificationsList from "../../generalComps/lists/NotificationsList";
import Loading from "../../generalComps/Loading";

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Notifications</h2>
      <NotificationsList />
    </div>
  );
}
