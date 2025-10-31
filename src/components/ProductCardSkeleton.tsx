"use client";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { ember, emberWmd } from "../lib/fonts";


export function ProductCardSkeleton() {
 
  return (
    <section className="py-32 px-5 max-w-6xl mx-auto">
        <h1 className={`${ember.className} font-medium text-4xl pb-8`}>Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-6">
          {/* Skeleton for Order Summary */}
          <div className="col-span-2 space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card
                key={i}
                className="w-full bg-background mb-6 rounded-md relative pt-4 pb-0 md:pb-4"
              >
                <div className="absolute left-4 top-6 h-5 w-5 rounded-sm bg-muted animate-pulse" />
                <div className="absolute right-2 top-2 h-8 w-8 rounded-full bg-muted animate-pulse" />

                <div className="grid md:grid-cols-3 grid-cols-2">
                  <CardHeader className="flex items-center justify-center col-span-1 relative md:order-1 order-2">
                    <div className="h-40 aspect-[1/1] rounded-md bg-muted animate-pulse" />
                  </CardHeader>

                  <CardContent className="col-span-2 flex flex-col gap-y-3 mt-0 md:mt-4 pl-0 md:order-2 order-1 ml-14 md:ml-0">
                    <div className="h-6 w-1/2 bg-muted animate-pulse rounded-md" />
                    <div className="h-5 w-1/3 bg-muted animate-pulse rounded-md" />
                    <div className="h-8 w-24 mt-2 bg-muted animate-pulse rounded-md" />
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>{" "}
          <Card className="w-full bg-background rounded-md h-fit">
            <CardHeader>
              <div className="animate-pulse h-6 w-1/3 rounded-md bg-muted" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="animate-pulse h-5 w-full rounded-md bg-muted" />
              <div className="animate-pulse h-5 w-full rounded-md bg-muted" />
              <div className="animate-pulse h-5 w-full rounded-md bg-muted" />
              <div className="animate-pulse h-10 w-full rounded-md bg-muted" />
            </CardContent>
          </Card>
        </div>
      </section>
  );
}
