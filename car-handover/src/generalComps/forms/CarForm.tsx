import { useState } from "react";
import { useCarFormState } from "./formStates/CarFormState";

export function CarForm() {
  const {
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
  } = useCarFormState();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      plate,
      model,
      year,
      owner,
      status,
      km,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Plate:</label>
        <input
          type="text"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Model:</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Year:</label>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Owner:</label>
        <input
          type="email"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div>
        <label>KM:</label>
        <input
          type="number"
          value={km}
          onChange={(e) => setKm(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
