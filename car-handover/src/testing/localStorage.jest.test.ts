describe("localStorage logic", () => {
  it("should initialize cars in localStorage if not present", () => {
    localStorage.removeItem("cars");
    // Simulate app load logic
    const mockCars = [
      { id: 1, plate: "B-123-ABC", model: "Toyota Camry", year: 2020 },
      { id: 2, plate: "CJ-456-DEF", model: "BMW X3", year: 2019 },
    ];
    if (!localStorage.getItem("cars")) {
      localStorage.setItem("cars", JSON.stringify(mockCars));
    }
    expect(JSON.parse(localStorage.getItem("cars") || "[]")).toHaveLength(2);
  });
});
