import { prisma } from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken } from "../jwt";
import { comparePassword, hashPassword } from "../bcrypt";


export const signUp = async (email: string, password: string, name: string) => {
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return { error: "User already exists!" };
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        const updatedUser = { ...user, password: undefined }

        return { message: "User registered successfully !!!", user: updatedUser };
    } catch (error) {
        return { error: "Registration failed!" };
    }
};

export const signIn = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: "User not found!" };

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) return { error: "Invalid password!" };

    const payload = { id: user.id, email: user.email, name: user.name };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { ...payload, accessToken, refreshToken };
};

