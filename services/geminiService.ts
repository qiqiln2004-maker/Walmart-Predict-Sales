import { GoogleGenAI } from "@google/genai";
import { ForecastParams } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateForecastInsight = async (params: ForecastParams): Promise<string> => {
  try {
    const prompt = `
      As a retail sales forecasting analyst for Walmart, provide a brief, high-level executive summary (max 2 sentences) of how the following scenario parameters might impact weekly sales.
      
      Parameters:
      - Average Temperature Deviation: ${params.temperature > 0 ? '+' : ''}${params.temperature}°F
      - Fuel Price Impact: ${params.fuelPrice > 0 ? '+' : ''}${params.fuelPrice}%
      - CPI Adjustment: ${params.cpi > 0 ? '+' : ''}${params.cpi}%
      
      Keep it professional and focused on consumer behavior (e.g., impact on discretionary spending, seasonal items, foot traffic).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Unable to generate insight at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI insights unavailable due to network or configuration issues.";
  }
};
