"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleCreateQuote = () => {
    router.push("/dashboard"); // navigate to the Create Quote page
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #e0f7fa, #ffffff)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 50px",
          backgroundColor: "#007bff",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>SafeShield Insurance</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            style={{
              backgroundColor: "#fff",
              color: "#007bff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={handleCreateQuote}
          >
            Create Quote
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              color: "#fff",
              border: "1px solid #fff",
              padding: "8px 16px",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "50px 20px",
        }}
      >
        <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px", color: "#007bff" }}>
          Protect What Matters Most
        </h2>
        <p style={{ fontSize: "18px", color: "#555", maxWidth: "600px", marginBottom: "30px" }}>
          Get a quick insurance quote online and safeguard your family, car, or property within minutes.
        </p>
        <button
          onClick={handleCreateQuote}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "15px 30px",
            fontSize: "18px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
        >
          Create Quote
        </button>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "20px 50px",
          backgroundColor: "#007bff",
          color: "#fff",
          textAlign: "center",
        }}
      >
        © 2025 SafeShield Insurance. All rights reserved.
      </footer>
    </div>
  );
}
