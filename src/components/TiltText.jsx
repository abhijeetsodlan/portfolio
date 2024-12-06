import React, { useEffect, useRef, useState } from 'react';

const TiltText = () => {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });
  const textRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const target = textRef.current;
      if (!target) return;

      const { offsetWidth: width, offsetHeight: height } = target;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calculate the rotation based on cursor's distance from the window center
      const rotateX = ((centerY - e.clientY) / centerY) * 25;
      const rotateY = ((e.clientX - centerX) / centerX) * 25;

      setRotation({
        rotateX: Math.min(Math.max(rotateX, -25), 25),  // Cap rotation to -25 to 25
        rotateY: Math.min(Math.max(rotateY, -25), 25),  // Cap rotation to -25 to 25
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove); // Cleanup event listener
    };
  }, []);

  return (
    <div
      ref={textRef}
      className="uppercase font-[portfolio4] text-white px-14 mt-40 space-y-2 inline-block"
      style={{
        transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
        transition: 'transform 1s ease-out',
      }}
    >
      <h1 className="text-8xl font-[portfolio2] leading-tight">I Build Web.</h1>
      <h2 className="text-4xl font-[portfolio4] mt-4">Let’s Create Something</h2>
      <h2 className="text-4xl font-[portfolio4]">
        Extraordinary <span className="color-changing font-[portfolio2]">Together.</span>
      </h2>
    </div>
  );
};

export default TiltText;
