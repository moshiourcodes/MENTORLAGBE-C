
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import TopCategories from "@/components/TopCategories";
import Review from "@/components/review";
import Footer from "@/components/Footer";
import FeaturedTuitions from "./tuitions/FeaturedTuitions";
import PricingSection from "@/components/PricingSection";





export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white dark:bg-[#0B1220]">
    
      <Hero />
     <FeaturedTuitions></FeaturedTuitions>
   <PricingSection></PricingSection>
  <HowItWorks></HowItWorks>
  <TopCategories></TopCategories>
  <Review></Review>
  <CTA></CTA>
  <Footer></Footer>
    </main>
    
  );
}