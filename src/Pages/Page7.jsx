import React, { useEffect, useState } from 'react';

const Page7 = () => {
  const [buttonPosition, setButtonPosition] = useState({ top: '50%', left: '50%' });
  const [warningMessage, setWarningMessage] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isCircleVisible, setIsCircleVisible] = useState(false);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

  // Check if the screen is too small (less than 500px in width or height)
  const checkSmallScreen = () => {
    if (window.innerWidth < 500 || window.innerHeight < 500) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  // Check if the device has touch capabilities
  const checkTouchDevice = () => {
    if ('ontouchstart' in document.documentElement) {
      setIsTouchDevice(true);
    }
  };

  // Handle mouse move for button avoidance and circle tracking
  const handleMouseMove = (e) => {
    if (isTouchDevice || isSmallScreen) return;

    // Move the circle with the cursor
    if (isCircleVisible) {
      setCirclePosition({ x: e.clientX, y: e.clientY });
    }

    // Move button if it's visible
    if (isButtonVisible) {
      const button = document.getElementById('movable-button');
      const buttonRect = button.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow(e.clientX - (buttonRect.left + buttonRect.width / 2), 2) +
        Math.pow(e.clientY - (buttonRect.top + buttonRect.height / 2), 2)
      );

      // If the mouse is close to the button, move it
      if (distance < 50) {
        const newTop = Math.random() * (window.innerHeight - 100) + 'px'; // 100px is the size of the button
        const newLeft = Math.random() * (window.innerWidth - 150) + 'px'; // 150px is the width of the button

        setButtonPosition({
          top: newTop,
          left: newLeft,
        });
      }
    }
  };

  // Handle button click
  const handleButtonClick = () => {
    setIsButtonVisible(false);
    setIsCircleVisible(true);
  };

  // Effect for window resize and device checks
  useEffect(() => {
    checkSmallScreen();
    checkTouchDevice();

    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isCircleVisible, isButtonVisible]);

  // Handle window resize
  useEffect(() => {
    window.addEventListener('resize', checkSmallScreen);
    return () => {
      window.removeEventListener('resize', checkSmallScreen);
    };
  }, []);

  // Add warning if the screen is small or if it's a touch device
  useEffect(() => {
    if (isTouchDevice) {
      setWarningMessage('Touch screen devices are not supported.');
    } else if (isSmallScreen) {
      setWarningMessage('Screen too small.');
    } else {
      setWarningMessage(''); // Clear warning if none of the conditions are met
    }
  }, [isTouchDevice, isSmallScreen]);

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      {/* Warning Message */}
      {warningMessage && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-lg shadow-lg z-10">
          {warningMessage}
        </div>
      )}

      {/* Main Button */}
      {isButtonVisible && (
        <button
          id="movable-button"
          style={{
            top: buttonPosition.top,
            left: buttonPosition.left,
          }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 p-4 bg-green-500 text-black border-0 text-lg shadow-2xl cursor-pointer transition-all"
          onClick={handleButtonClick}
          tabIndex="-1"
        >
          Click Here !
        </button>
      )}

      {/* Circle (Visible after Button Click) */}
      {isCircleVisible && (
        <div
          style={{
            position: 'fixed',
            top: circlePosition.y,
            left: circlePosition.x,
            transform: 'translate(-50%, -50%)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            pointerEvents: 'none',
            mixBlendMode: 'difference',
            zIndex: 9999,
          }}
        ></div>
      )}
    </div>
  );
};

export default Page7;
