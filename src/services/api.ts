import { ChatHistory } from '../types';

const API_KEY = "AIzaSyBCraKdPcANtc82oi4EigXMd23aQ22O3DY";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export const generateResponse = async (chatHistory: ChatHistory[]): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: chatHistory })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate response');
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};