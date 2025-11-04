
import { GoogleGenAI } from "@google/genai";
import { Notification } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function summarizeNotifications(notifications: Notification[]): Promise<string> {
  if (notifications.length === 0) {
    return "No notifications to summarize.";
  }

  const notificationsForPrompt = notifications.map(({ title, message, source }) => ({
    source,
    title,
    message,
  }));

  const prompt = `You are a productivity assistant for the "Super Notification Manager" app. Your task is to summarize the following notifications.
  
  Please provide a concise summary, highlighting the most urgent or important items. Group related notifications if possible (e.g., by app or topic). Use bullet points for clarity.

  Here are the notifications in JSON format:
  ${JSON.stringify(notificationsForPrompt, null, 2)}

  Begin your summary now.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate summary from Gemini API.");
  }
}
