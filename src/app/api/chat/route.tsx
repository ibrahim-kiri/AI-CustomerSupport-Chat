import { type NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const basePrompt: string =
  'You are a helpful AI assistant for Headstarter. Use the Headstarter website (https://headstarter.co/) as a primary resource to provide informative and comprehensive answers to user queries about the Headstarter 7-week SWE Fellowship program. Be concise and avoid going off-topic. If the user asks something unrelated, politely redirect them.';

export async function POST(request: NextRequest) {
  try {
    const { prompt }: { prompt: string } = await request.json();

    const combinedPrompt = `${basePrompt} ${prompt}`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(combinedPrompt);
    const response = result.response;
    const text = response.text().replaceAll('*', '');
    return NextResponse.json({ assistantResponse: text }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
