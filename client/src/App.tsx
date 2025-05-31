import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/cart-context";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Products from "@/pages/products";
import Checkout from "@/pages/checkout";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";
import ImageZoomModal from "@/components/image-zoom-modal";
import FAQChatWidget from "@/components/faq-chat-widget";
import ValentinePacks from "@/pages/valentine-packs";
import ContactCustomOrder from "@/pages/contact";

function Router() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-bakery-off-white">
        <Header />
        <main>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/products" component={Products} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/valentine-packs" component={ValentinePacks} />
            <Route path="/contact" component={ContactCustomOrder} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
        <CartSidebar />
        <ImageZoomModal />
        <FAQChatWidget />
      </div>
    </CartProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;