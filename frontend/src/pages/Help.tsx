import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { faqs } from "@/data/mockData";

const Help = () => {
  const { toast } = useToast();

  const whatsappMessage = encodeURIComponent(
    "Hi Safarnama! I have a question about your trips and events. Could you please help me?"
  );
  const whatsappUrl = `https://wa.me/+919462388706?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c3e50]/10 to-[#f39c12]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2c3e50] mb-4">
            Need Help?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're here to help you plan your perfect adventure. Find answers to
            common questions or get in touch with us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {/* FAQ Section (अब full-width hai) */}
          <div>
            <h2 className="text-3xl font-bold text-[#2c3e50] mb-6">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-white rounded-lg border-0 shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-muted/50 rounded-lg">
                    <span className="font-medium text-[#2c3e50]">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-[#2c3e50] mb-8">
            Still Need Help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Dialog>
              <DialogTrigger asChild>
                <Card className="bg-gray-100 border-0 hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="text-3xl mb-2">📋</div>
                    <CardTitle className="text-[#2c3e50]">
                      Instructions or Guidance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Find out how to book an event and what to bring.
                    </CardDescription>
                    <Button variant="outline" className="w-full mt-4">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Instructions or Guidance</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-left">
                  <h3 className="text-xl font-bold">How to Book an Event</h3>
                  <ul className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <li>Go to the home page.</li>
                    <li>Tap on 'Book' for your desired event.</li>
                    <li>Fill out your personal details in the form.</li>
                    <li>Submit the form to confirm your booking.</li>
                    <li>Join the WhatsApp link provided for event updates.</li>
                  </ul>
                  <h3 className="text-xl font-bold mt-4">What to Bring</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Comfortable clothes suitable for the weather.</li>
                    <li>Trekking shoes with good grip.</li>
                    <li>A personal water bottle.</li>
                    <li>Any personal medicines or essentials.</li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Card className="bg-gray-100 border-0 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="text-3xl mb-2">💬</div>
                  <CardTitle className="text-[#2c3e50]">
                    WhatsApp Help
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Chat with our team directly on WhatsApp for quick support.
                  </CardDescription>
                  <Button variant="outline" className="w-full mt-4">
                    Send WhatsApp Message
                  </Button>
                </CardContent>
              </Card>
            </a>

            <Card className="bg-gray-100 border-0 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="text-3xl mb-2">📞</div>
                <CardTitle className="text-[#2c3e50]">Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Speak to our team directly for any queries.
                </CardDescription>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => window.open("tel:+919462388706")}
                >
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
