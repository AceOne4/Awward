import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

function About() {
  // Initializes a GSAP animation when the component renders
  useGSAP(() => {
    // Creates a timeline for the animation, synchronized with scroll behavior
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        // Element that triggers the animation
        trigger: "#clip",
        // Start the animation when the trigger reaches the center of the viewport
        start: "center center",
        // End the animation after scrolling 800 pixels beyond the trigger
        end: "+=800 center",
        // Smoothly progress the animation as the user scrolls
        scrub: 0.5,
        // Keeps the trigger element in place during the animation
        pin: true,
        // Adds space around the pinned element
        pinSpacing: true,
      },
    });
    // Expands the `.mask-clip-path` element to cover the full viewport with no border-radius
    clipAnimation.to(".mask-clip-path", {
      width: "100vw", // Sets the width to the full viewport
      height: "100vh", // Sets the height to the full viewport
      borderRadius: 0, // Removes rounded corners
    });
  });

  return (
    // The main container of the About section with minimum screen height and full width
    <div id="about" className="min-h-screen w-screen">
      {/* A relative container for the introductory text */}
      <div className=" relative mb-8 mt-36 flex flex-col items-center gap-5">
        {/* A small, uppercase heading to welcome the user */}
        <h2 className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zentry
        </h2>
        {/* A dynamically animated title component */}
        <AnimatedTitle
          title="  Disc<b>o</b>ver The World's
      <br /> l<b>a</b>rgest shared <b>a</b>dventure"
          containerClass="mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem] !text-black"
        />
        {/* A subsection with descriptive text about the platform */}
        <div className="about-subtext">
          <p>The Game of Games begins-your life, now an epic MMORPG</p>
          <p>Zentry unites every players from countless games and platforms</p>
        </div>
      </div>
      {/* A container for the interactive clipping animation */}
      <div className="h-dvh w-screen" id="clip">
        {/* The element that undergoes the clip animation */}
        <div className="mask-clip-path about-image">
          {/* The background image for the animated section */}
          <img
            src="img/about.webp"
            alt="background" // Alternative text for screen readers
            className="absloute top-0 left-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
