"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const accessToken = localStorage.getItem("accessToken");
            const isAdmin = localStorage.getItem("role") === "admin";

            if (!accessToken || !isAdmin) {
                router.push("/login");
            } else {
                setIsAuthorized(true);
            }
        }
    }, [router]);

    if (isAuthorized === null) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;