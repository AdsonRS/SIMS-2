
import { GoogleGenAI } from "@google/genai";

// FIX: Initializing GoogleGenAI using process.env.API_KEY directly as required by guidelines.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = async (file) => {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    // FIX: Cast reader.result to string to use split method.
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise as string, mimeType: file.type },
  };
};

export const analyzeBikeDamage = async (image, description) => {
  try {
    const ai = getAI();
    const imagePart = await fileToGenerativePart(image);
    const textPart = {
      text: `Analyze the user's photo and description of a bike issue. Based on the visual evidence and the text "${description}", categorize the problem (e.g., "Pneu furado", "Freio com defeito", "Corrente solta", "Outro"). Provide a short, direct answer.`,
    };

    const response = await ai.models.generateContent({
      // FIX: Using gemini-3-flash-preview for basic classification/reasoning tasks.
      model: 'gemini-3-flash-preview',
      contents: { parts: [imagePart, textPart] },
    });

    // FIX: Accessing .text property directly (it's a getter, not a method).
    return response.text?.trim() || "Análise concluída.";
  } catch (error) {
    console.error("Error analyzing bike damage:", error);
    return "Não foi possível analisar a imagem. Tente novamente.";
  }
};

export const getCampusInfo = async (query) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      // FIX: Using gemini-3-flash-preview for general Q&A with search grounding.
      model: "gemini-3-flash-preview",
      contents: `O usuário está perguntando sobre a universidade UFMA. Responda à pergunta: "${query}"`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    return { text: response.text, sources };
  } catch (error) {
    console.error("Error fetching campus info:", error);
    return { text: "Ocorreu um erro ao buscar informações. Tente novamente.", sources: [] };
  }
};

export const findPointsOfInterest = async (query, location) => {
  try {
    const ai = getAI();
    // FIX: Typing config as any to satisfy toolConfig extension.
    const config: any = {
      tools: [{ googleMaps: {} }],
    };
    if (location) {
      config.toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }
        }
      };
    }

    const response = await ai.models.generateContent({
      // FIX: Maps grounding is specifically supported in 2.5 series models.
      model: "gemini-2.5-flash",
      contents: `O usuário está no campus da UFMA e quer encontrar algo. Responda à pergunta: "${query}"`,
      config,
    });
    
    const places = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    return { text: response.text, places };
  } catch (error) {
    console.error("Error finding points of interest:", error);
    return { text: "Ocorreu um erro ao buscar locais. Tente novamente.", places: [] };
  }
};
