import { useTransform } from "motion/react";
import { motion } from "motion/react";
export function Stud({
  i,
  total,
  scrollYProgress,
}: {
  i: number;
  total: number;
  scrollYProgress: any;
}) {
  const backgroundColor = useTransform(
    scrollYProgress,
    [i / total, (i + 1) / total],
    ["rgba(0,0,0,0.05)", "#E3000B"],
  );

  return (
    <motion.div
      className="stud h-3 w-3 rounded-full"
      style={{ backgroundColor }}
    />
  );
}