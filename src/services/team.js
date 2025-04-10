import { API_ROUTES } from "@/config/apiRoutes"
import { apiService } from "./apiService"

const fetchUserTeams = async (filterFormValue) => {
    return await apiService(`${API_ROUTES.USER.TEAMS}?projectId=${filterFormValue?.projectId || ""}&designation=${filterFormValue?.designation || ""}`, 'GET')
}

export {
    fetchUserTeams
}