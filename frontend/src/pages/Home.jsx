import HeroSection from '../components/home/HeroSection';
import TrustFeatures from '../components/home/TrustFeatures';
import FeaturedCollections from '../components/home/FeaturedCollections';
import BrandStory from '../components/home/BrandStory';
import NewArrivals from '../components/home/NewArrivals';
import OfferBanners from '../components/home/OfferBanners';
import BeautifulMoments from '../components/home/BeautifulMoments';
import FinalCTA from '../components/home/FinalCTA';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustFeatures />
      <FeaturedCollections />
      <BrandStory />
      <NewArrivals />
      <OfferBanners />
      <BeautifulMoments />
      <FinalCTA />
    </main>
  );
}
