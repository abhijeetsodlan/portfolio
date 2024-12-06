import React from 'react';
import 'remixicon/fonts/remixicon.css';

const Page5 = () => {
  return (
    <div style={{ padding: '0 20px 20px 20px' }}>

      {/* Outer Wrapper */}
      <div
        style={{
          backgroundImage: `url('images/Background_Anzo_Studio.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          borderBottomLeftRadius: '50px',
          borderBottomRightRadius: '50px',
        }}
        className="text-white h-full w-full"
      >
        {/* Left Section with Text */}
        <div className="leading-[11rem] max-w-[50%]">
          <h1 className="text-[10rem] font-[portfolio2]">
            Got <span className="text-gray-400">An</span>
          </h1>
          <h1 className="text-[10rem] font-[portfolio2]">Idea?</h1>
        </div>

        {/* Right Section with Contact Info */}
        <div className="flex flex-col items-start space-y-6 max-w-[40%] text-gray-300">
          <a
            href="https://in.linkedin.com/in/abhijeet-sodlan-28325a2a6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 text-xl hover:text-white transition duration-300"
          >
            <i className="ri-linkedin-box-fill text-3xl"></i>
            <span className="text-xl font-semibold">LinkedIn</span>
          </a>
          <div className="text-xl">
            <p>Email: <span className="text-gray-400">abhijeetsodlan7@gmail.com</span></p>
          </div>
          <div className="text-xl">
            <p>Phone: <span className="text-gray-400">+91 8006800082</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page5;
