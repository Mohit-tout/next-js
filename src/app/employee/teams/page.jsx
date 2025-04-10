'use client'
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchUserProjects } from "../../../services/project";
import TeamCard from "../../../components/TeamsCard";
import { fetchUserTeams } from "../../../services/team";
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

    if (isLoading) {
        return (
            <div>Loading...</div>
        );
    }



    const teamMembers = [
        {
            name: 'Olivia Rhye',
            title: 'Founder & CEO',
            img: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
            description: 'Former co-founder of Opendoor. Early staff at Spotify and Clearbit.',
        },
        {
            name: 'Phoenix Baker',
            title: 'Engineering Manager',
            img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            description: 'Lead engineering teams at Figma, Pitch, and Protocol Labs.',
        },
        // Duplicate entries (for demo) – You can replace/add more
        {
            name: 'Olivia Rhye',
            title: 'Founder & CEO',
            img: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
            description: 'Former co-founder of Opendoor. Early staff at Spotify and Clearbit.',
        },
    ];

    return <>
        <div className="container mx-auto px-4 rounded-xl py-3 bg-white min-h-screen">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-3xl font-bold text-gray-800">Teams</h1>

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

            </div>
            <div className="container mx-auto py-8 px-4">
                <div className="flex flex-col text-center gap-4 mb-8">
                    <div className="text-gray-900 text-3xl md:text-4xl font-bold">
                        Meet the team behind Throughout
                    </div>
                    <div className="text-gray-600 md:text-lg">
                        At <span className="font-semibold">Throughout Technologies Pvt. Ltd.</span>, we’re a team of passionate professionals—working both onsite and remotely—to build <span className="font-semibold">Throughout</span>, a powerful software designed to simplify and streamline your workflow.
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {teams.map((member, index) => (
                        <TeamCard key={index} member={member} />
                    ))}
                </div>
            </div>

        </div>

    </>
}


