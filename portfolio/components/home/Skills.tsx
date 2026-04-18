import { CORE_SKILLS } from "@/data/skils"; 
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";

export function Skills(){
    return(
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Core Fundamentals" subtitle="The theoretical foundation of my building process." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-card p-6 lego-border lego-shadow-sm flex gap-4 items-center group cursor-default"
              >
                <div className="w-12 h-12 bg-[#FFD500] lego-border flex items-center justify-center group-hover:rotate-12 transition-transform">
                  {skill.icon}
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-tight">{skill.name}</h4>
                  <p className="text-sm font-bold opacity-60 italic">{skill.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      
    )
}