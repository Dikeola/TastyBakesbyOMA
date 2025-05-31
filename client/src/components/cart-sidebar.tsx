import { useCartContext } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useLocation } from "wouter";

export default function CartSidebar() {
  const { cart, closeCart, updateQuantity, removeFromCart } = useCartContext();
  const [, setLocation] = useLocation();

  const handleCheckout = () => {
    closeCart();
    setLocation("/checkout");
  };

  const handleContinueShopping = () => {
    closeCart();
    setLocation("/products");
  };

  return (
    <>
      {/* Overlay */}
      {cart.isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeCart}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-xl transform transition-transform z-50 ${
          cart.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-playfair text-2xl font-bold text-bakery-brown">Your Cart</h3>
            <Button variant="ghost" size="sm" onClick={closeCart}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm mb-6">Add some delicious treats to get started!</p>
              <Button
                onClick={handleContinueShopping}
                className="bg-bakery-chocolate hover:bg-bakery-brown text-white"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 pb-6 border-b">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-bakery-brown">{item.name}</h4>
                    <p className="text-sm text-gray-600">${item.price} each</p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-bakery-chocolate hover:text-bakery-brown"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-3 font-semibold">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-bakery-chocolate hover:text-bakery-brown"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-bakery-chocolate">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-lg">Total:</span>
              <span className="font-bold text-xl text-bakery-chocolate">
                ${cart.total.toFixed(2)}
              </span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-bakery-chocolate hover:bg-bakery-brown text-white py-3 mb-3 font-semibold"
            >
              Proceed to Checkout
            </Button>
            <Button
              onClick={handleContinueShopping}
              variant="outline"
              className="w-full border-bakery-chocolate text-bakery-chocolate hover:bg-bakery-chocolate hover:text-white py-3 font-semibold"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
