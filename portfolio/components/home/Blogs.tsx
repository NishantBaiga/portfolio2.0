import { Badge, ChevronRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";
export function Blogs(){
    return (
        <div className="max-w-5xl mx-auto">
                  <SectionHeader
                    title="Learning Log"
                    subtitle="Deconstructing complex systems brick by brick."
                  />
        
                  <div className="grid md:grid-cols-2 gap-12">
                    {[
                      {
                        title: "Building Scalable React Bricks",
                        date: "Oct 12, 2023",
                        parts: ["React", "TypeScript", "Vite"],
                        summary:
                          "Learn how to structure your components so they snap together perfectly every time.",
                      },
                      {
                        title: "The Foundation: Database Design",
                        date: "Sep 28, 2023",
                        parts: ["PostgreSQL", "Prisma", "Redis"],
                        summary:
                          "A solid digital structure needs a rock-solid foundation. Here's how to build it.",
                      },
                    ].map((post, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="instruction-manual lego-shadow group cursor-pointer"
                      >
                        <div className="flex justify-between items-center mb-6">
                          <div className="w-12 h-12 bg-[#FFD500] lego-border flex items-center justify-center font-black">
                            {i + 1}
                          </div>
                          <span className="font-black text-xs uppercase tracking-widest opacity-40">
                            {post.date}
                          </span>
                        </div>
                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-[#E3000B] transition-colors">
                          {post.title}
                        </h3>
                        <p className="font-bold text-black/60 mb-6">{post.summary}</p>
                        <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-black/10">
                          <span className="font-black text-[10px] uppercase mr-2">
                            Required Parts:
                          </span>
                          {post.parts.map((part) => (
                            <Badge
                              key={part}
                              className="lego-border-sm bg-white text-black font-black text-[10px] uppercase"
                            >
                              {part}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-8 flex items-center gap-2 font-black uppercase text-sm group-hover:gap-4 transition-all">
                          Read Manual <ChevronRight className="w-4 h-4" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
    )
}