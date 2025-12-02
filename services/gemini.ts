import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SYSTEM_INSTRUCTION, MENU_ITEMS } from '../constants';
import { Recommendation } from '../types';

const apiKey = process.env.API_KEY;

// Define the response schema for strict JSON output
const recommendationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    message: {
      type: Type.STRING,
      description: "A friendly conversational response to the user explaining the choices.",
    },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          dishId: {
            type: Type.STRING,
            description: "The ID of the recommended dish from the menu.",
          },
          reason: {
            type: Type.STRING,
            description: "A short, appetizing reason why this dish matches the user's request.",
          },
        },
        required: ["dishId", "reason"],
      },
    },
  },
  required: ["message", "recommendations"],
};

export const getMenuRecommendations = async (
  userHistory: { role: string; content: string }[],
  currentMessage: string
): Promise<{ message: string; recommendations: Recommendation[] }> => {
  
  if (!apiKey) {
    console.error("API Key is missing");
    return {
      message: "I'm sorry, I cannot connect to the brain right now (API Key missing).",
      recommendations: []
    };
  }

  const ai = new GoogleGenAI({ apiKey });

  // Prepare context with the full menu
  const menuContext = JSON.stringify(MENU_ITEMS.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    ingredients: item.ingredients,
    tags: item.tags,
    category: item.category
  })));

  const prompt = `
    Here is the current menu data: ${menuContext}
    
    User Request: "${currentMessage}"
    
    Based on the menu and the user's request, provide recommendations.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...userHistory.map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: recommendationSchema,
        temperature: 0.7, // Slightly creative but grounded
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    const data = JSON.parse(text);
    return {
      message: data.message,
      recommendations: data.recommendations || []
    };

  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return {
      message: "I'm having a little trouble reading the menu right now. Could you try asking differently?",
      recommendations: []
    };
  }
};