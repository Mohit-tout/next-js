"use client";
import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "./protected-route";
import AdminHeader from "@/components/AdminHeader";

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <ProtectedRoute>
            <div className="antialiased bg-gray-200">
                <div className="h-screen flex overflow-hidden">
                    <Sidebar />
                    <div className="flex-1 flex-col relative z-0 overflow-y-auto">
                        <AdminHeader />
                        <div className="md:max-w-6xl md:mx-auto px-4 py-8">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default AdminLayout;