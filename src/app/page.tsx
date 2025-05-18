import Image from "next/image";
import Navbar from "@/components/navbar";
import ElonMusk from "@/assets/landingPage/ElonMusk2.jpg";
import Footer from "@/components/footer";
import Wave from "@/components/wave";
export default function Home() {
  return (
    <>
      <main className="min-h-screen relative bg-[#131316]  bg-cover bg-center">
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
        <section className="relative z-50 container mx-auto  pt-18 pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Talk to legends
            <br />
            Learn from greatness
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto mb-12">
            Step into conversations with the minds that shaped history. Pero
            brings iconic personalities to life through AI replicas — from
            philosophers to scientists. Discover wisdom, spark ideas, or just
            chat — all just one question away.
          </p>

          {/* Featured Content Slider */}
          <div className="relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl z-50">
            <Image
              src={ElonMusk}
              width={900}
              height={500}
              alt="Person enjoying music with headphones"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute top-0  right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-left">
              <p className=" text-2xl text-green-300 font-medium mb-4">
                Talk to the future, or the one shaping it.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <Wave />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
