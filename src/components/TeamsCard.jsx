import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { SiGooglechat } from "react-icons/si"
const TeamCard = ({ member }) => {
    return (
        <div className="card">
        <img
            src={member?.user?.profileImage || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'}
            alt={member?.user?.firstName}
            className="w-24 h-24 rounded-full object-cover transition duration-200 hover:scale-110"
        />
        <div className="text-gray-900 text-lg font-bold">{`${member?.user?.firstName} ${member?.user?.lastName}`}</div>
        <div className="text-purple-600">{member?.user?.designation}</div>
    
        {/* Display the projects list */}
        <div className="text-gray-600 text-center">
            This is working on Project{' '}
            {member && member?.projects.length > 0 ? (
                member?.projects.map((project, index) => (
                    <span key={project?.id}>
                        {project?.projectName}
                        {index <  member?.projects.length - 1 ? ', ' : '.'} {/* Add a comma except for the last project */}
                    </span>
                ))
            ) : (
                <span>No projects assigned.</span> 
            )}
        </div>
    
        <div className="flex items-center justify-center gap-3 mt-2 w-auto h-5 text-gray-600">
            <SiGooglechat className="text-md cursor-pointer transition duration-200 hover:text-gray-400" />
            <HiOutlineMail className="text-xl cursor-pointer transition duration-200 hover:text-gray-400" />
            <FaLinkedin className="text-lg cursor-pointer transition duration-200 hover:text-gray-400" />
        </div>
    </div>
    
    );
};

export default TeamCard;



