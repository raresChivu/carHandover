import React from "react";
import OrderList from "../../generalComps/lists/OrderList";

export default function Orders() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-12">
      <OrderList />
    </div>
  );
}
