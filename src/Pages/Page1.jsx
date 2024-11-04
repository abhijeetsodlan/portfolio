// src/Pages/Page1.jsx
import React from 'react';
import TiltText from '../components/TiltText';
import Page1buttom from '../components/Page1buttom';

const Page1 = () => {
  return (
    <div className="h-screen px-6 py-3.5 bg-white">
      <div
        className="h-full w-full rounded-[50px]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
            radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0) 60%),
            url('/images/profile3.jpeg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
