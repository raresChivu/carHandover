import React, { useState, useEffect } from "react";
import { LoginForm } from "../../generalComps/forms/LoginForm";
import Loading from "../../generalComps/Loading";

export default function Login() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
}
