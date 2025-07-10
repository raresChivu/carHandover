import React, { useEffect, useState } from "react";
import AccountOptions from "../../generalComps/mainPageComps/AccountOptions";
import HelpingAgent from "../../helpAgent/HelpingAgent";
import AdminNavBar from "../../generalComps/mainPageComps/navbars/AdminNavBar";
import UserNavBar from "../../generalComps/mainPageComps/navbars/UserNavBar";
import Loading from "../../generalComps/Loading";

function getIsAdminFromStorage(): boolean {
  // Try to get the current logged-in user from localStorage
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      return !!userData.isAdmin;
    } catch {
      return false;
    }
  }
  return false;
}

export default function MainScreen() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsAdmin(getIsAdminFromStorage());
    setTimeout(() => setLoading(false), 600); // Simulate loading
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {isAdmin ? <AdminNavBar /> : <UserNavBar />}
      <main className="flex-1 flex items-center justify-center">
        <HelpingAgent />
      </main>
      <AccountOptions />
    </div>
  );
}
