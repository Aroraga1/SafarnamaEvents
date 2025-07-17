import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { galleryImages } from '@/data/mockData';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];
  
  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sunset-orange/20 to-mountain-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Adventure Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Relive the amazing moments and get inspired for your next adventure with us
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'sunset' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="px-6"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Pinterest-style Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className={`relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                index % 3 === 0 ? 'row-span-2' : index % 5 === 0 ? 'col-span-2' : ''
              }`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
                style={{ aspectRatio: index % 3 === 0 ? '3/4' : index % 5 === 0 ? '16/9' : '4/3' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.eventName}</p>
                  <Badge variant="secondary" className="mt-2 bg-white/20 text-white">
                    {image.category}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <Button variant="adventure" size="lg">
            Load More Adventures
          </Button>
          <p className="text-muted-foreground mt-4">
            Want to see your photos here? Join our next adventure!
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-sunset rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Create Your Own Memories</h2>
          <p className="text-lg mb-6 opacity-90">
            Join us on our next adventure and be part of these amazing experiences!
          </p>
          <Button variant="secondary" size="lg">
            Book Your Next Trip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;