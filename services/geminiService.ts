import { GoogleGenAI, Chat, Content } from "@google/genai";
import { Message } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `Anda adalah asisten AI ahli produk ritel untuk karyawan toko.
Tugas Anda adalah memberikan rekomendasi produk yang to the point dan singkat.
Fokus hanya pada informasi yang diminta oleh karyawan.
Berikan jawaban langsung tanpa basa-basi atau kata pembuka/penutup yang tidak perlu.
JANGAN gunakan format markdown seperti '#' atau '*' atau '-'. Gunakan kalimat biasa dan paragraf singkat.
Sebutkan nama merek dan model jika relevan.`;

function convertMessagesToHistory(messages: Message[]): Content[] {
    return messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
    }));
}


export function createChatSession(history: Message[] = []): Chat {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: convertMessagesToHistory(history),
    config: {
        systemInstruction: systemInstruction,
    },
  });
  return chat;
}

export async function sendMessageToAI(chat: Chat, message: string): Promise<string> {
  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message to Gemini API:", error);
    return "Maaf, terjadi kesalahan saat menghubungi AI. Coba lagi nanti.";
  }
}
