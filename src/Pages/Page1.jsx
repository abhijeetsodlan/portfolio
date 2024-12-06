import React, { useState, useEffect } from 'react';
import TiltText from '../components/TiltText';
import Page1buttom from '../components/Page1buttom';

const greetings = ["Hello", "Bonjour", "Hola", "こんにちは", "안녕하세요", "Namaste"]; 

const Page1 = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showOverlay, setShowOverlay] = useState(true); 
  const [currentGreeting, setCurrentGreeting] = useState(0);

  // Update the isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Greeting sequence effect
  useEffect(() => {
    if (currentGreeting < greetings.length) {
      const timer = setTimeout(() => {
        setCurrentGreeting((prev) => prev + 1);
      }, 1000); // Display each greeting for 1 second
      return () => clearTimeout(timer);
    } else {
      // Hide overlay after the last greeting
      const hideTimer = setTimeout(() => setShowOverlay(false), 500);
      return () => clearTimeout(hideTimer);
    }
  }, [currentGreeting]);

  return (
    <div className="h-screen px-6 py-3.5 bg-white">
      {/* Fullscreen black overlay with greetings */}
      {showOverlay && (
        <div className={`overlay ${!showOverlay ? "hide" : ""}`}>
          <span className="greeting" style={{ animationDelay: `${currentGreeting * 1}s` }}>
            {greetings[currentGreeting]}
          </span>
        </div>
      )}

      {/* Overlay for mobile users */}
      {isMobile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black text-white text-2xl z-50" style={{ fontSize: '5vw', padding: '20px', textAlign: 'center' }}>
          Please open in a big screen
        </div>
      )}

      <div
        className="h-full w-full rounded-[50px]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
            radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 60%),
            url('${import.meta.env.BASE_URL}images/profile3.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? '73% center' : 'center', 
        }}
      >
        <h5
          className="text-4xl font-bold text-white px-14 py-16 tracking-wide"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Abhijeet
        </h5>

        <TiltText />
        <Page1buttom />
      </div>
    </div>
  );
};

export default Page1;
