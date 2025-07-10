import React, { useState, useEffect } from "react";
import Loading from "../../generalComps/Loading";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Profile</h1>
      <p className="text-lg text-gray-600">
        This is the Profile screen. Content coming soon.
      </p>
    </div>
  );
}
