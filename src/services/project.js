import { API_ROUTES } from "@/config/apiRoutes"
import { apiService } from "./apiService"

const fetchUserProjects = async () => {
    return await apiService(API_ROUTES.USER.PROJECT, 'GET')
}

export {
    fetchUserProjects,
}