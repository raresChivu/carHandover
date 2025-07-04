import { useLoginFormState } from "./formStates/LoginFormState";

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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Handle login logic here
        console.log({ email, password, rememberMe });
      }}
    />
  );
}
