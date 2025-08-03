import Navbar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import DivisionsSection from '@/components/DivisionsSection';
import PrincipalSection from '@/components/PrincipalSection';
import AboutSection from '@/components/AboutSection';
import AdmissionSection from '@/components/AdmissionSection';
import AdminPanel from '@/components/AdminPanel';
import AnnouncementSection from '@/components/AnnouncementSection';
import LocationSection from '@/components/LocationSection';

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <DivisionsSection />
      <PrincipalSection />
      <AboutSection/>
      <LocationSection/>
      <AdmissionSection/>
    </div>
  );
}
