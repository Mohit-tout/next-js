import { API_ROUTES } from "@/config/apiRoutes"
import { apiService } from "./apiService"

const fetchUserTasks = async (filterFormValue) => {
    return await apiService(`${API_ROUTES.USER.TASK}?projectId=${filterFormValue?.projectId || ""}&priority=${filterFormValue?.priority || ""}`, 'GET')
}

const updateUserTasksStatus = async (taskId, params) => {
    return await apiService(`${API_ROUTES.USER.UPDATE_TASK_STATUS}/${taskId}`, 'PATCH', params)
}

export {
    fetchUserTasks,
    updateUserTasksStatus
}