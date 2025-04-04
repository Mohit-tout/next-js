"use client";

import React from "react";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserRound } from "lucide-react";

const Testimonials: React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 4000,
    };

    const testimonials = [
        {
            quote:
                "This task management tool has transformed how we organize our projects. Highly recommended!",
            name: "John Doe",
            role: "Project Manager at XYZ Corp",
        },
        {
            quote:
                "A must-have tool for productivity. The seamless integration with our workflow is outstanding!",
            name: "Sarah Lee",
            role: "CEO at ABC Solutions",
        },
        {
            quote:
                "An excellent platform that has streamlined our team's workflow and collaboration.",
            name: "Emily Johnson",
            role: "Team Lead at Tech Innovators",
        },
        {
            quote:
                "Our company saw a significant boost in productivity after implementing this tool. Absolutely worth it!",
            name: "David Smith",
            role: "Operations Manager at Global Solutions",
        },
        {
            quote:
                "A user-friendly and efficient tool that helps us stay on top of our tasks effortlessly.",
            name: "Sophia Martinez",
            role: "Marketing Director at Bright Future Inc.",
        },
        {
            quote:
                "This platform has made remote work a breeze, allowing seamless communication and task management.",
            name: "James Wilson",
            role: "Remote Team Coordinator at WorkFlex",
        },
        {
            quote:
                "We've integrated this tool across all departments, and the results have been outstanding!",
            name: "Olivia Brown",
            role: "Chief Strategy Officer at Enterprise Solutions",
        },
    ];


    return (
        <section className="bg-gray-50 dark:bg-gray-800 py-12">
            <div className="max-w-screen-xl px-4 mx-auto text-center">
                <Slider {...settings}>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="px-6">
                            <figure className="max-w-screen-md mx-auto">
                                <svg
                                    className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                                    viewBox="0 0 24 27"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <blockquote>
                                    <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">
                                        &quot;{testimonial.quote}&quot;
                                    </p>
                                </blockquote>
                                <figcaption className="flex items-center justify-center mt-6 space-x-3">
                                    <UserRound className="w-10 h-10 text-gray-600 dark:text-gray-300 rounded-full bg-white p-1 border" />
                                    <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                        <div className="pr-3 font-medium text-gray-900 dark:text-white">
                                            {testimonial.name}
                                        </div>
                                        <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </figcaption>
                            </figure>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Testimonials;
