import React from "react";
import { useLoginFormState } from "./formStates/LoginFormState";
import {
  isEmailValid,
  getEmailValidationMessage,
} from "../restrictions/EmailRestrictions";

import { useRouter } from "next/router";

export function LoginForm() {
  const router = useRouter();
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    error,
    setError,
  } = useLoginFormState();

  const emailMessage = email ? getEmailValidationMessage(email) : "";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Email validation
    if (!isEmailValid(email)) {
      setError(getEmailValidationMessage(email));
      return;
    }
    // Crosscheck with localStorage (array of users)
    const usersRaw = localStorage.getItem("registeredUsers");
    if (!usersRaw) {
      setError("No registered users found. Please register first.");
      return;
    }
    let users = [];
    try {
      users = JSON.parse(usersRaw);
      if (!Array.isArray(users)) users = [];
    } catch {
      users = [];
    }
    const userData = users.find(
      (u: any) => u.email === email && u.password === password,
    );
    if (userData) {
      setError("");
      // Remember Me logic
      if (rememberMe) {
        localStorage.setItem("rememberedUser", email);
      } else {
        localStorage.removeItem("rememberedUser");
      }
      // Save current user for session (simulate login)
      localStorage.setItem("currentUser", JSON.stringify(userData));
      router.push("/screens/MainScreen");
    } else {
      setError("Invalid email or password.");
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm">
      <div className="mb-4">
        <label
          className="block text-black text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white"
        />
        {email && emailMessage && (
          <p className="text-red-600 text-xs italic mt-1">{emailMessage}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-black text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white pr-10"
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-xs text-gray-600"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-black">Remember Me</span>
        </label>
      </div>
      {error && <p className="text-red-600 text-xs italic">{error}</p>}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
    </form>
  );
}
