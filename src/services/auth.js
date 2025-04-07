import { API_ROUTES } from "@/config/apiRoutes"
import { apiService } from "./apiService"

const loginUser = async (params) => {
    return await apiService(API_ROUTES.AUTH.LOGIN, 'POST', params)
}

const registerUser = async (params) => {
    return await apiService(API_ROUTES.AUTH.REGISTER, 'POST', params)
}

export {
    loginUser, registerUser
}