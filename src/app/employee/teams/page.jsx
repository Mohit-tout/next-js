'use client'
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchUserProjects } from "../../../services/project";
import TeamCard from "../../../components/TeamsCard";
import { fetchUserTeams } from "../../../services/team";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedLoader from '../../../components/AnimatedLoader'

export default function Tasks() {

    const [teams, setTeams] = useState([])
    const [projectsDropDrown, setProjectsDropDrown] = useState([]);
    const [filterFormValue, setFilterFormValue] = useState({
        projectId: '',
        designation: ''
    })
    const [isLoading, setIsLoading] = useState(true);
    const [firstTime, setIsFirstTime] = useState(true);

    useEffect(() => {
        getTeams(filterFormValue);
    }, [filterFormValue]);

    useEffect(() => {
        getProjects();
    }, []);

    const getTeams = async (filterFormValue) => {
        try {
            if (firstTime) {
                setIsLoading(true);
                setIsFirstTime(!firstTime)
            }
            const response = await fetchUserTeams(filterFormValue);
            setTeams(response?.data);
        }
        catch {
            setTeams([]);
        }
        finally {
            setIsLoading(false);
        }
    }

    const getProjects = async () => {
        try {
            const response = await fetchUserProjects();
            const tempProjectDropdown = response.data.map((project) => ({
                value: project.id,
                label: project.name
            }));
            setProjectsDropDrown(tempProjectDropdown);
        }
        catch (err) {
            console.log(err);
            setProjectsDropDrown([]);
        }
        finally {
            setIsLoading(false);
        }
    }

    if (isLoading) return <AnimatedLoader />;

    return <>
        <div className="container mx-auto px-4 rounded-xl py-3 bg-white min-h-screen">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-3xl font-bold text-gray-800">
                    <motion.h1
                        className="text-3xl font-bold text-gray-800"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Teams
                    </motion.h1>
                </h1>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >


                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-600" />

                        <select
                            className="border border-gray-300 px-3 py-2 rounded-md text-sm focus-visible:outline-none focus-visible:border-blue-500"
                            value={filterFormValue.projectId}
                            onChange={(e) => setFilterFormValue(prev => ({
                                ...prev,
                                projectId: e.target.value
                            }))}
                        >
                            <option value="">All Projects</option>
                            {projectsDropDrown.map((project) => (
                                <option key={project.value} value={project.value}>
                                    {project.label}
                                </option>
                            ))}
                        </select>

                        <select
                            className="border border-gray-300 px-3 py-2 rounded-md text-sm focus-visible:outline-none focus-visible:border-blue-500"
                            value={filterFormValue.designation}
                            onChange={(e) => setFilterFormValue(prev => ({
                                ...prev,
                                designation: e.target.value
                            }))}
                        >
                            <option value="">All Designations</option>
                            <option value="MANAGER">Manager</option>
                            <option value="TEAM_LEADER">Team Leader</option>
                            <option value="EMPLOYEE">Employee</option>
                        </select>
                    </div>
                </motion.div>
            </div>
            <div className="container mx-auto py-8 px-4">
                <motion.div
                    className="flex flex-col text-center gap-4 mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.div
                        className="text-gray-900 text-3xl md:text-4xl font-bold"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Meet the team behind Throughout
                    </motion.div>

                    <motion.div
                        className="text-gray-600 md:text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        At <span className="font-semibold">Throughout Technologies Pvt. Ltd.</span>, we’re a team of passionate professionals—working both onsite and remotely—to build <span className="font-semibold">Throughout</span>, a powerful software designed to simplify and streamline your workflow.
                    </motion.div>
                </motion.div>


                <AnimatePresence>
                    <motion.div
                        className="flex flex-wrap justify-center gap-4"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            },
                            exit: {}
                        }}
                    >
                        {teams.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <TeamCard member={member} />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    </>
}
