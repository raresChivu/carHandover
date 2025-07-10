import React, { useState, useEffect } from "react";
import OrderList from "../../generalComps/lists/OrderList";
import Loading from "../../generalComps/Loading";

export default function Orders() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-12">
      <OrderList />
    </div>
  );
}
