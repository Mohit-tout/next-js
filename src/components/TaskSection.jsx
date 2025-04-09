import { CalendarDays, Flag } from 'lucide-react';
import './TaskSection.scss';
import moment from 'moment';
import { useEffect, useState } from 'react';

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
            // ✅ API call - Only if success, update local state
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
            setDraggedTask(null); // always reset after drop
        }
    };

    const renderTasks = (taskList) => {
        const sortedTasks = [...taskList].sort((a, b) => {
            const aPriority = priorityOrder[a.priority?.toLowerCase()] || 4;
            const bPriority = priorityOrder[b.priority?.toLowerCase()] || 4;
            return aPriority - bPriority;
        });

        return sortedTasks.map(task => (
            <div
                className="task"
                draggable="true"
                key={task.id}
                onDragStart={() => handleDragStart(task)}
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
                            <span>
                                {moment(task.dueDate).format('MMM DD, YYYY - hh:mm A')}
                            </span>
                        </time>
                    </span>
                    <span>
                        <time dateTime={task.dueDate} className='flex gap-2'>
                            <Flag size={17} color='rgb(255, 197, 61)' />
                            <span>{task?.priority}</span>
                        </time>
                    </span>
                </div>
            </div>
        ));
    };

    return (
        <main className="project">
            <div className="project-tasks">
                {['TODO', 'WORKING_ON', 'DONE'].map(status => (
                    <div
                        className="project-column"
                        key={status}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(status)}
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
                    </div>
                ))}
            </div>
        </main>
    );
};

export default TaskSection;
