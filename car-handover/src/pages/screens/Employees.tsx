import React, { useState } from "react";
import { useRouter } from "next/router";
import { users, UserMock } from "../../mockery/usersMockery/UserMockData";
import Modal from "../../generalComps/Modal";
import { PVSForm } from "../../generalComps/forms/PVsForm";
import { cars } from "../../mockery/carMockery/CarMockData";

export default function Employees() {
  const router = useRouter();

  // Modal state for PV assignment
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<UserMock | null>(null);

  // Handler for opening the modal
  const handleAssignClick = (user: UserMock) => {
    setSelectedEmployee(user);
    setAssignModalOpen(true);
  };

  const handleCloseModal = () => {
    setAssignModalOpen(false);
    setSelectedEmployee(null);
  };
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
          <li
            key={idx}
            className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between group relative"
          >
            <div>
              <span className="font-semibold text-black">{user.username}</span>
              <span className="ml-2 text-gray-600">({user.email})</span>
            </div>
            <span
              className={`inline-block mt-2 sm:mt-0 px-3 py-1 rounded-full text-xs font-medium ${user.isAdmin ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
            >
              {user.isAdmin ? 'Admin' : 'Employee'}
            </span>
            {/* Assign button, only for employees, only visible on hover */}
            {!user.isAdmin && (
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-green-600 text-white px-3 py-1 rounded shadow hover:bg-green-700"
                onClick={() => handleAssignClick(user)}
              >
                Assign
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Modal for PV assignment */}
      <Modal isOpen={assignModalOpen} onClose={handleCloseModal} title="Assign Car (PV Form)">
        {selectedEmployee && (
          <PVSForm
            initialValues={{
              donorEmail: (typeof window !== 'undefined' && localStorage.getItem('currentUser'))
                ? (() => { try { return JSON.parse(localStorage.getItem('currentUser') || '').email || ""; } catch { return ""; } })()
                : "",
              recipientEmail: selectedEmployee.email,
              carId: typeof cars[0]?.id === "number" ? cars[0]?.id : undefined,
              date: new Date().toISOString().slice(0, 10),
              km: cars[0]?.km || 0,
              description: `Assigning car ${cars[0]?.plate || ""} to ${selectedEmployee.username}`,
              fuelLevel: 100,
              condition: "Good",
              signature: "",
              signatureType: "donor",
              photos: [],
            }}
          />
        )}
      </Modal>
    </div>
  );
}
