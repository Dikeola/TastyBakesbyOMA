export interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  imageUrl: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  itemCount: number;
}

export interface Category {
  name: string;
  count: number;
}

export interface ReviewWithProduct {
  id: number;
  productId: number | null;
  customerName: string;
  rating: number;
  comment: string;
  avatarUrl: string | null;
  createdAt: Date | null;
  productName?: string;
}
