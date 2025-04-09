import { FaCalendarAlt, FaTools, FaUser, FaExternalLinkAlt } from "react-icons/fa";
import { getFormatedDate } from "../utils/date";

const ProjectCard = ({ project }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{project.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{project.description}</p>

            <div className="text-sm text-gray-500 mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                Start Date: <span className="ml-1 text-gray-700 font-medium">{getFormatedDate(project.startDate)}</span>
            </div>

            <div className="text-sm text-gray-500 mb-2 flex items-center">
                <FaTools className="mr-2 text-yellow-500" />
                Status: <span className="ml-1 text-gray-700 font-medium">{project.status}</span>
            </div>

            <div className="mt-4 mb-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full">
                    <div
                        className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="mt-4 flex items-center text-sm text-gray-600">
                <FaUser className="mr-2 text-indigo-500" />
                <span className="font-medium text-gray-700">Team:</span>&nbsp; {project.team.join(", ")}
            </div>

            {/* 🔗 Live URL */}
            {/* {project.liveUrl && (
                <div className="mt-4">
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-indigo-600 font-medium hover:underline hover:text-indigo-800 transition-colors"
                    >
                        <FaExternalLinkAlt className="mr-1" />
                        Live Preview
                    </a>
                </div>
            )} */}
            {(project.liveUrl || project.qaUrl) && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-3">
                    {project.liveUrl && (
                        <div className="md:justify-self-start">
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-green-600 font-medium hover:underline hover:text-green-800 transition-colors"
                            >
                                <FaExternalLinkAlt className="mr-1" />
                                Live Preview (Production)
                            </a>
                        </div>
                    )}

                    {project.qaUrl && (
                        <div className="md:justify-self-end">
                            <a
                                href={project.qaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-yellow-600 font-medium hover:underline hover:text-yellow-800 transition-colors"
                            >
                                <FaExternalLinkAlt className="mr-1" />
                                QA Preview (Testing)
                            </a>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
};

export default ProjectCard;
