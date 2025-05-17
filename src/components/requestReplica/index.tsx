"use client";
import { requestReplica } from "@/lib/actions/requestReplica";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
export default function RequestReplica({userId}:{userId?: string}) {
    const Router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fields = [
    {
      id: "name",
      label: "Replica Name",
      placeholder: "e.g. Dr. APJ Abdul Kalam",
    },
    {
      id: "description",
      label: "Short Description",
      placeholder: "e.g. Missile Man of India and former President",
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
      const res = await requestReplica({
        requestedName: formData.name,
        description: formData.description,
        userId
      });
      toast.success('Request submitted');
      Router.push("/discover");
    } catch (error) {
        toast.error('Something went');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[90vh] container">
      {/* Left Panel */}
      <div className="hidden md:flex md:w-[50%] relative flex-col p-8">
        <div className="flex-1 px-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Request a Replica You Want
          </h2>
          <p className="text-white/80 mb-6">
            Got someone in mind you wish to see as an AI replica? Suggest your
            favorite personalities — from inspiring leaders to cultural icons —
            and our team will bring them to life.
          </p>
          <p className="text-white/80 mb-6">
            Unlike personal replicas created by users, replicas made by our team
            undergo in-depth research using trusted sources like biographies,
            interviews, public speeches, articles, and documentaries. This
            ensures the AI closely mirrors the real personality in tone,
            knowledge, and behavior.
          </p>
          <ul className="text-white space-y-2 mb-6">
            <li>💡 Suggest a name of someone you'd like to chat with</li>
            <li>🧾 Add a short description about who they are</li>
            <li>📩 Submit your request for admin approval</li>
          </ul>
          <div className="bg-yellow-100 text-yellow-900 text-sm p-3 rounded-md border-l-4 border-yellow-500">
            ⚠️ <strong>Note:</strong> Only admins can create public replicas.
            This form sends your suggestion to them for review and potential
            training.
          </div>
        </div>
        <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-r-2 -rotate-90 border-white/30"></div>
        <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-white/30"></div>
        <div className="absolute bottom-8 left-8 w-8 h-8 border-t-2 border-r-2 rotate-180 border-white/30"></div>
        <div className="absolute bottom-8 right-8 w-8 h-8 border-t-2 border-r-2 rotate-90 border-white/30"></div>
        <div className="absolute top-1/4 right-20 grid grid-cols-5 gap-2 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
          ))}
        </div>
        <div className="absolute bottom-14 left-40 grid grid-cols-5 gap-2 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col p-6 md:p-10 justify-center text-gray-200">
        <div className="max-w-lg mx-auto w-full">
          <h1 className="text-3xl font-bold mb-2">🧠 Request a New Replica</h1>
          <p className="text-gray-400 mb-8">
            Have someone legendary in mind? ✨ Fill in the details below and hit
            submit! Our team will 📚 research deeply, 🕵️‍♂️ dig into interviews,
            articles, books & videos, and craft a lifelike AI replica just for
            you. 🚀
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
              className="w-full hover:cursor-pointer bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  Please wait...
                </div>
              ) : (
                "Submit Request"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
