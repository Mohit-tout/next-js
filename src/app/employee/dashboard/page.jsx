'use client'

import { AlertTriangle, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardCard } from '../../../components/DashboardCard';
import CompletionRateChart from '../../../components/CompletionRateChart';
import { useEffect, useState } from 'react';
import { fetchEmployeedashboardData } from '../../../services/employee/dashboard'
import AnimatedLoader from '../../../components/AnimatedLoader'

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getDashboardData();
  }, [])

  const getDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await fetchEmployeedashboardData();
      setData(response?.data)
    }
    catch (err) {
      setData([])
    }
    finally {
      setIsLoading(false)
    }
  }

  const { taskCounts, completionRate, urgentTasks, upcomingDeadlines } = data;

  if (isLoading) return <AnimatedLoader />;

  return (
    <div className="container mx-auto px-4 py-5 min-h-screen bg-white rounded-xl">
      <div className="space-y-6 max-w-5xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Dashboard
        </motion.h1>

        {/* Task Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <DashboardCard title="To-Do Tasks" count={taskCounts.todo} color="bg-[#ff7fab] text-white" icon="🧠" />
          <DashboardCard title="In Progress" count={taskCounts.workingOn} color="bg-[#ed5f00] text-white" icon="💻" />
          <DashboardCard title="Completed" count={taskCounts.done} color="bg-[#299764] text-white" icon="🚀" />

        </motion.div>

        {/* Completion Rate Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <CompletionRateChart completionRate={completionRate} />
        </motion.div>

        {/* Urgent Tasks */}
        <motion.div
          className={`border rounded-xl shadow p-6 transition-all duration-300 ${urgentTasks.length ? 'bg-red-100 border-red-400 animate-pulse' : 'bg-red-50 border-red-200'
            }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-red-700 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Urgent Tasks
          </h2>
          <div className="mt-4 space-y-3">
            {urgentTasks.length === 0 ? (
              <p className="text-sm text-gray-500">No urgent tasks 🎉</p>
            ) : (
              urgentTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg"
                >
                  {task.title}
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          className="bg-indigo-50 border border-indigo-200 rounded-xl shadow p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-indigo-700 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-indigo-600" />
            Upcoming Deadlines
          </h2>
          <div className="mt-4 space-y-3">
            {upcomingDeadlines.length === 0 ? (
              <p className="text-sm text-gray-500">No upcoming deadlines</p>
            ) : (
              upcomingDeadlines.map((task) => (
                <div
                  key={task.id}
                  className="bg-white p-4 border-l-4 border-indigo-400 shadow-sm rounded-md hover:bg-indigo-100 hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium">{task.title}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
