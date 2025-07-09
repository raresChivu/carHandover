import React from "react";

export default function NotificationElement({ notification }: { notification: any }) {
  return (
    <div className={`border rounded-lg p-4 shadow bg-white flex flex-col gap-2 ${notification.read ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-2">
        <span className={`inline-block w-2 h-2 rounded-full ${notification.read ? 'bg-gray-400' : 'bg-blue-500'}`}></span>
        <span className="font-semibold text-black">{notification.type === 'assign' ? 'Assignment' : 'Request'}</span>
        <span className="ml-auto text-xs text-gray-400">{new Date(notification.date).toLocaleString()}</span>
      </div>
      <div className="text-black text-sm">{notification.message}</div>
      <div className="text-xs text-gray-500">Car: {notification.carPlate || notification.carId}</div>
      <div className="text-xs text-gray-500">From: {notification.from} | To: {notification.to}</div>
    </div>
  );
}
