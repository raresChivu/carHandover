import React from "react";
import NavBar from "../../mockery/NavBar";
import AccountOptions from "../../generalComps/mainPageComps/AccountOptions";
import HelpingAgent from "../../helpAgent/HelpingAgent";

export default function MainScreen() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <NavBar />
      <main className="flex-1 flex items-center justify-center">
        <HelpingAgent />
      </main>
      <AccountOptions />
    </div>
  );
}
