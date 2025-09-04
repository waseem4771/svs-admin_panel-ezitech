
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaArrowLeft, FaUser, FaCode, FaClock } from 'react-icons/fa';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './SubmissionDetailPage.module.css'; // Animation CSS

// Dummy Data
const dummySubmission = {
  id: 1,
  userName: 'Sara Ahmed',
  problemTitle: 'Two Sum',
  submissionTime: '2025-09-03 10:15 AM',
  reason: 'Tab switched 5 times',
  code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
};`,
  output: 'Execution Successful. Output: [0, 1]',
  testCases: [ { name: 'Test Case 1', passed: true }, { name: 'Test Case 2', passed: true }, { name: 'Test Case 3 (Hidden)', passed: false } ],
  logs: [ { time: '00:05:12', message: 'Tab switched away' }, { time: '00:05:18', message: 'Tab switched back' } ]
};

// Responsive InfoCard
const InfoCard = ({ icon, title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow-md flex items-center">
    <div className="p-3 bg-gray-100 rounded-full mr-3 sm:mr-4">{icon}</div>
    <div>
      <p className="text-xs sm:text-sm text-gray-500 font-semibold">{title}</p>
      <p className="text-sm sm:text-base font-bold text-gray-800 truncate">{value}</p>
    </div>
  </div>
);

// ActionConfirmationModal waise hi rahega
const ActionConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmColor }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg">Cancel</button>
          <button onClick={onConfirm} className={`py-2 px-4 text-white rounded-lg ${confirmColor}`}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

const SubmissionDetailPage = () => {
  const { submissionId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null);

  const openConfirmationModal = (action) => { setActionToConfirm(action); setIsModalOpen(true); };
  const handleConfirm = () => { console.log(`${actionToConfirm} action confirmed!`); setIsModalOpen(false); setActionToConfirm(null); };

  return (
    <div className="space-y-6 p-4 sm:p-0">
      <div className={`${styles.animateFadeInUp} ${styles.delay1}`}>
        <Link to="/admin/submissions" className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
          <FaArrowLeft /> Back to Submissions List
        </Link>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">Submission Details #{submissionId}</h2>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${styles.animateFadeInUp} ${styles.delay2}`}>
        <InfoCard icon={<FaUser className="text-blue-500" />} title="User" value={dummySubmission.userName} />
        <InfoCard icon={<FaCode className="text-green-500" />} title="Problem" value={dummySubmission.problemTitle} />
        <InfoCard icon={<FaClock className="text-purple-500" />} title="Submitted At" value={dummySubmission.submissionTime} />
        <InfoCard icon={<FaExclamationTriangle className="text-red-500" />} title="Flag Reason" value={dummySubmission.reason} />
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${styles.animateFadeInUp} ${styles.delay3}`}>
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <h3 className="text-lg font-semibold text-gray-300 p-4 border-b border-gray-700">Submitted Code</h3>
            <SyntaxHighlighter language="javascript" style={atomDark} customStyle={{ margin: 0, borderRadius: '0 0 1rem 1rem', fontSize: '0.8rem' }}>
              {dummySubmission.code}
            </SyntaxHighlighter>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Output / Result</h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">{dummySubmission.output}</pre>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h3 className="text-lg font-semibold mb-3">Test Cases</h3>
            <ul className="space-y-2">
              {dummySubmission.testCases.map((tc, index) => (
                <li key={index} className={`flex items-center ${tc.passed ? 'text-green-600' : 'text-red-600'}`}>
                  {tc.passed ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />} {tc.name}: {tc.passed ? 'Passed' : 'Failed'}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h3 className="text-lg font-semibold mb-3">Anti-Cheat Logs</h3>
            <ul className="space-y-2 text-sm">
              {dummySubmission.logs.map((log, index) => (
                <li key={index} className="flex items-center text-yellow-600"><FaExclamationTriangle className="mr-2" /> [{log.time}] {log.message}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h3 className="text-lg font-semibold mb-3">Actions</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => openConfirmationModal('Approve')} className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold">Approve</button>
              <button onClick={() => openConfirmationModal('Reject')} className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold">Reject</button>
            </div>
          </div>
        </div>
      </div>
      
      <ActionConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        title={`Confirm ${actionToConfirm}`}
        message={`Are you sure you want to ${actionToConfirm?.toLowerCase()} this submission?`}
        confirmColor={actionToConfirm === 'Approve' ? 'bg-green-600' : 'bg-red-600'}
      />
    </div>
  );
};

export default SubmissionDetailPage;