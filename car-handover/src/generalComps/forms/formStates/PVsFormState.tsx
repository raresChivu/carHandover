import { useState } from "react";

export function usePVsFormState() {
  const [carId, setCarId] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");
  const [km, setKm] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [signatureType, setSignatureType] = useState<"donor" | "recipient">(
    "donor",
  );
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [fuelLevel, setFuelLevel] = useState<number>(0);
  const [condition, setCondition] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);

  return {
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
  };
}
