import { useState, useEffect } from "react";
import Signature from "../Signature";
import { usePVsFormState } from "./formStates/PVsFormState";

export function PVSForm({
  initialValues,
  onSavePV,
}: {
  initialValues?: Partial<ReturnType<typeof usePVsFormState>>;
  onSavePV?: (pvData: any) => void;
}) {
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
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("currentUser");
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
      if (initialValues.description !== undefined)
        setDescription(initialValues.description);
      if (initialValues.signature !== undefined)
        setSignature(initialValues.signature);
      if (initialValues.signatureType !== undefined)
        setSignatureType(initialValues.signatureType);
      if (initialValues.donorEmail !== undefined) {
        setDonorEmail(initialValues.donorEmail);
      } else if (loggedInUserEmail) {
        setDonorEmail(loggedInUserEmail);
      }
      if (initialValues.recipientEmail !== undefined)
        setRecipientEmail(initialValues.recipientEmail);
      if (initialValues.fuelLevel !== undefined)
        setFuelLevel(initialValues.fuelLevel);
      if (initialValues.condition !== undefined)
        setCondition(initialValues.condition);
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

            // --- Notification logic ---
            if (typeof window !== "undefined") {
              const usersRaw = localStorage.getItem("registeredUsers");
              if (usersRaw) {
                let users = [];
                try {
                  users = JSON.parse(usersRaw);
                } catch {
                  users = [];
                }
                // Notification for donor and recipient
                const now = new Date().toISOString();
                // Try to get car plate from users' assignedCars or from PV data
                let carPlate = "";
                if (initialValues && (initialValues as any).carPlate) {
                  carPlate = (initialValues as any).carPlate;
                }
                const carsRaw = localStorage.getItem("cars");
                if (carsRaw) {
                  try {
                    const carsArr = JSON.parse(carsRaw);
                    const carObj = Array.isArray(carsArr)
                      ? carsArr.find((c: any) => c.id === carId)
                      : null;
                    if (carObj && carObj.plate) carPlate = carObj.plate;
                  } catch {}
                }
                const notification = {
                  id: Math.random().toString(36).slice(2),
                  type: signatureType === "donor" ? "assign" : "request",
                  carId,
                  carPlate,
                  from: donorEmail,
                  to: recipientEmail,
                  message:
                    signatureType === "donor"
                      ? `You have been assigned car ID ${carId} by ${donorEmail}`
                      : `You have requested car ID ${carId} from ${donorEmail}`,
                  date: now,
                  read: false,
                };
                // Only add notification here
                users = users.map((u: any) => {
                  let updatedUser = { ...u };
                  if (
                    (notification.type === "assign" &&
                      u.email === notification.to) ||
                    (notification.type === "request" &&
                      u.email === notification.from)
                  ) {
                    updatedUser.notifications = Array.isArray(u.notifications)
                      ? [...u.notifications, notification]
                      : [notification];
                  }
                  return updatedUser;
                });
                localStorage.setItem("registeredUsers", JSON.stringify(users));
              }
            }
            // --- End notification logic ---

            // --- Order logic (add to orders only when Save is pressed) ---
            if (
              typeof window !== "undefined" &&
              signatureType === "recipient"
            ) {
              const usersRaw = localStorage.getItem("registeredUsers");
              const currentUserRaw = localStorage.getItem("currentUser");
              if (usersRaw && currentUserRaw) {
                let users: any[] = [];
                let currentUser: any = null;
                try {
                  users = JSON.parse(usersRaw);
                } catch {
                  users = [];
                }
                try {
                  currentUser = JSON.parse(currentUserRaw);
                } catch {
                  currentUser = null;
                }
                const now = new Date().toISOString();
                let carPlate = "";
                if (initialValues && (initialValues as any).carPlate) {
                  carPlate = (initialValues as any).carPlate;
                }
                const carsRaw = localStorage.getItem("cars");
                if (carsRaw) {
                  try {
                    const carsArr = JSON.parse(carsRaw);
                    const carObj = Array.isArray(carsArr)
                      ? carsArr.find((c: any) => c.id === carId)
                      : null;
                    if (carObj && carObj.plate) carPlate = carObj.plate;
                  } catch {}
                }
                // Get more car details for the order
                let carModel = "";
                let carYear = "";
                let carStatus = "";
                if (carsRaw) {
                  try {
                    const carsArr = JSON.parse(carsRaw);
                    const carObj = Array.isArray(carsArr)
                      ? carsArr.find((c: any) => c.id === carId)
                      : null;
                    if (carObj) {
                      if (carObj.model) carModel = carObj.model;
                      if (carObj.year) carYear = carObj.year;
                      if (carObj.status) carStatus = carObj.status;
                    }
                  } catch {}
                }
                const order = {
                  id: Math.random().toString(36).slice(2),
                  carPlate,
                  carId,
                  carModel,
                  carYear,
                  carStatus,
                  status: "Pending",
                  date: now,
                  description: description,
                  km: km,
                  fuelLevel: fuelLevel,
                  condition: condition,
                  signature: signature,
                  donorEmail: donorEmail,
                  recipientEmail: recipientEmail,
                };
                // Update currentUser.orders
                if (currentUser) {
                  if (!Array.isArray(currentUser.orders))
                    currentUser.orders = [];
                  currentUser.orders.push(order);
                  localStorage.setItem(
                    "currentUser",
                    JSON.stringify(currentUser),
                  );
                }
                // Update registeredUsers.orders for the same user
                users = users.map((u: any) => {
                  if (u.email === currentUser?.email) {
                    return {
                      ...u,
                      orders: Array.isArray(u.orders)
                        ? [...u.orders, order]
                        : [order],
                    };
                  }
                  return u;
                });
                localStorage.setItem("registeredUsers", JSON.stringify(users));
              }
            }

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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setShowSignature(true);
      }}
      className="text-black space-y-4 w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-black font-semibold block mb-1">Car ID:</label>
          <input
            type="number"
            value={carId ?? ""}
            onChange={(e) => setCarId(Number(e.target.value))}
            required
            className="text-black w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-black font-semibold block mb-1">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="text-black w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-black font-semibold block mb-1">KM:</label>
          <input
            type="number"
            value={km}
            onChange={(e) => setKm(Number(e.target.value))}
            required
            className="text-black w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-black font-semibold block mb-1">
            Fuel Level:
          </label>
          <input
            type="number"
            value={fuelLevel}
            onChange={(e) => setFuelLevel(Number(e.target.value))}
            required
            className="text-black w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="text-black font-semibold block mb-1">
          Description:
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="text-black w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="text-black font-semibold block mb-1">
          Condition:
        </label>
        <textarea
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          required
          className="text-black w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-black font-semibold block mb-1">
            Donor Email:
          </label>
          <input
            type="email"
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
            required
            className="text-black w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-black font-semibold block mb-1">
            Recipient Email:
          </label>
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
            className="text-black w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-black font-semibold block mb-1">
            Signature Type:
          </label>
          <select
            value={signatureType}
            onChange={(e) =>
              setSignatureType(e.target.value as "donor" | "recipient")
            }
            className="text-black w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="donor">Donor</option>
            <option value="recipient">Recipient</option>
          </select>
        </div>
        <div>
          <label className="text-black font-semibold block mb-1">
            Signature (text):
          </label>
          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            required
            className="text-black w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Continue to Signature
      </button>
    </form>
  );
}
