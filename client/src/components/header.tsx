import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingCart, Cake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/cart-context";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, openCart } = useCartContext();
  const [location, setLocation] = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/#our-story" },
    { name: "Reviews", href: "/#reviews" },
    { name: "Contact", href: "/#contact" },
  ];

  const handleNavigation = (href: string) => {
    if (href === "/") {
      // For home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (location !== "/") {
        setLocation("/");
      }
    } else if (href.startsWith("/#")) {
      // For hash links
      if (location !== "/") {
        setLocation("/");
        // Wait for navigation to complete before scrolling
        setTimeout(() => {
          const elementId = href.substring(2);
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // If we're already on home page, just scroll
        const elementId = href.substring(2);
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else if (href === "/products") {
      // For products page, navigate directly
      setLocation("/products");
      window.scrollTo(0, 0);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer scale-[0.975]">
              <Cake className="text-bakery-chocolate text-2xl md:text-3xl" />
              <h1 className="font-playfair text-2xl md:text-3xl font-bold text-bakery-brown">
                TastyBakes by Oma
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-lg md:text-xl">
            {navigation.map((item) => (
              item.href.startsWith("/#") ? (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="text-bakery-brown hover:text-bakery-chocolate transition-colors"
                >
                  {item.name}
                </button>
              ) : (
                <a 
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.href);
                  }}
                  className={`text-bakery-brown hover:text-bakery-chocolate transition-colors cursor-pointer ${
                    location === item.href ? "font-semibold" : ""
                  }`}
                >
                  {item.name}
                </a>
              )
            ))}
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={openCart}
              className="relative text-bakery-brown hover:text-bakery-chocolate scale-[1.3]"
            >
              <ShoppingCart className="h-7 w-7" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-bakery-chocolate text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.itemCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-bakery-brown hover:text-bakery-chocolate scale-[1.3]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                item.href.startsWith("/#") ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className="text-bakery-brown hover:text-bakery-chocolate transition-colors text-left"
                  >
                    {item.name}
                  </button>
                ) : (
                  <a
                    key={item.name}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-bakery-brown hover:text-bakery-chocolate transition-colors cursor-pointer block"
                  >
                    {item.name}
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
