import React from "react";
import SlideShow from "./SlideShow";

export default function HeroSection() {
  return (
    <div className="overflow-hidden">
  
      <section className="relative pt-24 md:pt-36 px-5">
        <div className="max-w-6xl mx-auto">
          <SlideShow />
        </div>
      </section>
    </div>
  );
}
