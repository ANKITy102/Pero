import Chat from "@/components/chat";
import { getChatHistory } from "@/lib/actions/getChatHistory";

interface ChatPageProps {
  params: {
    uuid: string; // This is the replicaId
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { uuid: replicaId } = await params;
  const response = await getChatHistory(replicaId);
  console.log("this is chat history", response);
  if (!response || response.success == false) {
    return (
      <div className="  text-white">
        <div className="container text-4xl max-w-5xl mx-auto p-4 md:p-6">
          Something went wrong. Try again!
        </div>
      </div>
    );
  }
  return (
    <div className="  text-white">
      <div className="container max-w-5xl mx-auto p-4 md:p-6">
        <Chat initialMessages={response.data.items} replicaId={replicaId}/>
      </div>
    </div>
  );
}
