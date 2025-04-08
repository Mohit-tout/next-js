import { prisma } from "@/lib/prisma";
import client from "../redis";
import { paginate } from "../pagination";

export const getProjects = async (userId, page = 1, pageSize = 10) => {
  const cacheKeyProjects = `user_projects_${userId}_page_${page}_size_${pageSize}`;
  const cacheKeyPagination = `user_projects_${userId}_pagination_${page}_size_${pageSize}`;

  try {
    const cachedData = await client.get(cacheKeyProjects);
    const cachedPagination = await client.get(cacheKeyPagination);

    if (cachedData && cachedPagination) {
      console.log('Data and pagination from cache');
      return {
        data: JSON.parse(cachedData),
        error: null,
        pagination: JSON.parse(cachedPagination),
      };
    }

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

      await client.setEx(cacheKeyProjects, 60, JSON.stringify([]));
      await client.setEx(cacheKeyPagination, 60, JSON.stringify(emptyPagination));

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

    // Cache the result for projects and pagination for 1 hour
    await client.setEx(cacheKeyProjects, 3600, JSON.stringify(formattedProjects));

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

    // Cache pagination info
    await client.setEx(cacheKeyPagination, 3600, JSON.stringify(pagination));

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