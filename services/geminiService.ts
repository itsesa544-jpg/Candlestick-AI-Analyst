import { GoogleGenAI, Type } from "@google/genai";
import { ChartAnalysis, TradingPlatform, ChartTimeframe } from '../types';

// Initialize the Google Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes an image of a financial chart to provide a technical analysis.
 * @param imageBase64 The base64-encoded image string.
 * @param mimeType The MIME type of the image.
 * @param platform The trading platform the chart is from.
 * @param timeframe The timeframe of the chart.
 * @returns A promise that resolves to a ChartAnalysis object.
 */
export const analyzeChart = async (
  imageBase64: string,
  mimeType: string,
  platform: TradingPlatform,
  timeframe: ChartTimeframe
): Promise<ChartAnalysis> => {
  const prompt = `You are a professional technical analyst specializing in the ${platform} trading platform. Analyze the provided candlestick chart image which represents a ${timeframe} timeframe. Identify key candlestick patterns, predict the most likely next market direction (Up, Down, or Sideways), provide a confidence percentage for your prediction, and give a detailed analysis explaining your reasoning. Respond in JSON format according to the provided schema.`;

  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType,
    },
  };

  const textPart = {
    text: prompt,
  };

  // Define the expected JSON schema for the model's response
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      prediction: { 
        type: Type.STRING, 
        description: "The predicted market direction: 'Up', 'Down', or 'Sideways'." 
      },
      confidence: { 
        type: Type.NUMBER, 
        description: "The confidence level of the prediction, from 0 to 100." 
      },
      patterns: {
        type: Type.ARRAY,
        description: "A list of key candlestick patterns or technical indicators identified.",
        items: {
          type: Type.STRING,
        },
      },
      analysis: { 
        type: Type.STRING, 
        description: "A detailed explanation of the reasoning behind the prediction and patterns identified." 
      },
    },
    required: ['prediction', 'confidence', 'patterns', 'analysis'],
  };

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
        config: {
            responseMimeType: 'application/json',
            responseSchema,
        },
    });
    
    const responseText = response.text;
    const parsedResult: ChartAnalysis = JSON.parse(responseText);

    // Basic validation to ensure prediction is one of the expected values
    const validPredictions = ['Up', 'Down', 'Sideways'];
    if (!validPredictions.includes(parsedResult.prediction)) {
      // If the model returns something unexpected, default to 'Sideways' to avoid crashing.
      parsedResult.prediction = 'Sideways';
    }

    return parsedResult;

  } catch (error) {
    console.error('Error analyzing chart with Gemini:', error);
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse the analysis from the AI. The response was not valid JSON.');
    }
    const responseText = (error as any)?.response?.text;
    if (responseText?.includes('SAFETY')) {
        throw new Error('Analysis failed because the image was blocked for safety reasons. Please try a different image.');
    }
    throw new Error('Failed to analyze chart. The API call returned an error.');
  }
};
