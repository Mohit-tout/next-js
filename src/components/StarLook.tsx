import { StartHeroImg } from "@/assets";
import Image from "next/image";

export default function StartLook() {

    return <>
        <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
                    Manage Tasks Efficiently & Boost Productivity
                </h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                    Stay organized and get more done with our powerful task management tool. Plan, track, and collaborate seamlessly—whether you&apos;re working solo or with a team.
                </p>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                    Take control of your workflow with our intuitive platform. Assign tasks, set priorities, track progress, and meet deadlines effortlessly.
                </p>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <Image src={StartHeroImg} alt="Task management illustration"/>
            </div>
        </div>
    </section>

    </>
}