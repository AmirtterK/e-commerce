"use client";
import { Slide } from "@/types/Slide";
import Link from "next/link";
import React from "react";

function Banner({ slide }: { slide: Slide }) {
  const { id, name, type, status, description, img, theme } = slide;
  return (
    <div
      className={`relative flex flex-col overflow-hidden  bg-gradient-to-br from-gray-1000 to-gray-900 p-6 text-white shadow-xl md:flex-row md:items-center md:justify-between`}
    >
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id={`grid-0`}
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-0)`} />
        </svg>
      </div>

      <div className="z-10 space-y-3 md:w-3/5">
        <div
          className={`inline-block rounded-lg ${theme.badge} px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase`}
        >
          {status}
        </div>
        <h2 className="text-3xl leading-tight font-bold tracking-tight md:text-4xl lg:text-5xl">
          {name} <span className={`${theme.highlight}`}>{type}</span>
        </h2>
        <p className="max-w-xl text-sm text-gray-300 md:text-base">
          {description}
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href={`product/${id}`}>
            <button
              className={`cursor-pointer rounded-md ${theme.button} px-6 py-2 font-medium transition-all `}
            >
              Shop Now
            </button>
          </Link>
          <Link href={`product/${id}`}>
            <button className="cursor-pointer rounded-md border border-white/30 bg-transparent px-6 py-2 font-medium transition-all hover:bg-white/10">
              View Specs
            </button>
          </Link>
        </div>
      </div>

      <div className="relative z-10 mt-6 h-60 w-full md:mt-0 md:h-80 md:w-2/5 flex justify-center items-center">
        <div
          className={`absolute  h-60 w-60 rounded-full ${theme.glow} blur-xl`}
        ></div>
        <div className="relative  h-full w-full">
          <img
            src={img}
            alt="product name"
            className="drop-shadow-2xl h-full w-full object-contain drop-shadow-2xl rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
