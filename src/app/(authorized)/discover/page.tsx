import React from 'react';
import WaveCard from "@/components/discover/replicaCard";
import Header from "@/components/discover/header"
import Reviews from "@/components/discover/reviews"
import Recommendations from "@/components/discover/recommendations"
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
    <div className="min-h-screen  text-white">
      <div className="container max-w-7xl mx-auto p-4 md:p-6">
        <Header/>
        <Reviews/>
        <Recommendations/>
      </div>
    </div>
  );
};

export default DiscoverPage;
