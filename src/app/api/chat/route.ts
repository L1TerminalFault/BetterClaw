// import { openai } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";
import { models } from "@/lib/gen-utils";

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const result = await streamText({
    model: openrouter(models[5]) as any,
    messages,
    onFinish({text}) {
      console.log("text: ", text)
    }
  });

  return result.toDataStreamResponse();
}
