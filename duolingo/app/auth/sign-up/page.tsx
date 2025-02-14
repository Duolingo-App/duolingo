"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function handleRegister() {
    setError(""); // Clear error before making the request

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Check if the response is valid JSON
      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json(); // Parse response to JSON
      } else {
        throw new Error("Invalid response from server");
      }

      if (!res.ok) {
        setError(data.error || "Something went wrong!");
        return;
      }

      alert("Account created! You can now sign in.");
      router.push("/auth/sign-in"); // Redirect to sign-in page after successful registration
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Registration failed", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="w-full max-w-xs">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border border-gray-300 p-2 mb-4 rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border border-gray-300 p-2 mb-4 rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="border border-gray-300 p-2 mb-4 rounded w-full"
        />

        <button 
          onClick={handleRegister} 
          className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
