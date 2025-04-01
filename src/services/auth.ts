import { API_ROUTES } from "@/config/apiRoutes"
import { apiService } from "./apiService"

const loginUser = async (params: any) => {
    return await apiService(API_ROUTES.AUTH.LOGIN, 'POST', params)
}

export {
    loginUser
}