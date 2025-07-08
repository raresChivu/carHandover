import React from "react";
import CarList from "../../generalComps/lists/CarList";

export default function Cars() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-12">
      <CarList />
    </div>
  );
}
