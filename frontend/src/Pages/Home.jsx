import React, { useEffect, useRef } from "react";
//import React, { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroSection from "../components/core/Home/HeroSection";
import LegacySection from "../components/core/Home/LegacySection";
import ServicesCard from "../components/core/Home/ServicesCard";
import InfiniteMarquee from "../components/core/Home/Marquee";
import TestimonialSection from "../components/core/Home/TestimonialSection";
import Footer from "../components/common/Footer";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const darkThemeEnabled = useSelector(
    (state) => state.theme.isDarkMode
  );

  const wrapperRef = useRef(null);
  const serviceRefs = useRef([]);

  const servicesList = [
    {
      tag: "Our Service",
      heading: "Waste Collection & Waste Management",
      description: "Advanced waste processing and recycling technologies.",
      image:
        "https://images.unsplash.com/photo-1635691315495-ff39debe5764?w=900&auto=format&fit=crop&q=60",
      progressLabel: "Collection Rate",
      progressValue: 95,
      progressColor: "#10B981",
      exploreText: "Learn More",
    },
    {
      tag: "Our Service",
      heading: "Eco-Friendly Material Development",
      description:
        "Creating innovative, sustainable, and environmentally-conscious materials for various industries.",
      image:
        "https://images.unsplash.com/photo-1660721671073-e139688fa3cf?w=900&auto=format&fit=crop&q=60",
      progressLabel: "Recyclibility Rate",
      progressValue: 75,
      progressColor: "#C27BFF",
      exploreText: "Learn More",
    },
    {
      tag: "Our Service",
      heading: "User Value Creation",
      description:
        "Creating innovative, sustainable, and environmentally-conscious materials for various industries.",
      image:
        "https://images.unsplash.com/photo-1651054558996-03455fe2702f?w=900&auto=format&fit=crop&q=60",
      progressLabel: "Return Value",
      progressValue: 88,
      progressColor: "#C27BFF",
      exploreText: "Learn More",
    },
  ];

  useEffect(() => {
  const cards = gsap.utils.toArray(".service-card");

  if (!cards.length) return;

  gsap.set(cards, {
    opacity: 0,
    x: 120,
    scale: 0.95,
  });

  ScrollTrigger.create({
    trigger: containerRef.current,
    start: "top top",
    end: `+=${cards.length * 80}%`,
    pin: true,
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress * cards.length;

      cards.forEach((card, index) => {
        const diff = progress - index;

        gsap.to(card, {
          opacity: diff > 0 ? 1 : 0,
          x: diff > 0 ? 0 : 120,
          scale: diff > 0 ? 1 : 0.95,
          duration: 0.4,
          ease: "power3.out",
        });
      });
    },
  });

  return () => ScrollTrigger.getAll().forEach((t) => t.kill());
}, []);


  return (
    <main
      className={`overflow-hidden transition-colors duration-300 ${
        darkThemeEnabled ? "bg-gray-900" : "bg-white"
      }`}
    >
      <HeroSection />
      <LegacySection />

      {/* Marquee Section */}
      <section className="relative h-52 mt-36 flex items-center justify-center overflow-hidden">
        <div className="absolute w-full rotate-5">
          <InfiniteMarquee
            text="Shaping a greener future, One waste at a time"
            speed={40}
            direction="right"
            className="bg-purple-300 border-y-purple-400 w-[110%]"
            textClassName="text-4xl md:text-5xl font-medium text-gray-600"
          />
        </div>

        <div className="absolute w-full -rotate-5">
          <InfiniteMarquee
            text="Don’t waste the future. Recycle today!"
            speed={40}
            direction="left"
            className="bg-purple-300 border-y-purple-400 w-[110%]"
            textClassName="text-4xl md:text-5xl font-medium text-gray-600"
          />
        </div>
      </section>

      {/* Services Scroll Animation */}
      <section
        ref={wrapperRef}
        className={`relative overflow-hidden ${
          darkThemeEnabled ? "bg-gray-900" : "bg-white"
        }`}
        style={{ height: "100vh" }}
      >
        <div className="sticky top-0 h-full flex items-center justify-center">
          {servicesList.map((service, index) => (
            <div
              key={index}
              ref={(el) => (serviceRefs.current[index] = el)}
              className="absolute w-full h-full flex items-center justify-center"
            >
              <div className="max-w-7xl w-full px-4">
                <ServicesCard {...service} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <TestimonialSection />
      <Footer />
    </main>
  );
};

export default Home;
