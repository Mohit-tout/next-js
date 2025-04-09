import { getUserFromRequest } from "../../../../lib/auth"
import { updateTaskStatus } from "../../../../lib/services/getTask";

const ALLOWED_STATUSES = new Set(["TODO", "WORKING_ON", "DONE"]);

export const PATCH = async (request, { params }) => {
    try {
        const { user, error: authError, statusCode } = await getUserFromRequest(request);

        if (authError || !user?.id) {
            return jsonResponse({ error: authError || "Unauthorized" }, statusCode || 401);
        }
        const { taskId } = await params;
        const body = await request.json();
        const { status } = body;

        if (!taskId || !status) {
            return jsonResponse({ error: "Missing required fields: taskId or status" }, 400);
        }

        if (!ALLOWED_STATUSES.has(status)) {
            return jsonResponse({ error: "Invalid status value" }, 400);
        }

        const { data, error } = await updateTaskStatus(user.id, taskId, status);

        if (error) {
            return jsonResponse({ error }, 403);
        }

        return jsonResponse({ data }, 200);
    } catch (err) {
        console.error("PATCH /api/tasks/[taskId] error:", err);
        return jsonResponse({ error: "Internal server error" }, 500);
    }
};

const jsonResponse = (payload, status = 200) =>
    new Response(JSON.stringify(payload), {
        status,
        headers: { "Content-Type": "application/json" },
    });