// src/components/TiltText.jsx
import React, { useEffect, useRef, useState } from 'react';

const TiltText = () => {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });
  const textRef = useRef(null); // Create a ref to access the div dimensions

  const mousemoving = (e) => {
    const target = textRef.current; // The TiltText container
    if (!target) return; // Ensure the target exists

    const { offsetWidth: width, offsetHeight: height } = target;
    const { left, top } = target.getBoundingClientRect(); // Get the bounding rectangle

    // Calculate the mouse position relative to the top-left corner of the div
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;

    // Calculate the center of the div
    const centerX = width / 2;
    const centerY = height / 2;

    // Check if the cursor is within the bounds of the text (0 to width of the text)
    if (offsetX >= 0 && offsetX <= width && offsetY >= 0 && offsetY <= height) {
      // Limit the rotation to the width of the text and increase the tilt effect
      setRotation({
        rotateX: ((centerY - offsetY) / centerY) * 25, // Invert Y rotation
        rotateY: Math.min(Math.max(((offsetX - centerX) / centerX) * -25, -25), 25), // Increase Y rotation limit
      });
    }
  };

  const handleMouseLeave = () => {
    // Reset rotation when leaving the div
    setRotation({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={textRef}
      onMouseMove={mousemoving}
      onMouseLeave={handleMouseLeave}
      className="uppercase font-[portfolio4] text-white px-14 mt-40 space-y-2 inline-block" // Use inline-block to limit width to text
      style={{
        transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <h1 className="text-8xl font-[portfolio2] leading-tight">I Build Web.</h1>
      <h2 className="text-4xl font-[portfolio4] mt-4">Let’s Create Something</h2>
      <h2 className="text-4xl font-[portfolio4]">
        Extraordinary <span className="font-[portfolio2] text-pink-400">Together.</span>
      </h2>
    </div>
  );
};

export default TiltText;
