import { setRefreshTokenCookie } from "@/lib/cookies";
import { signIn } from "@/lib/services/auth";

export const POST = async (request: Request) => {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Email and Password are required!" }), {
        status: 400,
      });
    }

    const response = await signIn(email, password);
    if ("error" in response) {
      return new Response(JSON.stringify({ message: response.error }), { status: 400 });
    }
    const refreshTokenCookie = setRefreshTokenCookie(response.refreshToken);
    return new Response(JSON.stringify({
      user: {
        id: response.id,
        email: response.email,
        name: response?.name,
      },
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      message: 'Sign In Sucessfully !!!'
    }), {
      status: 200,
      headers: { "Set-Cookie": refreshTokenCookie }
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Internal Server Error" ,error:err}), { status: 500 });
  }
};