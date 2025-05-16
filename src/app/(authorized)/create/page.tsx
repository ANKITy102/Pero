"use client";
import { createReplica } from "@/lib/actions/createReplica";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function CreateReplica() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [greeting, setGreeting] = useState("");
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, description, greeting, slug });
    // Here you can trigger your server action or API call
    try {
      setIsLoading(true);
      const res = await createReplica({
        name,
        shortDescription: description,
        greeting,
        slug,
      });
      console.log(res.replica);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen container">
      {/* Left Panel */}
      <div className="hidden md:flex md:w-[48%] relative flex-col p-8 ">
        <div className="flex-1 px-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bring Legends to Life with AI
          </h2>
          <p className="text-white/80 mb-6">
            Create a realistic AI replica of your favorite personality — from
            tech visionaries to freedom fighters. Set the tone, name, and
            personality of your replica, then train it to speak like them.
          </p>
          <ul className="text-white space-y-2 mb-6">
            <li>🚀 Give your replica a name and greeting</li>
            <li>🧠 Define their personality with a short description</li>
            <li>🪪 Assign a unique slug (URL ID)</li>
          </ul>
          <div className="bg-yellow-100 text-yellow-900 text-sm p-3 rounded-md border-l-4 border-yellow-500">
            ⚠️ <strong>Note:</strong> Your replica will not respond until it's
            trained. After creation, remember to upload training data like
            quotes, bios, or interviews.
          </div>
        </div>

        {/* Corners and Dots */}
        <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-r-2 -rotate-90 border-white/30"></div>
        <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-white/30"></div>
        <div className="absolute bottom-8 left-8 w-8 h-8 border-t-2 border-r-2 rotate-180 border-white/30"></div>
        <div className="absolute bottom-8 right-8 w-8 h-8 border-t-2 border-r-2 rotate-90 border-white/30"></div>
        <div className="absolute top-1/4 right-12 grid grid-cols-5 gap-2 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
          ))}
        </div>
        <div className="absolute top-3/4 right-2/3 grid grid-cols-5 gap-2 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col p-6 md:p-10 justify-center text-gray-200 ">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold mb-2">Create a New Replica</h1>
          <p className="text-gray-400 mb-8">
            Fill in the details to bring your replica to life. You can train it
            after creation.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Replica Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="e.g. Elon Musk"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-green-300 focus:ring-green-300 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Short Description
              </label>
              <input
                id="description"
                type="text"
                placeholder="e.g. Visionary entrepreneur and innovator"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-green-300 focus:ring-green-300 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="greeting" className="block text-sm font-medium">
                Greeting Message
              </label>
              <input
                id="greeting"
                type="text"
                placeholder="e.g. Hello, I'm here to share my journey and vision!"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-green-300 focus:ring-green-300 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="block text-sm font-medium">
                Unique Slug (ID)
              </label>
              <input
                id="slug"
                type="text"
                placeholder="e.g. elon-musk"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-green-300 focus:ring-green-300 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Please wait
                </>
              ) : (
                <>Create Replica</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
