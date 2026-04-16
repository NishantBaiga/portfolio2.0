import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function GoldenBrick({
  id,
  onFound,
  isFound,
}: {
  id: string;
  onFound: (id: string) => void;
  isFound: boolean;
}) {
  if (isFound) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: 10 }}
      onClick={(e) => {
        e.stopPropagation();
        onFound(id);
      }}
      className="cursor-pointer z-50"
    >
      <div className="w-6 h-6 bg-[#FFD500] lego-border lego-shadow-sm flex items-center justify-center">
        <Sparkles className="w-3 h-3 text-white animate-pulse" />
      </div>
    </motion.div>
  );
}
