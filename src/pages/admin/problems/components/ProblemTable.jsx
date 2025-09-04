
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProblemTable = ({ problems, onDelete }) => {

  // Difficulty level ke liye behtar color scheme
  const getDifficultyClass = (level) => {
    switch (level) {
      case 'Easy': return 'bg-green-100 text-green-800 ring-1 ring-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 ring-1 ring-red-200';
      default: return 'bg-gray-100 text-gray-800 ring-1 ring-gray-200';
    }
  };

  return (
    // Yeh "div" mobile par card layout aur desktop par table layout ko handle karega
    <div className="w-full">
      {/* Table for Desktop (md screens and up) */}
      <div className="hidden md:block">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Field</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Difficulty</th>
              <th className="py-3 px-6 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {problems.map(problem => (
              <tr key={problem.id} className="transition-all duration-200 hover:bg-gray-50 hover:shadow-md">
                <td className="py-4 px-6 font-medium text-gray-900">{problem.title}</td>
                <td className="py-4 px-6 text-gray-700">{problem.fieldName}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyClass(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-center items-center gap-4">
                    <Link to={`/admin/problems/edit/${problem.id}`} className="text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                      <FaEdit size={18} />
                    </Link>
                    <button onClick={() => onDelete(problem)} className="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card List for Mobile (up to md screens) */}
      <div className="md:hidden space-y-4 p-4">
        {problems.map(problem => (
          <div key={problem.id} className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{problem.title}</h3>
                <p className="text-sm text-gray-500">{problem.fieldName}</p>
              </div>
              <span className={`mt-1 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyClass(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end items-center gap-4">
              <Link to={`/admin/problems/edit/${problem.id}`} className="flex items-center gap-2 py-2 px-4 rounded-lg bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                <FaEdit /> Edit
              </Link>
              <button onClick={() => onDelete(problem)} className="flex items-center gap-2 py-2 px-4 rounded-lg bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-600 transition-colors">
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemTable;