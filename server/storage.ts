import { 
  products, 
  reviews, 
  orders, 
  orderItems, 
  newsletter,
  type Product, 
  type Review, 
  type Order, 
  type OrderItem,
  type Newsletter,
  type InsertProduct, 
  type InsertReview, 
  type InsertOrder, 
  type InsertOrderItem,
  type InsertNewsletter
} from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Reviews
  getReviews(): Promise<Review[]>;
  getReviewsByProduct(productId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Orders
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;

  // Order Items
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;

  // Newsletter
  getNewsletterSubscribers(): Promise<Newsletter[]>;
  subscribeNewsletter(email: InsertNewsletter): Promise<Newsletter>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private reviews: Map<number, Review>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private newsletter: Map<number, Newsletter>;
  private currentProductId: number;
  private currentReviewId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;
  private currentNewsletterId: number;

  constructor() {
    this.products = new Map();
    this.reviews = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.newsletter = new Map();
    this.currentProductId = 1;
    this.currentReviewId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    this.currentNewsletterId = 1;

    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Sample products
    const sampleProducts: InsertProduct[] = [
      {
        name: "Chocolate Croissants",
        description: "Buttery, flaky pastry with rich Belgian chocolate",
        price: "4.99",
        category: "Pastries & Croissants",
        imageUrl: "https://images.unsplash.com/photo-1555507036-ab794f4d88a3?w=400&h=300&fit=crop",
        isFeatured: true,
        ingredients: "Flour, butter, chocolate, eggs, yeast"
      },
      {
        name: "Artisanal Sourdough",
        description: "Traditional 48-hour fermented sourdough bread",
        price: "8.50",
        category: "Artisanal Breads",
        imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop",
        isFeatured: true,
        ingredients: "Sourdough starter, flour, water, salt"
      },
      {
        name: "Chocolate Layer Cake",
        description: "Three layers of moist chocolate cake with cream frosting",
        price: "24.99",
        category: "Cakes & Desserts",
        imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
        isFeatured: true,
        ingredients: "Chocolate, flour, eggs, cream, sugar"
      },
      {
        name: "French Macarons",
        description: "Delicate almond cookies in assorted flavors",
        price: "2.50",
        category: "Cookies & Treats",
        imageUrl: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=300&fit=crop",
        isFeatured: true,
        ingredients: "Almond flour, sugar, egg whites, food coloring"
      },
      {
        name: "Fresh Baguette",
        description: "Classic French baguette with crispy crust",
        price: "3.50",
        category: "Artisanal Breads",
        imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
        ingredients: "Flour, water, yeast, salt"
      },
      {
        name: "Apple Strudel",
        description: "Traditional German apple strudel with flaky pastry",
        price: "6.99",
        category: "Seasonal Specialties",
        imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
        ingredients: "Apples, phyllo dough, cinnamon, sugar, raisins"
      }
    ];

    sampleProducts.forEach(product => {
      this.createProduct(product);
    });

    // Sample reviews
    const sampleReviews: InsertReview[] = [
      {
        productId: 1,
        customerName: "Adunni Olawale",
        rating: 5,
        comment: "The chocolate croissants are absolutely divine! TastyBakes by Oma never disappoints.",
        avatarUrl: null
      },
      {
        productId: 2,
        customerName: "Chinedu Okafor",
        rating: 5,
        comment: "The sourdough bread is the best I've had in Lagos. You can taste the quality in every bite.",
        avatarUrl: null
      },
      {
        productId: 3,
        customerName: "Folake Adebayo",
        rating: 5,
        comment: "Ordered this cake for our anniversary and it was perfect! Beautiful design and incredible taste.",
        avatarUrl: null
      },
      {
        productId: 1,
        customerName: "Kemi Ajayi",
        rating: 5,
        comment: "Absolutely divine! The quality is always top-notch and the service is excellent.",
        avatarUrl: null
      },
      {
        productId: 2,
        customerName: "Emeka Nwosu",
        rating: 5,
        comment: "Ordered for my wife's birthday and everyone was impressed. Will definitely order again!",
        avatarUrl: null
      },
      {
        productId: 3,
        customerName: "Yetunde Bamgbose",
        rating: 5,
        comment: "The BOUCAKES service for our event was exceptional. Professional and delicious!",
        avatarUrl: null
      }
    ];

    sampleReviews.forEach(review => {
      this.createReview(review);
    });
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.isFeatured);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id,
      inStock: insertProduct.inStock ?? true,
      isFeatured: insertProduct.isFeatured ?? false
    };
    this.products.set(id, product);
    return product;
  }

  // Reviews
  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getReviewsByProduct(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.productId === productId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = { 
      ...insertReview, 
      id,
      createdAt: new Date()
    };
    this.reviews.set(id, review);
    return review;
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id,
      status: insertOrder.status ?? "pending",
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (order) {
      order.status = status;
      this.orders.set(id, order);
      return order;
    }
    return undefined;
  }

  // Order Items
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
  }

  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.currentOrderItemId++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }

  // Newsletter
  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return Array.from(this.newsletter.values());
  }

  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const existing = Array.from(this.newsletter.values()).find(sub => sub.email === insertNewsletter.email);
    if (existing) {
      throw new Error("Email already subscribed");
    }

    const id = this.currentNewsletterId++;
    const subscription: Newsletter = { 
      ...insertNewsletter, 
      id,
      subscribedAt: new Date()
    };
    this.newsletter.set(id, subscription);
    return subscription;
  }
}

export const storage = new MemStorage();
