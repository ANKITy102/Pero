import Image from "next/image";
import Image1 from "@/assets/landingPage/image1.png"
import Image2 from "@/assets/landingPage/image2.png"
import Image3 from "@/assets/landingPage/image3.png"
import Image4 from "@/assets/landingPage/image4.png"
import Image5 from "@/assets/landingPage/image5.png"
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
            className="w-full h-full min-h-96 rounded-xl object-cover"
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
        imageSrc={Image1.src}
        imageAlt="AI interaction concept with iconic figure"
      />

      <FeatureCard
        tag="PERSONALIZED LEARNING"
        title="Conversations that adapt to your curiosity."
        description="Ask questions, dive deeper, and explore ideas at your own pace. Our AI remembers past chats to provide context-aware responses tailored just for you."
        imageSrc={Image2.src}
        imageAlt="Student interacting with AI on digital device"
        reverse={true}
      />

      <FeatureCard
        tag="CUSTOM REPLICA"
        title="Bring your own AI companion to life."
        description="Craft a unique assistant inspired by your thoughts, memories, or favorite themes. Whether it's a mentor, friend, or custom guide — your personal AI replica evolves with you."
        imageSrc={Image3.src}
        imageAlt="Inspired person using a device for learning"
      />

      <FeatureCard
        tag="EASY TRAINING"
        title="Shape your replica with knowledge that matters to you."
        description="Feed it with stories, notes, and new insights anytime. Train and retrain your AI replica as often as you want — the more you share, the smarter and more helpful it becomes."
        imageSrc={Image4.src}
        imageAlt="Digital preservation of historical knowledge"
        reverse={true}
      />
      <FeatureCard
        tag="KNOWLEDGE PRESERVATION"
        title="Preserve and evolve wisdom for future generations."
        description="Our AI replicas continuously learn and improve, keeping timeless knowledge alive and accessible in a conversational format that feels truly human."
        imageSrc={Image5.src}
        imageAlt="Digital preservation of historical knowledge"
      />
    </section>
  );
}
