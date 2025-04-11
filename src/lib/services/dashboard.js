import { prisma } from "@/lib/prisma";
import { addDays, startOfToday } from "date-fns";

export const getEmployeeDashboardData = async (userId) => {
    try {
        // 1. Count tasks grouped by status
        const [todoCount, workingOnCount, doneCount] = await Promise.all([
            prisma.task.count({
                where: { assignedToId: userId, status: "TODO" },
            }),
            prisma.task.count({
                where: { assignedToId: userId, status: "WORKING_ON" },
            }),
            prisma.task.count({
                where: { assignedToId: userId, status: "DONE" },
            }),
        ]);

        const totalTasks = todoCount + workingOnCount + doneCount;
        const completionRate = totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0;

        // 2. Urgent tasks (excluding DONE)
        const urgentTasks = await prisma.task.findMany({
            where: {
                assignedToId: userId,
                priority: "URGENT",
                status: { not: "DONE" },
            },
            select: {
                id: true,
                title: true,
                dueDate: true,
            },
        });

        // 3. Upcoming deadlines (within 7 days)
        const upcomingDeadlines = await prisma.task.findMany({
            where: {
                assignedToId: userId,
                dueDate: {
                    gte: startOfToday(),
                    lte: addDays(new Date(), 7),
                },
                status: { not: "DONE" },
            },
            orderBy: {
                dueDate: "asc",
            },
            select: {
                id: true,
                title: true,
                dueDate: true,
            },
        });
      
        return {
            data: {
                taskCounts: {
                    todo: todoCount,
                    workingOn: workingOnCount,
                    done: doneCount,
                },
                completionRate,
                urgentTasks,
                upcomingDeadlines,
            },
        };
    } catch (err) {
        console.error("ERROR FETCHING DASHBOARD:", err);
        return { error: "Failed to fetch dashboard data" };
    }
};