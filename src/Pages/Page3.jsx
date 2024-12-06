import React, { useState } from 'react';

const Page3 = () => {
  // Define the images and descriptions
  const slides = [
    {
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxq7s_lJKMkl7F4j6tRqlRHZ8CGpD0wD3cghw&s",
      title: "AbhiEscape Game",
      description: (
        <>
          AbhiEscape is an exciting game where you jump and dodge enemies to survive. Test your reflexes, earn points, and see how long you can last!
          <br />
           <a href="https://abhijeetsodlan.github.io/AbhiEscape/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Play</a>
        </>
      )
    },
    {
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu9hilHA5YERB2JpvjSCjdvfEmc51UYwiaug&s",
      title: "Chat App",
      description: (
        <>
          The chat app features a Laravel backend, offering real-time messaging with friend request functionality and group chats.
          <br />
        
        </>
      )
    },
   
  ];

  // State for the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div id="page3" className="relative">
      <h1 className="text-6xl font-[portfolio4] text-center pt-72">Things I’m involved in right now:</h1>
      <div className="pl-72 pb-64 pr-72 pt-16 relative">
        <img src="images/try.webp" className="w-full" alt="Laptop" />

        {/* Slider */}
        <div className="relative w-2/3 h-full mt-8" style={{ marginTop: '-430px', marginLeft: '160px' }}> {/* Move slider up */}
          <div className="flex justify-center items-center h-80 bg-gray-200 rounded-lg overflow-hidden relative">
            <img src={slides[currentSlide].imgSrc} className="w-24 h-24 mx-auto" alt="Chat App Icon" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-md text-center">
              <h2 className="text-xl font-semibold mb-4">{slides[currentSlide].title}</h2> {/* Title */}
              <p className="text-black w-96">{slides[currentSlide].description}</p>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <button onClick={prevSlide} className="bg-gray-800 text-white p-2 rounded-full">Prev</button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <button onClick={nextSlide} className="bg-gray-800 text-white p-2 rounded-full">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page3;
