import { getUserFromRequest } from "../../../lib/auth"
import { getTasks } from "../../../lib/services/getTask";

export const GET = async (request) => {
    try {
        const { user, error: authError, statusCode } = await getUserFromRequest(request);
        if (authError) {
            return jsonResponse({ error: authError }, statusCode || 401);
        }

        const { searchParams } = new URL(request.url);
        const filters = {
            projectId: searchParams.get("projectId") || undefined,
            status: searchParams.get("status") || undefined,
            priority: searchParams.get("priority") || undefined,
        };

        const { data, error } = await getTasks(user.id, filters);

        if (error) {
            return jsonResponse({ error }, 500);
        }

        return jsonResponse({ data }, 200);
    } catch (error) {
        return jsonResponse({ error: "Unexpected Server Error" }, 500);
    }
};

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}