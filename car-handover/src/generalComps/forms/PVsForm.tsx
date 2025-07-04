import { useState } from "react";
import { usePVsFormState } from "./formStates/PVsFormState";

export function PVSForm() {
  const {
    carId,
    setCarId,
    date,
    setDate,
    km,
    setKm,
    description,
    setDescription,
    signature,
    setSignature,
    signatureType,
    setSignatureType,
    donorEmail,
    setDonorEmail,
    recipientEmail,
    setRecipientEmail,
    fuelLevel,
    setFuelLevel,
    condition,
    setCondition,
    photos,
    setPhotos,
  } = usePVsFormState();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      carId,
      date,
      km,
      description,
      signature,
      signatureType,
      donorEmail,
      recipientEmail,
      fuelLevel,
      condition,
      photos,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Car ID:</label>
        <input
          type="number"
          value={carId ?? ""}
          onChange={(e) => setCarId(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
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
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Signature:</label>
        <input
          type="text"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Signature Type:</label>
        <select
          value={signatureType}
          onChange={(e) =>
            setSignatureType(e.target.value as "donor" | "recipient")
          }
        >
          <option value="donor">Donor</option>
          <option value="recipient">Recipient</option>
        </select>
      </div>
      <div>
        <label>Donor Email:</label>
        <input
          type="email"
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Recipient Email:</label>
        <input
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Fuel Level:</label>
        <input
          type="number"
          value={fuelLevel}
          onChange={(e) => setFuelLevel(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Condition:</label>
        <textarea
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          required
        />
      </div>
    </form>
  );
}
