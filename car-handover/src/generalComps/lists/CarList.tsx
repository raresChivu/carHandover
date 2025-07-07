import React from "react";
import { cars } from "../../mockery/carMockery/CarMockData";

export default function CarList() {
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
            <tr key={car.id} className="hover:bg-blue-50">
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
    </div>
  );
}
