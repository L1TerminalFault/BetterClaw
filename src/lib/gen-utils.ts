import { StarterPrompt } from "./types";
import { PiNotepadBold as Note, PiCodeBold as Code } from "react-icons/pi";
import { FaRegFaceLaughSquint as Joke } from "react-icons/fa6";
import { LuText as Text } from "react-icons/lu";
import { MdOutlineTopic as Topic, MdOutlineMedicalServices as Medical } from "react-icons/md";
import { TbSettingsCog as Help } from "react-icons/tb";

export const aiGreetings = [
  "What's on your mind?",
  "What topic should we explore?",
  "How may I assist?",
  "How are you?",
  "What is on for today?",
  "Hey, What's up?",
  "Pick a topic below so we can talk",
];

export const getRandomGreeting = () => {
  return aiGreetings[Math.floor(Math.random() * aiGreetings.length)];
};

export const listOfStarterPrompts: StarterPrompt[] = [
  {
    id: 0,
    title: "Summarize note",
    prompt: "Summarize given note or text",
    icon: Note,
  },
  {
    id: 1,
    title: "Make a joke",
    prompt: "Make a hilarious joke to make me happy",
    icon: Joke,
  },
  {
    id: 2,
    title: "Translate text",
    prompt: "Translate text from one language to another language",
    icon: Text,
  },
  {
    id: 3,
    title: "Generate code",
    prompt: "Generate some code based on the criteria I am about to give you",
    icon: Code,
  },
  {
    id: 4,
    title: "Pick a random topic",
    prompt: "Pick a random topic so we can talk",
    icon: Topic,
  },
  {
    id: 5,
    title: "Give technical help",
    prompt: "Give me technical help on a topic",
    icon: Help,
  },
  {
    id: 6,
    title: "Give medical advice",
    prompt:
      "Give me a medical advice based on conditions I am about to give you",
    icon: Medical,
  },
];

export const models = [
  "openai/gpt-3.5-turbo-instruct",
  "meta-llama/llama-3-8b-instruct",
  "inclusionai/ling-2.6-1t:free",
  "tencent/hy3-preview:free",
  "inclusionai/ling-2.6-flash:free",
  "baidu/qianfan-ocr-fast:free",
  "google/gemma-4-26b-a4b-it:free",
  "google/gemma-4-31b-it:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "nvidia/llama-nemotron-embed-vl-1b-v2:free",
  "minimax/minimax-m2.5:free",
  "liquid/lfm-2.5-1.2b-thinking:free",
  "liquid/lfm-2.5-1.2b-instruct:free",
  "nvidia/nemotron-3-nano-30b-a3b:free",
  "nvidia/nemotron-nano-12b-v2-vl:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "nvidia/nemotron-nano-9b-v2:free",
  "openai/gpt-oss-120b:free",
  "openai/gpt-oss-20b:free",
  "z-ai/glm-4.5-air:free",
  "qwen/qwen3-coder:free",
  "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
  "google/gemma-3n-e2b-it:free",
  "google/gemma-3n-e4b-it:free",
  "google/gemma-3-4b-it:free",
  "google/gemma-3-12b-it:free",
  "google/gemma-3-27b-it:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
]
