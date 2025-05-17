"use client";
import { createReplica } from "@/lib/actions/createReplica";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateReplica() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    greeting: "",
    slug: "",
    image: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fields = [
    {
      id: "name",
      label: "Replica Name",
      placeholder: "e.g. Elon Musk",
    },
    {
      id: "description",
      label: "Short Description",
      placeholder: "e.g. Visionary entrepreneur and innovator",
    },
    {
      id: "greeting",
      label: "Greeting Message",
      placeholder: "e.g. Hello, I'm here to share my journey and vision!",
    },
    {
      id: "slug",
      label: "Unique Slug (ID)",
      placeholder: "e.g. elon-musk",
    },
    {
      id: "image",
      label: "Image URL",
      placeholder: "https://dummy.com/elon-musk.jpg",
    },
  ];

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await createReplica({
        name: formData.name,
        shortDescription: formData.description,
        greeting: formData.greeting,
        slug: formData.slug,
        image: formData.image,
      });
      console.log(res)
      // res.replica.replica = {success, uuid}
      Router.push(`/train/${res.replica.replica}`)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen container">
      {/* Left Panel */}
      <div className="hidden md:flex md:w-[50%] relative flex-col p-8 ">
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
      <div className="flex-1 flex flex-col p-6 md:p-10 justify-center text-gray-200">
        <div className="max-w-lg mx-auto w-full">
          <h1 className="text-3xl font-bold mb-2">Create a New Replica</h1>
          <p className="text-gray-400 mb-8">
            Fill in the details to bring your replica to life. You can train it
            after creation.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label htmlFor={field.id} className="block text-sm font-medium">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type="text"
                  placeholder={field.placeholder}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="w-full px-4 py-2 text-md rounded-lg bg-gray-900 border border-gray-800 focus:border-green-300 focus:ring-green-300 focus:outline-none"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  Please wait...
                </div>
              ) : (
                "Create Replica"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
