
import React from 'react';
// ===== 1. Naya icon FaTachometerAlt import karein =====
import { 
  FaUsers, FaBook, FaClipboardList, FaExclamationTriangle, FaUserPlus, 
  FaPlusCircle, FaFlag, FaArrowRight, FaTachometerAlt 
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './DashboardPage.module.css';

// Data waise hi rahega
const statsData = [
  { title: "Total Users", value: "1,250", icon: <FaUsers className="text-blue-500 text-3xl" />, color: "blue", delay: styles.delay1 },
  { title: "Total Skills", value: "25", icon: <FaBook className="text-green-500 text-3xl" />, color: "green", delay: styles.delay2 },
  { title: "Total Problems", value: "310", icon: <FaClipboardList className="text-yellow-500 text-3xl" />, color: "yellow", delay: styles.delay3 },
  { title: "Pending Submissions", value: "12", icon: <FaExclamationTriangle className="text-red-500 text-3xl" />, color: "red", delay: styles.delay4 },
];
const activityData = [
  { icon: <FaUserPlus className="text-blue-500" />, user: 'Ali Khan', action: 'registered for Full Stack Developer.', time: '2 hours ago' },
  { icon: <FaPlusCircle className="text-green-500" />, user: 'Admin', action: 'added a new problem "Two Sum".', time: '5 hours ago' },
  { icon: <FaFlag className="text-red-500" />, user: 'Sara Ahmed\'s', action: 'submission was flagged for review.', time: '1 day ago' },
];
const chartData = [ { name: 'Mon', signups: 12 }, { name: 'Tue', signups: 19 }, { name: 'Wed', signups: 8 }, { name: 'Thu', signups: 22 }, { name: 'Fri', signups: 15 }, { name: 'Sat', signups: 30 }, { name: 'Sun', signups: 25 },];


// Reusable components waise hi rahenge
const StatCard = ({ icon, title, value, color, delay }) => (
  <div className={`bg-white p-5 rounded-2xl shadow-lg flex items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${styles.animateFadeInUp} ${delay}`}>
    <div className={`p-4 rounded-xl mr-4 bg-${color}-100`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-500 font-semibold">{title}</p>
      <p className="text-2xl sm:text-3xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);
const ActivityItem = ({ icon, user, action, time }) => (
  <li className="relative flex items-start pb-6">
    <div className="absolute left-4 top-5 h-full w-px bg-gray-200"></div>
    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white ring-8 ring-white">
      {icon}
    </div>
    <div className="ml-4">
      <p className="text-sm text-gray-700">
        <span className="font-bold">{user}</span> {action}
      </p>
      <p className="mt-1 text-xs text-gray-400">{time}</p>
    </div>
  </li>
);

// ======================================================
// MAIN DASHBOARD COMPONENT MEIN TABDEELIYAN
// ======================================================
const DashboardPage = () => {
  return (
    // ===== 2. Upar se padding kam kar di gai hai (p-4 se pt-0) =====
    <div className="p-4 pt-0 sm:p-6 sm:pt-2 space-y-6 sm:space-y-8">
      
      {/* ===== 3. Heading ke sath icon add kar diya gaya hai ===== */}
      <div className={`flex items-center gap-4 ${styles.animateFadeInUp}`}>
        <FaTachometerAlt className="text-3xl sm:text-4xl text-gray-700" />
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Dashboard</h2>
      </div>

      {/* Baaki sab kuch waise hi rahega */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {statsData.map(stat => <StatCard key={stat.title} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className={`lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl shadow-lg ${styles.animateFadeInUp} ${styles.delay5}`}>
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">User Signups (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12}/>
              <Tooltip />
              <Bar dataKey="signups" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`bg-white p-4 sm:p-6 rounded-2xl shadow-lg ${styles.animateFadeInUp} ${styles.delay5}`}>
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">Recent Activity</h3>
          <ul className="relative">
            {activityData.map((activity, index) => <ActivityItem key={index} {...activity} />)}
          </ul>
          <button className="w-full mt-4 flex items-center justify-center gap-2 rounded-lg bg-gray-50 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors">
            View All
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;