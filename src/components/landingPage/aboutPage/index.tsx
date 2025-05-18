import FeatureCards from "@/components/landingPage/featureCard"

export default function AboutPage() {
  return (
    <div className="bg-[#131316] pt-24 pb-20 mt-5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-serif font-bold mb-6 text-white">About Pero</h2>
          <p className="text-xl text-gray-400">
            Pero is a next-generation learning platform that lets you talk to the legends you admire. We combine
            cutting-edge AI with iconic human wisdom to create lifelike replicas of the world's most inspirational
            personalities.
          </p>
        </div>

        <FeatureCards />
      </div>
    </div>
  )
}
