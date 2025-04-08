import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import fs from "fs";

export const getUserProfile = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
                email: true,
                role: true,
                gender: true,
                dob: true,
                phoneNumber: true,
                designation: true,
                department: true,
                teamLeader: true,
                manager: true,
                organization: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                createdAt: true
            }
        });

        if (!user) {
            return { error: "User not found" };
        }

        return { data: user };
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return { error: "Something went wrong while fetching profile." };
    }
};



export const updateUserProfileWithImage = async (userId, formData) => {
    try {
        const allowedFields = ["firstName", "lastName", "gender", "dob", "phoneNumber"];
        const updateData = {};

        for (const field of allowedFields) {
            const value = formData.get(field);
            if (value) {
                updateData[field] = field === "dob" ? new Date(value) : value;
            }
        }

        // Handle image
        const file = formData.get("profileImage");
        if (file && file.size > 0) {
            const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
            if (!allowedTypes.includes(file.type)) {
                return { error: "Only JPEG, PNG, and WEBP files are allowed" };
            }

            const buffer = Buffer.from(await file.arrayBuffer());
            const fileName = `${uuidv4()}-${file.name}`;
            const uploadDir = path.join(process.cwd(), "public", "uploads");

            // ✅ Create upload directory if it doesn't exist
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            await writeFile(path.join(uploadDir, fileName), buffer);

            updateData.profileImage = `/uploads/${fileName}`;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                gender: true,
                dob: true,
                phoneNumber: true,
                profileImage: true,
            }
        });

        return { data: updatedUser };
    } catch (error) {
        console.error("Error in updateUserProfileWithImage:", error);
        return { error: "Failed to update user profile" };
    }
};