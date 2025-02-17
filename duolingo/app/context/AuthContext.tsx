import { createContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string; // or number, depending on your user ID type
  name: string;
  email: string;
  image?: string; // Optional if not all users have an image
  createdAt: Date; // Adjust type as necessary
}

interface AuthContextType {
  user: User | null; // Use User type or null
  login: (token: string, userData: User) => void; // Update to accept userData
  logout: () => void;
  fetchCurrentUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Fetch the current user on mount
  useEffect(() => {
   

    fetchCurrentUser();
  }, []);
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const { user } = await response.json();
          setUser(user);
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    }
  };
  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    setUser(userData); // Set actual user data on login
    router.push("/dashboard/home"); // Redirect to dashboard
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/auth/sign-in");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
}