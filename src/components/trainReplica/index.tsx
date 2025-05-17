"use client";
import { requestReplica } from "@/lib/actions/requestReplica";
import { trainReplica } from "@/lib/actions/trainReplica";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
export default function TrainReplica({
  replicaId,
  replicaName,
}: {
  replicaId: string;
  replicaName: string;
}) {
  console.log("hey id and name", replicaId, replicaName);
  const Router = useRouter();
  const [trainingData, setTrainingData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trainingData.trim()) {
      toast.error("Please enter some training data first.");
      return;
    }

    try {
      setIsLoading(true);
      toast.loading("Training in progress...");

      const res = await trainReplica(replicaId, trainingData);
      
      toast.dismiss(); 

      if (res.success) {
        toast.success("🎉 Replica trained successfully!");
        setTrainingData(""); 
        Router.push("/discover")
      } else {
        toast.error(res.message || "Failed to train the replica.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong while training the replica.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] max-w-7xl mx-auto container ">
      {/* Left Panel */}
      <div className="hidden md:flex  relative flex-col p-8">
        <div className="flex-1 px-12 py-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Train Your Replica
          </h2>
          <p className="text-white/80 mb-6">
            Make your replica come to life by feeding it the right knowledge.
            The better the data you provide, the more accurate and authentic the
            responses will be — just like you're talking to the real person.
          </p>
          <p className="text-white/80 mb-6">
            Replicas learn from the content you upload. This can include
            interviews, biographies, podcasts, speeches, articles, and more. A
            mix of content types helps the replica reflect the original
            personality's tone, ideas, and thinking style.
          </p>
          <ul className="text-white space-y-2 mb-6">
            <li>📚 More data = Smarter and more realistic replica</li>
            <li>
              🎙️ Use diverse sources — podcasts, speeches, biographies,
              interviews
            </li>
            <li>
              🔁 You can retrain your replica anytime — just visit this page
              again
            </li>
          </ul>
          <div className="bg-blue-100 text-blue-900 text-sm p-3 rounded-md border-l-4 border-blue-500">
            💡 <strong>Tip:</strong> Focus on quality + variety of data. The
            replica adapts its tone, knowledge, and thinking based on what you
            feed it!
          </div>
        </div>

        <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-r-2 -rotate-90 border-white/30"></div>
        <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-white/30"></div>
        <div className="absolute bottom-8 left-8 w-8 h-8 border-t-2 border-r-2 rotate-180 border-white/30"></div>
        <div className="absolute bottom-8 right-8 w-8 h-8 border-t-2 border-r-2 rotate-90 border-white/30"></div>
        <div className="absolute top-16 right-20 grid grid-cols-5 gap-2 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col p-6 md:p-10 justify-center text-gray-200">
        <div className="px-12 w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="trainingData"
                className="block text-sm font-medium"
              >
                Upload content to help {replicaName}'s replica learn
              </label>
              <textarea
                id="trainingData"
                rows={15}
                placeholder="Paste interviews, quotes, biographies, etc."
                value={trainingData}
                onChange={(e) => setTrainingData(e.target.value)}
                className="w-full px-4 py-3 text-md rounded-lg bg-gray-900 border border-gray-800 focus:border-green-300 focus:ring-green-300 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full hover:cursor-pointer bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  Training...
                </div>
              ) : (
                "Train Replica"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
