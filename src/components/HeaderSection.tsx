import React from "react";
import {
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
  FaRegEnvelope,
  FaGithub,
} from "react-icons/fa6";

export default function HeaderSection() {
  return (
    <section className="rounded-2xl p-6 sm:p-10">
      <div className="space-y-6">
        {/* Heading */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-white flex items-center gap-2">
              Hi, I'm Abhijeet <span className="text-4xl">👋</span>
            </h1>

            {/* Social Icons */}
            <div className="flex gap-5 text-gray-400 text-xl">
              <a
                href="https://twitter.com/AbhijeetSodlan"
                target="_blank"
                className="hover:text-white transition"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://www.linkedin.com/in/abhijeet-sodlan-82753533b/"
                target="_blank"
                className="hover:text-white transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/abhijeetsodlan"
                target="_blank"
                className="hover:text-white transition"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:abhijeetsodlan7@gmail.com"
                className="hover:text-white transition"
              >
                <FaRegEnvelope />
              </a>
              <a
                href="https://www.instagram.com/abhijeetsodlan"
                target="_blank"
                className="hover:text-white transition"
              >
                <FaInstagram />
              </a>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-md leading-relaxed max-w-3xl">
              I'm 21, and I enjoy building web and mobile apps. I have 1 year of
              experience working with React Native, and I’ve also built optimized
              backends using Laravel. Outside of tech, I really enjoy farming,
              tractors, and reading — especially books by Osho (<em>oshopaglu</em>).
            </p>
          </div>

          {/* Profile Image */}
          <div className="shrink-0">
            <img
              src="https://pbs.twimg.com/profile_images/1917982995052691456/SmbTOeLq_400x400.jpg"
              alt="Abhijeet Sodlan"
              className="w-32 h-32 rounded-xl object-cover grayscale border border-gray-700 shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
