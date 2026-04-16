import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { GoldenBrick } from "./GoldenBrick";
type NavbarProps ={
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
  handleFoundBrick: (id: string) => void;
  foundBricks: string[];
}
export function Navbar({
  isDarkMode,
  setIsDarkMode,
  handleFoundBrick,
  foundBricks,
}: NavbarProps) {
    return(<nav className="fixed top-10 left-0 right-0 z-50 bg-white dark:bg-black border-b-4 border-black dark:border-white p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-[#E3000B] lego-border lego-shadow-sm flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <span className="text-white font-black text-xl">N</span>
                </div>
                <span className="font-black text-2xl tracking-tighter uppercase hidden sm:block">
                  Nishant.Build
                </span>
                <div className="ml-4">
                  <GoldenBrick
                    id="nav"
                    onFound={handleFoundBrick}
                    isFound={foundBricks.includes("nav")}
                  />
                </div>
              </div>
              <div className="hidden md:flex items-center gap-8 font-bold uppercase text-sm tracking-widest">
                <a href="#home" className="hover:text-[#E3000B] transition-colors">
                  Home
                </a>
                <a href="#about" className="hover:text-[#0055BF] transition-colors">
                  About
                </a>
                <a
                  href="#skills"
                  className="hover:text-[#009639] transition-colors"
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  className="hover:text-[#FFD500] transition-colors"
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  className="hover:text-[#FF8200] transition-colors"
                >
                  Contact
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="lego-border lego-shadow-sm hover:bg-[#FFD500] dark:hover:bg-[#0055BF]"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
                <Button className="bg-[#E3000B] hover:bg-[#E3000B]/90 text-white font-black uppercase lego-border lego-shadow-sm transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                  Hire Me
                </Button>
              </div>
            </div>
          </nav>)
}