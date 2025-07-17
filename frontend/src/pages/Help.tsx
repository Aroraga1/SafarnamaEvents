import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { faqs } from '@/data/mockData';

const Help = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send to backend
    console.log('Contact form submitted:', contactForm);
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours. Thanks for reaching out!",
    });

    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const whatsappMessage = encodeURIComponent("Hi Safarnama! I have a question about your trips and events. Could you please help me?");
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Need Help?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're here to help you plan your perfect adventure. Find answers to common questions or get in touch with us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="bg-white rounded-lg border-0 shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-muted/50 rounded-lg">
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Quick Actions */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-semibold text-primary">Quick Help</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  variant="forest" 
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => window.open(whatsappUrl, '_blank')}
                >
                  <div className="text-2xl">💬</div>
                  <span>WhatsApp Chat</span>
                </Button>
                <Button 
                  variant="mountain" 
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={() => window.open('tel:+919876543210')}
                >
                  <div className="text-2xl">📞</div>
                  <span>Call Us</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-gradient-card border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Send us a Message</CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Drop us a message and we'll get back to you soon!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" variant="adventure" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="mt-6 bg-destructive/10 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  🚨 Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you're currently on a trip with us and need immediate assistance:
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="destructive" size="sm" onClick={() => window.open('tel:+919876543210')}>
                    📞 Emergency Hotline
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open(whatsappUrl, '_blank')}>
                    💬 WhatsApp SOS
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-primary mb-8">Still Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-0 hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="text-3xl mb-2">📋</div>
                <CardTitle>Booking Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Step-by-step guide on how to book your adventure with us
                </CardDescription>
                <Button variant="outline" className="w-full mt-4">
                  View Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="text-3xl mb-2">🎒</div>
                <CardTitle>Packing Lists</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Essential packing lists for different types of trips
                </CardDescription>
                <Button variant="outline" className="w-full mt-4">
                  Download Lists
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0 hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="text-3xl mb-2">💳</div>
                <CardTitle>Payment Help</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Information about payment methods and refund policies
                </CardDescription>
                <Button variant="outline" className="w-full mt-4">
                  Learn More
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