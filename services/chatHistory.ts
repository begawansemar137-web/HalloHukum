import { supabase } from '../lib/supabase';
import type { ChatMessage } from '../types';

export type ChatChannel = 'humi' | 'advisor';

const LIMIT = 200;

export const loadChat = async (channel: ChatChannel, userId: string): Promise<ChatMessage[]> => {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('content, sender, attachment_name, attachment_type, created_at')
    .eq('user_id', userId)
    .eq('channel', channel)
    .order('created_at', { ascending: false })
    .limit(LIMIT);
  if (error) {
    console.error('Failed to load chat history:', error);
    return [];
  }
  return (data ?? []).reverse().map((r, i) => ({
    id: Date.parse(r.created_at) + i,
    text: r.content,
    sender: r.sender as 'user' | 'ai',
    attachment: r.attachment_name
      ? { name: r.attachment_name, type: r.attachment_type ?? '' }
      : undefined,
  }));
};

// Fire-and-forget: a failed save must not break the conversation.
export const saveChat = (channel: ChatChannel, userId: string, msg: ChatMessage): void => {
  supabase
    .from('chat_messages')
    .insert({
      user_id: userId,
      channel,
      sender: msg.sender,
      content: msg.text,
      attachment_name: msg.attachment?.name ?? null,
      attachment_type: msg.attachment?.type ?? null,
    })
    .then(({ error }) => {
      if (error) console.error('Failed to save chat message:', error);
    });
};
