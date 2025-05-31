import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

export default function NewsletterSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: NewsletterForm) => {
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/newsletter/subscribe", data);
      
      toast({
        title: "Successfully subscribed!",
        description: "Welcome to our newsletter! You'll receive 10% off your first order via email.",
      });
      
      form.reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to subscribe";
      
      toast({
        title: "Subscription failed",
        description: errorMessage.includes("already subscribed") 
          ? "This email is already subscribed to our newsletter."
          : "There was an error subscribing to our newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-bakery-brown">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-playfair text-4xl font-bold text-bakery-cream mb-4">Stay Connected</h2>
        <p className="text-bakery-cream text-lg mb-8 max-w-2xl mx-auto">
          Be the first to know about new products, seasonal specialties, and exclusive offers. Plus, get 10% off your first order!
        </p>

        <div className="max-w-md mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        className="px-4 py-3 text-gray-800"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-bakery-cream" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-bakery-chocolate hover:bg-bakery-cream hover:text-bakery-brown text-white px-6 py-3 font-semibold whitespace-nowrap"
              >
                {isSubmitting ? "Subscribing..." : "Get 10% Off"}
              </Button>
            </form>
          </Form>
          <p className="text-bakery-cream text-sm mt-3 opacity-80">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
