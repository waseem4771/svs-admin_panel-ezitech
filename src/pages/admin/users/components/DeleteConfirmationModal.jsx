
import React, { useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

// Is modal ko ab zyada reusable banaya gaya hai
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, itemName }) => {

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
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
        <div className="p-6">
          <div className="flex items-start">
            {/* Warning Icon */}
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <FaExclamationTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-bold text-gray-900">
                {title || 'Confirm Deletion'}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {message || `Are you sure you want to delete "${itemName}"? This action cannot be undone.`}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 px-4 py-3 sm:px-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            Delete
          </button>
        </div>
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

export default DeleteConfirmationModal;
