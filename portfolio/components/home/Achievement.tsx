import { Badge, Trophy } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";

export function Achievement() {
    return (
        <div className="max-w-7xl mx-auto">
          <SectionHeader title="Accolades" subtitle="The certificates and milestones in my inventory." />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Meta Front-End Developer", issuer: "Coursera", color: "bg-[#4267B2]" },
              { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", color: "bg-[#FF9900]" },
              // { title: "Hackathon Finalist", issuer: "Global Build-Off", color: "bg-[#E3000B]" }
            ].map((cert, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-white text-black p-6 lego-border lego-shadow relative group overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-16 h-16 ${cert.color} rotate-45 translate-x-8 -translate-y-8`} />
                <Trophy className="w-10 h-10 mb-4 text-[#FFD500]" />
                <h4 className="text-xl font-black uppercase tracking-tight mb-2">{cert.title}</h4>
                <p className="font-bold opacity-60 uppercase text-sm">{cert.issuer}</p>
                <div className="mt-6 pt-4 border-t-2 border-black/5 flex justify-between items-center">
                  <span className="font-black text-[10px] uppercase">Part #00{i+1}</span>
                  <Badge className="bg-black text-white">VERIFIED</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    );
}