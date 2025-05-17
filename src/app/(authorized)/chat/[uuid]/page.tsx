import Chat from "@/components/chat";
import { getChatHistory } from "@/lib/actions/getChatHistory";
import { getReplica } from "@/lib/actions/getReplica";
import { auth } from "@/lib/auth";

interface ChatPageProps {
  params: {
    uuid: string; // This is the replicaId
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { uuid: replicaId } = await params;
  const session = await auth();
  const response = await getChatHistory(replicaId);
  if (!response || response.success == false || !session?.user.image) {
    return (
      <div className="  text-white">
        <div className="container text-4xl max-w-5xl mx-auto p-4 md:p-6">
          Something went wrong. Try again!
        </div>
      </div>
    );
  }
  const response2 = await getReplica(replicaId);
  if (!response2 || response2.success == false) {
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
      <div className="container max-w-5xl mx-auto p-4 md:px-6">
        <Chat initialMessages={response.data.items} replicaId={replicaId} replicaImage={response2.replica.profileImage} replicaName={response2.replica.name} userImage={session?.user.image}/>
      </div>
    </div>
  );
}
