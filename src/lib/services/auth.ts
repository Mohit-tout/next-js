import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../jwt";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Register User
export const signUp = async (email: string, password: string, name: string) => {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return { error: "User already exists!" };
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });
  
      return { message: "User registered successfully!", user };
    } catch (error) {
      return { error: "Registration failed!" };
    }
  };

  export const signIn = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: "User not found!" };

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return { error: "Invalid password!" };

    const payload = { id: user.id, email: user.email, name: user.name };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { ...payload, accessToken, refreshToken };
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error("Invalid token!");
    }
};