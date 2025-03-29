// App.jsx
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaRegEnvelope, FaExternalLinkAlt } from "react-icons/fa";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto bg-gray-900 rounded-xl shadow-2xl overflow-hidden p-8 border border-gray-800">
        <div className="space-y-8">
          <header className="space-y-3">
            <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Hi, I'm Abhijeet Sodlan
            </h1>
            
            <div className="flex items-center text-gray-300 space-x-2">
              <FaRegEnvelope className="text-gray-400" />
              <a href="mailto:sodlan.abhijeet@example.com" className="hover:text-white transition-colors duration-200">
                abhijeetsodlan7@gmail.com
              </a>
            </div>
            
            <div className="flex space-x-4 pt-1">
              <a href="https://github.com/abhijeetsodlan" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-white transition-colors duration-200 hover:-translate-y-0.5">
                <FaGithub size={22} />
              </a>
              <a href="https://www.linkedin.com/in/abhijeet-sodlan-82753533b/" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-white transition-colors duration-200 hover:-translate-y-0.5">
                <FaLinkedin size={22} />
              </a>
              <a href="https://twitter.com/AbhijeetSodlan" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-400 hover:text-white transition-colors duration-200 hover:-translate-y-0.5">
                <FaTwitter size={22} />
              </a>
            </div>
          </header>

          <div className="space-y-4">
            <ul className="list-none space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">▹</span>
                <span>Web & mobile apps developer building performant solutions</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">▹</span>
                <span>I build products that make people smile while solving problems</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">▹</span>
                <span>Let's talk how can we work together</span>
              </li>
              {/* <li className="pt-2">
                <a href="/resume.pdf" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center">
                  View my resume <FaExternalLinkAlt className="ml-1" size={12} />
                </a>
              </li> */}
            </ul>
          </div>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            
            <div className="space-y-5">
              <a href="https://regrets.in" target="_blank" rel="noopener noreferrer" 
                 className="block group transition-all duration-300">
                <div className="p-5 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white text-lg group-hover:text-blue-400 transition-colors duration-200">
                        regrets.in
                      </h3>
                      <p className="text-gray-400 mt-1">A platform for sharing and learning from life's regrets</p>
                    </div>
                    <FaExternalLinkAlt className="text-gray-500 group-hover:text-blue-400 mt-1 transition-colors duration-200" />
                  </div>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                    <span>35 active users</span>
                  </div>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default App;