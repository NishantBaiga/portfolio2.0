export interface Project {
  id: number;
  title: string;
  description: string;
  type: "web" | "mobile" | "data" | "game";
  tags: string[];
  liveLink: string;
  githubLink: string;
  image: string;
}

export interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
}