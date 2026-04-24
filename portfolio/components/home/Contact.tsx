import { Send, Trophy } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { GoldenBrick } from "./GoldenBrick";
import { SectionHeader } from "./SectionHeader";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { soundManager } from "@/lib/soundManager";

type ContactData = {
  color: string;
  message: string;
  email: string;
};

type ContactProps = {
  contactStep: number;
  setContactStep: (step: number) => void;
  contactData: ContactData;
  setContactData: (data: ContactData) => void;
  handleFoundBrick: (id: string) => void;
  foundBricks: string[];
};
export function Contact({
  contactStep,
  setContactStep,
  contactData,
  setContactData,
  handleFoundBrick,
  foundBricks,
}: ContactProps) {
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!contactData.email || !contactData.message) {
      toast.error("Fill all fields before building.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(contactData.email)) {
      toast.error("Your email brick is broken 🧱");
      return false;
    }

    if (contactData.message.length < 10) {
      toast.error("Add more details to your brick.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      console.log("contact data", contactData);

      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(contactData),
      // });

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY, // 👈 from env
          email: contactData.email,
          message: contactData.message,
          subject: "New Portfolio Message 🚀",
          from_name: "Nishant Portfolio",
          botcheck: "", // spam protection
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Brick shipped! 🚀");
        soundManager.play("success"); // 🔊 play success sound
        soundManager.vibrate(80); // 📳 optional vibration
        setContactData({
          color: "",
          email: "",
          message: "",
        });
        setContactStep(4);
      } else {
        toast.error("Something broke. Try again.");
      }
    } catch (err) {
      toast.error("Try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto">
      <SectionHeader
        title="Send a Brick"
        subtitle="A unique contact adventure."
      />

      <div className="bg-white lego-border lego-shadow p-8 md:p-12">
        <div className="flex justify-between mb-12 relative">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center gap-2">
              <motion.div
                animate={
                  contactStep === step
                    ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  repeat: contactStep === step ? Infinity : 0,
                  repeatDelay: 1,
                }}
                className={`w-12 h-12 flex items-center justify-center font-black text-xl lego-border ${contactStep >= step ? "bg-[#E3000B] text-white" : "bg-[#F5F5F0]"}`}
              >
                {step}
              </motion.div>
              <span
                className={`text-[10px] font-black uppercase tracking-widest ${contactStep === step ? "text-[#E3000B]" : "text-black/40"}`}
              >
                {step === 1 ? "Color" : step === 2 ? "Message" : "Send"}
              </span>
              {step === 1 && (
                <div className="absolute -top-8 left-0">
                  <GoldenBrick
                    id="contact"
                    onFound={handleFoundBrick}
                    isFound={foundBricks.includes("contact")}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {contactStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-black uppercase text-center">
                Pick your message brick color
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Urgent", color: "#E3000B" },
                  { name: "Greeting", color: "#0055BF" },
                  { name: "Project", color: "#009639" },
                  { name: "Other", color: "#FF8200" },
                ].map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      soundManager.play("click");
                      setContactData({ ...contactData, color: c.color });
                      setContactStep(2);
                    }}
                    disabled={loading}
                    className="group flex flex-col items-center gap-3 p-4 hover:bg-[#F5F5F0] transition-colors lego-border"
                  >
                    <div
                      className="w-16 h-8 lego-border lego-shadow-sm group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: c.color }}
                    />
                    <span className="font-black uppercase text-xs">
                      {c.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {contactStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-black uppercase text-center">
                Etch your message into the brick
              </h3>
              <div className="space-y-4">
                <Input
                  placeholder="Your Email"
                  className="h-14 lego-border font-bold"
                  value={contactData.email}
                  onChange={(e) =>
                    setContactData({
                      ...contactData,
                      email: e.target.value,
                    })
                  }
                />
                <Textarea
                  placeholder="Your Message..."
                  className="min-h-[150px] lego-border font-bold"
                  value={contactData.message}
                  onChange={(e) =>
                    setContactData({
                      ...contactData,
                      message: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    soundManager.play("click");
                    setContactStep(1);
                  }}
                  className="flex-1 h-14 lego-border font-black uppercase"
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    soundManager.play("click");
                    setContactStep(3);
                  }}
                  disabled={!contactData.email || !contactData.message}
                  className="flex-1 h-14 bg-[#0055BF] text-white lego-border lego-shadow font-black uppercase"
                >
                  Next
                </Button>
              </div>
            </motion.div>
          )}

          {contactStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 text-center"
            >
              <h3 className="text-2xl font-black uppercase">Ready to ship?</h3>
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-48 h-24 lego-border lego-shadow flex items-center justify-center p-4"
                  style={{ backgroundColor: contactData.color }}
                >
                  <span className="text-white font-black uppercase text-xs truncate">
                    {contactData.message}
                  </span>
                </motion.div>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    soundManager.play("click");
                    setContactStep(2);
                  }}
                  className="flex-1 h-14 lego-border font-black uppercase"
                >
                  Edit
                </Button>

                <Button
                  className="flex-1 h-14 bg-[#009639] text-white lego-border lego-shadow font-black uppercase flex gap-2 items-center justify-center"
                  onClick={() => {
                    soundManager.play("click");
                    handleSubmit();
                  }}
                  disabled={loading}
                >
                  {loading ? "Shipping..." : "Ship It!"}
                </Button>
              </div>
            </motion.div>
          )}

          {contactStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 text-center py-12"
            >
              <div className="flex justify-center">
                <motion.div
                  animate={{
                    y: [0, -400],
                    rotate: [0, 720],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 1, ease: "easeIn" }}
                  className="w-32 h-16 lego-border lego-shadow flex items-center justify-center"
                  style={{ backgroundColor: contactData.color }}
                >
                  <span className="text-white font-black uppercase text-[10px]">
                    SHIPPED!
                  </span>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Trophy className="w-16 h-16 text-[#FFD500] mx-auto mb-4" />
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">
                  Brick Delivered!
                </h3>
                <p className="font-bold text-black/60 mb-8">
                  Your message has been added to the master build. I'll get back
                  to you soon!
                </p>
                <Button
                  onClick={() => setContactStep(1)}
                  className="bg-black text-white font-black uppercase lego-border lego-shadow px-8 h-14"
                >
                  Build Another
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
