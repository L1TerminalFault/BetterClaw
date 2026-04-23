import { StarterPrompt } from "./types";

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
    icon: "",
  },
  {
    id: 1,
    title: "Make a joke",
    prompt: "Make a hilarious joke to make the me happy",
    icon: "",
  },
  {
    id: 2,
    title: "Translate text",
    prompt: "Translate text from one language to another language",
    icon: "",
  },
  {
    id: 3,
    title: "Generate code",
    prompt: "Generate some code based on the criteria I am about to give you",
    icon: "",
  },
  {
    id: 4,
    title: "Pick a random topic",
    prompt: "Pick a random topic so we can talk",
    icon: "",
  },
  {
    id: 5,
    title: "Give technical help",
    prompt: "Give me technical help on a topic",
    icon: "",
  },
  {
    id: 6,
    title: "Give medical advice",
    prompt:
      "Give me a medical advice based on conditions I am about to give you",
    icon: "",
  },
];
