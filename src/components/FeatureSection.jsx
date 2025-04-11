'use client';

import { TaskFeature1, TaskFeature2 } from "@/assets";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TaskManagementSection() {
    // Animation variants
    const variants = {
        slideLeft: {
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
        },
        zoomIn: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
        },
        fadeRight: {
            hidden: { opacity: 0, x: 60 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
        },
        slideUp: {
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
        },
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-800">
            <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-0 lg:px-6">
                
                {/* Row 1 */}
                <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                    {/* Text */}
                    <motion.div
                        className="text-gray-500 sm:text-lg dark:text-gray-400"
                        variants={variants.slideLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Streamline Your Task Management
                        </h2>
                        <p className="mb-8 font-light lg:text-xl">
                            Organize, track, and manage tasks effortlessly. Improve team collaboration, automate workflows, and enhance productivity.
                        </p>
                        <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                            {["Task Prioritization", "Real-time Collaboration", "Automated Workflow Management"].map((feature, index) => (
                                <li key={index} className="flex space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex"
                        variants={variants.zoomIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <Image src={TaskFeature1} alt="Task management dashboard" />
                    </motion.div>
                </div>

                {/* Row 2 */}
                <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                    
                    {/* Image */}
                    <motion.div
                        className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex"
                        variants={variants.fadeRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <Image src={TaskFeature2} alt="Team collaboration feature" />
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        className="text-gray-500 sm:text-lg dark:text-gray-400"
                        variants={variants.slideUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Enhance Team Collaboration
                        </h2>
                        <p className="mb-8 font-light lg:text-xl">
                            Keep your team aligned with shared boards, real-time updates, and integrations with your favorite tools.
                        </p>
                        <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                            {["Kanban Boards", "Customizable Workflows", "Progress Tracking", "Deadline Reminders", "Third-party Integrations"].map((feature, index) => (
                                <li key={index} className="flex space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
