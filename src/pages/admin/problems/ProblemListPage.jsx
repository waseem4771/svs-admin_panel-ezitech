
import React, { useState, useMemo } from 'react';
// ===== 1. Naya icon FaClipboardList import karein =====
import { FaSearch, FaPlus, FaFilter, FaTimes, FaBoxOpen, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ProblemTable from './components/ProblemTable';
import DeleteConfirmationModal from '../users/components/DeleteConfirmationModal';
import styles from './ProblemListPage.module.css'; // Animation CSS

// Empty State component waise hi rahega
const EmptyState = () => (
  <div className="text-center py-16 px-6">
    <FaBoxOpen className="mx-auto text-6xl text-gray-300" />
    <h3 className="mt-4 text-xl font-semibold text-gray-700">No Problems Found</h3>
    <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filters, or add a new problem.</p>
    <Link to="/admin/problems/new" className="mt-6 inline-flex items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
      <FaPlus className="mr-2" /> Add New Problem
    </Link>
  </div>
);

const ProblemListPage = ({ problems, handleDeleteProblem }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  // Filters ki state waise hi rahegi
  const [searchTerm, setSearchTerm] = useState('');
  const [filterField, setFilterField] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');

  // useMemo functions waise hi rahenge
  const uniqueFields = useMemo(() => {
    const fields = new Set(problems.map(p => p.fieldName));
    return ['All', ...Array.from(fields)];
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesField = filterField === 'All' || problem.fieldName === filterField;
      const matchesDifficulty = filterDifficulty === 'All' || problem.difficulty === filterDifficulty;
      return matchesSearch && matchesField && matchesDifficulty;
    });
  }, [problems, searchTerm, filterField, filterDifficulty]);
  
  // Handler functions waise hi rahenge
  const openDeleteModal = (item) => { setItemToDelete(item); setIsDeleteModalOpen(true); };
  const handleConfirmDelete = () => { handleDeleteProblem(itemToDelete.id); setIsDeleteModalOpen(false); };
  const clearFilters = () => { setSearchTerm(''); setFilterField('All'); setFilterDifficulty('All'); };
  const areFiltersActive = searchTerm || filterField !== 'All' || filterDifficulty !== 'All';

  return (
    <div className="space-y-6">
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${styles.animateFadeInUp} ${styles.delay1}`}>
        
        {/* ===== 2. HEADING KE SATH ICON ADD KAR DIYA GAYA HAI ===== */}
        <div className="flex items-center gap-3">
          <FaClipboardList className="text-3xl text-gray-700" />
          <h2 className="text-3xl font-bold text-gray-800">Problem Bank</h2>
        </div>
        
        <Link to="/admin/problems/new" className="flex items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors self-end sm:self-center">
          <FaPlus className="mr-2" />
          <span className="hidden sm:inline">Add New Problem</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>

      <div className={`bg-white p-4 sm:p-6 rounded-2xl shadow-xl ${styles.animateFadeInUp} ${styles.delay2}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-end">
          <div className="relative sm:col-span-2 xl:col-span-2">
            <label className="text-sm font-medium text-gray-600">Search by title</label>
            <input type="text" placeholder="e.g., Two Sum" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <FaSearch className="absolute left-3 top-10 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Field</label>
            <select value={filterField} onChange={e => setFilterField(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              {uniqueFields.map(field => <option key={field}>{field}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Difficulty</label>
            <select value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)} className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All</option><option>Easy</option><option>Medium</option><option>Hard</option>
            </select>
          </div>
        </div>
        {areFiltersActive && (
          <button onClick={clearFilters} className="mt-4 flex items-center gap-2 text-sm text-gray-500 hover:text-red-500">
            <FaTimes /> Clear Filters
          </button>
        )}
      </div>
      
      <div className={`bg-white rounded-2xl shadow-xl overflow-hidden ${styles.animateFadeInUp} ${styles.delay3}`}>
        {filteredProblems.length > 0 ? (
          <ProblemTable problems={filteredProblems} onDelete={openDeleteModal} />
        ) : (
          <EmptyState />
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Problem"
        message={`Are you sure you want to delete the problem "${itemToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default ProblemListPage;