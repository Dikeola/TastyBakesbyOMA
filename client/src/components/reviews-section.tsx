import { useQuery } from "@tanstack/react-query";
import { Review } from "@shared/schema";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReviewsSection() {
  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section id="reviews" className="py-16 bg-bakery-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-bakery-brown mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reviews.slice(0, 3).map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="flex mr-3">
                  {renderStars(review.rating)}
                </div>
                <span className="text-bakery-chocolate font-semibold">{review.rating}.0</span>
              </div>
              <p className="text-gray-700 mb-4 italic">"{review.comment}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full mr-4 bg-bakery-chocolate text-white flex items-center justify-center font-semibold">
                  {review.customerName.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-bakery-brown">{review.customerName}</div>
                  <div className="text-sm text-gray-500">Verified Customer</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="flex text-2xl mr-4">
                {renderStars(Math.round(parseFloat(averageRating)))}
              </div>
              <span className="text-3xl font-bold text-bakery-chocolate">{averageRating}</span>
            </div>
            <p className="text-gray-600 mb-4">
              Based on <span className="font-semibold">{reviews.length}</span> customer reviews
            </p>
            <Button className="bg-bakery-chocolate hover:bg-bakery-brown text-white px-6 py-3 font-semibold">
              Read All Reviews
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
