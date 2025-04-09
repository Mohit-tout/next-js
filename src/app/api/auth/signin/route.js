import { setRefreshTokenCookie } from "@/lib/cookies";
import { signIn } from "@/lib/services/auth";


export const POST = async (request) => {
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
    const user = response?.user;
    return new Response(JSON.stringify({
      user: user,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      message: 'Sign In Sucessfully !!!'
    }), {
      status: 200,
      headers: { "Set-Cookie": refreshTokenCookie }
    });
  } catch(error) {
    console.error("SIGNIN ERROR:", error); 
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};