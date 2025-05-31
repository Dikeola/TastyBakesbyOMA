import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { HelpCircle, X, Send, ChevronDown, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What are your delivery areas?",
    answer: "We currently deliver within Lagos and surrounding areas. Delivery fees may apply based on your location."
  },
  {
    question: "How far in advance should I place custom cake orders?",
    answer: "We recommend placing custom cake orders at least 72 hours in advance to ensure availability and proper preparation time."
  },
  {
    question: "Do you offer BOUCAKES event setup services?",
    answer: "Yes! Our BOUCAKES service includes complete event setup for birthdays, weddings, and other special occasions. Contact us for a consultation."
  },
  {
    question: "What ingredients do you use?",
    answer: "We use only the finest quality ingredients including premium butter, fresh eggs, and carefully selected flours. All ingredients are locally sourced when possible."
  },
  {
    question: "Do you offer private baking training?",
    answer: "Yes, Oma offers private baking training sessions. You can learn traditional techniques and family recipes. Contact us to schedule a session."
  },
  {
    question: "What are your payment methods?",
    answer: "We accept cash, bank transfers, and mobile payments. Full payment is required for custom orders."
  }
];

export default function FAQChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const { toast } = useToast();

  const handleFAQClick = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleCustomMessageSubmit = () => {
    if (!customerName.trim() || !customerEmail.trim() || !customMessage.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before sending your message.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the message to your backend
    // For now, we'll just show a success message
    toast({
      title: "Message Sent!",
      description: "Thank you for your question. We'll get back to you shortly via WhatsApp or email.",
    });

    // Reset form
    setCustomerName("");
    setCustomerEmail("");
    setCustomMessage("");
    setShowCustomForm(false);
    setIsOpen(false);
  };

  const handleWhatsAppContact = () => {
    window.open("https://wa.me/message/LCZROLV6YXZBN1", "_blank");
  };

  return (
    <>
      {/* Chat Widget Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-bakery-chocolate hover:bg-bakery-brown text-white shadow-lg z-40 flex items-center justify-center"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>

      {/* Chat Widget Modal */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Widget */}
          <Card className="fixed bottom-20 right-6 w-96 max-h-[500px] z-50 shadow-xl">
            <CardHeader className="bg-bakery-chocolate text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 hover:bg-transparent"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-4 max-h-96 overflow-y-auto">
              {!showCustomForm ? (
                <>
                  <div className="space-y-3 mb-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b pb-3">
                        <button
                          onClick={() => handleFAQClick(index)}
                          className="flex items-center justify-between w-full text-left text-sm font-medium text-bakery-brown hover:text-bakery-chocolate"
                        >
                          <span>{faq.question}</span>
                          {expandedFAQ === index ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                        {expandedFAQ === index && (
                          <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={() => setShowCustomForm(true)}
                      className="w-full bg-bakery-brown hover:bg-bakery-chocolate text-white"
                    >
                      Ask a Custom Question
                    </Button>
                    <Button
                      onClick={handleWhatsAppContact}
                      variant="outline"
                      className="w-full border-bakery-chocolate text-bakery-chocolate hover:bg-bakery-chocolate hover:text-white"
                    >
                      Contact via WhatsApp
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-bakery-brown mb-2 block">
                      Your Name
                    </label>
                    <Input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-bakery-brown mb-2 block">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-bakery-brown mb-2 block">
                      Your Question
                    </label>
                    <Textarea
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="Type your question here..."
                      rows={4}
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={handleCustomMessageSubmit}
                      className="flex-1 bg-bakery-chocolate hover:bg-bakery-brown text-white"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      onClick={() => setShowCustomForm(false)}
                      variant="outline"
                      className="border-bakery-chocolate text-bakery-chocolate hover:bg-bakery-chocolate hover:text-white"
                    >
                      Back
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}