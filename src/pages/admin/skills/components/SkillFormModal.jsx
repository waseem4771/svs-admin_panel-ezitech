
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaSpinner } from 'react-icons/fa'; // FaSpinner ko import karein

const SkillFormModal = ({ isOpen, onClose, onSave, item, itemType, isLoading }) => {
  const [name, setName] = useState('');

  // Jab bhi modal khule, item ke hisab se name set ho jaye
  useEffect(() => {
    if (isOpen) {
      setName(item ? item.name : '');
    }
  }, [item, isOpen]);

  // 'Escape' key dabane par modal band karne ke liye
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...item, name });
  };

  // Agar modal open nahi hai, to kuch bhi render na karein
  if (!isOpen) return null;

  // Background par click karne se modal band ho
  const handleOverlayClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
    >
      {/* Modal Content with animation */}
      <div className="bg-slate-50 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 rounded-t-xl">
          <div className="flex items-center gap-3">
            {item ? <FaEdit className="text-blue-500" /> : <FaPlus className="text-blue-500" />}
            <h3 className="text-lg font-bold text-gray-800">
              {item ? `Edit ${itemType}` : `Add New ${itemType}`}
            </h3>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {itemType} Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
              placeholder={`Enter ${itemType.toLowerCase()} name`}
              autoFocus
            />
          </div>

          {/* Modal Footer (Action Buttons) */}
          <div className="flex justify-end gap-3 p-4 bg-gray-100 border-t border-gray-200 rounded-b-xl">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isLoading}
              className="py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:bg-blue-300 disabled:cursor-not-allowed">
              {isLoading ? (
                <> <FaSpinner className="animate-spin" /> Saving... </>
              ) : 'Save'}
            </button>
          </div>
        </form>
      </div>
      {/* CSS for animation */}
      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SkillFormModal;