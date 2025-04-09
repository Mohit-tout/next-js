import { prisma } from "@/lib/prisma";
import { generateAccessToken, generateRefreshToken } from "../jwt";
import { comparePassword, hashPassword } from "../bcrypt";

export const signUp = async ({ firstName, lastName, email, password, role, organizationId }) => {
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return { error: "User already exists!" };
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role,
                organizationId,
            },
        });

        const updatedUser = { ...user };
        delete updatedUser.password;

        return { message: "User registered successfully !!!", user: updatedUser };
    } catch (error) {
        console.error("SIGNUP ERROR:", error); 
        return { error: "Registration failed!" };
    }
};



export const signIn = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: "User not found!" };
    const tempPassword = '123456';
    const testPassword = await hashPassword(tempPassword);
    console.log(testPassword)
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) return { error: "Invalid password!" };

    const payload = { id: user.id, email: user.email, fullName: user.firstName + ' ' + user?.lastName, role: user?.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return { user: payload, accessToken, refreshToken };
};


