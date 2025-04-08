import { API_ROUTES } from "@/config/apiRoutes"
import { apiService } from "./apiService"

const fetchUserProfileData = async () => {
    return await apiService(API_ROUTES.USER.PROFILE, 'GET')
}

const updateUserProfile = async (params) => {
    return await apiService(API_ROUTES.USER.PROFILE, 'PATCH', params)
}

export {
    fetchUserProfileData,
    updateUserProfile
}