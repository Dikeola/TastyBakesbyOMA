import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import HeroSection from "@/components/hero-section";
import ReviewsSection from "@/components/reviews-section";
import NewsletterSection from "@/components/newsletter-section";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/cart-context";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import TypingText from "@/components/typing-text";
import { useLocation } from 'wouter';

// Sample data for our main categories
const categories = [
  {
    id: 'cakes',
    name: 'Cakes',
    description: 'Beautifully crafted cakes for all occasions',
    image: '/images/cakes/cake1.png',
    products: [
      { 
        id: 'cake-1', 
        name: 'Chocolate Fudge', 
        price: 45.99,
        description: 'Rich chocolate cake with fudge filling',
        imageUrl: '/images/cakes/cake2.png',
        inStock: true,
        isFeatured: true,
        ingredients: 'Flour, sugar, cocoa, eggs, butter',
      },
      { 
        id: 'cake-2', 
        name: 'Red Velvet', 
        price: 49.99,
        description: 'Classic red velvet with cream cheese frosting',
        imageUrl: '/images/cakes/cake3.png',
        inStock: true,
        isFeatured: true,
        ingredients: 'Flour, sugar, cocoa, buttermilk, eggs',
      },
      { 
        id: 'cake-3', 
        name: 'Vanilla Bean', 
        price: 42.99,
        description: 'Pure vanilla bean cake with vanilla buttercream',
        imageUrl: '/images/cakes/cake4.png',
        inStock: true,
        isFeatured: false,
        ingredients: 'Flour, sugar, vanilla beans, eggs, butter',
      },
    ]
  },
  {
    id: 'boucakes',
    name: 'Boucakes',
    description: 'Elegant bouquets made of cupcakes',
    image: '/images/boucakes/boucake.png',
    products: [
      { 
        id: 'bouquet-1', 
        name: 'Rose Bouquet', 
        price: 65.99,
        description: 'Delicate rose-shaped cupcakes in a bouquet',
        imageUrl: '/images/boucakes/boucake2.png',
        inStock: true,
        isFeatured: true,
        ingredients: 'Flour, sugar, eggs, butter, food coloring',
      },
      { 
        id: 'bouquet-2', 
        name: 'Mixed Flower', 
        price: 69.99,
        description: 'Assorted flower cupcakes in a beautiful arrangement',
        imageUrl: '/images/boucakes/boucake3.png',
        inStock: true,
        isFeatured: true,
        ingredients: 'Flour, sugar, eggs, butter, various food colorings',
      },
      { 
        id: 'bouquet-3', 
        name: 'Birthday Special', 
        price: 72.99,
        description: 'Colorful birthday bouquet with sprinkles',
        imageUrl: '/images/boucakes/boucake4.png',
        inStock: true,
        isFeatured: true,
        ingredients: 'Flour, sugar, eggs, butter, sprinkles, food coloring',
      },
    ]
  },
  {
    id: 'cupcakes',
    name: 'Cupcakes',
    description: 'Delicious cupcakes in various flavors',
    image: '/images/cupcakes/cupcakes-category.jpg',
    products: [
      { 
        id: 'cupcake-1', 
        name: 'Chocolate Chip', 
        price: 3.99,
        description: 'Moist chocolate chip cupcake with chocolate frosting',
        imageUrl: '/images/cupcakes/cupcake-1.jpg',
        inStock: true,
        isFeatured: true,
        ingredients: 'Flour, sugar, chocolate chips, eggs, butter',
      },
      { 
        id: 'cupcake-2', 
        name: 'Strawberry', 
        price: 3.99,
        description: 'Fresh strawberry cupcake with strawberry frosting',
        imageUrl: '/images/cupcakes/cupcake-2.jpg',
        inStock: true,
        isFeatured: true,
        ingredients: 'Flour, sugar, fresh strawberries, eggs, butter',
      },
      { 
        id: 'cupcake-3', 
        name: 'Lemon Drizzle', 
        price: 3.99,
        description: 'Zesty lemon cupcake with lemon glaze',
        imageUrl: '/images/cupcakes/cupcake-3.jpg',
        inStock: true,
        isFeatured: true,
        ingredients: 'Flour, sugar, lemons, eggs, butter',
      },
    ]
  }
];

interface ProductType {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  inStock: boolean;
  isFeatured: boolean | null;
  ingredients: string | null;
  category?: string;
}

interface CategoryType {
  id: string;
  name: string;
  description: string;
  image: string;
  products: ProductType[];
}

interface FlipCardProps {
  category: CategoryType;
  isFlipped: boolean;
  onClick: () => void;
}

