import Navbar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import DivisionsSection from '@/components/DivisionsSection';
import PrincipalSection from '@/components/PrincipalSection';
import AboutSection from '@/components/AboutSection';
import AdmissionSection from '@/components/AdmissionSection';

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <DivisionsSection />
      <PrincipalSection />
      <AboutSection/>
      <AdmissionSection/>
    </div>
  );
}
