import { signUp } from "@/lib/services/auth";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    if (!body?.email || !body?.password || !body?.name) {
      return new Response(JSON.stringify({ message: 'Required field is missing !!!' }), { status: 400 })
    }

    const response = await signUp(body?.email, body?.password, body?.name);
    if (response?.error) {
      return new Response(JSON.stringify({ message: response.error }), { status: 400 });
    }
    return new Response(JSON.stringify(response), { status: 200 });
  }
  catch (err) {
    return new Response(JSON.stringify({ message: 'Internal Server Error !!!',error:err }), { status: 500 })
  }

}