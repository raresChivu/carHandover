import React, { useState, useEffect } from "react";
import { RegisterForm } from "../../generalComps/forms/RegisterForm";
import Loading from "../../generalComps/Loading";

export default function Register() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <RegisterForm />
    </div>
  );
}
