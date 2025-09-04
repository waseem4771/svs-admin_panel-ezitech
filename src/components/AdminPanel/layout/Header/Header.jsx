
// import React, { useState, useEffect, useRef } from 'react';
// import { FaUserCircle, FaSignOutAlt, FaBars, FaCog } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import YourLogo from '/Users/wasee/reacttut/skill/public/images/ezitech2.png'; 
// import ProfileModal from './ProfileModal';

// const Header = ({ toggleSidebar, adminName = 'Admin' }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
//   const [profileImage, setProfileImage] = useState(null); // Profile image ki state
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleProfileSave = (newImage) => {
//     setProfileImage(newImage); // Nayi image ko state mein save karein
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-30 flex items-center justify-between bg-white px-3 shadow-md h-16 md:h-20 md:px-4">
        
//         <div className="flex items-center gap-3 md:gap-4">
//           <button 
//             onClick={toggleSidebar} 
//             className="text-gray-500 transition-colors hover:text-blue-600 focus:outline-none md:hidden"
//             aria-label="Toggle Sidebar"
//           >
//             <FaBars size={24} />
//           </button>
//           <Link to="/admin/dashboard" className="flex items-center">
//             <img src={YourLogo} alt="Skill Verification" className="w-auto h-10 md:h-12" /> 
//           </Link>
//         </div>

//         <div className="relative" ref={dropdownRef}>
//           <button 
//             onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
//             className="flex items-center rounded-full text-gray-700 transition-all duration-300 hover:bg-gray-100 p-1"
//           >
//             <span className="hidden font-medium sm:inline-block mx-3">Welcome, {adminName}</span>
//             {/* Profile image ya default icon dikhayein */}
//             {profileImage ? (
//               <img src={profileImage} alt="Admin" className="h-10 w-10 rounded-full object-cover" />
//             ) : (
//               <FaUserCircle className="h-10 w-10 text-gray-500" />
//             )}
//           </button>

//           {isDropdownOpen && (
//             <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5">
//               <div className="py-1">
//                 <div className="px-4 py-3 border-b">
//                   <p className="text-sm font-semibold text-gray-800">{adminName}</p>
//                   <p className="truncate text-xs text-gray-500">admin@example.com</p>
//                 </div>
//                 {/* Profile Settings ka naya link */}
//                 <button
//                   onClick={() => {
//                     setIsProfileModalOpen(true);
//                     setIsDropdownOpen(false);
//                   }}
//                   className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                 >
//                   <FaCog className="mr-3" />
//                   Profile Settings
//                 </button>
//                 <a href="#" className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
//                   <FaSignOutAlt className="mr-3" />
//                   Logout
//                 </a>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Modal ko yahan render karein */}
//       <ProfileModal 
//         isOpen={isProfileModalOpen}
//         onClose={() => setIsProfileModalOpen(false)}
//         currentImage={profileImage}
//         onSave={handleProfileSave}
//       />
//     </>
//   );
// };

// export default Header;











import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaSignOutAlt, FaBars, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// ===== 1. لوگو کو امپورٹ کرنے والی لائن کو ہٹا دیں =====
// import YourLogo from '/Users/wasee/reacttut/skill/public/images/ezitech2.png'; 
import ProfileModal from './ProfileModal';

const Header = ({ toggleSidebar, adminName = 'Admin' }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileSave = (newImage) => {
    setProfileImage(newImage);
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white px-3 shadow-md h-16 md:h-20 md:px-4">
        
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={toggleSidebar} 
            className="text-gray-500 transition-colors hover:text-blue-600 focus:outline-none md:hidden"
            aria-label="Toggle Sidebar"
          >
            <FaBars size={24} />
          </button>
          <Link to="/admin/dashboard" className="flex items-center">
            {/* ===== 2. <img> کے src کو براہ راست پاتھ دیں ===== */}
            <img src="/images/ezitech2.png" alt="Skill Verification" className="w-auto h-10 md:h-12" /> 
          </Link>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            className="flex items-center rounded-full text-gray-700 transition-all duration-300 hover:bg-gray-100 p-1"
          >
            <span className="hidden font-medium sm:inline-block mx-3">Welcome, {adminName}</span>
            {profileImage ? (
              <img src={profileImage} alt="Admin" className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <FaUserCircle className="h-10 w-10 text-gray-500" />
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-semibold text-gray-800">{adminName}</p>
                  <p className="truncate text-xs text-gray-500">admin@example.com</p>
                </div>
                <button
                  onClick={() => {
                    setIsProfileModalOpen(true);
                    setIsDropdownOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaCog className="mr-3" />
                  Profile Settings
                </button>
                <a href="#" className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <FaSignOutAlt className="mr-3" />
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentImage={profileImage}
        onSave={handleProfileSave}
      />
    </>
  );
};

export default Header;