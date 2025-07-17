import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { services } from '@/data/mockData';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', 'Adventure', 'Chill', 'Custom'];
  
  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-blue/20 to-forest-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From thrilling adventures to relaxing getaways, we organize unforgettable experiences for every type of traveler
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'adventure' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="px-6"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <Card 
              key={service.id} 
              className="hover:shadow-card-hover transition-all duration-300 hover:scale-105 bg-gradient-card border-0"
            >
              <CardHeader className="text-center">
                <div className="text-4xl mb-2">{service.icon}</div>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <Badge variant="secondary" className="w-fit mx-auto">
                  {service.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center mb-4">
                  {service.description}
                </CardDescription>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-hero rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Next Adventure?</h2>
          <p className="text-lg mb-6 opacity-90">
            Don't see exactly what you're looking for? We also create custom experiences tailored to your preferences!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Contact Us
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              View Gallery
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;