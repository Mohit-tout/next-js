"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    accessToken: string;
    role: "admin" | "user";
    userId: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const accessToken = localStorage.getItem("accessToken");
            const role = localStorage.getItem("role");
            const userId = localStorage.getItem("userId");

            if (accessToken && role && userId) {
                setUser({ accessToken, role: role as "admin" | "user", userId });
            }
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", userData.accessToken);
            localStorage.setItem("role", userData.role);
            localStorage.setItem("userId", userData.userId);
        }
        router.push(userData.role === "admin" ? "/admin/dashboard" : "/dashboard");
    };

    const logout = () => {
        setUser(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("role");
            localStorage.removeItem("userId");
        }
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};