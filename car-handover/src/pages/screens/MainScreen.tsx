import React from "react";
import NavBar from "../../generalComps/mainPageComps/NavBar";
import AccountOptions from "../../generalComps/mainPageComps/AccountOptions";

export default function MainScreen() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavBar />
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-16 text-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">
            Welcome to my app
          </h1>
          <p className="text-lg text-gray-700">
            This is your main dashboard area. Add your main content here.
          </p>
        </div>
      </main>
      <AccountOptions />
    </div>
  );
}
