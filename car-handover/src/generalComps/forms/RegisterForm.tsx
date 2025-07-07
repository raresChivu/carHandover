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
  } = useRegisterFormState();

  // Email validation message for live feedback
  const emailMessage = email ? getEmailValidationMessage(email) : "";
  // Password strength message for live feedback
  const passwordMessage = password ? getPasswordStrengthMessage(password) : "";

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
        // Handle registration logic here
        console.log({
          username,
          email,
          password,
          confirmPassword,
          isAdmin,
        });
      }}
      className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
    >
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
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white"
        />
        {password && passwordMessage && (
          <p className="text-red-600 text-xs italic mt-1">{passwordMessage}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-black text-sm font-bold mb-2">
          Confirm Password:
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white"
        />
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
