import { LogoImage } from "@/assets";
import Image from "next/image";
import Link from "next/link";

export default function NavbarComponent() {
    return (
        <>
            <header className="sticky top-0 bg-gradient-to-r from-[#3b7977] to-[#72b1bb] text-gray-700 body-font border-b border-gray-200">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link
                        className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
                        href="/"
                    >
                        <Image height={50} width={50} alt="logo" src={LogoImage} />
                        <span className="pl-4 text-2xl md:text-3xl text-white">Task Tracker</span>
                    </Link>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                       <Link href={'/login'}>
                       Sign In
                       </Link>
                    </nav>
                    <button className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">
                        Button
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            className="w-4 h-4 ml-1"
                            viewBox="0 0 24 24"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </header>
        </>

    )
}