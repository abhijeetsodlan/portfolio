import React, { useState, useEffect, useRef } from 'react';
import 'remixicon/fonts/remixicon.css';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebarOnOutsideClick = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  // Add event listener when the sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener('mousedown', closeSidebarOnOutsideClick);
    } else {
      document.removeEventListener('mousedown', closeSidebarOnOutsideClick);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', closeSidebarOnOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <div className="relative">
      {/* Main Content */}
      <div className="fixed w-full z-10 p-20 flex items-center justify-end">
        
        {/* Sidebar Toggle Icon - Only show when sidebar is closed */}
        {!isSidebarOpen && (
          <i
            className="ri-more-2-fill text-4xl text-gray-600 cursor-pointer"
            onClick={toggleSidebar}
          ></i>
        )}
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 w-64 h-full bg-gray-800 bg-opacity-40 backdrop-blur-lg text-white transform transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} z-50`} // Increased z-index here
      >
        <div className="flex flex-col justify-center items-start h-full p-5 space-y-6">
          {/* LinkedIn */}
          <a
            href="https://in.linkedin.com/in/abhijeet-sodlan-28325a2a6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-xl hover:text-white transition duration-300"
          >
            <i className="ri-linkedin-box-fill text-2xl"></i>
            <span className="text-xl font-semibold">LinkedIn</span>
          </a>

          

          {/* Email */}
          <div className="flex items-center space-x-3 text-l">
            <i className="ri-mail-fill text-2xl"></i>
            <a
              href="mailto:abhijeetsodlan7@gmail.com"
              className="text-white hover:text-white truncate"
            >
              abhijeetsodlan7@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3 text-xl">
            <i className="ri-phone-fill text-2xl"></i>
            <span className="text-white">+91 8006800082</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
