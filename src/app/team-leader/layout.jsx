'use client'
import Sidebar from "@/components/Sidebar";
import EmployeeHeader from "@/components/EmployeeHeader";
import { TeamLeaderProtectedRoute } from "./protected-route"
const TeamLeaderLayout = ({ children }) => {

    return (
        <TeamLeaderProtectedRoute>
            <div className="antialiased bg-gray-200">
                <div className="h-screen flex overflow-hidden">
                    <Sidebar />
                    <div className="flex-1 flex-col relative z-0 overflow-y-auto">
                        <EmployeeHeader />
                        <div className="md:max-w-6xl md:mx-auto px-4 mt-[80px]">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </TeamLeaderProtectedRoute>
    )
}

export default TeamLeaderLayout;