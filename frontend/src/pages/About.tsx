import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { teamMembers } from '@/data/mockData';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-green/20 to-earth-brown/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            About Safarnama
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Born from a passion for adventure and a love for bringing people together, Safarnama has been creating 
            unforgettable experiences since 2020. We believe that the best memories are made when you step out of 
            your comfort zone and embrace the unknown.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                What started as a group of friends organizing weekend treks has evolved into a community of 
                adventure enthusiasts who share a common goal: to explore the incredible diversity that India offers.
              </p>
              <p>
                From the snow-capped peaks of the Himalayas to the golden sands of Rajasthan, from the pristine 
                beaches of Goa to the lush forests of the Western Ghats - we've covered it all, and we're just getting started.
              </p>
              <p>
                Every trip we organize is crafted with attention to detail, safety, and most importantly, fun. 
                We believe in responsible travel that respects local communities and preserves the natural beauty 
                we all love to explore.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg"
              alt="Team adventure"
              className="rounded-2xl shadow-lg w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-gradient-hero text-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm opacity-90">Happy Adventurers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-gradient-card border-0 hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="text-4xl mb-2">🛡️</div>
                <CardTitle>Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every adventure is planned with comprehensive safety measures and experienced guides to ensure your peace of mind.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-card border-0 hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="text-4xl mb-2">🌱</div>
                <CardTitle>Eco-Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We're committed to sustainable tourism practices that protect and preserve the environments we explore.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-card border-0 hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="text-4xl mb-2">🤝</div>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We're more than a travel company - we're a community of like-minded adventurers who support each other.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="text-center bg-gradient-card border-0 hover:shadow-card-hover transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="secondary" className="mx-auto w-fit">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription>{member.bio}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-hero rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join the Safarnama family and discover incredible experiences waiting for you
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">📧</div>
              <p className="font-medium">Email</p>
              <p className="text-sm opacity-90">info@safarnama.com</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">📞</div>
              <p className="font-medium">Phone</p>
              <p className="text-sm opacity-90">+91 98765 43210</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">📱</div>
              <p className="font-medium">Instagram</p>
              <p className="text-sm opacity-90">@safarnama_adventures</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">📍</div>
              <p className="font-medium">Office</p>
              <p className="text-sm opacity-90">Mumbai, Maharashtra</p>
            </div>
          </div>

          <Button variant="secondary" size="lg">
            Get In Touch
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;