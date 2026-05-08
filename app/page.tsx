import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import RadarSection from "@/app/components/RadarSection";
import FeedbackForm from "@/app/components/FeedbackForm";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <RadarSection />
        <FeedbackForm />
      </main>
      <Footer />
    </>
  );
}
