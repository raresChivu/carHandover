import React, { useState } from "react";
import { useRouter } from "next/router";
import { cars } from "../../mockery/carMockery/CarMockData";
import Modal from "../Modal"; // Make sure this path is correct

type Car = typeof cars[number];

export default function CarList() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  interface HandleRowClick {
    (car: Car): void;
  }

  const handleRowClick: HandleRowClick = (car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Car List</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border text-black">Plate</th>
            <th className="px-4 py-2 border text-black">Model</th>
            <th className="px-4 py-2 border text-black">Year</th>
            <th className="px-4 py-2 border text-black">Owner</th>
            <th className="px-4 py-2 border text-black">Status</th>
            <th className="px-4 py-2 border text-black">KM</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr
              key={car.id}
              className="hover:bg-blue-50 cursor-pointer"
              onClick={() => handleRowClick(car)}
            >
              <td className="px-4 py-2 border text-black">{car.plate}</td>
              <td className="px-4 py-2 border text-black">{car.model}</td>
              <td className="px-4 py-2 border text-black">{car.year}</td>
              <td className="px-4 py-2 border text-black">{car.owner}</td>
              <td className="px-4 py-2 border text-black">{car.status}</td>
              <td className="px-4 py-2 border text-black">{car.km}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedCar && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2 text-black">Car Details</h3>
            <ul className="text-black">
              <li><strong>Plate:</strong> {selectedCar.plate}</li>
              <li><strong>Model:</strong> {selectedCar.model}</li>
              <li><strong>Year:</strong> {selectedCar.year}</li>
              <li><strong>Owner:</strong> {selectedCar.owner}</li>
              <li><strong>Status:</strong> {selectedCar.status}</li>
              <li><strong>KM:</strong> {selectedCar.km}</li>
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => {
                closeModal();
                setTimeout(() => {
                  router.push("/screens/Employees");
                }, 200); // Give modal time to close
              }}
            >
              Go to Employees
            </button>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}