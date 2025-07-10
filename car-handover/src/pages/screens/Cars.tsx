import React, { useState, useEffect } from "react";
import CarList from "../../generalComps/lists/CarList";
import Loading from "../../generalComps/Loading";

export default function Cars() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-12">
      <CarList />
    </div>
  );
}
