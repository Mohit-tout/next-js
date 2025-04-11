'use client'
import { useEffect, useState } from "react";
import ProfileForm from "../../../components/ProfileForm";
import { fetchUserProfileData } from "../../../services/user";
import { motion } from "framer-motion";
import AnimatedLoader from '../../../components/AnimatedLoader'

export default function EmployeeProfile() {
    const [initialData, setInitialData] = useState();
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetchProfileData()
    }, [])

    const fetchProfileData = async () => {
        try {
            setIsLoading(true)
            const response = await fetchUserProfileData();
            setInitialData(response?.user)

        }
        catch (err) {
            console.log(err)
        }
        finally {
            setIsLoading(false)
        }
    }

    if (isLoading) return <AnimatedLoader />;

    return (
        <div className="container mx-auto px-4 rounded-xl py-3 bg-white min-h-screen">
            <motion.h1
                className="text-3xl font-bold text-gray-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                My Profile
            </motion.h1>
            <div>
                <ProfileForm
                    initialData={initialData}
                />
            </div>
        </div>
    );
}