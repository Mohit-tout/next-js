import { prisma } from "@/lib/prisma";

export const getTasks = async (userId, filters = {}) => {
    try {
        const where = {
            assignedToId: userId,
            ...(filters.projectId && { projectId: filters.projectId }),
            ...(filters.status && { status: filters.status }),
            ...(filters.priority && { priority: filters.priority }),
        };

        const tasks = await prisma.task.findMany({
            where,
            include: {
                assignedTo: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        role: true,
                        profileImage: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        status: true,
                        progress: true,
                        startDate: true,
                        endDate: true,
                        liveUrl: true,
                        qaUrl: true,
                        organization: {
                            select: { id: true, name: true },
                        },
                    },
                },
            },
            orderBy: [
                {
                    priority: "asc", 
                },
                {
                    createdAt: "desc",
                },
            ],
        });

        return { data: tasks, error: null };
    } catch (error) {
        console.error("getTasks Error:", error);
        return { data: null, error: "Failed to fetch tasks" };
    }
};


export const updateTaskStatus = async (userId, taskId, status) => {
    try {
        const task = await prisma.task.findUnique({
            where: { id: taskId },
            select: { assignedToId: true },
        });

        if (!task) {
            return { error: "Task not found" };
        }

        if (task.assignedToId !== userId) {
            return { error: "You are not authorized to update this task" };
        }

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: { status },
        });

        return { data: updatedTask };
    } catch (err) {
        console.error("Prisma updateTaskStatus error:", err);
        return { error: "Database error while updating task status" };
    }
};