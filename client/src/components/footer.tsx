import { Cake, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Footer() {
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white py-12 relative overflow-hidden">
      {/* Animated Tag */}
      <motion.div
        className="absolute text-xs text-gray-400 font-mono tracking-widest whitespace-nowrap flex items-center"
        initial={{
          x: '100vw',
          y: '100%',
          opacity: 0,
          scale: 0.5
        }}
        animate={{
          x: [
            '100vw', '-20%', '-25%', '30%', '20%', '25%', '100vw', '100vw'
          ],
          y: [
            '100%', '20%', '30%', '10%', '25%', '15%', '100%', '100%'
          ],
          opacity: [0, 1, 1, 1, 1, 1, 0, 0],
          scale: [0.5, 1.2, 1, 0.8, 1, 1.1, 0.5, 0.5],
          transition: {
            duration: 12,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
            times: [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1]
          }
        }}
      >
        <Sparkles className="h-3 w-3 mr-1 text-yellow-300" />
        toldyouiwasgood
      </motion.div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Cake className="text-bakery-chocolate text-2xl" />
              <h3 className="font-playfair text-xl font-bold">TastyBakes by Oma</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Premium bakery serving authentic, handcrafted baked goods made with love and time-honored recipes. Featuring our signature BOUCAKES service for special occasions.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/tastybakesbyoma" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-bakery-cream transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://wa.me/message/LCZROLV6YXZBN1" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-bakery-cream transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-300 hover:text-bakery-cream transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <Link href="/products">
                  <span className="text-gray-300 hover:text-bakery-cream transition-colors cursor-pointer">
                    Products
                  </span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-300 hover:text-bakery-cream transition-colors"
                >
                  About Oma
                </button>
              </li>
              <li>
                <span className="text-gray-300 hover:text-bakery-cream transition-colors cursor-pointer">
                  Custom Orders
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-bakery-cream transition-colors cursor-pointer">
                  FAQ
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="text-bakery-chocolate mr-3 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-300">
                  Nigeria<br />
                  Private Training Available
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="text-bakery-chocolate mr-3 flex-shrink-0" size={16} />
                <a href="tel:+2347066621683" className="text-gray-300 hover:text-bakery-cream transition-colors">
                  07066621683
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="text-bakery-chocolate mr-3 flex-shrink-0" size={16} />
                <a href="mailto:orders@boucakes.com" className="text-gray-300 hover:text-bakery-cream transition-colors">
                  orders@boucakes.com
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-6">Business Hours</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>10:00 AM - 5:00 PM</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold mb-2">Services</h5>
              <p className="text-gray-300 text-sm">
                • Cupcakes & Cakes<br />
                • Event Setup<br />
                • Private Training<br />
                • Custom Orders Available
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2024 TastyBakes by Oma. All rights reserved. |{" "}
            <span className="hover:text-bakery-cream transition-colors cursor-pointer">Privacy Policy</span> |{" "}
            <span className="hover:text-bakery-cream transition-colors cursor-pointer">Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
