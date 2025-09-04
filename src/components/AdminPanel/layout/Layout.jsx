
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import AdminLayout from './AdminLayout/AdminLayout';
import DashboardPage from '../../../pages/admin/DashboardPage/DashboardPage';
import UserListPage from '../../../pages/admin/users/UserListPage';
import SkillManagementPage from '../../../pages/admin/skills/SkillManagementPage';
import ProblemListPage from '../../../pages/admin/problems/ProblemListPage';
import ProblemEditorPage from '../../../pages/admin/problems/ProblemEditorPage';
import ReviewSubmissionsPage from '../../../pages/admin/submissions/ReviewSubmissionsPage';
import SubmissionDetailPage from '../../../pages/admin/submissions/SubmissionDetailPage';

// ====================================================================
// 1. CONFIRMATION MODAL COMPONENT (created within this file)
// ====================================================================
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};


// ====================================================================
// MAIN LAYOUT COMPONENT
// ====================================================================
function Layout() {
  // --------------------------------------------------------------------
  // SECTION 1: DATA AND STATE MANAGEMENT 
  // --------------------------------------------------------------------
  const [problems, setProblems] = useState([
    { id: 1, title: 'Two Sum', description: 'Given an array...', fieldId: 1, difficulty: 'Easy', testCases: [{ input: '[2,7,11,15], 9', output: '[0,1]', hidden: false }] },
    { id: 2, title: 'Validate BST', description: 'Given a binary tree...', fieldId: 2, difficulty: 'Medium', testCases: [{ input: '[2,1,3]', output: 'true', hidden: false }] },
  ]);
  const [fields] = useState([
    { id: 1, name: 'Full Stack Developer' },
    { id: 2, name: 'Data Scientist' },
  ]);
  
  // Modal aur Loading ke liye nayi states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [problemToDelete, setProblemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useMemo behtareen performance ke liye
  const problemsWithFieldNames = useMemo(() => {
    return problems.map(problem => {
      const field = fields.find(f => f.id === problem.fieldId);
      return { ...problem, fieldName: field ? field.name : 'Unknown Field' };
    });
  }, [problems, fields]);

  // --------------------------------------------------------------------
  // SECTION 2: CORE FUNCTIONS (functions handling the data)
  // --------------------------------------------------------------------
  const handleSaveProblem = (problemData) => {
    setIsLoading(true);
    // Backend developer yahan API call add karega.
    // Hum 1 second ka delay daal rahe hain taake loading state nazar aaye.
    setTimeout(() => {
      const { fieldName, ...restOfProblemData } = problemData;
      if (restOfProblemData.id) {
        setProblems(problems.map(p => p.id === restOfProblemData.id ? restOfProblemData : p));
        toast.success(`Problem "${restOfProblemData.title}" updated successfully!`);
      } else {
        const newProblem = { ...restOfProblemData, id: Date.now() };
        setProblems([newProblem, ...problems]);
        toast.success(`New problem "${newProblem.title}" added successfully!`);
      }
      setIsLoading(false);
    }, 1000);
  };

  // Step 1: Delete button click hone par modal kholein
  const handleDeleteProblem = (problem) => {
    setProblemToDelete(problem); // Poora problem object save karein
    setIsModalOpen(true);
  };

  // Step 2: Modal mein "Confirm" click hone par asal delete function chalayein
  const confirmDelete = () => {
    if (!problemToDelete) return;
    
    setIsLoading(true);
    // Yahan bhi backend API call aayegi
    setTimeout(() => {
      setProblems(problems.filter(p => p.id !== problemToDelete.id));
      toast.error(`Problem "${problemToDelete.title}" has been deleted.`);
      setIsLoading(false);
      setIsModalOpen(false); // Modal band karein
      setProblemToDelete(null); // State reset karein
    }, 1000);
  };

  // --------------------------------------------------------------------
  // SECTION 3: JSX AND ROUTING (UI and Routing)
  // --------------------------------------------------------------------
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      {/* Confirmation Modal ko yahan render karein */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the problem "${problemToDelete?.title}"? This action cannot be undone.`}
      />

      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="users" element={<UserListPage />} />
          <Route path="skills" element={<SkillManagementPage />} />
          
          <Route 
            path="problems" 
            element={<ProblemListPage problems={problemsWithFieldNames} handleDeleteProblem={handleDeleteProblem} />} 
          />
          <Route 
            path="problems/new" 
            element={<ProblemEditorPage problems={problems} fields={fields} onSave={handleSaveProblem} isLoading={isLoading} />} 
          />
          <Route 
            path="problems/edit/:problemId" 
            element={<ProblemEditorPage problems={problems} fields={fields} onSave={handleSaveProblem} isLoading={isLoading} />} 
          />
          
          <Route path="submissions" element={<ReviewSubmissionsPage />} />
          <Route path="submissions/:submissionId" element={<SubmissionDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Layout;