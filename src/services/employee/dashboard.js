import { API_ROUTES } from "@/config/apiRoutes"
import { apiService } from "../apiService"

const fetchEmployeedashboardData = async () => {
    return await apiService(`${API_ROUTES.EMPLOYEE.DASHBOARD}`, 'GET')
}

export {
    fetchEmployeedashboardData
}