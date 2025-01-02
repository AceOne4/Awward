import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({
  title, // Title text to be animated
  containerClass, // Custom class for styling the container
}: {
  title: string; // Type declaration for the `title` prop
  containerClass: string; // Type declaration for the `containerClass` prop
}) => {
  const containerRef = useRef(null); // Create a reference to the container DOM element

  useEffect(() => {
    // Define a side effect that runs after the component mounts
    const ctx = gsap.context(() => {
      // Create a GSAP context for scoping animations to this component
      const titleAnimation = gsap.timeline({
        // Create a timeline for animating the title
        scrollTrigger: {
          // Define scroll-triggered animation settings
          trigger: containerRef.current, // Element to watch for scroll events
          start: "100 bottom", // Animation starts when the top of the element reaches 100px above the viewport's bottom
          end: "center bottom", // Animation ends when the top of the element reaches the center of the viewport
          toggleActions: "play none none reverse", // Play animation on entering, reverse on leaving
        },
      });

      // Add an animation to the timeline
      titleAnimation.to(
        ".animated-word", // Target elements with the "animated-word" class
        {
          opacity: 1, // Make the word visible
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)", // Reset any transform applied
          ease: "power2.inOut", // Use a smooth easing function for the animation
          stagger: 0.02, // Stagger the animation with a delay of 0.02s between words
        },
        0 // Start this animation immediately in the timeline
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up animations when the component unmounts
  }, []); // Run this effect only once when the component mounts

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {/* Create a container with a reference and dynamic class names */}
      {title.split("<br />").map((line, index) => (
        // Split the title into lines by "<br />" and map over them
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {/* Wrap each line in a flex container */}
          {line.split(" ").map((word, idx) => (
            // Split each line into words and map over them
            <span
              key={idx}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
              // Set the word as HTML to support special characters or formatting
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle; // Export the component to use it in other parts of the application
