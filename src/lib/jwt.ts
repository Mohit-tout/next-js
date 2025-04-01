import { ENV } from "@/config/env.config";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = ENV.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = ENV.REFRESH_TOKEN_SECRET;

interface UserPayload {
    id: string;
    email: string;
}

export function generateAccessToken(user: UserPayload): string {
    return jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

export function generateRefreshToken(user: UserPayload): string {
    return jwt.sign({ id: user.id, email: user.email }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string, isRefreshToken = false): UserPayload | null {
    try {
        return jwt.verify(token, isRefreshToken ? REFRESH_TOKEN_SECRET : ACCESS_TOKEN_SECRET) as UserPayload;
    } catch (error) {
        return null;
    }
}
