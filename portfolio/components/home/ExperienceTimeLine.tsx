import { Plus } from "lucide-react";
import { GoldenBrick } from "./GoldenBrick";
import { SectionHeader } from "./SectionHeader";
import {motion} from "framer-motion"

type ExperienceProps = {
    handleFoundBrick: (id: string) => void;
    foundBricks: string[]
}
export function Experience(
    {
        handleFoundBrick,
        foundBricks
    }: ExperienceProps
){
    return(<div className="max-w-4xl mx-auto">
          <SectionHeader
            title="The Build Path"
            subtitle="My professional journey - building the tower."
          />

          <div className="flex flex-col-reverse items-center relative">
            {/* The Tower Base */}
            <div className="w-full max-w-md h-8 bg-black dark:bg-white lego-border lego-shadow mb-4 relative">
              <div className="absolute -top-6 left-4">
                <GoldenBrick
                  id="tower"
                  onFound={handleFoundBrick}
                  isFound={foundBricks.includes("tower")}
                />
              </div>
            </div>

            {[
              {
                year: "2019 - 2021",
                role: "Junior Developer",
                company: "StartUp Bricks",
                color: "#009639",
                description:
                  "Started as a junior, learning the fundamentals of brick-based architecture.",
              },
              {
                year: "2021 - 2023",
                role: "Full Stack Developer",
                company: "Creative Cubes",
                color: "#0055BF",
                description:
                  "Expanded to full-stack, building complex interconnected systems.",
              },
              {
                year: "2023 - Present",
                role: "Senior Brick Engineer",
                company: "TechBlocks Inc.",
                color: "#E3000B",
                description:
                  "Leading the engineering team, designing high-performance digital structures.",
              },
            ].map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", damping: 15, stiffness: 100 }}
                className="w-full max-w-2xl mb-4 relative group"
              >
                {/* Floor Connector (Studs) */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-4 z-10">
                  <div className="w-6 h-4 bg-black dark:bg-white lego-border" />
                  <div className="w-6 h-4 bg-black dark:bg-white lego-border" />
                </div>

                <div className="bg-white dark:bg-card lego-border lego-shadow p-8 flex flex-col md:flex-row gap-6 items-center">
                  <div
                    className="w-24 h-24 flex-shrink-0 flex items-center justify-center lego-border lego-shadow-sm text-white"
                    style={{ backgroundColor: exp.color }}
                  >
                    <span className="font-black text-xs text-center px-2">
                      {exp.year}
                    </span>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-black uppercase tracking-tighter">
                      {exp.role}
                    </h3>
                    <p className="font-bold text-primary">{exp.company}</p>
                    <p className="mt-2 text-muted-foreground text-sm">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* The Crane */}
            <motion.div
              animate={{ x: [-20, 20, -20] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-32 left-0 hidden lg:block"
            >
              <div className="w-48 h-4 bg-[#FFD500] lego-border lego-shadow-sm relative">
                <div className="absolute right-0 top-4 w-2 h-16 bg-black dark:bg-white" />
                <div className="absolute right-[-4px] top-20 w-10 h-10 bg-[#E3000B] lego-border flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>)
}