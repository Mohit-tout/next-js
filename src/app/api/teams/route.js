import { getUserFromRequest } from '../../../lib/auth'
import { jsonResponse } from '../../../lib/handleResponse';
import { getTeams } from '../../../lib/services/team';
export const GET = async (request) => {
    try {

        const { user, error: authError, statusCode } = await getUserFromRequest(request);

        if (authError) {
            return jsonResponse({ error: authError }, statusCode || 401)
        }

        const { searchParams } = new URL(request.url);
        const filters = {
            projectId: searchParams.get('projectId') || undefined,
            designation: searchParams.get('designation') || undefined
        }

        const { data, error } = await getTeams(user.id, filters);
        console.log('data size---------:', data.length);
        if (error) {
            return jsonResponse({ error: error }, 500)
        }

        return jsonResponse({ data }, 200)

    }
    catch (err) {
        return jsonResponse({ error: err, message: 'Interna Server Error' }, 500)
    }

}