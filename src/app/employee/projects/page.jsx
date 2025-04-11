'use client'
import { useEffect, useState } from "react";
import ProjectCard from "../../../components/ProjectCard";
import { fetchUserProjects } from "../../../services/project";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedLoader from '../../../components/AnimatedLoader'

export default function Project() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getProjects();
    }, [])

    const getProjects = async () => {
        try {
            const reponse = await fetchUserProjects()
            setProjects(reponse?.data || [])
        }
        catch (err) {
            console.log(err)
            setProjects([])
        }
        finally {
            setIsLoading(false)
        }
    }

       if (isLoading) return <AnimatedLoader />;


    return (
        <div className="container mx-auto px-4 rounded-xl py-3 bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-5">
                <motion.h1
                    className="text-3xl font-bold text-gray-800"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Projects
                </motion.h1>
            </h1>

            <AnimatePresence>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
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

                    {projects.map((project,index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <ProjectCard key={project.id} project={project} />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
