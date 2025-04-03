import { LogoImage } from "@/assets";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NavbarComponent() {
    return (
        <>
            <header className="fixed z-50 w-full left-0 top-0 bg-gradient-to-r from-[#3b7977] to-[#72b1bb] text-gray-700 body-font border-b border-gray-200">
                <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
                    <Link
                        className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
                        href="/"
                    >
                        <Image height={50} width={50} alt="logo" src={LogoImage} />
                        <span className="pl-4 text-2xl md:text-3xl text-white"> Task Management Tool</span>
                    </Link>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <div className="group relative py-3" >
                            <a className="flex text-white h-10 items-center justify-center rounded border border-white bg-bg-color px-4 text-base font-semibold " href="/login">
                                <span className="pr-2">
                                <CircleUserRound />
                                </span>
                                Account
                            </a>
                        </div>
                    </nav>
                </div>
            </header>
        </>

    )
}