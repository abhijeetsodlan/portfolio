import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaRegEnvelope, FaExternalLinkAlt } from "react-icons/fa";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto shadow-2xl overflow-hidden p-8 ">
        <div className="space-y-8">
          <header className="space-y-3">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Hi, I'm Abhijeet Sodlan
              </h1>
            </div>

            <div className="flex justify-normal space-x-4">
              <a href="https://github.com/abhijeetsodlan" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all duration-300">
                <FaGithub size={22} />
              </a>
              <a href="https://www.linkedin.com/in/abhijeet-sodlan-82753533b/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all duration-300">
                <FaLinkedin size={22} />
              </a>
              <a href="https://twitter.com/AbhijeetSodlan" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all duration-300">
                <FaTwitter size={22} />
              </a>
            </div>

            <div className="flex items-center text-gray-300 space-x-2">
              <FaRegEnvelope className="text-gray-400" />
              <a href="mailto:sodlan.abhijeet@example.com" className="hover:text-white transition-colors duration-200">
                abhijeetsodlan7@gmail.com
              </a>
            </div>
          </header>

          <div className="space-y-4">
            <p className="text-lg text-gray-300">
              I'm a web and mobile app developer who loves building fast and useful products. Let’s connect and chat about how we can work on something awesome together.
            </p>
          </div>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>

              {/* Building Projects with Yellow Border and "Building" Text */}
              <a href="https://prelist.netlify.app" target="_blank" rel="noopener noreferrer" className="block group transition-all duration-300">
                <div className="p-6 bg-gray-800 rounded-lg border border-yellow-400 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-900/10 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white text-lg group-hover:text-yellow-400 transition-all duration-300">
                        preList.live
                      </h3>
                      <p className="text-gray-400 mt-1">Prelist.live lets you collect waitlist signups on your site without any backend setup.</p>
                    </div>
                    <div className="text-yellow-400 text-sm font-semibold">Building</div>
                  </div>
                </div>
              </a>

              <a href="https://gojobtoday.netlify.app" target="_blank" rel="noopener noreferrer" className="block group transition-all duration-300">
                <div className="p-6 bg-gray-800 rounded-lg border border-yellow-400 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-900/10 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white text-lg group-hover:text-yellow-400 transition-all duration-300">
                        GoJobToday
                      </h3>
                      <p className="text-gray-400 mt-1">An AI-powered job platform that automatically applies to matching opportunities on your behalf, while also allowing manual browsing through a swipeable, reel-like interface</p>
                    </div>
                    <div className="text-yellow-400 text-sm font-semibold">Building</div>
                  </div>
                </div>
              </a>

            {/* Completed and Building Projects (Without sections) */}
            <div className="space-y-5">
              <a href="https://regrets.in" target="_blank" rel="noopener noreferrer" className="block group transition-all duration-300">
                <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white text-lg group-hover:text-blue-400 transition-all duration-300">
                        regrets.in
                      </h3>
                      <p className="text-gray-400 mt-1">A platform where you can share your regrets - anonymously or openly, explore what others have shared, and connect through likes and replies.</p>
                    </div>
                    <FaExternalLinkAlt className="text-gray-500 group-hover:text-blue-400 mt-1 transition-all duration-300" />
                  </div>
                </div>
              </a>

              <a href="https://abhijeetsodlan.github.io/SpaceInvaders/" target="_blank" rel="noopener noreferrer" className="block group transition-all duration-300">
                <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white text-lg group-hover:text-blue-400 transition-all duration-300">
                        SpaceInvaders
                      </h3>
                      <p className="text-gray-400 mt-1">Classic space shooter game</p>
                    </div>
                    <FaExternalLinkAlt className="text-gray-500 group-hover:text-blue-400 mt-1 transition-all duration-300" />
                  </div>
                </div>
              </a>

              <a href="https://sharecodee.netlify.app/" target="_blank" rel="noopener noreferrer" className="block group transition-all duration-300">
                <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white text-lg group-hover:text-blue-400 transition-all duration-300">
                        ShareCode
                      </h3>
                      <p className="text-gray-400 mt-1">Convert your code snippets into image</p>
                    </div>
                    <FaExternalLinkAlt className="text-gray-500 group-hover:text-blue-400 mt-1 transition-all duration-300" />
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
