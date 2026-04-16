import { useScroll } from "motion/react";
import { Stud } from "./Stud";

export function StudProgressBar() {
  const { scrollYProgress } = useScroll();
  const studs = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] bg-white dark:bg-black border-b-4 border-black dark:border-white h-10 flex items-center px-4 overflow-hidden">
      <div className="stud-bar w-full flex gap-2 justify-center">
        {studs.map((i) => (
          <Stud
            key={i}
            i={i}
            total={studs.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}