function FlipCard({ category, isFlipped, onClick }: FlipCardProps) {
  return (
    <div 
      className="w-full h-96 [perspective:1000px] cursor-pointer"
      onClick={onClick}
    >
      <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
        isFlipped ? '[transform:rotateY(180deg)]' : ''
      }`}>
        {/* Front of card */}
        <div className="absolute inset-0 bg-white rounded-xl shadow-lg overflow-hidden [backface-visibility:hidden]">
          <div className="h-2/3 bg-cover bg-center" style={{ backgroundImage: `url(${category.image})` }} />
          <div className="p-6">
            <h3 className="text-2xl font-bold text-bakery-brown mb-2">{category.name}</h3>
            <p className="text-gray-600">{category.description}</p>
            <div className="mt-4 text-bakery-chocolate font-medium">
              View Options →
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className="absolute inset-0 bg-white rounded-xl shadow-lg p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto">
          <h3 className="text-2xl font-bold text-bakery-brown mb-4">{category.name} Menu</h3>
          <ul className="space-y-3">
            {category.products.map((product) => (
              <li key={product.id} className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-gray-700">{product.name}</span>
                <span className="font-semibold">${product.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <button 
            className="mt-4 text-bakery-chocolate hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

function AnimatedSection({ children, className = "", ...props }: AnimatedSectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

// Add these styles at the top of the file, after the imports
const styles = `
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-right {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes sparkle {
  0% {
    box-shadow: 0 0 10px #FFD700,
                0 0 20px #FFD700,
                0 0 30px #FFD700,
                inset 0 0 10px #FFD700;
  }
  50% {
    box-shadow: 0 0 20px #FFD700,
                0 0 40px #FFD700,
                0 0 60px #FFD700,
                inset 0 0 20px #FFD700;
  }
  100% {
    box-shadow: 0 0 10px #FFD700,
                0 0 20px #FFD700,
                0 0 30px #FFD700,
                inset 0 0 10px #FFD700;
  }
}

.animate-scroll-left {
  animation: scroll-left 30s linear infinite;
}

.animate-scroll-right {
  animation: scroll-right 30s linear infinite;
}

.pause-animation {
  animation-play-state: paused;
}

.sparkle-border {
  animation: sparkle 1.5s ease-in-out infinite;
  border: 2px solid #FFD700;
}
`;

// Add this right after the styles constant
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

function MeetOmaSection() {
  const story = "For the past 6 years, TastyBakes has been crafting delicious memories through our artisanal baked goods. What started as a passion project has grown into a beloved local bakery, serving our community with love and dedication. Our founder, Oma, brings decades of baking expertise and a commitment to using only the finest ingredients. Every creation is made with care, ensuring that each bite brings joy and satisfaction to our customers. Join us in celebrating the art of baking and the joy of sharing delicious moments with loved ones.";

  return (
    <AnimatedSection id="our-story" className="py-20 bg-bakery-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-bakery-brown mb-4">TastyBake's Story</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <TypingText
            texts={[story]}
            typingSpeed={40}
            pauseDuration={1200}
            blinkCount={5}
            blinkSpeed={350}
            className="text-lg text-gray-700 leading-relaxed block min-h-[4.5rem]"
          />
        </div>
      </div>
    </AnimatedSection>
  );
}

function AmbassadorCarousel() {
  const images = [
    { src: "/images/Ambassador_1.png", alt: "Favour - TastyBakes Ambassador" },
    { src: "/images/Ambassador_2.png", alt: "Favour - TastyBakes Ambassador" },
  ];
  const [index, setIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-12">
      <div className="flex flex-col md:flex-row items-center gap-8 min-h-[224px] min-w-[224px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index].src}
            src={images[index].src}
            alt={images[index].alt}
            className="w-56 h-56 object-cover rounded-full shadow-lg border-4 border-bakery-chocolate"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>
      <div className="flex flex-col items-center md:items-start max-w-md mt-8 md:mt-0">
        <h3 className="font-playfair text-2xl text-bakery-brown font-semibold mb-2">Favour</h3>
        <p className="text-bakery-chocolate font-medium mb-2">🤎 Brand Ambassador @tastybakesbyoma | Model | Your go-to face for elegance.</p>
        <p className="text-gray-700 mb-4">🤎 A muse, a mood, a movement—made to inspire.</p>
        <div className="flex gap-4 mt-2">
          <a href="https://www.instagram.com/you.found.favour/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-bakery-chocolate hover:text-bakery-brown text-3xl">
            <FaInstagram />
          </a>
          <a href="https://www.tiktok.com/@you.found.favour?_t=ZM-8vJggLRF7aQ&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-bakery-chocolate hover:text-bakery-brown text-3xl">
            <FaTiktok />
          </a>
        </div>
      </div>
    </div>
  );
}

function MovingGallery({ images, title, direction = 'left', enableCustomOrder = false }: { images: string[], title: string, direction?: 'left' | 'right', enableCustomOrder?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCustomOrderModal, setShowCustomOrderModal] = useState(false);
  const [, setLocation] = useLocation();

  // Duplicate images to create seamless loop
  const duplicatedImages = [...images, ...images];

  // Calculate animation duration based on number of images
  const animationDuration = `${images.length * 2}s`;

  const handleCustomOrder = (image: string) => {
    setSelectedImage(image);
    setShowCustomOrderModal(true);
  };

  const handleProceedCustomOrder = () => {
    setShowCustomOrderModal(false);
    setLocation(`/contact?customOrder=1&img=${encodeURIComponent(selectedImage || '')}`);
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl font-bold text-bakery-brown mb-8 text-center">{title}</h2>
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className={`flex space-x-4 ${
              direction === 'left' 
                ? 'animate-scroll-left' 
                : 'animate-scroll-right'
            } ${isHovered ? 'pause-animation' : ''}`}
            style={{
              width: 'fit-content',
              animationDuration,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear'
            }}
          >
            {duplicatedImages.map((image, index) => (
              <motion.div
                key={`${title}-${index}`}
                className="relative min-w-[300px] h-[400px] rounded-lg overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(image)}
              >
                <div className="absolute inset-0 rounded-lg group-hover:sparkle-border transition-all duration-300" />
                <img
                  src={image}
                  alt={`${title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {enableCustomOrder && (
                  <button
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-bakery-brown font-bold rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 border-2 border-yellow-400 animate-pulse-glow group/button hover:scale-105 hover:shadow-[0_0_24px_8px_#FFD700] hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-400"
                    style={{ filter: 'drop-shadow(0 0 12px #FFD700)' }}
                    onClick={e => { e.stopPropagation(); handleCustomOrder(image); }}
                  >
                    I want this!
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Order Modal */}
      {showCustomOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowCustomOrderModal(false)}>×</button>
            <img src={selectedImage || ''} alt="Selected" className="w-48 h-48 object-cover rounded-xl mx-auto mb-6" />
            <h3 className="font-playfair text-2xl text-bakery-brown mb-4">Would you like to proceed with a custom order?</h3>
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="px-6 py-2 bg-bakery-chocolate text-white rounded-lg font-semibold shadow hover:bg-bakery-brown transition"
                onClick={handleProceedCustomOrder}
              >
                Yes, customize!
              </button>
              <button
                className="px-6 py-2 bg-gray-200 text-bakery-brown rounded-lg font-semibold shadow hover:bg-gray-300 transition"
                onClick={() => setShowCustomOrderModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal (unchanged) */}
      <AnimatePresence>
        {selectedImage && !showCustomOrderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-opacity"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const { addToCart } = useCartContext();

  const handleCardClick = (categoryId: string) => {
    setFlippedCard(flippedCard === categoryId ? null : categoryId);
  };

  const handleAddToCart = (product: ProductType, categoryName: string) => {
    addToCart({
      ...product,
      category: categoryName,
      price: product.price.toString(),
      id: parseInt(product.id.split('-')[1]) || 0
    }, 1);
  };

  // Get all images for each category
  const cakeImages = Array.from({ length: 34 }, (_, i) => `/images/cakes/cake${i + 1}.png`);
  const boucakeImages = [
    '/images/boucakes/boucake.png',
    '/images/boucakes/boucake2.png',
    '/images/boucakes/boucake3.png',
    '/images/boucakes/boucake4.png',
    '/images/boucakes/boucake5.png',
    '/images/boucakes/flowerdesgncakeinhand.png',
    '/images/boucakes/flowerdesgncakeinhand2.png',
    '/images/boucakes/flowerdesgncakeinhand3.png',
    '/images/boucakes/flowerdesgncakeinhand4.png',
  ];
  const natureImages = [
    '/images/nature/flowersoutside.png',
    '/images/nature/flowersoutside2.png',
    '/images/nature/flowersoutside3.png',
    '/images/nature/flowersoutside4.png',
    '/images/nature/flowersoutside5.png',
    '/images/nature/flowersoutside6.png',
    '/images/nature/flowersoutside7.png',
    '/images/nature/flowersoutside8.png',
  ];

  return (
    <div className="bg-bakery-off-white">
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>
      
      {/* Cakes Gallery - Moving Left */}
      <AnimatedSection>
        <MovingGallery images={cakeImages} title="Our Cakes" direction="left" enableCustomOrder />
      </AnimatedSection>

      {/* Boucakes Gallery - Moving Right */}
      <AnimatedSection>
        <MovingGallery images={boucakeImages} title="Our Boucakes" direction="right" enableCustomOrder />
      </AnimatedSection>

      {/* Nature Gallery - Moving Left */}
      <AnimatedSection>
        <MovingGallery images={natureImages} title="Our Nature Collection" direction="left" />
      </AnimatedSection>

      {/* Ambassador Section */}
      <AnimatedSection id="ambassadors" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-bakery-brown mb-4">Our Ambassador</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Meet the face who represents TastyBakes in our community!
            </p>
          </div>
          <AmbassadorCarousel />
        </div>
      </AnimatedSection>

      <MeetOmaSection />
      
      <AnimatedSection>
        <ReviewsSection />
      </AnimatedSection>
      
      <AnimatedSection>
        <NewsletterSection />
      </AnimatedSection>
    </div>
  );
}
