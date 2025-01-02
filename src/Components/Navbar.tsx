import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import clsx from "clsx";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];
function Navbar() {
  // State to track if audio is playing
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  // State to control the animation of the audio indicator
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Reference to the navigation container for animations and styling
  const navContainerRef = useRef<HTMLDivElement>(null);
  // Reference to the audio element for playback control
  const audioElmentRef = useRef<HTMLAudioElement>(null);

  // Hook to get the current scroll position
  const { y: currentScrollY } = useWindowScroll();
  // State to track the visibility of the navbar
  const [isNavVisible, setIsNavVisible] = useState(true);
  // State to store the previous scroll position for comparison
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggles the audio playback state and activates/deactivates the indicator
  const toggleAudioIndictor = () => {
    setIsAudioPlaying((prev) => !prev); // Toggle audio playback
    setIsIndicatorActive((prev) => !prev); // Toggle indicator animation
  };

  // Effect to manage audio playback when `isAudioPlaying` changes
  useEffect(() => {
    if (isAudioPlaying) {
      audioElmentRef?.current!.play(); // Play audio
    } else {
      audioElmentRef?.current!.pause(); // Pause audio
    }
  }, [isAudioPlaying]);

  // Effect to show/hide the navbar based on scroll behavior
  useEffect(() => {
    if (currentScrollY === 0) {
      // Show navbar when at the top of the page
      setIsNavVisible(true);
      navContainerRef?.current!.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Hide navbar when scrolling down
      setIsNavVisible(false);
      navContainerRef?.current!.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Show navbar when scrolling up
      setIsNavVisible(true);
      navContainerRef?.current!.classList.add("floating-nav");
    }
    // Update the last scroll position
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Effect to animate the navbar's visibility using GSAP
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100, // Slide navbar into/out of view
      opacity: isNavVisible ? 1 : 0, // Fade navbar in/out
      duration: 0.2, // Animation duration
    });
  }, [isNavVisible]);

  return (
    // Navbar container with fixed positioning and responsiveness
    <div
      ref={navContainerRef}
      className=" fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 "
    >
      {/* Header container */}
      <header className=" absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Product button */}
          <div className="flex items-center gap-7">
            {/* Logo image */}
            <img src="/img/logo.png" alt="logo" className="w-10" />

            {/* Product button, visible only on medium screens and larger */}
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              className="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Navigation links and audio button */}
          <div className="flex h-full items-center">
            {/* Navigation links, visible only on medium screens and larger */}
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index} // Unique key for each link
                  href={`#${item.toLowerCase()}`} // Anchor link to a section
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Button to toggle audio playback */}
            <button
              onClick={toggleAudioIndictor}
              className="ml-10 flex items-center space-x-0.5"
            >
              {/* Hidden audio element */}
              <audio
                ref={audioElmentRef}
                className="hidden"
                src="/audio/loop.mp3" // Source of the audio file
                loop // Audio loops continuously
              />
              {/* Audio indicator bars */}
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar} // Unique key for each bar
                  className={clsx("indicator-line", {
                    active: isIndicatorActive, // Adds the "active" class if indicator is active
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`, // Staggered animation for each bar
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
