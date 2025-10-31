"use client";

export async function deleteFromCart(productId: string) {
  const res = await fetch("/api/cart", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => null);
    throw new Error(`Delete failed: ${res.status} ${text ?? ""}`);
  }

  return res.json();
}
