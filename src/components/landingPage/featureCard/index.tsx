import Image from "next/image";
import ai_replica from "@/assets/landingPage/ai_replicas.png";
const FeatureCard = ({
  tag,
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
}: {
  tag: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}) => {
  return (
    <div className="bg-[#080808] rounded-xl py-5 px-4 overflow-hidden shadow-lg mb-14">
      <div
        className={`flex flex-col ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        <div className="md:w-1/2 p-2  overflow-hidden">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            width={600}
            height={400}
            className="w-full h-full rounded-xl object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <span className="inline-block px-4 py-1 rounded-full w-fit text-sm font-medium bg-purple-100 text-purple-800 mb-4">
            {tag}
          </span>
          <h3 className="text-3xl font-serif font-medium text-white mb-4">
            {title}
          </h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default function FeatureCards() {
  return (
    <section className=" px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-serif font-bold text-white text-center mb-10">
        Platform Features
      </h2>

      <FeatureCard
        tag="AI REPLICAS"
        title="Engage with AI-powered replicas of iconic personalities."
        description="Chat naturally with detailed, evolving AI versions of legendary figures — from Elon Musk’s innovation insights to Marie Curie’s scientific breakthroughs. Experience learning like never before."
        imageSrc={ai_replica.src}
        imageAlt="AI interaction concept with iconic figure"
      />

      <FeatureCard
        tag="PERSONALIZED LEARNING"
        title="Conversations that adapt to your curiosity."
        description="Ask questions, dive deeper, and explore ideas at your own pace. Our AI remembers past chats to provide context-aware responses tailored just for you."
        imageSrc={ai_replica.src}
        imageAlt="Student interacting with AI on digital device"
        reverse={true}
      />

      <FeatureCard
        tag="INSPIRATION & GROWTH"
        title="Get inspired by the habits and wisdom of legends."
        description="Learn about the mindset, routines, and philosophies of world-changing figures like Cristiano Ronaldo and Steve Jobs. Transform your own growth journey through authentic conversations."
        imageSrc={ai_replica.src}
        imageAlt="Inspired person using a device for learning"
      />

      <FeatureCard
        tag="KNOWLEDGE PRESERVATION"
        title="Preserve and evolve wisdom for future generations."
        description="Our AI replicas continuously learn and improve, keeping timeless knowledge alive and accessible in a conversational format that feels truly human."
        imageSrc={ai_replica.src}
        imageAlt="Digital preservation of historical knowledge"
        reverse={true}
      />
    </section>
  );
}
