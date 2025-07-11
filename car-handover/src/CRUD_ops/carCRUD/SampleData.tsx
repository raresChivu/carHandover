// Sample car data for testing the CRUD functionality
import { addCar, getAllCars } from "./CarCRUDFunctions";

export const seedSampleCars = () => {
  // Check if cars already exist
  const existingCars = getAllCars();
  if (existingCars.length > 0) {
    console.log("Cars already exist in localStorage, skipping seed");
    return;
  }

  // Sample car data
  const sampleCars = [
    {
      plate: "ABC-123",
      model: "Toyota Camry",
      year: 2022,
      color: "Silver",
      fuelType: "Gasoline",
      transmission: "Automatic",
      mileage: 15000,
      status: "available" as const,
      notes: "Well maintained, recently serviced",
    },
    {
      plate: "XYZ-789",
      model: "Honda Civic",
      year: 2021,
      color: "Blue",
      fuelType: "Gasoline",
      transmission: "Manual",
      mileage: 22000,
      status: "assigned" as const,
      assignedTo: "john.doe@company.com",
      notes: "Assigned to sales team",
    },
    {
      plate: "DEF-456",
      model: "Tesla Model 3",
      year: 2023,
      color: "White",
      fuelType: "Electric",
      transmission: "Automatic",
      mileage: 8000,
      status: "maintenance" as const,
      notes: "Battery maintenance scheduled",
    },
    {
      plate: "GHI-111",
      model: "Ford Focus",
      year: 2020,
      color: "Red",
      fuelType: "Gasoline",
      transmission: "Manual",
      mileage: 35000,
      status: "available" as const,
      notes: "Good condition, fuel efficient",
    },
    {
      plate: "JKL-222",
      model: "BMW 3 Series",
      year: 2022,
      color: "Black",
      fuelType: "Diesel",
      transmission: "Automatic",
      mileage: 18000,
      status: "out-of-service" as const,
      notes: "Engine issues, awaiting parts",
    },
  ];

  // Add each sample car
  sampleCars.forEach((carData) => {
    try {
      addCar(carData);
      console.log(`Added sample car: ${carData.plate} - ${carData.model}`);
    } catch (error) {
      console.error(`Error adding sample car ${carData.plate}:`, error);
    }
  });

  console.log("Sample car data seeded successfully!");
};

// Function to clear all cars (useful for testing)
export const clearAllCars = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cars");
    window.dispatchEvent(new CustomEvent("carsUpdated"));
    console.log("All cars cleared from localStorage");
  }
};
