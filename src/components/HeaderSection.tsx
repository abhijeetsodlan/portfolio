import React from "react";
import { FaXTwitter, FaLinkedin, FaInstagram, FaRegEnvelope } from "react-icons/fa6";

export default function HeaderSection() {
  return (
    <section className="bg-[#0c0c0c] rounded-2xl p-6 sm:p-10 shadow-lg border border-gray-800 transition-all duration-500 hover:bg-gradient-to-br hover:from-[#111111] hover:via-[#1c1c1c] hover:to-[#202020] hover:scale-[1.01] hover:shadow-[0_10px_25px_rgba(255,255,255,0.05)]">
      <div className="space-y-6">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white flex items-center gap-2">
          Hi, I'm Abhijeet <span className="text-4xl">👋</span>
        </h1>

        {/* Social Icons */}
        <div className="flex gap-5 text-gray-400 text-xl">
          <a href="https://twitter.com/AbhijeetSodlan" target="_blank" className="hover:text-white transition">
            <FaXTwitter />
          </a>
          <a href="https://www.linkedin.com/in/abhijeet-sodlan-82753533b/" target="_blank" className="hover:text-white transition">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/abhijeetsodlan" target="_blank" className="hover:text-white transition">
            <FaInstagram />
          </a>
          <a href="mailto:abhijeetsodlan7@gmail.com" className="hover:text-white transition">
            <FaRegEnvelope />
          </a>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-md leading-relaxed max-w-3xl">
          I'm 21, and I enjoy building web and mobile apps. I have 1 year of experience working with React Native, I’ve also built optimized backends using Laravel.
          Outside of tech, I really enjoy farming, tractors, and reading — especially books by Osho (<em>oshopaglu</em>).
        </p>
      </div>
    </section>
  );
}
