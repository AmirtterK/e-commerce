"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function OrderCard({ total }: { total: number }) {
  const taxRate = 0.08;
  const taxAmount = total*taxRate;
  const afterTax = total + taxAmount;
  return (
    <Card className="w-full col-span-1 bg-background rounded-md order-1 md:order-2 h-fit">
      <CardHeader className="">
        <CardTitle className="text-lg font-semibold">ORDER SUMMARY</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 ">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground uppercase tracking-wide">
              SUBTOTAL
            </span>
            <span className="text-sm font-medium">
              {Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "EUR",
              }).format(total)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground uppercase tracking-wide">
              TAX
            </span>
            <span className="text-sm font-medium"> {Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "EUR",
              }).format(taxAmount)}</span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-sm uppercase tracking-wide font-semibold">
              TOTAL
            </span>
            <span className="text-sm font-semibold">
              {Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "EUR",
              }).format(afterTax)}
            </span>
          </div>
        </div>
        <button className="w-full bg-primary text-primary-foreground py-3 px-4 text-sm font-medium uppercase tracking-wide hover:bg-primary/90 transition-colors rounded-md">
          CHECKOUT
        </button>
      </CardContent>
    </Card>
  );
}
