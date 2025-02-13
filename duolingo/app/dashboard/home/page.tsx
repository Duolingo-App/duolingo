"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ClipLoader } from 'react-spinners'; // Import a spinner component
 // Adjust the path as necessary

interface User {
  name: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/sign-in"); // ✅ Redirect to sign-in if not logged in
        return;
      }

      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        localStorage.removeItem("token"); // Clear token if invalid
        router.push("/auth/sign-in");
      }
    }

    fetchUser();
  }, [router]);

  if (!user) return <ClipLoader />; // Show a spinner while loading

  return <h1>Welcome {user.name}</h1>
}
