"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const accessToken = localStorage.getItem("accessToken");
            const role = localStorage.getItem("role");
            const userId = localStorage.getItem("userId");

            if (accessToken && role && userId) {
                setUser({ accessToken, role, userId });
            }
        }
    }, []);

    const login = (userData) => {
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
