import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import TypingText from "./typing-text";

const valentineImages = [
  "/images/valentine packs/Screenshot 2025-05-29 at 19.18.22.png",
  "/images/valentine packs/Screenshot 2025-05-29 at 19.17.38.png",
  "/images/valentine packs/Screenshot 2025-05-29 at 19.17.12.png",
  "/images/valentine packs/Screenshot 2025-05-29 at 19.17.04.png",
  "/images/valentine packs/Screenshot 2025-05-29 at 19.16.55.png",
  "/images/valentine packs/valentine pack.png",
  "/images/valentine packs/valentine cakes.png"
];

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const [valentineIndex, setValentineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValentineIndex((prev) => (prev + 1) % valentineImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    "Delicious Cakes",
    "Beautiful Boucakes",
    "Tasty Cupcakes"
  ];

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f5e6d8 0%, #e6c9a8 50%, #d9b38c 100%)',
      }}
    >
      {/* Valentine Packs Floating Card */}
      <div className="hidden md:block fixed bottom-8 left-8 z-30">
        <div className="valentine-card-bg relative rounded-2xl shadow-xl border-4 border-pink-200 animate-valentine-border overflow-hidden" style={{ width: 270 }}>
          <img
            src={valentineImages[valentineIndex]}
            alt="Valentine Pack Preview"
            className="w-full h-48 object-cover rounded-t-2xl"
          />
          <div className="p-4 text-center bg-white rounded-b-2xl">
            <div className="font-playfair text-2xl font-bold text-pink-600 mb-1">Valentine Packs</div>
            <div className="text-lg font-semibold text-yellow-500 animate-pulse">Coming Soon</div>
          </div>
          <style>{`
            @keyframes valentine-border {
              0% { box-shadow: 0 0 0 0 #ffb6c1, 0 0 0 4px #fff inset; border-color: #ffb6c1; }
              50% { box-shadow: 0 0 24px 8px #ff69b4, 0 0 0 4px #fff inset; border-color: #ff69b4; }
              100% { box-shadow: 0 0 0 0 #ffb6c1, 0 0 0 4px #fff inset; border-color: #ffb6c1; }
            }
            .animate-valentine-border {
              animation: valentine-border 2.5s linear infinite;
            }
            .valentine-card-bg {
              background: rgba(255,255,255,0.97);
              backdrop-filter: blur(2px);
            }
          `}</style>
        </div>
      </div>
      <div className="relative z-20 text-center text-bakery-brown max-w-4xl px-4 mx-auto">
        <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">
          <span className="text-bakery-brown">OMA's</span><br />
          <TypingText 
            texts={services}
            className="font-dancing text-6xl md:text-8xl text-bakery-chocolate"
            typingSpeed={150}
            pauseDuration={2000}
          />
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-bakery-brown/80 max-w-2xl mx-auto">
          Handcrafted with love using the finest ingredients. Creating sweet memories one bite at a time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => setLocation("/products")}
            className="bg-bakery-chocolate hover:bg-bakery-brown text-white px-8 py-4 text-lg font-semibold shadow-lg"
          >
            View Our Menu
          </Button>
        </div>
      </div>
    </section>
  );
}
