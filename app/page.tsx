
import Hero from "@/components/Hero";
import PricingPage from "./pricing/page";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import TopCategories from "@/components/TopCategories";
import Review from "@/components/review";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
    
      <Hero />
  <PricingPage></PricingPage>
  <HowItWorks></HowItWorks>
  <TopCategories></TopCategories>
  <Review></Review>
  <CTA></CTA>
  <Footer></Footer>
    </main>
    
  );
}