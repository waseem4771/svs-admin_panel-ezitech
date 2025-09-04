
import React, { useState, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';

const ProfileModal = ({ isOpen, onClose, currentImage, onSave }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // Backend developer yahan API call add karega
    // Abhi ke liye hum sirf frontend state update kar rahe hain
    if (previewImage) {
      onSave(previewImage);
    }
    onClose(); // Modal band karein
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div 
      id="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
    >
      <div className="relative w-full max-w-md transform rounded-lg bg-white p-6 text-left shadow-xl transition-all">
        <h3 className="text-xl font-semibold leading-6 text-gray-900">
          Update Profile Picture
        </h3>
        <div className="mt-4 flex flex-col items-center gap-4">
          {/* Image Preview Area */}
          <div 
            className="relative h-40 w-40 cursor-pointer rounded-full bg-gray-200"
            onClick={() => fileInputRef.current.click()}
          >
            <img 
              src={previewImage || currentImage || 'https://via.placeholder.com/150'} 
              alt="Profile Preview" 
              className="h-full w-full rounded-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-40 opacity-0 transition-opacity hover:opacity-100">
              <FaCamera className="text-3xl text-white" />
            </div>
          </div>
          
          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/gif"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current.click()}
            className="rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
          >
            Choose Image
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={handleSave}
            disabled={!previewImage}
            className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;