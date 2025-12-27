
import { GoogleGenAI, Type } from "@google/genai";
import { MISProject } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeMISData = async (projects: MISProject[]) => {
  const prompt = `
    As an expert Management Information System (MIS) analyst for a government development authority (SJDA), 
    analyze the following project data and provide a concise summary including:
    1. Overall project health summary.
    2. Budget utilization efficiency.
    3. Potential risks (projects on hold or behind schedule).
    4. Recommendations for improvement.
    
    Data: ${JSON.stringify(projects)}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return "Unable to perform AI analysis at this time. Please check your connectivity and try again.";
  }
};

export const getSmartResponse = async (query: string, data: MISProject[]) => {
  const prompt = `
    User Query: ${query}
    Current MIS Data Context: ${JSON.stringify(data)}
    
    Answer the user query based on the data provided above. Be professional and concise.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return "Sorry, I couldn't process that request.";
  }
};
