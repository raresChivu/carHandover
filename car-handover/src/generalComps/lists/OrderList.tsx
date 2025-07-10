import React, { useEffect, useState } from "react";

interface Order {
  id: string;
  carPlate: string;
  carId: number;
  carModel?: string;
  carYear?: string;
  carStatus?: string;
  status: string;
  date: string;
  description?: string;
  km?: number;
  fuelLevel?: number;
  condition?: string;
  signature?: string;
  donorEmail?: string;
  recipientEmail?: string;
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);

  // Expose a reload function for parent to call
  const reloadOrders = () => {
    let currentUser = null;
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("currentUser");
      if (userStr) {
        try {
          currentUser = JSON.parse(userStr);
        } catch {}
      }
    }
    if (currentUser) {
      const usersRaw = localStorage.getItem("registeredUsers");
      if (usersRaw) {
        try {
          const users = JSON.parse(usersRaw);
          const user = users.find((u: any) => u.email === currentUser.email);
          const orders = Array.isArray(user?.orders) ? user.orders : [];
          setOrders(orders);
        } catch {}
      }
    }
  };

  useEffect(() => {
    reloadOrders();
    // Listen for custom event to reload orders
    const handler = () => reloadOrders();
    window.addEventListener("orderListShouldReload", handler);
    return () => window.removeEventListener("orderListShouldReload", handler);
  }, []);

  if (!orders.length) {
    return (
      <div className="text-center text-gray-500 mt-8">No car orders found.</div>
    );
  }

  // Helper to send order email
  const sendOrderEmail = async (order: Order) => {
    // Get current user from localStorage
    let currentUserEmail = "";
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("currentUser");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          currentUserEmail = user.email;
        } catch {}
      }
    }
    // Send to the donor/owner/admin (not the current user)
    const toEmail = order.donorEmail || "";
    if (!toEmail) {
      alert("No donor/owner email found for this order.");
      return;
    }
    try {
      const res = await fetch("/api/sendOrderEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order, toEmail, fromEmail: currentUserEmail }),
      });
      if (res.ok) {
        alert("Order email sent successfully!");
      } else {
        alert("Failed to send order email.");
      }
    } catch (err) {
      alert("Error sending order email.");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow p-6 mt-8 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">My Car Orders</h2>
      <table className="min-w-full table-auto border-collapse whitespace-nowrap text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-1 border text-black font-semibold">Car</th>
            <th className="px-2 py-1 border text-black font-semibold">Model</th>
            <th className="px-2 py-1 border text-black font-semibold">Year</th>
            <th className="px-2 py-1 border text-black font-semibold">
              Status
            </th>
            <th className="px-2 py-1 border text-black font-semibold">
              Order Date
            </th>
            <th className="px-2 py-1 border text-black font-semibold">KM</th>
            <th className="px-2 py-1 border text-black font-semibold">Fuel</th>
            <th className="px-2 py-1 border text-black font-semibold">
              Condition
            </th>
            <th className="px-2 py-1 border text-black font-semibold">
              Description
            </th>
            <th className="px-2 py-1 border text-black font-semibold">Send</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-2 py-1 border text-black truncate max-w-[120px]">
                {order.carPlate}
              </td>
              <td className="px-2 py-1 border text-black truncate max-w-[120px]">
                {order.carModel || "-"}
              </td>
              <td className="px-2 py-1 border text-black truncate max-w-[80px]">
                {order.carYear || "-"}
              </td>
              <td
                className={`px-2 py-1 border font-semibold truncate max-w-[100px] ${order.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}
              >
                {order.status}
              </td>
              <td className="px-2 py-1 border text-black truncate max-w-[160px]">
                {new Date(order.date).toLocaleString()}
              </td>
              <td className="px-2 py-1 border text-black truncate max-w-[80px]">
                {order.km ?? "-"}
              </td>
              <td className="px-2 py-1 border text-black truncate max-w-[80px]">
                {order.fuelLevel ?? "-"}
              </td>
              <td className="px-2 py-1 border text-black truncate max-w-[120px]">
                {order.condition || "-"}
              </td>
              <td className="px-2 py-1 border text-black truncate max-w-[200px]">
                {order.description || "-"}
              </td>
              <td className="px-2 py-1 border text-black text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded"
                  onClick={() => sendOrderEmail(order)}
                  title="Send order as email attachment"
                >
                  Send
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
