import Image from "next/image"
import { Code, Palette, Server } from "lucide-react"
import Me from "@/assets/landingPage/me.jpg"
export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#131316] mt-24 py-16">
      <div className="container mx-auto px-4">
        <section className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl text-white font-serif font-bold mb-16">Meet the Creator</h1>

          {/* Profile Photo */}
          <div className="mb-10 flex justify-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image
                src={Me}
                alt="Ankit - Creator of Pero"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Introduction */}
          <div className="mb-16">
            <h2 className="text-2xl text-white font-medium mb-6">Hi, I&apos;m Ankit, the solo developer behind this platform.</h2>
            <p className="text-lg text-gray-400 mb-6">
              I&apos;ve built this project from the ground up — designing the frontend, coding the backend, and crafting the
              overall experience you see today. It&apos;s been a challenging but rewarding journey turning this vision into
              reality.
            </p>
            <p className="text-lg text-gray-400">
              Thanks for stopping by and exploring the platform! I&apos;m continuously working to improve it and add new
              experiences.
            </p>
          </div>

          {/* Skills */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#080808] p-8 rounded-xl shadow-md transition-transform hover:transform hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-100 rounded-full">
                  <Code size={32} className="text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl text-white font-medium mb-3">Frontend Development</h3>
              <p className="text-gray-400">Building the user interface and seamless interactions</p>
            </div>

            <div className="bg-[#080808] p-8 rounded-xl shadow-md transition-transform hover:transform hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-100 rounded-full">
                  <Server size={32} className="text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl text-white font-medium mb-3">Backend Development</h3>
              <p className="text-gray-400">Connecting the AI, managing data, and ensuring smooth performance</p>
            </div>

            <div className="bg-[#080808] p-8 rounded-xl shadow-md transition-transform hover:transform hover:scale-105">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-100 rounded-full">
                  <Palette size={32} className="text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl text-white font-medium mb-3">Design</h3>
              <p className="text-gray-400">Crafting a clean, user-friendly, and engaging look and feel</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
