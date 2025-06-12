import { BaseLayout } from "@/components/base-layout";
import { Hero } from "./components/hero";
import { Features } from "./components/features";
import Faq from "./components/faq";
import { CTA } from "./components/cta";


const LandingPage = () => {
  return (
    <BaseLayout>
      <Hero />
      <Features />
      <Faq />
      <CTA />
    </BaseLayout>
  );
};

export { LandingPage };
