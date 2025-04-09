import { getUserFromRequest } from "../../../lib/auth";
import { getUserProfile, updateUserProfileWithImage } from "../../../lib/services/user";


export const GET = async (request) => {
    const { user, error: authError, statusCode } = await getUserFromRequest(request);

    if (authError) {
        return new Response(JSON.stringify({ error: authError }), {
            status: statusCode || 401, // default to 401 if no statusCode is provided
        });
    }

    const { data, error } = await getUserProfile(user.id);

    if (error) {
        return new Response(JSON.stringify({ message: error }), {
            status: 404, // Not Found
        });
    }

    return new Response(JSON.stringify({ user: data }), {
        status: 200, // OK
    });
};

export const PATCH = async (request) => {
    const { user, error: authError } = await getUserFromRequest(request);
    if (authError) {
      return new Response(JSON.stringify({ message: authError }), { status: 401 });
    }
  
    try {
      const formData = await request.formData();
      const { data, error } = await updateUserProfileWithImage(user.id, formData);
  
      if (error) {
        return new Response(JSON.stringify({ message: error }), { status: 400 });
      }
  
      return new Response(
        JSON.stringify({ message: "Profile updated successfully!", user: data }),
        { status: 200 }
      );
    } catch (err) {
      console.error("PATCH error:", err);
      return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
  }
  