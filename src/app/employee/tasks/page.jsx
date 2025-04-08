import TaskSection from "../../../components/TaskSection";

export default function MyTask() {

    return <>
        <div className="container mx-auto px-4 rounded-xl py-3 bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-5">My Tasks </h1>
            <TaskSection />
        </div>
    </>
}