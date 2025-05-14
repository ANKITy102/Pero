import Link from "next/link";
import { Linkedin, Facebook, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a2a36] text-white py-8 mt-20 overflow-hidden">
      {/* Hexagon Pattern Background */}
        
      <div
        className="absolute inset-0 opacity-20 z-0"
        style={{
            backgroundImage: `url('/hexagon-pattern.png')`,
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Logo */}
        <div className="mb-16 text-center">
            <span className="text-8xl italic font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              
                Pero
              </span>
        </div>

        {/* Thank You Message */}
        <h2 className="text-green-300 text-4xl  text-center md:text-5xl font-bold mb-8">
          Thank You For Visiting
        </h2>

        {/* Feedback Message */}
        <p className="text-xl md:text-2xl text-center mb-16 ">
          If you liked this project, give it a{" "}
          <span className="inline-block">👍</span> and don&apos;t forget to
          share your reviews.
        </p>

       

        {/* Social Links */}
        <div className="flex justify-center items-center gap-8">
          <Link
            href="https://linkedin.com"
            className="flex items-center gap-2 hover:text-[#ff3e3e] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} />
            <span className="text-lg">Pero</span>
          </Link>

          <Link
            href="https://facebook.com"
            className="flex items-center gap-2 hover:text-[#ff3e3e] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size={24} />
            <span className="text-lg">Pero</span>
          </Link>

          <Link
            href="https://www.devdimensions.com"
            className="flex items-center gap-2 hover:text-[#ff3e3e] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe size={24} />
            <span className="text-lg">www.pero.com</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
