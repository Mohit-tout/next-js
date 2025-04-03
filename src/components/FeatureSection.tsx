import { TaskFeature1, TaskFeature2 } from "@/assets";
import Image from "next/image";


export default function TaskManagementSection() {
    return (
        <section className="bg-gray-50 dark:bg-gray-800">
            <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
                {/* Row 1 */}
                <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                    <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Streamline Your Task Management
                        </h2>
                        <p className="mb-8 font-light lg:text-xl">
                            Organize, track, and manage tasks effortlessly. Improve team collaboration, automate workflows, and enhance productivity.
                        </p>
                        {/* Features List */}
                        <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                            {["Task Prioritization", "Real-time Collaboration", "Automated Workflow Management"].map((feature, index) => (
                                <li key={index} className="flex space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Image src={TaskFeature1} alt="Task management dashboard" className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" />
                </div>
                
                {/* Row 2 */}
                <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                    <Image src={TaskFeature2} alt="Team collaboration feature" className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" />
                    <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Enhance Team Collaboration
                        </h2>
                        <p className="mb-8 font-light lg:text-xl">
                            Keep your team aligned with shared boards, real-time updates, and integrations with your favorite tools.
                        </p>
                        {/* Features List */}
                        <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                            {["Kanban Boards", "Customizable Workflows", "Progress Tracking", "Deadline Reminders", "Third-party Integrations"].map((feature, index) => (
                                <li key={index} className="flex space-x-3">
                                    <svg className="flex-shrink-0 w-5 h-5 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                    </svg>
                                    <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
