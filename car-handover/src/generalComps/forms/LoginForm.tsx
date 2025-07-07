import { useLoginFormState } from "./formStates/LoginFormState";
import {
  isEmailValid,
  getEmailValidationMessage,
} from "../restrictions/EmailRestrictions";

export function LoginForm() {
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
    setError("");
    // Handle login logic here
    console.log({ email, password, rememberMe });
  };
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
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline bg-white"
        />
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
