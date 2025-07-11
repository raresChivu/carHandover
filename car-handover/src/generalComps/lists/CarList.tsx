import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Modal from "../Modal";
import { PVSForm } from "../forms/PVsForm";
import { CarForm } from "../forms/CarForm";
import {
  getAllCars,
  deleteCar,
  type Car as CRUDCar,
} from "../../CRUD_ops/carCRUD/CarCRUDFunctions";

// Legacy Car type for compatibility with existing PVS system
type LegacyCar = {
  id: number;
  plate: string;
  model: string;
  year: number;
  owner: string;
  status: string;
  km: number;
  pvs: any[];
};

// Convert CRUD Car to Legacy Car format
const convertToLegacyCar = (car: CRUDCar): LegacyCar => ({
  id: car.id,
  plate: car.plate,
  model: car.model,
  year: car.year,
  owner: car.assignedTo || "Unassigned",
  status: car.status || "available",
  km: car.mileage || 0,
  pvs: [],
});

export default function CarList() {
  const [cars, setCars] = useState<CRUDCar[]>([]);
  const [selectedCar, setSelectedCar] = useState<LegacyCar | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestModal, setIsRequestModal] = useState(false);
  const [isCarFormModal, setIsCarFormModal] = useState(false);
  const [carToEdit, setCarToEdit] = useState<CRUDCar | null>(null);
  const [hasPreviewed, setHasPreviewed] = useState(false);
  const router = useRouter();

  // Load cars from CRUD functions
  const loadCars = () => {
    const carsData = getAllCars();
    setCars(carsData);
  };

  // Load cars on component mount and when cars are updated
  useEffect(() => {
    loadCars();

    // Listen for car updates
    const handleCarsUpdated = () => {
      loadCars();
    };

    window.addEventListener("carsUpdated", handleCarsUpdated);
    return () => window.removeEventListener("carsUpdated", handleCarsUpdated);
  }, []);

  // Determine user type
  let currentUser = null;
  let isAdmin = false;
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      try {
        currentUser = JSON.parse(userStr);
        isAdmin = !!currentUser.isAdmin;
      } catch {}
    }
  }

  const handleRowClick = (car: CRUDCar) => {
    const legacyCar = convertToLegacyCar(car);
    setSelectedCar(legacyCar);
    setIsModalOpen(true);
    if (isAdmin) {
      setIsRequestModal(false);
    } else {
      setIsRequestModal(false);
      setHasPreviewed(false);
    }
  };

  const handleAddCar = () => {
    setCarToEdit(null);
    setIsCarFormModal(true);
  };

  const handleEditCar = (car: CRUDCar, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click
    setCarToEdit(car);
    setIsCarFormModal(true);
  };

  const handleDeleteCar = async (carId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click

    if (window.confirm("Are you sure you want to delete this car?")) {
      const success = deleteCar(carId);
      if (success) {
        loadCars(); // Refresh the list
      } else {
        alert("Failed to delete car");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCar(null);
    setIsRequestModal(false);
    setHasPreviewed(false);
  };

  const closeCarFormModal = () => {
    setIsCarFormModal(false);
    setCarToEdit(null);
  };

  const handleCarSaved = () => {
    closeCarFormModal();
    loadCars(); // Refresh the list
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-700">Car List</h2>
        {isAdmin && (
          <button
            onClick={handleAddCar}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add New Car
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border text-black">Plate</th>
              <th className="px-4 py-2 border text-black">Model</th>
              <th className="px-4 py-2 border text-black">Year</th>
              <th className="px-4 py-2 border text-black">Status</th>
              <th className="px-4 py-2 border text-black">Assigned To</th>
              <th className="px-4 py-2 border text-black">Mileage (km)</th>
              {isAdmin && (
                <th className="px-4 py-2 border text-black">Actions</th>
              )}
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
                <td className="px-4 py-2 border text-black">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      car.status === "available"
                        ? "bg-green-100 text-green-800"
                        : car.status === "assigned"
                          ? "bg-blue-100 text-blue-800"
                          : car.status === "maintenance"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {car.status}
                  </span>
                </td>
                <td className="px-4 py-2 border text-black">
                  {car.assignedTo || "Unassigned"}
                </td>
                <td className="px-4 py-2 border text-black">
                  {car.mileage || "N/A"}
                </td>
                {isAdmin && (
                  <td className="px-4 py-2 border text-black">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => handleEditCar(car, e)}
                        className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDeleteCar(car.id, e)}
                        className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {cars.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No cars found. {isAdmin && "Click 'Add New Car' to get started."}
        </div>
      )}
      {/* Car Form Modal for Admin */}
      {isCarFormModal && (
        <Modal
          isOpen={isCarFormModal}
          onClose={closeCarFormModal}
          title={carToEdit ? "Edit Car" : "Add New Car"}
        >
          <CarForm
            carToEdit={carToEdit}
            onSave={handleCarSaved}
            onCancel={closeCarFormModal}
          />
        </Modal>
      )}

      {/* Existing Car Details/Request Modal */}
      {isModalOpen && selectedCar && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {/* Admin: show details and assign, Employee: show preview first, then request */}
          {!isAdmin && !isRequestModal && !hasPreviewed ? (
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-black">Car Details</h3>
              <ul className="text-black">
                <li>
                  <strong>Plate:</strong> {selectedCar.plate}
                </li>
                <li>
                  <strong>Model:</strong> {selectedCar.model}
                </li>
                <li>
                  <strong>Year:</strong> {selectedCar.year}
                </li>
                <li>
                  <strong>Owner:</strong> {selectedCar.owner}
                </li>
                <li>
                  <strong>Status:</strong> {selectedCar.status}
                </li>
                <li>
                  <strong>KM:</strong> {selectedCar.km}
                </li>
              </ul>
              <button
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => {
                  setIsRequestModal(true);
                  setHasPreviewed(true);
                }}
              >
                Request this Car
              </button>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          ) : isRequestModal && currentUser ? (
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-black">Request Car</h3>
              <PVSForm
                initialValues={{
                  donorEmail: selectedCar.owner || "",
                  recipientEmail: currentUser.email,
                  carId: selectedCar.id,
                  date: new Date().toISOString().slice(0, 10),
                  km: selectedCar.km || 0,
                  description: `Requesting car ${selectedCar.plate || ""}`,
                  signature: "",
                  signatureType: "recipient",
                  photos: [],
                }}
                onSavePV={(pvData) => {
                  console.log("Car request PV data:", pvData);
                  // Notify order list to reload
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new Event("orderListShouldReload"));
                  }
                  closeModal();
                }}
              />
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-black">Car Details</h3>
              <ul className="text-black">
                <li>
                  <strong>Plate:</strong> {selectedCar.plate}
                </li>
                <li>
                  <strong>Model:</strong> {selectedCar.model}
                </li>
                <li>
                  <strong>Year:</strong> {selectedCar.year}
                </li>
                <li>
                  <strong>Owner:</strong> {selectedCar.owner}
                </li>
                <li>
                  <strong>Status:</strong> {selectedCar.status}
                </li>
                <li>
                  <strong>KM:</strong> {selectedCar.km}
                </li>
              </ul>
              <button
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => {
                  closeModal();
                  router.push("/screens/Employees");
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
          )}
        </Modal>
      )}
    </div>
  );
}
