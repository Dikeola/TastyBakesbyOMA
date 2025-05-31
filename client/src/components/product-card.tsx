import { useState } from "react";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Check, Eye, Minus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductCardProps {
  product: Product;
  onAddToCart: (quantity: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [showQuantityDialog, setShowQuantityDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    setShowQuantityDialog(true);
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleConfirmAdd = () => {
    onAddToCart(quantity);
    setIsAdding(true);
    setShowQuantityDialog(false);
    setQuantity(1);
    setTimeout(() => setIsAdding(false), 2000);
  };

  const handleImageClick = () => {
    setShowZoom(true);
  };

  return (
    <>
      <div className="bg-bakery-off-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
        <div className="relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
            onClick={handleImageClick}
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white"
            onClick={handleImageClick}
          >
            <Eye className="h-4 w-4" />
          </Button>
          {product.isFeatured && (
            <Badge className="absolute top-3 left-3 bg-bakery-green text-white">
              Best Seller
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="destructive" className="absolute top-3 left-3">
              Out of Stock
            </Badge>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="font-playfair text-xl font-semibold text-bakery-brown mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          {product.ingredients && (
            <p className="text-xs text-gray-500 mb-4">
              <strong>Ingredients:</strong> {product.ingredients}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="font-bold text-bakery-chocolate text-lg">
              ${product.price}
            </span>
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAdding}
              className={`px-4 py-2 rounded-lg transition-all duration-300 transform ${
                isAdding
                  ? "bg-bakery-green text-white opacity-100 scale-100"
                  : "bg-bakery-chocolate hover:bg-bakery-brown text-white opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
              }`}
            >
              {isAdding ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Added!
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {showZoom && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setShowZoom(false)}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              onClick={() => setShowZoom(false)}
            >
              ✕
            </Button>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      <Dialog open={showQuantityDialog} onOpenChange={setShowQuantityDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-bakery-brown font-playfair text-2xl">Select Quantity</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-6 py-4">
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="h-10 w-10 rounded-full border-2 border-bakery-chocolate text-bakery-chocolate hover:bg-bakery-chocolate hover:text-white"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only allow numbers
                  if (/^\d*$/.test(value)) {
                    handleQuantityChange(parseInt(value) || 1);
                  }
                }}
                onKeyDown={(e) => {
                  // Prevent decimal point, negative sign, and 'e'
                  if (e.key === '.' || e.key === '-' || e.key === 'e') {
                    e.preventDefault();
                  }
                }}
                className="no-spin w-20 text-center border-2 border-bakery-chocolate rounded-lg p-2 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-bakery-chocolate"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                className="h-10 w-10 rounded-full border-2 border-bakery-chocolate text-bakery-chocolate hover:bg-bakery-chocolate hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center text-gray-600">
              <p>Total: <span className="font-semibold text-bakery-chocolate">${(parseFloat(product.price) * quantity).toFixed(2)}</span></p>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowQuantityDialog(false)}
              className="border-bakery-chocolate text-bakery-chocolate hover:bg-bakery-chocolate hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmAdd}
              className="bg-bakery-chocolate hover:bg-bakery-brown text-white"
            >
              Add to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
