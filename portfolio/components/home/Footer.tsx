import { HugeiconsIcon } from "@hugeicons/react";
import { Github, Linkedin02Icon, Twitter } from "@hugeicons/core-free-icons";
export function Footer(){
    return (
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E3000B] lego-border" />
            <span className="text-2xl font-black uppercase tracking-tighter">
              BrickBuild
            </span>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/NishantBaiga" target="_blank" className="hover:text-[#FFD500] transition-colors">
              {/* <Github /> */}
              <HugeiconsIcon icon={Github} />
            </a>
            <a href="https://www.linkedin.com/in/nishantbaiga/" target="_blank"   className="hover:text-[#0055BF] transition-colors">
              {/* <Linkedin /> */}
              <HugeiconsIcon icon={Linkedin02Icon} />
            </a>
            <a href="https://x.com/Nishantbaiga" target="_blank" className="hover:text-[#E3000B] transition-colors">
              {/* <Twitter /> */}
              <HugeiconsIcon icon={Twitter} />
            </a>
          </div>
          <p className="font-bold text-white/40 text-sm">
            © 2026 BrickBuild Portfolio. All bricks reserved.
          </p>
        </div>
    )
}