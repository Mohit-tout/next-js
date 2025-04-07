"use client";
import ProtectedRoute from "./protected-route";
import Sidebar from "../../components/Sidebar";
import EmployeeHeader from "../../components/EmployeeHeader";

const AdminLayout = ({ children }) => {
    return (
        <ProtectedRoute>
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
        </ProtectedRoute>
    );
};

export default AdminLayout;