export const DashboardCard = ({ title, count, color, icon }) => (
    <div
      className={`${color} p-6 rounded-xl shadow flex items-center justify-between transform hover:scale-105 transition-transform duration-300`}
    >
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold">{count}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
  