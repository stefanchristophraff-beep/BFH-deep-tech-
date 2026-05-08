import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import RadarSection from "@/app/components/RadarSection";
import FAQ from "@/app/components/FAQ";
import FeedbackForm from "@/app/components/FeedbackForm";
import Team from "@/app/components/Team";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <RadarSection />
        <FAQ />
        <FeedbackForm />
        <Team />
      </main>
      <Footer />
    </>
  );
}
