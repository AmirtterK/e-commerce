import HeroSection from "@/components/hero";
import LogoCloud from "@/components/logo-cloud";
import { Products } from "@/components/Products";

export default async function Home() {
  return (
    <div>
      <HeroSection />
      <Products />
      <LogoCloud />
    </div>
  );
}
