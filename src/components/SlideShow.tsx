"use client";
import { Slide } from "@/types/Slide";
import Banner from "./Banner";
import { SetStateAction, useEffect, useState } from "react";

function SlideShowSkeleton() {
  return (
    <div className="overflow-hidden">
      <section className="relative px-5">
        <div className="max-w-6xl mx-auto overflow-hidden rounded-lg">
          <div className="relative">
            <div className="w-full h-80 md:h-96 bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse rounded-lg relative">
              <div className="absolute inset-0 flex items-center flex-col md:flex-row">
                <div className="w-5/6 p-8 space-y-6">
                  <div className="w-4/6 h-8 bg-gray-600 rounded animate-pulse"></div>

                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-600 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-600 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>

                <div className="w-1/2 h-full flex items-center justify-center">
                  <div className=" md:w-80 md:h-60 w-40 h-20 bg-gray-700 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="h-2 w-2 bg-gray-300 rounded-full animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SlideShow() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function fetchSlides() {
      try {
        setLoading(true);
        const response = await fetch("/api/slides");
        if (!response.ok) {
          throw new Error("Failed to fetch slides");
        }
        const slidesData = await response.json();
        setSlides(slidesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchSlides();
  }, []);


  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [slides.length]);

  function goToSlide(index: SetStateAction<number>) {
    setCurrentSlide(index);
  }

  if (loading) {
    return <SlideShowSkeleton />;
  }

  if (error) {
    return (
      <div className="overflow-hidden">
        <section className="relative px-5">
          <div className="max-w-6xl mx-auto overflow-hidden rounded-lg">
            <div className="flex items-center justify-center h-64 md:h-96 bg-red-50 rounded-lg">
              <div className="text-center">
                <p className="text-red-600 mb-2">Failed to load slides</p>
                <p className="text-sm text-gray-600">{error}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="overflow-hidden">
        <section className="relative px-5">
          <div className="max-w-6xl mx-auto overflow-hidden rounded-lg">
            <div className="flex items-center justify-center h-64 md:h-96 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No slides available</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <section className="relative px-5">
        <div className="max-w-6xl mx-auto overflow-hidden rounded-lg">
          <div className="relative">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-transform duration-1000 ease-in-out ${
                  index === currentSlide
                    ? "translate-x-0"
                    : index < currentSlide
                    ? "-translate-x-full"
                    : "translate-x-full"
                } ${index === currentSlide ? "relative" : "absolute inset-0"}`}
              >
                <Banner key={index} slide={slide} />
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  index === currentSlide
                    ? "bg-white w-4"
                    : "bg-white/50 hover:bg-white/75 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
