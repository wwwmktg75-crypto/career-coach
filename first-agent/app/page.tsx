import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FeatureList } from '@/components/sections/FeatureList';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export default function HomePage() {
  return (
    <div className="page-shell">
      <Header />
      <main>
        <HeroSection />
        <FeatureList />
        <ServicesSection />
        <ProductsSection />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
