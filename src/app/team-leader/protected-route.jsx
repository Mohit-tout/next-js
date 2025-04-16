"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const TeamLeaderProtectedRoute = ({ children }) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const accessToken = localStorage.getItem("accessToken");
            const isTeamLeader = localStorage.getItem("role") === "TEAM_LEADER";

            if (!accessToken || !isTeamLeader) {
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
