import { useState } from "react";
import type { Car } from "../../../CRUD_ops/carCRUD/CarCRUDFunctions";

export function useCarFormState() {
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [mileage, setMileage] = useState("");
  const [status, setStatus] = useState<Car["status"]>("available");
  const [assignedTo, setAssignedTo] = useState("");
  const [notes, setNotes] = useState("");

  // Reset form to empty state
  const resetForm = () => {
    setPlate("");
    setModel("");
    setYear("");
    setColor("");
    setFuelType("");
    setTransmission("");
    setMileage("");
    setStatus("available");
    setAssignedTo("");
    setNotes("");
  };

  // Populate form with existing car data
  const populateForm = (car: Car) => {
    setPlate(car.plate || "");
    setModel(car.model || "");
    setYear(car.year?.toString() || "");
    setColor(car.color || "");
    setFuelType(car.fuelType || "");
    setTransmission(car.transmission || "");
    setMileage(car.mileage?.toString() || "");
    setStatus(car.status || "available");
    setAssignedTo(car.assignedTo || "");
    setNotes(car.notes || "");
  };

  // Get form data as Car object (without id)
  const getFormData = (): Omit<Car, "id"> => ({
    plate,
    model,
    year: parseInt(year) || 0,
    color: color || undefined,
    fuelType: fuelType || undefined,
    transmission: transmission || undefined,
    mileage: mileage ? parseInt(mileage) : undefined,
    status,
    assignedTo: assignedTo || undefined,
    notes: notes || undefined,
  });

  return {
    plate,
    setPlate,
    model,
    setModel,
    year,
    setYear,
    color,
    setColor,
    fuelType,
    setFuelType,
    transmission,
    setTransmission,
    mileage,
    setMileage,
    status,
    setStatus,
    assignedTo,
    setAssignedTo,
    notes,
    setNotes,
    resetForm,
    populateForm,
    getFormData,
  };
}
