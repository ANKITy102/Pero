// types.ts
export interface Replica {
  uuid: string;
  name: string;
  slug: string;
  profile_image: string;
  short_description: string;
  introduction: string;
  tags: string[];
  created_at: string;
  owner_uuid: string;
  voice_enabled: boolean;
  video_enabled: boolean;
  chat_history_count: number;
  system_message: string;
  private: boolean;
  profileImage: string;
  shortDescription: string;
  greeting: string;
  ownerID: string;
  type: string;
  whitelistEmails: string[];
  suggestedQuestions: string[];
  elevenLabsID: string | null;
  llm: {
    model: string;
    memoryMode: string;
    systemMessage: string;
  };
}

export interface ChatMessageT {
  id: number;
  created_at: string;
  content: string;
  role: "user" | "assistant";
  is_private: boolean;
  source: string;
  replica_uuid: string;
  is_archived: boolean;
  original_message_id: string | null;
  replica_slug: string;
  user_uuid: string;
}

