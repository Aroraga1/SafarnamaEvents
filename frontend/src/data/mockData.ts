import { Event, TeamMember, FAQ, Review, GalleryImage } from "@/types";

export const upcomingEvents: Event[] = [
  {
    id: "1",
    name: "Himalayan Trek Adventure",
    image: "https://larissadening.com/wp-content/uploads/2017/05/VNSW7.jpg",
    location: "Manali, Himachal Pradesh",
    date: "2024-08-15",
    maleFee: 2500,
    femaleFee: 2200,
    facilities: [
      "Professional Guide",
      "Camping Equipment",
      "Meals",
      "First Aid",
    ],
    distance: "25km",
    trekType: "Moderate",
    description:
      "Experience the breathtaking beauty of the Himalayas with our expert guides.",
  },
  {
    id: "2",
    name: "Goa Beach Party Weekend",
    image: "/placeholder.svg",
    location: "North Goa",
    date: "2024-08-22",
    maleFee: 3500,
    femaleFee: 3200,
    facilities: [
      "Beach Resort Stay",
      "DJ Night",
      "Water Sports",
      "Buffet Meals",
    ],
    distance: "N/A",
    trekType: "Easy",
    description:
      "Unwind at the pristine beaches of Goa with music, dance and endless fun!",
  },
  {
    id: "3",
    name: "Rajasthan Desert Safari",
    image: "/placeholder.svg",
    location: "Jaisalmer, Rajasthan",
    date: "2024-09-05",
    maleFee: 4000,
    femaleFee: 3800,
    facilities: [
      "Camel Safari",
      "Desert Camping",
      "Folk Music",
      "Traditional Meals",
    ],
    distance: "15km",
    trekType: "Easy",
    description: "Discover the golden dunes and rich culture of Rajasthan!",
  },
];

export const pastEvents: Event[] = [
  {
    id: "4",
    name: "Pondicherry Pool Party",
    image: "/placeholder.svg",
    location: "Pondicherry",
    date: "2024-07-10",
    maleFee: 2000,
    femaleFee: 1800,
    facilities: ["Pool Access", "DJ", "Snacks", "Photography"],
    distance: "N/A",
    trekType: "Easy",
    description: "An amazing pool party experience with great vibes!",
  },
  {
    id: "5",
    name: "Western Ghats Trek",
    image: "/placeholder.svg",
    location: "Kodaikanal, Tamil Nadu",
    date: "2024-06-20",
    maleFee: 2800,
    femaleFee: 2500,
    facilities: ["Trekking Guide", "Camping", "Bonfire", "Meals"],
    distance: "18km",
    trekType: "Hard",
    description: "Challenging trek through the scenic Western Ghats!",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    role: "Founder & Trek Leader",
    image: "/placeholder.svg",
    bio: "Adventure enthusiast with 8+ years of trekking experience across India.",
  },
  {
    id: "2",
    name: "Priya Patel",
    role: "Event Coordinator",
    image: "/placeholder.svg",
    bio: "Expert in organizing memorable events and ensuring customer satisfaction.",
  },
  {
    id: "3",
    name: "Arjun Singh",
    role: "Safety Officer",
    image: "/placeholder.svg",
    bio: "Certified mountaineer focused on safety protocols and emergency response.",
  },
];

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "What should I bring for treks?",
    answer:
      "We provide a detailed packing list after booking. Generally, bring comfortable trekking shoes, warm clothes, personal medications, and basic toiletries.",
  },
  {
    id: "2",
    question: "Are your events safe for solo travelers?",
    answer:
      "Absolutely! We prioritize safety and have experienced guides. Many of our participants are solo travelers who make great friends during the journey.",
  },
  {
    id: "3",
    question: "What if weather conditions are bad?",
    answer:
      "We monitor weather closely and may reschedule events for safety. Full refunds or rescheduling options are provided in such cases.",
  },
  {
    id: "4",
    question: "Can I get a refund if I cancel?",
    answer:
      "Yes, refunds are available based on our cancellation policy. Earlier cancellations get higher refund percentages.",
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    name: "Sneha Kumar",
    rating: 5,
    comment:
      "Amazing experience! The trek was well-organized and the guides were fantastic. Definitely booking again!",
    image: "/placeholder.svg",
    eventName: "Himalayan Trek Adventure",
  },
  {
    id: "2",
    name: "Vikram Joshi",
    rating: 5,
    comment:
      "Goa trip was absolutely incredible! Great organization, awesome people, and unforgettable memories.",
    eventName: "Goa Beach Party Weekend",
  },
  {
    id: "3",
    name: "Anita Reddy",
    rating: 4,
    comment:
      "Professional team and beautiful locations. Had a wonderful time with new friends!",
    eventName: "Western Ghats Trek",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "1",
    url: "/placeholder.svg",
    category: "Treks",
    title: "Mountain Sunrise",
    eventName: "Himalayan Trek Adventure",
  },
  {
    id: "2",
    url: "/placeholder.svg",
    category: "Parties",
    title: "Beach Vibes",
    eventName: "Goa Beach Party Weekend",
  },
  {
    id: "3",
    url: "/placeholder.svg",
    category: "Desert",
    title: "Golden Dunes",
    eventName: "Rajasthan Desert Safari",
  },
  {
    id: "4",
    url: "/placeholder.svg",
    category: "Treks",
    title: "Forest Trail",
    eventName: "Western Ghats Trek",
  },
];

export const services = [
  {
    id: "1",
    name: "Pool Parties",
    description:
      "Fun-filled pool parties with DJ, games, and unlimited entertainment",
    icon: "🏊‍♂️",
    category: "Chill",
  },
  {
    id: "2",
    name: "Occasional Parties",
    description: "Special event celebrations - birthdays, festivals, and more",
    icon: "🎉",
    category: "Chill",
  },
  {
    id: "3",
    name: "Easy Treks",
    description: "Beginner-friendly treks perfect for first-time adventurers",
    icon: "🥾",
    category: "Adventure",
  },
  {
    id: "4",
    name: "Moderate Treks",
    description: "Challenging treks for experienced hikers seeking adventure",
    icon: "⛰️",
    category: "Adventure",
  },
  {
    id: "5",
    name: "Hard Treks",
    description: "Extreme adventures for seasoned trekkers and mountaineers",
    icon: "🏔️",
    category: "Adventure",
  },
  {
    id: "6",
    name: "Long Trips",
    description:
      "Multi-day journeys to explore distant and exotic destinations",
    icon: "🚐",
    category: "Adventure",
  },
  {
    id: "7",
    name: "Private Getaways",
    description:
      "Customized trips for couples, families, or close friend groups",
    icon: "🏖️",
    category: "Custom",
  },
  {
    id: "8",
    name: "Adventure Nights",
    description: "Overnight camping, bonfires, and stargazing experiences",
    icon: "🔥",
    category: "Adventure",
  },
];
