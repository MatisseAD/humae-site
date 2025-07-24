// app/page.tsx

import HeroSection from '@/components/HeroSection';
import FeatureSectionCreate from '@/components/FeatureSectionCreate';
import FeatureSectionManage from '@/components/FeatureSectionManage';
import { TestimonialSection } from '@/components/TestimonialSection';
import FinalCTASection from "@/components/FinalCTASection";
import StackedCardsSection from "@/components/StackedCardsSection";

export default function HomePage() {
  return (
      <>
        <HeroSection />
          <StackedCardsSection />
        <FeatureSectionCreate />
        <FeatureSectionManage />
          <TestimonialSection />
        <FinalCTASection />

      </>
  );
}