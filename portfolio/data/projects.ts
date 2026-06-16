import { Project } from "@/types";
import chatImg from "@/assets/chat.webp";
import codeagentImg from "@/assets/codeagent.png";
import pdfQnaImg from "@/assets/pdf-qna.png";

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Docvora",
    description:
      "A full-stack PDF Q&A and Summrizer platform built(RAG) with Next.js and LangChain.",
    type: "web",
    tags: ["Nextjs", "LangChain", "GeminiAI"],
    liveLink: "https://docvora.vercel.app/",
    githubLink: "https://github.com/NishantBaiga/Docvora",
    image: "/assets/pdf-qna.png",
  },
  {
    id: 2,
    title: "Website Builder",
    description:
      "An interactive platform for designing custom UI components and building full websites, combining creativity with powerful development capabilities.",
    type: "web",
    tags: ["Inggest", "E2b", "GeminiAI", "React Query ", "TRPC"],
    liveLink: "https://codeagent.vercel.app/",
    githubLink: "https://github.com/NishantBaiga/codeagent",
    image: "/assets/code-agent.png",
  },
  {
    id: 3,
    title: "Web-Based Real-Time Chat System",
    description:
      "A high-performance real-time chat app that delivers instant messaging, reliable connections, and an engaging user experience.",
    type: "web",
    tags: ["ReactJs", "ExpressJs", "Socket.io", "MongoDB", "TailwindCSS","ShadcnUI"],
    liveLink: "#",
    githubLink: "https://github.com/NishantBaiga/chatapp-typescript-2025",
    image: "/assets/chat.webp",
  },
];
