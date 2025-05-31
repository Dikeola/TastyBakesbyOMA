import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-bakery-cream">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="col-span-1 lg:col-span-2">
            <h2 className="font-playfair text-4xl font-bold text-bakery-brown mb-6">Meet Oma</h2>
            <AnimatedHighlighterText className="text-gray-700 text-lg mb-6 leading-relaxed" text="For 6 years, Oma has been perfecting her craft in her bakery. What started as a small family business has grown into a beloved community staple, featuring our signature BOUCAKES service for special occasions and events." />
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Every recipe is made from scratch using time-honored techniques. We specialize in traditional baked goods, custom cakes, cupcakes, and event setups. Our skilled bakers use only the finest ingredients to craft each masterpiece with love and attention to detail.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-bakery-chocolate mb-2">6</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-bakery-chocolate mb-2">500+</div>
                <div className="text-sm text-gray-600">Events Catered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-bakery-chocolate mb-2">2k+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-bakery-chocolate hover:bg-bakery-brown text-white px-6 py-3 font-semibold">
                Our Full Story
              </Button>
              <Button
                variant="outline"
                className="border-2 border-bakery-chocolate text-bakery-chocolate hover:bg-bakery-chocolate hover:text-white px-6 py-3 font-semibold"
              >
                View Certifications
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedHighlighterText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  const [highlighted, setHighlighted] = React.useState(0);
  const [direction, setDirection] = React.useState<"in" | "out">("in");

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (direction === "in") {
      timeout = setTimeout(() => {
        if (highlighted < words.length - 1) {
          setHighlighted((h) => h + 1);
        } else {
          setDirection("out");
        }
      }, 350);
    } else {
      timeout = setTimeout(() => {
        setHighlighted(0);
        setDirection("in");
      }, 800);
    }
    return () => clearTimeout(timeout);
  }, [highlighted, direction, words.length]);

  return (
    <span className={className} style={{ display: "inline-block", position: "relative" }}>
      {words.map((word, i) => (
        <span key={i} style={{ position: "relative", display: "inline-block", marginRight: 4 }}>
          <span style={{ position: "relative", zIndex: 2, padding: '0 2px' }}>{word}</span>
          <AnimatePresence>
            {direction === "in" && highlighted === i && (
              <motion.span
                layoutId="highlighter-bg"
                initial={{ opacity: 0, scaleY: 0.7 }}
                animate={{ opacity: 0.7, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0.7 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  background: "#D2691E",
                  borderRadius: 4,
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}
