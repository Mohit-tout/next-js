'use client'
import { useEffect, useState } from "react";
import TaskSection from "../../../components/TaskSection";
import { fetchUserTasks, updateUserTasksStatus } from "../../../services/task";
import { fetchUserProjects } from "../../../services/project";
import { Filter } from "lucide-react";
import { motion } from 'framer-motion';
import AnimatedLoader from '../../../components/AnimatedLoader'
export default function MyTask() {
    const [tasks, setTasks] = useState([]);
    const [projectsDropDrown, setProjectsDropDrown] = useState([]);
    const [filterFormValue, setFilterFormValue] = useState({ projectId: '', priority: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [firstTime, setIsFirstTime] = useState(true);

    useEffect(() => {
        getTasks(filterFormValue);
    }, [filterFormValue]);

    useEffect(() => {
        getProjects();
    }, []);

    const getTasks = async (filterFormValue) => {
        try {
            if (firstTime) {
                setIsLoading(true);
                setIsFirstTime(false);
            } else {
                setIsLoading(true);
            }
            const response = await fetchUserTasks(filterFormValue);
            setTasks(response?.data);
        } catch {
            setTasks([]);
        } finally {
            setIsLoading(false);
        }
    };

    const getProjects = async () => {
        try {
            const response = await fetchUserProjects();
            const tempProjectDropdown = response.data.map((project) => ({
                value: project.id,
                label: project.name
            }));
            setProjectsDropDrown(tempProjectDropdown);
        } catch (err) {
            console.log(err);
            setProjectsDropDrown([]);
        } finally {
            setIsLoading(false);
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            await updateUserTasksStatus(taskId, { status: newStatus });
            return true;
        } catch (err) {
            console.log('API error:', err);
            return false;
        }
    };

      if (isLoading) return <AnimatedLoader />;

    return (
        <div
            className="container mx-auto px-4 rounded-xl py-3 bg-white min-h-screen"
        >
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-3xl font-bold text-gray-800">
                    <motion.h1
                        className="text-3xl font-bold text-gray-800"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        My Tasks
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
                            className="border border-gray-300 px-3 py-2 rounded-md text-sm"
                            value={filterFormValue.projectId}
                            onChange={(e) => setFilterFormValue(prev => ({ ...prev, projectId: e.target.value }))}
                        >
                            <option value="">All Projects</option>
                            {projectsDropDrown.map((project) => (
                                <option key={project.value} value={project.value}>
                                    {project.label}
                                </option>
                            ))}
                        </select>

                        <select
                            className="border border-gray-300 px-3 py-2 rounded-md text-sm"
                            value={filterFormValue.priority}
                            onChange={(e) => setFilterFormValue(prev => ({ ...prev, priority: e.target.value }))}
                        >
                            <option value="">All Priorities</option>
                            <option value="HIGH">High</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="LOW">Low</option>
                        </select>
                    </div>
                </motion.div>
            </div>
            <motion.div
                key="tasks"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <TaskSection tasks={tasks} updateTaskStatus={updateTaskStatus} />
            </motion.div>
        </div>
    );
}
