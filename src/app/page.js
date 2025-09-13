import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import ServicesSection from "../components/ServicesSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />
      
      {/* How It Works Section */}
      <HowItWorks />

    </main>
  );
}
