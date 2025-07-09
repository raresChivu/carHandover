import { useState, useEffect } from "react";
import Signature from "../Signature";
import { usePVsFormState } from "./formStates/PVsFormState";

export function PVSForm({ initialValues, onSavePV }: { initialValues?: Partial<ReturnType<typeof usePVsFormState>>, onSavePV?: (pvData: any) => void }) {
  const state = usePVsFormState();
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
  } = state;

  useEffect(() => {
    // Set donorEmail to logged in user if not provided
    let loggedInUserEmail = null;
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      if (user) {
        try {
          const parsed = JSON.parse(user);
          loggedInUserEmail = parsed.email;
        } catch {}
      }
    }
    if (initialValues) {
      if (initialValues.carId !== undefined) setCarId(initialValues.carId);
      if (initialValues.date !== undefined) setDate(initialValues.date);
      if (initialValues.km !== undefined) setKm(initialValues.km);
      if (initialValues.description !== undefined) setDescription(initialValues.description);
      if (initialValues.signature !== undefined) setSignature(initialValues.signature);
      if (initialValues.signatureType !== undefined) setSignatureType(initialValues.signatureType);
      if (initialValues.donorEmail !== undefined) {
        setDonorEmail(initialValues.donorEmail);
      } else if (loggedInUserEmail) {
        setDonorEmail(loggedInUserEmail);
      }
      if (initialValues.recipientEmail !== undefined) setRecipientEmail(initialValues.recipientEmail);
      if (initialValues.fuelLevel !== undefined) setFuelLevel(initialValues.fuelLevel);
      if (initialValues.condition !== undefined) setCondition(initialValues.condition);
      if (initialValues.photos !== undefined) setPhotos(initialValues.photos);
    } else if (loggedInUserEmail) {
      setDonorEmail(loggedInUserEmail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

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

  const [showSignature, setShowSignature] = useState(false);

  if (showSignature) {
    return (
      <div className="text-black flex flex-col items-center justify-center">
        <Signature
          onSave={() => {
            const pvData = {
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
            };
            if (onSavePV) {
              onSavePV(pvData);
            } else {
              console.log(pvData);
              alert("PV data logged in console.");
            }
          }}
        />
      </div>
    );
  }

  return (
    <form onSubmit={e => { e.preventDefault(); setShowSignature(true); }} className="text-black space-y-4 bg-white p-6 rounded-lg shadow max-w-lg mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-black font-semibold block mb-1">Car ID:</label>
          <input
            type="number"
            value={carId ?? ""}
            onChange={(e) => setCarId(Number(e.target.value))}
            required
            className="text-black w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-black font-semibold block mb-1">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="text-black w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-black font-semibold block mb-1">KM:</label>
          <input
            type="number"
            value={km}
            onChange={(e) => setKm(Number(e.target.value))}
            required
            className="text-black w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-black font-semibold block mb-1">Fuel Level:</label>
          <input
            type="number"
            value={fuelLevel}
            onChange={(e) => setFuelLevel(Number(e.target.value))}
            required
            className="text-black w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label className="text-black font-semibold block mb-1">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="text-black w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="text-black font-semibold block mb-1">Condition:</label>
        <textarea
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          required
          className="text-black w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-black font-semibold block mb-1">Donor Email:</label>
          <input
            type="email"
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
            required
            className="text-black w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-black font-semibold block mb-1">Recipient Email:</label>
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
            className="text-black w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-black font-semibold block mb-1">Signature Type:</label>
          <select
            value={signatureType}
            onChange={(e) =>
              setSignatureType(e.target.value as "donor" | "recipient")
            }
            className="text-black w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="donor">Donor</option>
            <option value="recipient">Recipient</option>
          </select>
        </div>
        <div>
          <label className="text-black font-semibold block mb-1">Signature (text):</label>
          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            required
            className="text-black w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Continue
      </button>
    </form>
  );
}
