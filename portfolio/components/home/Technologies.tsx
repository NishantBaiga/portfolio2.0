import { SectionHeader } from "./SectionHeader";
import { SKILLS } from "@/data/skils";
import { motion } from "framer-motion";
export function Technologies(){
    return (
        <div className="max-w-7xl mx-auto">
                  <SectionHeader
                    title="My Bricks"
                    subtitle="The technologies I use to build."
                  />
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {SKILLS.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`p-8 ${skill.color} text-white lego-border lego-shadow flex flex-col items-center justify-center gap-4 cursor-pointer group`}
                      >
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          className="text-4xl group-hover:scale-125 transition-transform"
                        >
                          {skill.icon}
                        </motion.div>
                        <span className="font-black uppercase tracking-widest text-sm">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
    )
}