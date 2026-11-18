
import Hero from "@/components/Hero";
import PricingPage from "./pricing/page";
import HowItWorks from "@/components/HowItWorks";


export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
    
      <Hero />
  <PricingPage></PricingPage>
  <HowItWorks></HowItWorks>
    </main>
    
  );
}