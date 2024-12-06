import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Page6 = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            // Apply flip animation to each h1 heading only if not mobile
            gsap.utils.toArray("h1").forEach((heading) => {
                gsap.fromTo(
                    heading,
                    { opacity: 0, rotateX: 180 }, // Start with opacity 0 and rotateX 180 (flipped)
                    {
                        opacity: 1,                 // End with full opacity
                        rotateX: 0,                 // Rotate to 0 degrees (normal position)
                        duration: 1,                // Duration of the animation
                        ease: "power2.out",         // Smooth easing
                        scrollTrigger: {
                            trigger: heading,
                            start: "top 60%",   
                            end: "top 80%",    
                            toggleActions: "play none none reverse", // Keep it visible after scrolling down
                        },
                    }
                );
            });
        }
    }, [isMobile]);

    return (
        <div className="section2 text-center p-10">
            {isMobile && (
                <div className="fixed inset-0 flex items-center justify-center bg-black text-white text-2xl z-50">
                    Please open in a big screen
                </div>
            )}
            {!isMobile && (
                <>
                    <div>
                        <h1 className="text-[30vw] font-[portfolio4] uppercase leading-[35vw]">Talk is</h1>
                    </div>
                    <div>
                        <h1 className="text-[30vw] font-[portfolio4] uppercase leading-[35vw]">Cheap</h1>
                    </div>
                    <div>
                        <h1 className="text-[22vw] font-[portfolio4] uppercase leading-[35vw]">Witness</h1>
                    </div>
                    <div>
                        <h1 className="text-[22vw] font-[portfolio4] uppercase leading-[35vw]">The</h1>
                    </div>
                    <div>
                        <h1 className="text-[20vw] font-[portfolio4] uppercase leading-[35vw]">Code on</h1>
                    </div>
                    <div>
                        <h1 className="text-[40vw] font-[portfolio] uppercase leading-[35vw]"><a href="https://github.com/abhijeetsodlan"   className=" text-gray-500 hover:text-gray-700 underline pb-40 transition duration-300 transform hover:scale-105 ">Github</a></h1>
                    </div>
                </>
            )}
        </div>
    );
}

export default Page6;
