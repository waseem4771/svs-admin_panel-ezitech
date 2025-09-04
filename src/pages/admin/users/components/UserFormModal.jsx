
import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaUserEdit, FaSpinner } from 'react-icons/fa';

const UserFormModal = ({ isOpen, onClose, onSave, user, isLoading }) => {
  const [formData, setFormData] = useState({ name: '', email: '', field: '' });

  useEffect(() => {
    if (isOpen) {
      if (user) {
        setFormData({ name: user.name, email: user.email, field: user.field });
      } else {
        setFormData({ name: '', email: '', field: '' });
      }
    }
  }, [user, isOpen]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...user, ...formData });
  };

  if (!isOpen) return null;

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
      <div className="bg-slate-50 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 rounded-t-xl">
          <div className="flex items-center gap-3">
            {user ? <FaUserEdit className="text-blue-500" /> : <FaUserPlus className="text-blue-500" />}
            <h3 className="text-lg font-bold text-gray-800">{user ? 'Edit User' : 'Add New User'}</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Field</label>
              <input
                type="text"
                name="field"
                value={formData.field}
                onChange={handleChange}
                className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required
              />
            </div>
          </div>
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

export default UserFormModal;