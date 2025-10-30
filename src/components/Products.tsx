"use client";

import { ProductsGrid } from "./ProductsGrid";
import { Geist } from "next/font/google";
import { ember } from "../lib/fonts";
import Link from "next/link";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export function Products() {
  return (
    <section className="py-32 px-5 max-w-6xl mx-auto flex flex-col gap-8">
      <h1 className={` ${ember.className} font-medium text-4xl`}>
        Popular products
      </h1>
      <ProductsGrid limit={5} />
      <span className="self-center">
        <Link
          href={"/shop"}
          className="text-muted-foreground hover:text-foreground duration-300"
        >
          View All
        </Link>
      </span>
    </section>
  );
}
