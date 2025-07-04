import { useState } from "react";

export function useCarFormState() {
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState("active");
  const [km, setKm] = useState(0);

  return {
    plate,
    setPlate,
    model,
    setModel,
    year,
    setYear,
    owner,
    setOwner,
    status,
    setStatus,
    km,
    setKm,
  };
}
