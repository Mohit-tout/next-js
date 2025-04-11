import { getUserFromRequest } from "../../../../lib/auth"
import { jsonResponse } from "../../../../lib/handleResponse"
import { getEmployeeDashboardData } from "../../../../lib/services/dashboard";

export const GET = async (request) => {

    try {
        const { user, error: authError, statusCode } = await getUserFromRequest(request);
        if (authError) {
            return jsonResponse({ error: authError }, statusCode || 401)
        }
        const { data, error } = await getEmployeeDashboardData(user?.id);
        if (error) {
            return jsonResponse({ error: error }, 500)
        }
        return jsonResponse({ data }, 200)
    }
    catch (err) {
        return jsonResponse({ error: err, message: 'Internal Server Error' }, 500)
    }
}