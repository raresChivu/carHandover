import { useState } from "react";

export const [cars, setCars] = useState([
  {
    id: 1,
    plate: "B-123-ABC",
    model: "Toyota Camry",
    year: 2020,
    owner: "john.doe@company.com",
    status: "active",
    km: 45000,
    pvs: [],
  },
  {
    id: 2,
    plate: "CJ-456-DEF",
    model: "BMW X3",
    year: 2019,
    owner: "jane.smith@company.com",
    status: "active",
    km: 32000,
    pvs: [],
  },
]);
