import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import tarun from "@/public/tarun.jpeg";
import mukesh from "../../public/other/mukesh.jpg";
import kashif from "../../public/other/kashif.jpg";
import insta from "../../public/other/instagram.png";

// Custom AnimatedCounter component
const AnimatedCounter = ({ endValue, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const startValue = 0;
  const step = Math.ceil(endValue / (duration / 16));

  useEffect(() => {
    let current = startValue;
    const counter = setInterval(() => {
      current += step;
      if (current >= endValue) {
        setCount(endValue);
        clearInterval(counter);
      } else {
        setCount(current);
      }
    }, 16);

    return () => clearInterval(counter);
  }, [endValue, step]);

  return <div className="text-3xl font-bold">{count.toLocaleString()}+</div>;
};

// New mock data for team members
const teamMembers = [
  {
    id: 1,
    name: "Mohammad Kashif",
    role: "Founder & Sr. Trek Leader",
    image: kashif,
    bio: "Founder of safarnama events and a Senior Trek Leader. With a deep passion for adventure and culture, he has led countless treks and outdoor experiences, blending the thrill of exploration with a deep respect for nature and a commitment to safety.",
  },
  {
    id: 2,
    name: "Mukesh Mangtani",
    role: "Founder & Sr. Trek Leader",
    image: mukesh,
    bio: "Founder of safarnama events and a Senior Trek Leader. He specializes in Adventure Activities, offering unforgettable journeys designed for every adventurer. He ensures every adventure is safe, exciting, and memorable.",
  },
  {
    id: 3,
    name: "Tarun Jangid",
    role: "Founder & Sr. Trek Leader",
    image: mukesh,
    bio: "Founder of safarnama events and a Senior Trek Leader. He personally ensures every journey is thoughtfully crafted, well-organized, and full of memories you will cherish for life.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2c3e50]/20 to-[#f39c12]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2c3e50] mb-6">
            About Safarnama
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            At SafarNama Events, we believe life is best experienced outdoors—on
            the trail, on the road, and in the heart of culture. We're
            passionate about creating unforgettable adventures that bring people
            closer to nature, community, and themselves.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#2c3e50]">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                From Trekking and Hiking through scenic landscapes, to
                high-energy Cyclothons, immersive Cultural Events, and
                well-curated Tour Packages—we offer something for every
                explorer. Whether you're traveling solo, with friends, or as
                part of a group, our Group Trips are designed to be safe,
                exciting, and full of meaningful moments.
              </p>
              <p>
                Led by experienced professionals and crafted with care, every
                journey with us is more than a trip—it’s a story waiting to be
                told.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://monkeysandmountains.com/wp-content/uploads/2019/09/monkey-sand-mountains-adventure-travel-trekking-and-hiking-tours-4.jpg"
              alt="Team adventure"
              className="rounded-2xl shadow-lg w-full h-auto object-contain"
            />
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-[#b85c38] to-[#f39c12] text-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <AnimatedCounter endValue={2500} /> {/* Updated value */}
                <div className="text-sm opacity-90">Happy Adventurers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2c3e50] text-center mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-gray-100 border-0 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="text-4xl mb-2">🛡️</div>
                <CardTitle className="text-[#2c3e50]">Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every adventure is planned with comprehensive safety measures
                  and experienced guides to ensure your peace of mind.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center bg-gray-100 border-0 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="text-4xl mb-2">🌱</div>
                <CardTitle className="text-[#2c3e50]">Eco-Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We're committed to sustainable tourism practices that protect
                  and preserve the environments we explore.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center bg-gray-100 border-0 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="text-4xl mb-2">🤝</div>
                <CardTitle className="text-[#2c3e50]">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We're more than a travel company - we're a community of
                  like-minded adventurers who support each other.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2c3e50] text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="text-center flex flex-col items-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover rounded-t-lg mx-auto"
                />
                <Card className="bg-gray-100 border-0 hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-t-none">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#2c3e50]">
                      {member.name}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="mx-auto w-fit text-lg"
                    >
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{member.bio}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-[#2c3e50] to-[#b85c38] rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Join the Safarnama family and discover incredible experiences
            waiting for you
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
              <img
                src={insta}
                alt="Instagram"
                className="w-8 h-8 object-contain mx-auto mb-2"
              />
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
