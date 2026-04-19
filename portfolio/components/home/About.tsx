import { Download } from "lucide-react";
import { Button } from "../ui/button";
import { GoldenBrick } from "./GoldenBrick";
import { SectionHeader } from "./SectionHeader";
import { ThreeDModelViewer } from "../ThreeDModelViewer";
import { MiniFigure } from "../MiniFigure";

type AboutProps = {
  outfit: "default" | "wizard" | "engineer";
  setOutfit: (value: "default" | "wizard" | "engineer") => void;
  isDarkMode: boolean;
  handleFoundBrick: (id: string) => void;
  foundBricks: string[];
};
export function About({
  outfit,
  setOutfit,
  isDarkMode,
  handleFoundBrick,
  foundBricks,
}: AboutProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <SectionHeader
        title="The Architect"
        subtitle="Who is behind the bricks?"
      />
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6 text-lg font-bold text-muted-foreground">
          <p>
            Hello! My Name is Nishant Baiga I'm a software engineer who never
            truly stopped playing with LEGO. I believe that great software is
            built just like a great LEGO set: with a clear vision, strong
            foundations, and attention to every single brick.
          </p>
          <p>
            My journey started with simple HTML blocks and has evolved into
            building complex, interconnected systems that power modern web
            applications. I specialize in React, Node.js, Backend and 3D web
            experiences.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="p-4 bg-muted lego-border lego-shadow-sm relative">
              <h4 className="font-black uppercase text-[#E3000B]">Fresher</h4>
              <p className="text-sm">Developer</p>
              <div className="absolute -top-2 -right-2">
                <GoldenBrick
                  id="about"
                  onFound={handleFoundBrick}
                  isFound={foundBricks.includes("about")}
                />
              </div>
            </div>
            <div className="p-4 bg-muted lego-border lego-shadow-sm">
              <h4 className="font-black uppercase text-[#0055BF]">Top 1%</h4>
              <p className="text-sm">Learning</p>
            </div>

            <a
              href="Resume.pdf"
              download="Nishant_Baiga_Resume.pdf"
              className="w-full"
            >
              <Button className="w-full bg-[#009639] hover:bg-[#009639]/90 text-white font-black uppercase lego-border lego-shadow-sm h-14 gap-2">
                <Download className="w-5 h-5" />
                Download Resume
              </Button>
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-white dark:bg-card lego-border lego-shadow relative overflow-hidden">
            <ThreeDModelViewer className="w-full h-full" dark={isDarkMode}>
              <MiniFigure outfit={outfit} emissive={isDarkMode} />
            </ThreeDModelViewer>

            {/* Customizer Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/80 p-2 lego-border">
              <Button
                size="sm"
                onClick={() => setOutfit("default")}
                className={`h-8 px-3 font-black text-[10px] uppercase ${outfit === "default" ? "bg-[#E3000B]" : "bg-white text-black"}`}
              >
                Classic
              </Button>
              <Button
                size="sm"
                onClick={() => setOutfit("wizard")}
                className={`h-8 px-3 font-black text-[10px] uppercase ${outfit === "wizard" ? "bg-[#4B0082]" : "bg-white text-black"}`}
              >
                Wizard
              </Button>
              <Button
                size="sm"
                onClick={() => setOutfit("engineer")}
                className={`h-8 px-3 font-black text-[10px] uppercase ${outfit === "engineer" ? "bg-[#FF8200]" : "bg-white text-black"}`}
              >
                Engineer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
