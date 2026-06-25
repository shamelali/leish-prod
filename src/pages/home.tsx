import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import HowItWorks from '../components/HowItWorks';
import FeaturedArtists from '../components/FeaturedArtists';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <HowItWorks />
      <FeaturedArtists />
      <Testimonials />
      <CTASection />
    </>
  );
}
