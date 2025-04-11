'use client';

import { PieChart, Pie, Cell } from 'recharts';
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const COLORS = ['#22c55e', '#e5e7eb'];

const CompletionRateChart = ({ completionRate }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(completionRate), 300);
    return () => clearTimeout(timer);
  }, [completionRate]);

  const data = [
    { name: 'Completed', value: animatedValue },
    { name: 'Remaining', value: 100 - animatedValue },
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-gray-100 rounded-xl shadow p-6 flex items-center justify-between relative overflow-hidden">
      <div className="z-10">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Completion Rate
        </h2>
        <p className="mt-2 text-sm text-gray-500">{completionRate}% completed</p>
      </div>

      <div className="w-32 h-32 relative z-10">
        <PieChart width={130} height={130}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={60}
            startAngle={90}
            endAngle={-270}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
            isAnimationActive
            animationDuration={1000}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-semibold text-green-600">{completionRate}%</span>
        </div>
      </div>
    </div>
  );
};

export default CompletionRateChart;
