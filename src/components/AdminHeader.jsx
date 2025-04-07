import Image from "next/image";
import { useState } from "react";
import { LogoImageForBg } from "@/assets";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
    const router = useRouter();
    const [isSideMenuOpen, setSideMenuOpen] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleLogoOutClick = (e) => {
        e.preventDefault();
        localStorage.clear();
        router.push('/')
    }

    return <>
        <div className="px-4 md:px-8 py-2 h-16 flex justify-between items-center shadow-sm bg-white">
            <div className="flex items-center w-2/3">
                <input
                    className="bg-white border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline focus:bg-white py-2 px-4 block w-full appearance-none leading-normal hidden md:block placeholder-gray-700 mr-10"
                    type="text"
                    placeholder="Search..."
                />
                <div
                    className="p-2 rounded-full hover:bg-gray-200 cursor-pointer md:hidden"
                    onClick={() => setSideMenuOpen(!isSideMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-600"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                </div>
                <div className="flex text-xl font-bold tracking-tight text-gray-800 md:hidden ml-2">
                    <Image className="w-8 h-8 mr-2" alt="logo" src={LogoImageForBg} />
                    T.M.T.
                </div>
            </div>
            <div className="flex items-center">
                <a
                    href="#"
                    className="text-gray-500 p-2 rounded-full hover:text-blue-600 hover:bg-gray-200 cursor-pointer mr-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                        <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                    </svg>
                </a>
                <div className="relative">
                    <div
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        className="cursor-pointer font-bold w-10 h-10 bg-blue-200 text-blue-600 flex items-center justify-center rounded-full"
                    >
                        DA
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute top-0 mt-12 right-0 w-48 bg-white py-2 shadow-md border border-gray-100 rounded-lg z-40">
                            <a
                                href="#"
                                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                            >
                                My Profile
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                            >
                                Account Settings
                            </a>
                            <button
                                onClick={handleLogoOutClick}
                                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600 hover:w-auto hover:text-left  hover:w-inherit"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
}