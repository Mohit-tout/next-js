'use client'
import { useEffect, useState } from "react";
import ProfileForm from "../../../components/ProfileForm";
import { fetchUserProfileData } from "../../../services/user";

// This is the page component for server-side rendering with data fetching
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

    return (
        <div>
            <ProfileForm
                initialData={initialData}
                isLoading={isLoading}
            />
        </div>
    );
}
