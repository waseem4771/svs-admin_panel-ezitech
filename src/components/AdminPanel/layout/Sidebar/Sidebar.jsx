
import React from 'react';
import { NavLink } from 'react-router-dom';
// ===== 1. FaShieldAlt ko import se hata dein =====
import { 
  FaTachometerAlt, FaUsers, FaBook, FaClipboardList, FaTasks, FaTimes 
} from 'react-icons/fa';
import styles from './Sidebar.module.css';

const navItems = [
  { path: '/admin/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
  { path: '/admin/users', icon: FaUsers, label: 'User Management' },
  { path: '/admin/skills', icon: FaBook, label: 'Fields & Skills' },
  { path: '/admin/problems', icon: FaClipboardList, label: 'Problem Bank' },
  { path: '/admin/submissions', icon: FaTasks, label: 'Submissions' },
];

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      <aside
        className={`bg-gradient-to-b from-slate-900 to-slate-800 text-slate-300 w-64 h-screen p-4 flex flex-col fixed inset-y-0 left-0 z-40
                    md:translate-x-0 transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            {/* ===== 2. Icon ki jagah <img> tag istemal karein ===== */}
            <img 
              src="/images/ezitechl3.png" // Sahi path
              alt="SkillVerify Logo"
              className="h-9 w-auto" // Tasveer ka size set karein
            />
            <h1 className="text-2xl font-bold text-white tracking-wider">SkillVerify</h1>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-slate-400 hover:text-white transition-colors">
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="flex-grow">
          <ul>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                    }
                  >
                    <Icon className="text-xl" /> 
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SkillVerify</p>
          <p className="text-xs">All rights reserved.</p>
        </div>
      </aside>

      {isSidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black bg-opacity-60 z-30 md:hidden"></div>
      )}
    </>
  );
};

export default Sidebar;