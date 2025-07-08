import React from "react";
import { useRouter } from "next/router";
import { useRegisterFormState } from "./formStates/RegisterFormState";

import {
  isPasswordStrong,
  getPasswordStrengthMessage,
} from "../restrictions/PasswordRestrictions";
import {
  isEmailValid,
  getEmailValidationMessage,
  // isAllowedDomain // Uncomment if you want to restrict to specific domains
} from "../restrictions/EmailRestrictions";

export function RegisterForm() {
  const router = useRouter();
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    setError,
    successMessage,
    setSuccessMessage,
    isAdmin,
    setIsAdmin,
    firstName,
    setFirstName,
    lastName,
    setLastName,
  } = useRegisterFormState();

  // Email validation message for live feedback
  const emailMessage = email ? getEmailValidationMessage(email) : "";
  // Password strength message for live feedback
  const passwordMessage = password ? getPasswordStrengthMessage(password) : "";

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Email validation
        if (!isEmailValid(email)) {
          setError(getEmailValidationMessage(email));
          return;
        }
        // Password strength validation
        if (!isPasswordStrong(password)) {
          setError(getPasswordStrengthMessage(password));
          return;
        }
        // Confirm password match
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          return;
        }
        setError("");
        // Save registration data to localStorage (as array)
        const userData = {
          username,
          email,
          password,
          isAdmin,
          firstName,
          lastName,
          assignedCars: [], // New field for assigned cars
        };
        let users = [];
        const existing = localStorage.getItem("registeredUsers");
        if (existing) {
          try {
            users = JSON.parse(existing);
            if (!Array.isArray(users)) users = [];
          } catch {
            users = [];
          }
        }
        users.push(userData);
        localStorage.setItem("registeredUsers", JSON.stringify(users));
        setSuccessMessage("Registration successful! Data saved locally.");
        // Redirect to login screen immediately
        router.push("/screens/Login");
      }}
      className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-black text-sm font-bold mb-2">
          First Name:
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-black text-sm font-bold mb-2">
          Last Name:
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-black text-sm font-bold mb-2">
          Username:
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-black text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
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
        <label className="block text-black text-sm font-bold mb-2">
          Password:
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
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
        {password && passwordMessage && (
          <p className="text-red-600 text-xs italic mt-1">{passwordMessage}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-black text-sm font-bold mb-2">
          Confirm Password:
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white pr-10"
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-xs text-gray-600"
            tabIndex={-1}
            onClick={() => setShowConfirmPassword((v) => !v)}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-black text-sm font-bold mr-2">
          Admin:
        </label>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
      </div>
      {error && <p className="text-red-600 text-xs italic mb-2">{error}</p>}
      {successMessage && (
        <p className="text-green-600 text-xs italic mb-2">{successMessage}</p>
      )}
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        Register
      </button>
    </form>
  );
}
