import { useState } from "react";
import { useCartContext } from "@/contexts/cart-context";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

const categories = [
  {
    id: 'cakes',
    name: 'Cakes',
    products: [
      { id: 1, name: 'Chocolate Fudge', price: '45.99', imageUrl: '/images/cakes/cake2.png', inStock: true, description: 'Rich chocolate cake with fudge filling', category: 'cakes', isFeatured: false, ingredients: 'Flour, sugar, cocoa, eggs, butter' },
      { id: 2, name: 'Red Velvet', price: '49.99', imageUrl: '/images/cakes/cake3.png', inStock: true, description: 'Classic red velvet with cream cheese frosting', category: 'cakes', isFeatured: false, ingredients: 'Flour, sugar, cocoa, buttermilk, eggs' },
      { id: 3, name: 'Vanilla Bean', price: '42.99', imageUrl: '/images/cakes/cake4.png', inStock: false, description: 'Pure vanilla bean cake with vanilla buttercream', category: 'cakes', isFeatured: false, ingredients: 'Flour, sugar, vanilla beans, eggs, butter' },
    ]
  },
  {
    id: 'cupcakes',
    name: 'Cupcakes',
    products: [
      { id: 4, name: 'Chocolate Chip', price: '3.99', imageUrl: '/images/cupcakes/cupcake-1.jpg', inStock: true, description: 'Moist chocolate chip cupcake with chocolate frosting', category: 'cupcakes', isFeatured: false, ingredients: 'Flour, sugar, chocolate chips, eggs, butter' },
      { id: 5, name: 'Strawberry', price: '3.99', imageUrl: '/images/cupcakes/cupcake-2.jpg', inStock: true, description: 'Fresh strawberry cupcake with strawberry frosting', category: 'cupcakes', isFeatured: false, ingredients: 'Flour, sugar, fresh strawberries, eggs, butter' },
      { id: 6, name: 'Lemon Drizzle', price: '3.99', imageUrl: '/images/cupcakes/cupcake-3.jpg', inStock: true, description: 'Zesty lemon cupcake with lemon glaze', category: 'cupcakes', isFeatured: false, ingredients: 'Flour, sugar, lemons, eggs, butter' },
    ]
  },
  {
    id: 'boucakes',
    name: 'Boucakes',
    products: [
      { id: 7, name: 'Rose Bouquet', price: '65.99', imageUrl: '/images/boucakes/boucake2.png', inStock: true, description: 'Delicate rose-shaped cupcakes in a bouquet', category: 'boucakes', isFeatured: false, ingredients: 'Flour, sugar, eggs, butter, food coloring' },
      { id: 8, name: 'Mixed Flower', price: '69.99', imageUrl: '/images/boucakes/boucake3.png', inStock: true, description: 'Assorted flower cupcakes in a beautiful arrangement', category: 'boucakes', isFeatured: false, ingredients: 'Flour, sugar, eggs, butter, various food colorings' },
      { id: 9, name: 'Birthday Special', price: '72.99', imageUrl: '/images/boucakes/boucake4.png', inStock: true, description: 'Colorful birthday bouquet with sprinkles', category: 'boucakes', isFeatured: false, ingredients: 'Flour, sugar, eggs, butter, sprinkles, food coloring' },
    ]
  }
];

export default function Products() {
  const [selectedTab, setSelectedTab] = useState('cakes');
  const { addToCart, openCart } = useCartContext();
  const [, setLocation] = useLocation();
  const [customOrderImg, setCustomOrderImg] = useState<string | null>(null);

  const currentCategory = categories.find(cat => cat.id === selectedTab);

  return (
    <div className="min-h-screen bg-bakery-off-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-5xl font-bold text-bakery-brown mb-4">Our Products</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our delicious selection of cakes, cupcakes, and boucakes. Handcrafted with love!
          </p>
        </div>
        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`px-8 py-3 rounded-full font-playfair text-2xl font-semibold shadow-md transition-all duration-200 border-2 ${selectedTab === cat.id ? 'bg-bakery-chocolate text-white border-bakery-chocolate scale-105' : 'bg-white text-bakery-chocolate border-bakery-chocolate hover:bg-bakery-brown hover:text-white'}`}
              onClick={() => setSelectedTab(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentCategory?.products.map(product => (
            <motion.div
              key={product.id}
              className="bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center text-center relative group border-2 border-bakery-cream hover:border-bakery-chocolate transition-all duration-300"
              whileHover={{ scale: 1.04 }}
            >
              <img src={product.imageUrl} alt={product.name} className="w-48 h-48 object-cover rounded-2xl mb-4 shadow-md" />
              <h3 className="font-playfair text-2xl font-bold text-bakery-brown mb-2">{product.name}</h3>
              <span className="font-semibold text-bakery-chocolate text-xl mb-4">${parseFloat(product.price).toFixed(2)}</span>
              <div className="flex flex-col gap-3 w-full mt-auto">
                <button
                  className="w-full py-3 rounded-full font-bold text-bakery-brown bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 shadow-md border-2 border-yellow-400 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_24px_8px_#FFD700] hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-400"
                  onClick={() => setCustomOrderImg(product.imageUrl)}
                >
                  I want this!
                </button>
                {product.inStock && (
                  <button
                    className="w-full py-3 rounded-full font-bold text-white bg-bakery-chocolate hover:bg-bakery-brown shadow-md transition-all duration-200"
                    onClick={() => { addToCart(product, 1); openCart(); }}
                  >
                    Add to Cart
                  </button>
                )}
                {!product.inStock && (
                  <span className="w-full py-3 rounded-full font-bold text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed">Out of Stock</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        {/* Custom Order Modal */}
        {customOrderImg && (
          <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setCustomOrderImg(null)}>×</button>
              <img src={customOrderImg} alt="Selected" className="w-48 h-48 object-cover rounded-xl mx-auto mb-6" />
              <h3 className="font-playfair text-2xl text-bakery-brown mb-4">Would you like to proceed with a custom order?</h3>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  className="px-6 py-2 bg-bakery-chocolate text-white rounded-lg font-semibold shadow hover:bg-bakery-brown transition"
                  onClick={() => { setCustomOrderImg(null); setLocation(`/contact?customOrder=1&img=${encodeURIComponent(customOrderImg)}`); }}
                >
                  Yes, customize!
                </button>
                <button
                  className="px-6 py-2 bg-gray-200 text-bakery-brown rounded-lg font-semibold shadow hover:bg-gray-300 transition"
                  onClick={() => setCustomOrderImg(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
