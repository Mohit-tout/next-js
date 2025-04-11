import { CalendarDays, Flag } from 'lucide-react';
import './TaskSection.scss';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TaskSection = ({ tasks = [], updateTaskStatus }) => {
    const [taskData, setTaskData] = useState(tasks);
    const [draggedTask, setDraggedTask] = useState(null);

    useEffect(() => {
        setTaskData(tasks);
    }, [tasks]);

    const groupedTasks = {
        TODO: taskData.filter(task => task.status === 'TODO'),
        WORKING_ON: taskData.filter(task => task.status === 'WORKING_ON'),
        DONE: taskData.filter(task => task.status === 'DONE'),
    };

    const priorityOrder = { high: 1, medium: 2, low: 3 };

    const handleDragStart = (task) => {
        setDraggedTask(task);
    };

    const handleDrop = async (newStatus) => {
        if (!draggedTask || draggedTask.status === newStatus) return;

        try {
            const success = await updateTaskStatus(draggedTask.id, newStatus);

            if (success) {
                const updatedTasks = taskData.map(t =>
                    t.id === draggedTask.id ? { ...t, status: newStatus } : t
                );
                setTaskData(updatedTasks);
            }
        } catch (err) {
            console.error('Failed to update status:', err);
        } finally {
            setDraggedTask(null);
        }
    };

    const renderTasks = (taskList) => {
        const sortedTasks = [...taskList].sort((a, b) => {
            const aPriority = priorityOrder[a.priority?.toLowerCase()] || 4;
            const bPriority = priorityOrder[b.priority?.toLowerCase()] || 4;
            return aPriority - bPriority;
        });

        return sortedTasks.map((task, index) => (
            <motion.div
                className="task"
                draggable="true"
                key={task.id}
                onDragStart={() => handleDragStart(task)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
            >
                <div className="task__tags">
                    <span className={`task__tag task__tag--${task.title?.toLowerCase().includes("copy") ? "copyright" : "design"}`}>
                        {task.title}
                    </span>
                    <button className="task__options">
                        <i className="fas fa-ellipsis-h" />
                    </button>
                </div>
                <p>{task.description}</p>
                {task.project?.name && (
                    <p className="text-sm text-gray-500 mb-1">
                        Project: <strong>{task.project.name}</strong>
                    </p>
                )}
                <div className="task__stats">
                    <span>
                        <time dateTime={task.dueDate} className='flex gap-2'>
                            <CalendarDays size={17} />
                            <span>{moment(task.dueDate).format('MMM DD, YYYY - hh:mm A')}</span>
                        </time>
                    </span>
                    <span>
                        <time className='flex gap-2'>
                            <Flag size={17} color='rgb(255, 197, 61)' />
                            <span>{task?.priority}</span>
                        </time>
                    </span>
                </div>
            </motion.div>
        ));
    };

    return (
        <main className="project">
            <motion.div
                className="project-tasks"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
            >
                {['TODO', 'WORKING_ON', 'DONE'].map((status, i) => (
                    <motion.div
                        className="project-column"
                        key={status}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(status)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                        <div className="project-column-heading">
                            <h2 className={`project-column-heading__title ${status.toLowerCase().replace('_', '-')}-heading`}>
                                {status.replace('_', ' ')}
                            </h2>
                            <button className="project-column-heading__options">
                                <i className="fas fa-ellipsis-h" />
                            </button>
                        </div>
                        {renderTasks(groupedTasks[status])}
                    </motion.div>
                ))}
            </motion.div>
        </main>
    );
};

export default TaskSection;
