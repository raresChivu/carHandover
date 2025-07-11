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
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-black">
                Car Details
              </h3>

              {/* Car Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Basic Information
                  </h4>
                  <div className="space-y-2 text-black">
                    <div className="flex justify-between">
                      <span className="font-medium">Plate:</span>
                      <span>{selectedCar.plate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Model:</span>
                      <span>{selectedCar.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Year:</span>
                      <span>{selectedCar.year}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Availability
                  </h4>
                  <div className="space-y-2 text-black">
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          selectedCar.status === "available"
                            ? "bg-green-100 text-green-800"
                            : selectedCar.status === "assigned"
                              ? "bg-blue-100 text-blue-800"
                              : selectedCar.status === "maintenance"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedCar.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Owner:</span>
                      <span>{selectedCar.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Mileage:</span>
                      <span>{selectedCar.km} km</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  onClick={() => {
                    setIsRequestModal(true);
                    setHasPreviewed(true);
                  }}
                >
                  Request this Car
                </button>
                <button
                  className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          ) : isRequestModal && currentUser ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-black">Request Car</h3>
                <p className="text-gray-600 mt-2">
                  Fill out the form below to request {selectedCar.plate} -{" "}
                  {selectedCar.model}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-800 font-medium">Car:</span>
                  <span className="text-blue-900">
                    {selectedCar.plate} - {selectedCar.model}
                  </span>
                </div>
              </div>

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

              <div className="border-t pt-4">
                <button
                  className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  onClick={closeModal}
                >
                  Cancel Request
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-black">
                Car Management
              </h3>

              {/* Car Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Basic Information
                  </h4>
                  <div className="space-y-2 text-black">
                    <div className="flex justify-between">
                      <span className="font-medium">Plate:</span>
                      <span>{selectedCar.plate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Model:</span>
                      <span>{selectedCar.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Year:</span>
                      <span>{selectedCar.year}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Status & Assignment
                  </h4>
                  <div className="space-y-2 text-black">
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          selectedCar.status === "available"
                            ? "bg-green-100 text-green-800"
                            : selectedCar.status === "assigned"
                              ? "bg-blue-100 text-blue-800"
                              : selectedCar.status === "maintenance"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedCar.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Owner:</span>
                      <span>{selectedCar.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Mileage:</span>
                      <span>{selectedCar.km} km</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  onClick={() => {
                    closeModal();
                    router.push("/screens/Employees");
                  }}
                >
                  Manage Employees
                </button>
                <button
                  className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
