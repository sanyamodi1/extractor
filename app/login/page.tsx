"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fakeUser = {
    email: "user@example.com",
    password: "password123",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === fakeUser.email && password === fakeUser.password) {
      localStorage.setItem("loggedIn", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  // Clear error on input change
  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
    if (error) setError("");
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "3rem auto",
        padding: "2rem",
        border: "1px solid #ddd",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          fontWeight: 700,
          fontSize: "1.8rem",
          color: "#222",
        }}
      >
        Login
      </h1>
      <form onSubmit={handleSubmit} noValidate>
        <fieldset style={{ border: "none", padding: 0, marginBottom: "1.25rem" }}>
          <label htmlFor="email" style={{ fontWeight: "600", display: "block" }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => handleInputChange(setEmail, e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: 4,
              border: "1px solid #ccc",
              fontSize: "1rem",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </fieldset>

        <fieldset style={{ border: "none", padding: 0, marginBottom: "1rem" }}>
          <label htmlFor="password" style={{ fontWeight: "600", display: "block" }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => handleInputChange(setPassword, e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: 4,
              border: "1px solid #ccc",
              fontSize: "1rem",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </fieldset>

        {error && (
          <p
            role="alert"
            aria-live="assertive"
            style={{
              color: "red",
              marginBottom: "1rem",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#0070f3",
            color: "#fff",
            fontWeight: "700",
            fontSize: "1.1rem",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#005bb5")
          }
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0070f3")}
          onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,112,243,0.6)")}
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          Login
        </button>
      </form>
    </div>
  );
}
