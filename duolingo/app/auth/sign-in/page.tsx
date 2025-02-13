"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter

export default function SignIn() {
  const router = useRouter(); // ✅ Initialize router for navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function handleLogin() {
    setError(""); // Clear previous errors
  
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      // Check if the response is OK and has JSON content
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }
  
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format from server");
      }
  
      const data = await res.json();
  
      console.log("Response data:", data);
  
      if (data.token) {
        localStorage.setItem("token", data.token); // Store token
        alert("Logged in successfully!");
        router.push("/dashboard/home"); // Redirect to dashboard
      } else {
        throw new Error("Token not found in response");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Login failed", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Sign In</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="w-full max-w-xs">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 mb-4 rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 mb-4 rounded w-full"
        />
        {/* ✅ Remove Link - Use button directly */}
        <button 
          onClick={handleLogin} 
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
