'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { LogoImageForBg } from "@/assets";

export default function AnimatedLoader() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Spinner Circle with Logo inside */}
            <motion.div className="relative w-20 h-20 mb-4">
                {/* Spinning Circle only */}
                <motion.div
                    className="absolute inset-0 border-4 border-blue-600 border-t-transparent border-solid rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 1.5,
                    }}
                />

                {/* Static Logo in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src={LogoImageForBg}
                        alt="Throughout Technologies Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                </div>
            </motion.div>

            {/* Company Name */}
            <motion.div
                className="mt-4 text-xl font-semibold text-blue-700"
                initial={{ opacity: 0.4 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                Throughout Technologies
            </motion.div>

            <motion.div
                className="text-sm text-gray-500 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                Organizing your tasks...
            </motion.div>
        </motion.div>
    );
}

