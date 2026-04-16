import { Skill } from "@/types";
import { Code2, Layers, Cpu, Database, Globe, Smartphone } from "lucide-react";

export const SKILLS: Skill[] = [
  { name: "React", icon: <Code2 />, color: "bg-[#0055BF]" },
  { name: "TypeScript", icon: <Layers />, color: "bg-[#009639]" },
  { name: "Node.js", icon: <Cpu />, color: "bg-[#FFD500]" },
  { name: "MongoDB", icon: <Database />, color: "bg-[#E3000B]" },
  { name: "Three.js", icon: <Globe />, color: "bg-[#FF8200]" },
  { name: "Mobile", icon: <Smartphone />, color: "bg-[#000000]" },
];