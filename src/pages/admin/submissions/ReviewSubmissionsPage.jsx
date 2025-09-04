
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaFlag, FaBoxOpen } from 'react-icons/fa';
import styles from './ReviewSubmissionsPage.module.css'; // Animation CSS

// Dummy Data
const dummySubmissions = [
  { id: 1, userName: 'Sara Ahmed', problemTitle: 'Two Sum', submissionTime: '2025-09-03 10:15 AM', reason: 'Tab switched 5 times', status: 'Pending' },
  { id: 2, userName: 'Ali Khan', problemTitle: 'Validate BST', submissionTime: '2025-09-02 04:30 PM', reason: 'High idle time detected', status: 'Pending' },
  { id: 3, userName: 'Zainab Fatima', problemTitle: 'Trapping Rain Water', submissionTime: '2025-09-01 11:00 AM', reason: 'Copy-paste detected', status: 'Reviewed' },
];

// Status ke liye behtar color scheme
const getStatusClass = (status) => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200';
    case 'Reviewed': return 'bg-gray-100 text-gray-800 ring-1 ring-gray-200';
    default: return 'bg-gray-100 text-gray-800 ring-1 ring-gray-200';
  }
};

const EmptyState = ({ filter }) => (
  <div className="text-center py-16 px-6">
    <FaBoxOpen className="mx-auto text-6xl text-gray-300" />
    <h3 className="mt-4 text-xl font-semibold text-gray-700">No {filter} Submissions</h3>
    <p className="mt-2 text-sm text-gray-500">Looks like everything is clear for now.</p>
  </div>
);

const ReviewSubmissionsPage = () => {
  const [filter, setFilter] = useState('All');

  const filteredSubmissions = useMemo(() => {
    if (filter === 'All') return dummySubmissions;
    return dummySubmissions.filter(sub => sub.status === filter);
  }, [filter]);

  return (
    <div className="space-y-6">
      <div className={`flex items-center gap-3 ${styles.animateFadeInUp} ${styles.delay1}`}>
        <FaFlag className="text-3xl text-gray-700" />
        <h2 className="text-3xl font-bold text-gray-800">Review Submissions</h2>
      </div>
      
      <div className={`bg-white p-4 sm:p-6 rounded-2xl shadow-xl ${styles.animateFadeInUp} ${styles.delay2}`}>
        {/* Filter Tabs */}
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-6">
            {['All', 'Pending', 'Reviewed'].map(tab => (
              <button key={tab} onClick={() => setFilter(tab)}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  filter === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}>
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {filteredSubmissions.length > 0 ? (
          <div className="overflow-x-auto">
            {/* Table for Desktop */}
            <table className="hidden md:table min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase">Problem</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase">Reason</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="py-3 px-6 text-center text-xs font-semibold text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSubmissions.map(sub => (
                  <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6"><div className="font-medium text-gray-800">{sub.userName}</div><div className="text-xs text-gray-500">{sub.submissionTime}</div></td>
                    <td className="py-4 px-6 text-gray-700">{sub.problemTitle}</td>
                    <td className="py-4 px-6 text-red-600 font-semibold">{sub.reason}</td>
                    <td className="py-4 px-6"><span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(sub.status)}`}>{sub.status}</span></td>
                    <td className="py-4 px-6 text-center">
                      <Link to={`/admin/submissions/${sub.id}`} className="text-gray-400 hover:text-blue-600" title="View Details"><FaEye size={18} /></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Card List for Mobile */}
            <div className="md:hidden space-y-4">
              {filteredSubmissions.map(sub => (
                <div key={sub.id} className="bg-white p-4 rounded-lg shadow-md border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800">{sub.userName}</h3>
                      <p className="text-sm text-gray-500">{sub.problemTitle}</p>
                      <p className="text-xs text-gray-400 mt-1">{sub.submissionTime}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(sub.status)}`}>{sub.status}</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-red-600">{sub.reason}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t flex justify-end">
                    <Link to={`/admin/submissions/${sub.id}`} className="flex items-center gap-2 text-sm text-blue-600 font-semibold hover:text-blue-800">
                      View Details <FaEye />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState filter={filter} />
        )}
      </div>
    </div>
  );
};

export default ReviewSubmissionsPage;