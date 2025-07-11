// Car CRUD Functions for Admin Operations
// These functions manage car data in localStorage

export interface Car {
  id: number;
  plate: string;
  model: string;
  year: number;
  color?: string;
  fuelType?: string;
  transmission?: string;
  mileage?: number;
  status?: "available" | "assigned" | "maintenance" | "out-of-service";
  assignedTo?: string;
  notes?: string;
}

// Get all cars from localStorage
export const getAllCars = (): Car[] => {
  try {
    const carsData = localStorage.getItem("cars");
    return carsData ? JSON.parse(carsData) : [];
  } catch (error) {
    console.error("Error getting cars from localStorage:", error);
    return [];
  }
};

// Save cars array to localStorage
export const saveCarsToStorage = (cars: Car[]): void => {
  try {
    localStorage.setItem("cars", JSON.stringify(cars));
    // Dispatch custom event to notify CarList to reload
    window.dispatchEvent(new CustomEvent("carsUpdated"));
  } catch (error) {
    console.error("Error saving cars to localStorage:", error);
  }
};

// Add a new car
export const addCar = (carData: Omit<Car, "id">): Car => {
  const cars = getAllCars();

  // Generate new ID (highest existing ID + 1)
  const newId =
    cars.length > 0 ? Math.max(...cars.map((car) => car.id)) + 1 : 1;

  const newCar: Car = {
    id: newId,
    status: "available",
    ...carData,
  };

  cars.push(newCar);
  saveCarsToStorage(cars);

  return newCar;
};

// Update an existing car
export const updateCar = (
  carId: number,
  updateData: Partial<Omit<Car, "id">>,
): Car | null => {
  const cars = getAllCars();
  const carIndex = cars.findIndex((car) => car.id === carId);

  if (carIndex === -1) {
    console.error(`Car with ID ${carId} not found`);
    return null;
  }

  // Update the car with new data
  cars[carIndex] = { ...cars[carIndex], ...updateData };
  saveCarsToStorage(cars);

  return cars[carIndex];
};

// Delete a car
export const deleteCar = (carId: number): boolean => {
  const cars = getAllCars();
  const carIndex = cars.findIndex((car) => car.id === carId);

  if (carIndex === -1) {
    console.error(`Car with ID ${carId} not found`);
    return false;
  }

  // Remove the car from array
  cars.splice(carIndex, 1);
  saveCarsToStorage(cars);

  return true;
};

// Get a single car by ID
export const getCarById = (carId: number): Car | null => {
  const cars = getAllCars();
  return cars.find((car) => car.id === carId) || null;
};

// Search cars by criteria
export const searchCars = (criteria: {
  plate?: string;
  model?: string;
  year?: number;
  status?: Car["status"];
}): Car[] => {
  const cars = getAllCars();

  return cars.filter((car) => {
    const matchesPlate =
      !criteria.plate ||
      car.plate.toLowerCase().includes(criteria.plate.toLowerCase());
    const matchesModel =
      !criteria.model ||
      car.model.toLowerCase().includes(criteria.model.toLowerCase());
    const matchesYear = !criteria.year || car.year === criteria.year;
    const matchesStatus = !criteria.status || car.status === criteria.status;

    return matchesPlate && matchesModel && matchesYear && matchesStatus;
  });
};

// Get cars by status
export const getCarsByStatus = (status: Car["status"]): Car[] => {
  return getAllCars().filter((car) => car.status === status);
};

// Assign car to user
export const assignCarToUser = (carId: number, userEmail: string): boolean => {
  const updatedCar = updateCar(carId, {
    status: "assigned",
    assignedTo: userEmail,
  });

  return updatedCar !== null;
};

// Unassign car from user
export const unassignCar = (carId: number): boolean => {
  const updatedCar = updateCar(carId, {
    status: "available",
    assignedTo: undefined,
  });

  return updatedCar !== null;
};
