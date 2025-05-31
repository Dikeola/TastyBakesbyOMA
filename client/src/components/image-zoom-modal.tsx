import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageZoomModalProps {
  isOpen?: boolean;
  imageUrl?: string;
  altText?: string;
  onClose?: () => void;
}

export default function ImageZoomModal({ 
  isOpen = false, 
  imageUrl = "", 
  altText = "Product image",
  onClose = () => {}
}: ImageZoomModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setCurrentImageUrl(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  if (!isModalOpen || !currentImageUrl) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div className="relative max-w-4xl max-h-full p-4">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/20 hover:bg-black/40"
          onClick={handleClose}
        >
          <X className="h-6 w-6" />
        </Button>
        <img
          src={currentImageUrl}
          alt={altText}
          className="max-w-full max-h-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
