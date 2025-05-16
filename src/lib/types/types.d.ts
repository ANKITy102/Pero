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
  telegram_integration: any;
  discord_integration: any;
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
    tools: any[];
  };
}
