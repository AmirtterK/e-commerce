"use client";

import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";

interface ProductsGridProps {
  limit?: number;
}

export function ProductsGrid({ limit }: ProductsGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch("/api/products");
        
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {Array.from({ length: limit || 10 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col bg-background p-4 rounded-md border border-border shadow-sm animate-pulse"
        >
          <div className="w-full h-48 bg-muted rounded-md mb-4" />

          <div className="h-4 bg-muted rounded w-3/4 mb-2" />
          <div className="h-4 bg-muted rounded w-1/2 mb-4" />

          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="w-4 h-4 bg-muted rounded-full" />
            ))}
          </div>

          <div className="mt-auto space-y-2">
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="w-full h-10 bg-muted rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}


  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      {displayedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}