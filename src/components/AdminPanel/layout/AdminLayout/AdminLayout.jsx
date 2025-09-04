
import React, { useState } from 'react'; 
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  // State to manage sidebar toggle (open/close)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 // This function will toggle the state (true to false and false to true)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-gray-100 min-h-screen relative md:flex"> {/* Flexbox desktop ke liye */}
      
      {/* State aur function ko props ke zariye Sidebar aur Header ko bhejें */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 md:ml-64"> {/* Margin-left sirf desktop par lagega */}
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-4 md:p-6"> {/* Mobile par thori kam padding */}
          {/* Yahan baaki pages ka content render hoga */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;















