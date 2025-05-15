import React from 'react';
import WaveCard from "@/components/replicaCard";

const replicas = [
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg",
    name: "Albert Einstein",
    description: "Theoretical physicist renowned for the theory of relativity and the equation E=mc².",
    talks: 1200,
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/69/Marie_Curie_c1920.jpg",
    name: "Marie Curie",
    description: "Pioneering physicist and chemist who conducted groundbreaking research on radioactivity.",
    talks: 950,
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d4/N.Tesla.JPG",
    name: "Nikola Tesla",
    description: "Inventor and electrical engineer known for his contributions to the development of alternating current (AC) electricity.",
    talks: 1100,
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Ada_Lovelace_portrait.jpg",
    name: "Ada Lovelace",
    description: "Mathematician recognized as the first computer programmer for her work on Charles Babbage's Analytical Engine.",
    talks: 800,
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Stephen_Hawking.StarChild.jpg",
    name: "Stephen Hawking",
    description: "Theoretical physicist known for his work on black holes and author of 'A Brief History of Time.'",
    talks: 1000,
  },
];

const DiscoverPage = () => {
  return (
    <div className="text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Discover Iconic Minds</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {replicas.map((replica, index) => (
          <WaveCard
            key={index}
            imageUrl={replica.imageUrl}
            name={replica.name}
            description={replica.description}
            talks={replica.talks}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
