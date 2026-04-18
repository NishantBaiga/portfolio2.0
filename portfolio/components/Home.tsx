"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Trophy } from "lucide-react";
import { CustomCursor } from "./CustomCursor";
import { ChatBot } from "./ChatBot";
import { soundManager } from "../lib/soundManager";
import { Footer } from "./home/Footer";
import { Navbar } from "./home/Navbar";
import { Hero } from "./home/Hero";
import { About } from "./home/About";
import { Technologies } from "./home/Technologies";
import { Projects } from "./home/Projects";
import { Blogs } from "./home/Blogs";
import { Experience } from "./home/ExperienceTimeLine";
import { Contact } from "./home/Contact";
import { StudProgressBar } from "./home/StudyProgresBar";
import { Achievement } from "./home/Achievement";
import { Skills } from "./home/Skills";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [contactStep, setContactStep] = useState(1);
  const [projectFilter, setProjectFilter] = useState("all");
  const [outfit, setOutfit] = useState<"default" | "wizard" | "engineer">(
    "default",
  );
  const [foundBricks, setFoundBricks] = useState<string[]>([]);
  const [contactData, setContactData] = useState({
    color: "",
    message: "",
    email: "",
  });

  const handleFoundBrick = (id: string) => {
    if (!foundBricks.includes(id)) {
      const newFound = [...foundBricks, id];
      setFoundBricks(newFound);
      soundManager.play("collect");
      soundManager.vibrate(100);

      if (newFound.length === 5) {
        soundManager.play("success");
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FFD500", "#E3000B", "#0055BF", "#009639"],
        });
      }
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans selection:bg-[#FFD500] selection:text-black transition-colors duration-500 pt-10">
      <StudProgressBar />
      <CustomCursor />
      <ChatBot />

      {foundBricks.length === 5 && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-12 left-1/2 -translate-x-1/2 z-[110] bg-[#FFD500] lego-border lego-shadow px-6 py-2 flex items-center gap-3"
        >
          <Trophy className="w-5 h-5 text-black" />
          <span className="font-black uppercase text-sm">
            Master Builder Unlocked!
          </span>
        </motion.div>
      )}
      <motion.div
        style={{ y: backgroundY }}
        className="fixed inset-0 pointer-events-none opacity-5 z-0"
      >
        <div className="grid grid-cols-6 gap-8 p-8">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="w-32 h-32 bg-black lego-border"
              style={{ borderRadius: i % 2 === 0 ? "0" : "100%" }}
            />
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        handleFoundBrick={handleFoundBrick}
        foundBricks={foundBricks}
      />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden"
      >
        <Hero isDarkMode={isDarkMode} />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 px-4 bg-white border-y-4 border-black"
      >
        <About
          outfit={outfit}
          setOutfit={setOutfit}
          isDarkMode={isDarkMode}
          handleFoundBrick={handleFoundBrick}
          foundBricks={foundBricks}
        />
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4">
        <Technologies />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 bg-black text-white">
        <Projects
          projectFilter={projectFilter}
          setProjectFilter={setProjectFilter}
          handleFoundBrick={handleFoundBrick}
          foundBricks={foundBricks}
        />
      </section>

      {/* skills */}
      <section
        id="core-skills"
        className="py-24 px-4 bg-[#F5F5F0] dark:bg-black/40"
      >
        <Skills />
      </section>

      {/* Blog Section - Instruction Manual Style */}
      <section id="blog" className="py-24 px-4 bg-muted">
        <Blogs />
      </section>

      {/* Experience Section - Interactive Tower */}
      <section
        id="experience"
        className="py-24 px-4 bg-background overflow-hidden"
      >
        <Experience
          handleFoundBrick={handleFoundBrick}
          foundBricks={foundBricks}
        />
      </section>

      {/* Achievement Section */}
      <section className="py-24 px-4 bg-[#0055BF] text-white">
        <Achievement />
      </section>

      {/* Contact Adventure Section */}
      <section
        id="contact"
        className="py-24 px-4 bg-[#FFD500] border-t-4 border-black"
      >
        <Contact
          contactStep={contactStep}
          setContactStep={setContactStep}
          contactData={contactData}
          setContactData={setContactData}
          handleFoundBrick={handleFoundBrick}
          foundBricks={foundBricks}
        />
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black text-white border-t-4 border-black">
        <Footer />
      </footer>
    </div>
  );
}
