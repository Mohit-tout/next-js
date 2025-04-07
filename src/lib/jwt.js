import { ENV } from "@/config/env.config";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = ENV.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = ENV.REFRESH_TOKEN_SECRET;

export function generateAccessToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
}

export function generateRefreshToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

// Access Token verify
export const verifyAccessToken = (token) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

// Refresh Token verify (if needed)
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
};
