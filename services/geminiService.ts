
import { GoogleGenAI, Type } from "@google/genai";

export interface AIGeneratedContent {
  description: string;
  tags: string[];
}

export const generateTagsAndDescription = async (
  videoDescription: string
): Promise<AIGeneratedContent> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      As a video content analyst for a stock footage marketplace, analyze the following user-provided description of a B-roll video clip.
      Your task is to generate a compelling, professional stock footage description and a list of relevant, SEO-friendly tags.
      The description should be concise (2-3 sentences) and highlight the potential uses for the clip.
      The tags should be lowercase and cover subjects, actions, concepts, and moods. Provide at least 8-12 diverse tags.
      
      User's video description: "${videoDescription}"

      Return the result as a JSON object.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: {
              type: Type.STRING,
              description: "A compelling, professional stock footage description (2-3 sentences)."
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "An array of 8-12 relevant, SEO-friendly, lowercase tags."
            },
          },
          required: ["description", "tags"],
        },
      },
    });
    
    const text = response.text;
    if (!text) {
        throw new Error("Empty response from Gemini API.");
    }

    const cleanedText = text.trim();
    const parsedJson = JSON.parse(cleanedText);

    if (parsedJson && parsedJson.description && Array.isArray(parsedJson.tags)) {
      return parsedJson as AIGeneratedContent;
    } else {
      throw new Error("Invalid JSON structure received from Gemini API.");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate content with Gemini API. Please check your prompt and API key.");
  }
};
