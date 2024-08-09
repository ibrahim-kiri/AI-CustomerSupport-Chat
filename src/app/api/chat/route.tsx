import { type NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const { prompt }: { prompt: string } = await request.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text().replaceAll('*', '');
    console.log(text);
    return NextResponse.json({ assistantResponse: text }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
    // }
  }
}
