describe("localStorage logic", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize cars in localStorage if not present", () => {
    // Simulate app load logic
    const mockCars = [
      { id: 1, plate: "B-123-ABC", model: "Toyota Camry", year: 2020 },
      { id: 2, plate: "CJ-456-DEF", model: "BMW X3", year: 2019 },
    ];
    expect(localStorage.getItem("cars")).toBeNull();
    if (!localStorage.getItem("cars")) {
      localStorage.setItem("cars", JSON.stringify(mockCars));
    }
    const cars = JSON.parse(localStorage.getItem("cars") || "[]");
    expect(Array.isArray(cars)).toBe(true);
    expect(cars).toHaveLength(2);
    expect(cars[0].plate).toBe("B-123-ABC");
  });

  it("should not overwrite cars if already present", () => {
    const existing = [
      { id: 99, plate: "TEST-PLATE", model: "Test", year: 2025 },
    ];
    localStorage.setItem("cars", JSON.stringify(existing));
    // Simulate app load logic
    const mockCars = [
      { id: 1, plate: "B-123-ABC", model: "Toyota Camry", year: 2020 },
      { id: 2, plate: "CJ-456-DEF", model: "BMW X3", year: 2019 },
    ];
    if (!localStorage.getItem("cars")) {
      localStorage.setItem("cars", JSON.stringify(mockCars));
    }
    const cars = JSON.parse(localStorage.getItem("cars") || "[]");
    expect(cars).toHaveLength(1);
    expect(cars[0].plate).toBe("TEST-PLATE");
  });
});
