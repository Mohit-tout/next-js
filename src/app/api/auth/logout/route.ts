import { ENV } from "@/config/env.config";
import { serialize } from "cookie";

export const POST = async () => {
    const clearCookie = serialize("refreshToken", "", {
        httpOnly: true,
        secure: ENV.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(0),
    });

    return new Response(JSON.stringify({ message: "Logged out!" }), {
        status: 200,
        headers: { "Set-Cookie": clearCookie },
    });
};
