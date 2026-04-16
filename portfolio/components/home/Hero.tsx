import { motion } from "framer-motion"
import { Badge } from "lucide-react"
import { Button } from "../ui/button"
import { ThreeDModelViewer } from "../ThreeDModelViewer"
import { LegoBrick } from "../LegoBrick"

type HeroProps = {
    isDarkMode: boolean
}
export function Hero({ isDarkMode }: HeroProps) {
    return (
        
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                  >
                    <Badge className="bg-[#FFD500] text-black lego-border mb-4 font-black uppercase tracking-widest lego-shadow-sm px-4 py-1">
                      Software Engineer & Brick Architect
                    </Badge>
                    <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-6 lego-text-outline text-white">
                      Building <span className="text-[#E3000B]">Digital</span> <br />
                      <span className="text-[#0055BF]">Worlds</span> Brick <br />
                      By Brick.
                    </h1>
                    <p className="text-xl text-muted-foreground font-bold max-w-lg mb-8">
                      I craft robust, scalable, and playful web experiences using modern
                      technologies and a blocky mindset.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <a href="#projects">
                        <Button
                          size="lg"
                          className="bg-[#0055BF] hover:bg-[#0055BF]/90 text-white font-black uppercase lego-border lego-shadow h-16 px-8 text-lg transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                        >
                          View My Work
                        </Button>
                      </a>
                      <a href="#contact">
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-4 border-black dark:border-white hover:bg-black hover:text-white font-black uppercase lego-shadow h-16 px-8 text-lg transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                        >
                          Get In Touch
                        </Button>
                      </a>
                    </div>
                  </motion.div>
        
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.2, type: "spring" }}
                    className="relative h-[500px] w-full bg-white dark:bg-card lego-border lego-shadow"
                  >
                    <ThreeDModelViewer className="w-full h-full" dark={isDarkMode}>
                      <group scale={1.5}>
                        <LegoBrick
                          position={[0, -1, 0]}
                          width={2}
                          height={1}
                          depth={2}
                          color="#E3000B"
                          emissive={isDarkMode}
                        />
                        <LegoBrick
                          position={[0, 0, 0]}
                          width={2}
                          height={1}
                          depth={2}
                          color="#FFD500"
                          emissive={isDarkMode}
                        />
                        <LegoBrick
                          position={[0, 1, 0]}
                          width={2}
                          height={1}
                          depth={2}
                          color="#0055BF"
                          emissive={isDarkMode}
                        />
                        <LegoBrick
                          position={[0, 2, 0]}
                          width={1}
                          height={1}
                          depth={1}
                          color="#009639"
                          emissive={isDarkMode}
                        />
                      </group>
                    </ThreeDModelViewer>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#FFD500] lego-border lego-shadow flex items-center justify-center rotate-12">
                      <span className="font-black text-4xl text-black">10+</span>
                    </div>
                  </motion.div>
                </div>
    )
}