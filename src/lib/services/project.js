import { prisma } from "@/lib/prisma";
import { paginate } from "../pagination";

export const getProjects = async (userId, page = 1, pageSize = 10) => {

  try {
    const { skip, take } = paginate(page, pageSize);
    const projects = await prisma.projectAssignment.findMany({
      where: { userId },
      skip,
      take,
      include: {
        project: {
          select: {
            id: true,
            name: true,
            description: true,
            startDate: true,
            endDate: true,
            progress: true,
            status: true,
            liveUrl: true,
            qaUrl: true,
            assignedUsers: {
              select: {
                user: { select: { firstName: true } },
              },
            },
          },
        },
      },
    });

    if (!projects.length) {
      const emptyPagination = {
        totalCount: 0,
        totalPages: 0,
        currentPage: page,
      };

      return {
        data: [],
        error: null,
        pagination: emptyPagination,
      };
    }

    const formattedProjects = projects.map(({ project }) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate || 'Ongoing',
      progress: project.progress,
      status: project.status || 'Maintenance',
      team: project.assignedUsers.map((a) => a.user.firstName),
      liveUrl: project.liveUrl,
      qaUrl: project.qaUrl,
    }));

    // Fetch the total count of projects to calculate total pages
    const totalProjects = await prisma.projectAssignment.count({
      where: { userId },
    });

    const totalPages = Math.ceil(totalProjects / pageSize);

    // Pagination info
    const pagination = {
      totalCount: totalProjects,
      totalPages: totalPages,
      currentPage: page,
      pageSize,
    };

    return {
      data: formattedProjects,
      error: null,
      pagination,
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { data: null, error: 'Failed to fetch projects', pagination: {} };
  }
};