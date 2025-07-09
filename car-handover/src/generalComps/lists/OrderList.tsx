import React, { useEffect, useState } from "react";

interface Order {
  id: string;
  carPlate: string;
  carId: number;
  status: string;
  date: string;
}


export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);

  // Expose a reload function for parent to call
  const reloadOrders = () => {
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
      const usersRaw = localStorage.getItem('registeredUsers');
      if (usersRaw) {
        try {
          const users = JSON.parse(usersRaw);
          const user = users.find((u: any) => u.email === currentUser.email);
          const orders = (user?.notifications || [])
            .filter((n: any) => n.type === 'request')
            .map((n: any) => ({
              id: n.id,
              carPlate: n.carPlate || n.carId,
              carId: n.carId,
              status: n.read ? 'Completed' : 'Pending',
              date: n.date,
            }));
          setOrders(orders);
        } catch {}
      }
    }
  };

  useEffect(() => {
    reloadOrders();
    // Listen for custom event to reload orders
    const handler = () => reloadOrders();
    window.addEventListener('orderListShouldReload', handler);
    return () => window.removeEventListener('orderListShouldReload', handler);
  }, []);

  if (!orders.length) {
    return <div className="text-center text-gray-500 mt-8">No car orders found.</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">My Car Orders</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border text-black">Car</th>
            <th className="px-4 py-2 border text-black">Order Date</th>
            <th className="px-4 py-2 border text-black">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-2 border text-black">{order.carPlate}</td>
              <td className="px-4 py-2 border text-black">{new Date(order.date).toLocaleString()}</td>
              <td className={`px-4 py-2 border font-semibold ${order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
