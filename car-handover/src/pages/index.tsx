import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  // Remove auto-redirect on mount. Instead, check on Login button click.
  const handleLogin = () => {
    const remembered = localStorage.getItem("rememberedUser");
    if (remembered) {
      router.push("/screens/MainScreen");
    } else {
      router.push("/screens/Login");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl text-black font-bold mb-8">
        Welcome to Car Handover
      </h1>
      <div className="flex gap-6">
        <button
          className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors text-lg font-semibold"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="px-8 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors text-lg font-semibold"
          onClick={() => router.push("/screens/Register")}
        >
          Register
        </button>
      </div>
    </div>
  );
}
