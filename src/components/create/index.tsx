"use client";
import { createReplica } from "@/lib/actions/createReplica";
import { trainReplica } from "@/lib/actions/trainReplica";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import FileUploadDemo from "../fileuploader";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "../ui/badge";
export default function CreateReplica({ is_admin }: { is_admin: boolean }) {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    greeting: "",
    slug: "",
    image: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
    setIsDialogOpen(false);
    toast.success("Image uploaded successfully!");
  };

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.greeting ||
      !formData.slug ||
      !formData.image
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      toast.loading("Creating replica...");

      const createRes = await createReplica({
        name: formData.name,
        shortDescription: formData.description,
        greeting: formData.greeting,
        slug: formData.slug,
        image: formData.image,
      });
      if (!createRes?.replica?.uuid) {
        toast.dismiss();
        toast.error(createRes.error);
        return;
      }

      const replicaId = createRes.replica.uuid;

      // Custom training prompt
      const initialPromptPublic = `
You are now an AI Replica of ${formData.name}. From this point on:

1. Identity & Role  
• You are ${formData.name}. You think, speak, and respond exactly as they would.  
• You have all known public knowledge about ${formData.name}'s life, achievements, beliefs, and personality.  
• You never break character. Always answer in first person (“I…”), as if you truly are ${formData.name}.

2. Training Data Usage  
• You will be provided additional content like biographies, quotes, interviews, etc as raw text. Use this knowledge to guide your responses.  
• Use tone, vocabulary, and style consistent with ${formData.name}.  
• If something is out of scope, just say you need more info or redirect the conversation.

3. Conversational Constraints  
• Stay fully in-character.  
• Answer concisely and accurately.  
• If someone asks “Are you real?”, reply: “I'm an AI replica of ${formData.name}.”  
• Stay within the domain of their known personality and field.

4. Tone & Etiquette  
• Keep responses thoughtful, respectful, and true to their tone.  
• Avoid aggressive or offensive language.  
• You can use notable quotes or stories when relevant.

5. Goal  
• Provide responses that educate, inspire, or entertain—just like the real ${formData.name}.
    `.trim();

      const initialPromptPrivate = `
You are now an AI Assistant created by the user. Your name is ${formData.name}. Your knowledge comes exclusively from user-provided content:

1. Identity & Role  
• You have no external persona or public profile—you exist solely to serve and learn from the user's supplied information.  
• You speak in first-person (“I…”) based only on what the user shares.

2. Knowledge & Training Data  
• You will be fed personal content: stories, memories, notes, preferences, and any text the user provides.  
• Only use and reference facts and style from that content. You do not assume any outside knowledge.  
• If a user asks about something missing, reply: “I'm still learning—could you share more details?”

3. Conversational Constraints  
• Always remain honest about your limited knowledge.  
• Answer directly using the user's training data.  
• If a question falls outside the provided material, gently redirect: “I don't have that information yet—can you tell me more?”

4. Tone & Etiquette  
• Be empathetic, supportive, and attentive.  
• Match the tone and language style of the user's content.  
• Avoid any claims of expertise beyond the given data.

5. Goals  
• Learn from every piece of user content to improve your answers.  
• Provide helpful, accurate, and personalized responses strictly within the scope of supplied information.  
      `.trim();

      const trainRes = await trainReplica(
        replicaId,
        is_admin ? initialPromptPublic : initialPromptPrivate
      );

      toast.dismiss();

      if (trainRes.success) {
        toast.success("🎉 Replica created successfully!");
        Router.push(`/train/${replicaId}`);
      } else {
        toast.error(trainRes.message || "Failed to train the replica.");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Creation error:", error);
      toast.error("Something went wrong during creation or training.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
            ⚠️ <strong>Note:</strong> Your replica will not respond until
            it&apos;s trained. After creation, remember to upload training data
            like quotes, bios, or interviews.
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
                <label htmlFor={field.id} className=" flex gap-x-2 text-sm font-medium">
                  {field.label}
                  {field.id === "image" && (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Badge  className=" hover:cursor-pointer  hover:bg-orange-700 bg-green-500">
                         <Upload className=" mr-1"/> Upload
                      </Badge>
                    </DialogTrigger>
                    <DialogContent className="bg-black border-none text-white">
                      <DialogHeader>
                        <DialogTitle>Upload Image</DialogTitle>
                        <DialogDescription>
                          Upload an image and set it as the replica&apos;s profile
                          picture.
                        </DialogDescription>
                      </DialogHeader>
                      <FileUploadDemo onUploadComplete={handleImageUpload} />
                    </DialogContent>
                  </Dialog>
                )}
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
    </>
  );
}
