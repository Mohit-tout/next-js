import { getUserFromRequest } from "../../../lib/auth";
import { getProjects } from "../../../lib/services/project";

export const GET = async (request) => {
  const { user, error: authError, statusCode } = await getUserFromRequest(request);

  if (authError) {
    return new Response(JSON.stringify({ error: authError }), {
      status: statusCode || 401, // default to 401 if no statusCode is provided
    });
  }

  // Pagination parameters (default page 1, size 10)
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

  const { data, error, pagination } = await getProjects(user.id, page, pageSize);

  if (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }

  // Combine data and pagination into one object before returning
  return new Response(JSON.stringify({ data, pagination }), { status: 200 });
};
