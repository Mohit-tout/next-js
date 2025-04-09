import { signUp } from "../../../../lib/services/auth";


export const POST = async (request) => {
  try {
    const body = await request.json();

    if (!body?.email || !body?.password || !body?.firstName || !body?.lastName) {
      return new Response(JSON.stringify({ message: 'Required field is missing !!!' }), { status: 400 });
    }

    const response = await signUp(body); 

    if (response?.error) {
      return new Response(JSON.stringify({ message: response.error }), { status: 400 });
    }

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error("SIGNUP ERROR:", error); 
    return new Response(JSON.stringify({ message: 'Internal Server Error !!!' }), { status: 500 });
  }
};
