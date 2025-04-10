"use client";
import React, { useState } from "react";
import { LogoImageForBg } from "@/assets";
import Image from "next/image";
import { LogOut, Menu, X, Grid, FileText, Clock, Book, Users, User, ClipboardCheck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const menuItems = [
    { name: "Dashboard", icon: <Grid size={20} />, href: "/employee/dashboard" },
    { name: "My Profile", icon: <User size={20} />, href: "/employee/profile" },
    { name: "My Tasks", icon: <Clock size={20} />, href: "/employee/tasks" },
    // { name: "Team Tasks", icon: <ClipboardCheck size={20} />, href: "/employee/teamTask" }, // Updated icon
    { name: "Teams", icon: <Users size={20} />, href: "/employee/teams" },
    { name: "Projects", icon: <Book size={20} />, href: "/employee/projects" },
    // { name: "Reports & Analytics", icon: <FileText size={20} />, href: "/employee/reports" },
];

const Sidebar = () => {
    const [sidemenu, setSidemenu] = useState(false);
    const router = useRouter();
    const pathName = usePathname();

    const handleLogoOutClick = (e) => {
        e.preventDefault();
        localStorage.clear();
        router.push('/')
    }

    const getActiveClassName = (path) => {
        return pathName === path ? 'text-blue-600 bg-gray-100' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
    }

    return (
        <>
            {sidemenu && (
                <div
                    className="fixed inset-0 z-30 bg-gray-600 opacity-50 transition-opacity duration-300"
                    onClick={() => setSidemenu(false)}
                ></div>
            )}

            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white transform duration-300 ease-in-out ${sidemenu ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between px-6 py-3 h-16 border-b">
                    <div className="flex items-center text-2xl font-bold text-gray-800">
                        <Image className="w-8 h-8 mr-2" alt="logo" src={LogoImageForBg} />
                        Task Management Tool
                    </div>
                    {sidemenu &&
                        <button
                            className="md:hidden fixed top-[-2] right-[-10] z-50 p-2 bg-white rounded-full shadow-md"
                            onClick={() => setSidemenu(false)}
                        >
                            <X className="w-6 h-6 text-gray-700" />
                        </button>
                    }
                </div>

                <nav className="px-4 py-2">
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item?.href}
                                    className={`flex items-center px-4 py-3 rounded-lg font-medium ${getActiveClassName(item?.href)}`}
                                >
                                    <span className="mr-4">  {item.icon} </span>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                        <li className="absolute bottom-10">
                            <button
                                onClick={handleLogoOutClick}
                                className="mb-1 px-2 py-2 w-full rounded-lg flex items-center font-medium text-gray-700 hover:text-blue-600 hover:w-inherit hover:bg-gray-200 focus:outline-none "
                            >
                                <span className="mr-4"><LogOut size={20} /></span>
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:block bg-white w-64 min-h-screen shadow-lg">
                <div className="flex items-center px-6 py-3 h-16 border-b">
                    <Image className="w-8 h-8 mr-2" alt="logo" src={LogoImageForBg} />
                    <span className="text-2xl font-bold text-gray-800"> T.M.T.</span>
                </div>
                <nav className="px-4 py-2">
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item?.href}
                                    className={`flex items-center px-4 py-3 rounded-lg font-medium ${getActiveClassName(item?.href)}`}
                                >
                                    <span className="mr-4">  {item.icon} </span>
                                    {item.name}
                                </Link>
                            </li>

                        ))}
                        <li className="absolute bottom-10">
                            <button
                                onClick={handleLogoOutClick}
                                className="mb-1 px-2 py-2 w-full rounded-lg flex items-center font-medium text-gray-700 hover:text-blue-600 hover:w-inherit hover:bg-gray-200 focus:outline-none"
                            >
                                <span className="mr-4"><LogOut size={20} /></span>
                                Sign Out
                            </button>
                        </li>

                    </ul>
                </nav>
            </div>

            {/* Mobile Toggle Button */}
            {!sidemenu &&
                <button
                    className="md:hidden fixed top-2 left-2 z-50 p-2 bg-white rounded-full shadow-md"
                    onClick={() => setSidemenu(true)}
                >
                    <Menu className="w-6 h-6 text-gray-700" />
                </button>
            }
        </>
    );
};

export default Sidebar;
