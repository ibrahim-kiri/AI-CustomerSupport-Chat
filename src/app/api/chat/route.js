import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request) {
  const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });
  //   const data = await request.json();

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'You are a helpful assistant.' }],
    model: 'gpt-3.5-turbo-0125',
  });
  //   console.log(completion);

  return NextResponse.json({ completion });
  //   console.log(completion.choices[0]);
}
