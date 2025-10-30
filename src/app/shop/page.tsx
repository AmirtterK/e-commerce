import { ember } from "@/lib/fonts";
import { ProductsGrid } from "@/components/ProductsGrid";

export default function Home() {
  return (
  <div>
 <section className="py-32 px-5 max-w-6xl mx-auto">
      <h1 className={` ${ember.className} font-medium text-4xl pb-8`}>
        All products
      </h1>
      <ProductsGrid/>
    </section>  </div>
  );
}
