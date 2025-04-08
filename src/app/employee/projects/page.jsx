'use client'
import { useEffect, useState } from "react";
import ProjectCard from "../../../components/ProjectCard";
import { fetchUserProjects } from "../../../services/project";

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

    return (
        <div className="container mx-auto px-4 rounded-xl py-3 bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-5">Projects </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
}
