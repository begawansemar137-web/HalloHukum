import { supabase } from '../lib/supabase';
import type { FilePart } from '../types';

// Gemini is called server-side through the `ai-chat` edge function; the API
// key and system prompts never reach the browser.
type History = { role: string; parts: { text: string }[] }[];

const callAi = async (
  mode: 'humi' | 'advisor',
  message: string,
  history: History,
  file?: FilePart,
): Promise<{ text: string; suggestedServiceSlug: string | null }> => {
  const { data, error } = await supabase.functions.invoke('ai-chat', {
    body: { mode, message, history, file },
  });
  if (error || !data?.text) {
    console.error('ai-chat failed:', error);
    const rateLimited = (error as any)?.context?.status === 429;
    return {
      text: rateLimited
        ? 'Maaf, terlalu banyak permintaan. Silakan coba lagi beberapa saat lagi.'
        : mode === 'humi'
          ? 'Maaf, terjadi kendala saat menghubungi HUMI. Silakan coba beberapa saat lagi.'
          : 'Maaf, terjadi kendala saat menghubungi konsultan. Silakan coba beberapa saat lagi.',
      suggestedServiceSlug: null,
    };
  }
  return { text: data.text, suggestedServiceSlug: data.suggestedServiceSlug ?? null };
};

export const getHumiResponse = (
  userMessage: string,
  history: History,
  file?: FilePart,
): Promise<{ text: string; suggestedServiceSlug: string | null }> => callAi('humi', userMessage, history, file);

export const getAdvisorResponse = async (
  userMessage: string,
  history: History,
  file?: FilePart,
): Promise<string> => (await callAi('advisor', userMessage, history, file)).text;
