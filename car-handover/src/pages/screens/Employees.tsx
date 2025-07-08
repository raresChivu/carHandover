import React from "react";
import { useRouter } from "next/router";
import { users, UserMock } from "../../mockery/usersMockery/UserMockData";

export default function Employees() {
  const router = useRouter();
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-700">User List</h2>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => router.back()}
        >
          Back
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {users.map((user, idx) => (
          <li key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-semibold text-black">{user.username}</span>
              <span className="ml-2 text-gray-600">({user.email})</span>
            </div>
            <span className={`inline-block mt-2 sm:mt-0 px-3 py-1 rounded-full text-xs font-medium ${user.isAdmin ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{user.isAdmin ? 'Admin' : 'Employee'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
