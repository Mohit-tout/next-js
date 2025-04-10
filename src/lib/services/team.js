export const getTeams = async (userId, filters = {}) => {
    try {
        const { projectId, designation } = filters;

        // Construct the where clause based on the filters
        const whereCondition = {
            userId,
            ...(projectId && { projectId }),
        };

        // Fetch the data with the whereCondition
        const userProjects = await prisma.projectAssignment.findMany({
            where: whereCondition,
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                        assignedUsers: {
                            where: {
                                NOT: { userId },
                                ...(designation && {
                                    user: { role: designation }, // Changed from designation to role
                                }),
                            },
                            select: {
                                user: {
                                    select: {
                                        id: true,
                                        firstName: true,
                                        lastName: true,
                                        dob: true,
                                        gender: true,
                                        role: true, // Changed from designation to role
                                        department: true,
                                        email: true,
                                        phoneNumber: true,
                                        profileImage: true,
                                        designation: true
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        // Create a map to store user info and their projects
        const userMap = new Map();

        for (const { project } of userProjects) {
            const { id: projectId, name: projectName, assignedUsers } = project;

            for (const { user } of assignedUsers) {
                if (!user) continue;

                const {
                    id,
                    firstName,
                    lastName,
                    dob,
                    gender,
                    department,
                    email,
                    phoneNumber,
                    profileImage,
                    designation
                } = user;

                // Add user info to the map
                if (!userMap.has(id)) {
                    userMap.set(id, {
                        user: {
                            id,
                            firstName,
                            lastName,
                            dob,
                            gender,
                            role: user.role, // Changed from designation to role
                            department,
                            email,
                            phoneNumber,
                            profileImage,
                            designation
                        },
                        projects: [],
                        _projectIds: new Set(),
                    });
                }

                const entry = userMap.get(id);
                if (!entry._projectIds.has(projectId)) {
                    entry.projects.push({ projectId, projectName });
                    entry._projectIds.add(projectId);
                }
            }
        }

        // Convert the userMap into an array of user data
        const data = Array.from(userMap.values()).map(({ _projectIds, ...rest }) => rest);

        return { data };
    } catch (err) {
        console.error("ERROR FETCHING TEAMS:", err);
        return { error: "Failed to fetch team members" };
    }
};