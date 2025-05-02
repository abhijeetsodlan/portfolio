import React from "react";

export default function HeaderSection() {
  return (
    <section className="bg-[#0c0c0c] rounded-2xl p-6 sm:p-10 shadow-lg border border-gray-800">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side: Text */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white flex items-center gap-2">
            Hi, I'm Abhijeet <span className="text-4xl">👋</span>
          </h1>
          <h2 className="text-xl font-semibold text-white">About</h2>
          <p className="text-gray-400 text-md leading-relaxed">
            I'm a passionate Mobile App Developer at LeaveCode Technologies. Since June 2024,
            I've been building high-performance mobile apps using React Native and Expo.
            I love working on innovative projects, improving user experience, and shipping great features.
            Outside tech, I enjoy exploring new ideas and pushing creative boundaries.
          </p>
        </div>

        {/* Right Side: Profile Image */}
        <div className="shrink-0">
          <img
            src="https://pbs.twimg.com/profile_images/1917982995052691456/SmbTOeLq_400x400.jpg"
            alt="Abhijeet Sodlan"
            className="w-40 h-40 rounded-xl object-cover border-2 border-gray-700 shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
