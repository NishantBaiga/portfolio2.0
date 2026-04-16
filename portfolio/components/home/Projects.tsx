import { SectionHeader } from "./SectionHeader";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { AnimatePresence } from "motion/react";
import { GoldenBrick } from "./GoldenBrick";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge, ExternalLink } from "lucide-react";
import {Github} from "@hugeicons/core-free-icons"
import {motion} from "framer-motion"
import { Project } from "@/types";
import { PROJECTS } from "@/data/projects";

type ProjectsProps = {
  projectFilter: string;
  setProjectFilter: (value: string) => void;
  handleFoundBrick: (id: string) => void;
  foundBricks: string[];
};
export function Projects(
  {
    projectFilter,
    setProjectFilter,
    handleFoundBrick,
    foundBricks,
  }: ProjectsProps
){
    return (<div className="max-w-7xl mx-auto">
          <SectionHeader
            title="Creations"
            subtitle="Showcasing my latest builds."
          />

          <div className="flex justify-center mb-12">
            <Tabs
              defaultValue="all"
              className="w-full max-w-2xl"
              onValueChange={setProjectFilter}
            >
              <TabsList className="bg-white/5 lego-border p-2 h-auto flex flex-wrap justify-center gap-2">
                <TabsTrigger
                  value="all"
                  className="px-6 py-3 font-black uppercase tracking-widest text-white/60 hover:text-white data-[state=active]:bg-[#FFD500] data-[state=active]:text-black lego-border transition-all"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="web"
                  className="px-6 py-3 font-black uppercase tracking-widest text-white/60 hover:text-white data-[state=active]:bg-[#0055BF] data-[state=active]:text-white lego-border transition-all"
                >
                  Web
                </TabsTrigger>
                <TabsTrigger
                  value="mobile"
                  className="px-6 py-3 font-black uppercase tracking-widest text-white/60 hover:text-white data-[state=active]:bg-[#E3000B] data-[state=active]:text-white lego-border transition-all"
                >
                  Mobile
                </TabsTrigger>
                <TabsTrigger
                  value="data"
                  className="px-6 py-3 font-black uppercase tracking-widest text-white/60 hover:text-white data-[state=active]:bg-[#009639] data-[state=active]:text-white lego-border transition-all"
                >
                  Data
                </TabsTrigger>
                <TabsTrigger
                  value="game"
                  className="px-6 py-3 font-black uppercase tracking-widest text-white/60 hover:text-white data-[state=active]:bg-[#FF8200] data-[state=active]:text-white lego-border transition-all"
                >
                  Game
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {PROJECTS.filter(
                (p) => projectFilter === "all" || p.type === projectFilter,
              ).map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-white text-black lego-border lego-shadow-hover transition-all box-art-card"
                >
                  <div className="h-64 w-full bg-[#F5F5F0] border-b-4 border-black relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#E3000B]/10 group-hover:bg-transparent transition-colors" />

                    {i === 1 && (
                      <div className="absolute bottom-4 left-4">
                        <GoldenBrick
                          id="project"
                          onFound={handleFoundBrick}
                          isFound={foundBricks.includes("project")}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-3xl font-black uppercase tracking-tighter">
                        {project.title}
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="lego-border lego-shadow-sm hover:bg-[#FFD500]"
                        >
                          {/* <Github className="w-5 h-5" /> */}

                          <HugeiconsIcon icon={Github} />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="lego-border lego-shadow-sm hover:bg-[#0055BF] hover:text-white"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                    <p className="font-bold text-black/60 mb-6">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-black text-white font-black uppercase text-[10px] tracking-widest"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>)
}