import { Skill } from "@/types";
import { Code2, Layers, Cpu, Database, Globe, Smartphone, BrickWall, Wrench } from "lucide-react";

export const SKILLS: Skill[] = [
  { name: "React", icon: <Code2 />, color: "bg-[#0055BF]" },
  { name: "TypeScript", icon: <Layers />, color: "bg-[#009639]" },
  { name: "Node.js", icon: <Cpu />, color: "bg-[#FFD500]" },
  { name: "MongoDB", icon: <Database />, color: "bg-[#E3000B]" },
  { name: "Three.js", icon: <Globe />, color: "bg-[#FF8200]" },
  { name: "Mobile", icon: <Smartphone />, color: "bg-[#000000]" },
];

export const CORE_SKILLS = [
  { name: "DSA", description: "Algorithms & Complexity", icon: <Layers className="w-5 h-5" /> },
  { name: "OOP", description: "Object-Oriented Design", icon: <Cpu className="w-5 h-5" /> },
  { name: "Backend", description: "Server-side logic", icon: <Database className="w-5 h-5" /> },
  { name: "System Design", description: "Scalable Architecture", icon: <BrickWall className="w-5 h-5" /> },
  { name: "Frontend", description: "UI/UX & React", icon: <Globe className="w-5 h-5" /> },
  { name: "Database", description: "Schema Optimization", icon: <Wrench className="w-5 h-5" /> },
];