import { verifyToken, generateAccessToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export const POST = async (req) => {
  const cookies = req.headers.get("cookie") || "";
  const refreshToken = cookies.split("; ").find((c) => c.startsWith("refreshToken="))?.split("=")[1];

  if (!refreshToken) {
    return new Response(JSON.stringify({ message: "No refresh token provided!" }), { status: 401 });
  }

  const decoded = verifyToken(refreshToken, true);
  if (!decoded) {
    return new Response(JSON.stringify({ message: "Invalid refresh token!" }), { status: 403 });
  }

  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  if (!user) {
    return new Response(JSON.stringify({ message: "User not found!" }), { status: 404 });
  }

  const newAccessToken = generateAccessToken(user);
  return new Response(JSON.stringify({ accessToken: newAccessToken }), { status: 200 });
};
