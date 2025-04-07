import { verifyAccessToken } from "./jwt"; // Assuming you're using some JWT library

export const getUserFromRequest = async (request) => {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Authorization token missing or malformed", statusCode: 400 };
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);  // your jwt.verify or decode method

    return { user: decoded }; // { id, email, fullName, role }
  } catch (err) {
    console.error("Token verification failed:", err);

    // If the token has expired, jwt library usually throws "TokenExpiredError"
    if (err.name === "TokenExpiredError") {
      return { error: "Token expired", statusCode: 440 }; // 440 is commonly used for session expiry
    }

    // If the token is invalid or another error occurs
    return { error: "Invalid token", statusCode: 401 }; // 401 for invalid token
  }
};

