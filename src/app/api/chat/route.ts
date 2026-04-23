// import { openai } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = await streamText({
    model: openrouter("openai/gpt-3.5-turbo-instruct"),
    messages,
    // onFinish({text}) {
    //   console.log(text)
    // }
  });

  return result.toDataStreamResponse();
}
