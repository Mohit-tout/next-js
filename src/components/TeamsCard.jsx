'use client';
import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { SiGooglechat } from "react-icons/si";
import { defaultGirlProfileImg, defaultBoyProfileImg } from "@/assets";
import Image from 'next/image';

const TeamCard = ({ member }) => {
    const profileImg =
        member?.user?.profileImage ||
        (member?.user?.gender === 'female' ? defaultGirlProfileImg : defaultBoyProfileImg);

    return (
        <div
            className="card flex flex-col items-center gap-2 p-4 bg-white shadow-md rounded-xl w-64 text-center"
        >
            <Image
                src={profileImg}
                alt={member?.user?.firstName}
                className="w-24 h-24 rounded-full object-cover transition duration-200 hover:scale-110"
            />

            <div className="text-gray-900 text-lg font-bold">
                {`${member?.user?.firstName} ${member?.user?.lastName}`}
            </div>

            <div className="text-purple-600">
                {member?.user?.designation}
            </div>

            <div className="text-gray-600 text-sm">
                This is working on Project{' '}
                {member && member?.projects.length > 0 ? (
                    member?.projects.map((project, index) => (
                        <span key={project?.id}>
                            {project?.projectName}
                            {index < member?.projects.length - 1 ? ', ' : '.'}
                        </span>
                    ))
                ) : (
                    <span>No projects assigned.</span>
                )}
            </div>

            <div className="flex items-center justify-center gap-3 mt-2 text-gray-600">
                <SiGooglechat className="text-md cursor-pointer transition duration-200 hover:text-gray-400" />
                <HiOutlineMail className="text-xl cursor-pointer transition duration-200 hover:text-gray-400" />
                <FaLinkedin className="text-lg cursor-pointer transition duration-200 hover:text-gray-400" />
            </div>
        </div>
    );
};

export default TeamCard;
