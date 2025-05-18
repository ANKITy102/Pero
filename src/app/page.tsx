import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroSection from "@/components/landingPage/heroSection"
import AboutPage from "@/components/landingPage/aboutPage";
export default function Home() {
  return (
    <>
      <main className="min-h-screen relative bg-[#131316]">
        <Navbar />
        <video
          className="absolute -top-10 left-0 w-full h-full object-cover z-0"
          src="/videos/bg2.mp4"
          autoPlay
          muted
          loop
          playsInline
          />
        <div
          className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.85) 100%)",
          }}
        />
        <HeroSection/>
      </main>
      <AboutPage/>
      <Footer />
    </>
  );
}
