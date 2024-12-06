import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 
import laravelImage from '../laravel.png'; 

gsap.registerPlugin(ScrollTrigger);  // Register ScrollTrigger plugin

const Page4 = () => {
 
  return (
    <div style={{ padding: '20px 20px 0 20px' }}>
      {/* Heading "Tools I Master" placed before the background image */}
      <div className="text-center mt-8 tools-heading">
       <h1 className="text-5xl pb-12 font-[portfolio3] text-black">
          Tools I Master
        </h1>
      </div>

      {/* Container with Background Image */}
      <div
        style={{
          backgroundImage: `url('images/astronaut.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '40px 60px',
          borderTopLeftRadius: '50px',
          borderTopRightRadius: '50px',
        }}
        className="text-white w-full"
      >
        {/* Left Side - Design Skills */}
        <div className="flex flex-col text-white design">
          <div className="flex items-center mb-8">
            <h1 className="text-6xl font-bold text-gray-600">Design</h1>
          </div>
          <ul className="space-y-4 text-2xl font-semibold">
            <li className="skill-item"><i className="ri-css3-fill text-3xl text-[#1572B6]  mr-2"></i> Tailwind CSS</li> {/* Blue */}
            <li className="skill-item"><i className="ri-brush-fill text-3xl text-[#5A2E4D] mr-2"></i> Material UI</li> {/* Dark Pink */}
            <li className="skill-item"><i className="ri-git-branch-fill text-3xl text-[#7B7B7B] mr-2"></i> GSAP</li> {/* Gray */}
            <li className="skill-item"><i className="ri-rainy-fill text-3xl text-[#3A4E60] mr-2"></i> Locomotive JS</li> {/* Dark Blue */}
            <li className="skill-item"><i className="ri-bootstrap-fill text-3xl text-[#563D7C] mr-2"></i> Bootstrap</li> {/* Purple */}
          </ul>
        </div>

        {/* Right Side - Development Skills */}
        <div className="flex flex-col text-white text-right dev">
          <div className="flex items-center mb-8">
            <h1 className="text-6xl font-bold text-gray-600">Development</h1>
          </div>
          <ul className="space-y-4 text-2xl font-semibold">
            <li className="skill-item"><i className="ri-javascript-fill text-3xl text-[#F7DF1E] mr-2"></i> JavaScript</li> {/* Yellow for JS */}
            <li className="skill-item"><i className="ri-reactjs-fill text-3xl text-[#61DBFB] mr-2"></i> React</li>
            <li className="skill-item"><i className="ri-php-line text-3xl text-[#777BB4] mr-2"></i> PHP</li> {/* Purple for PHP */}
            <li>
              <img src={laravelImage} alt="Laravel" className="w-8 h-8 mr-2 inline-block laravel-logo" />
              Laravel
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page4;
