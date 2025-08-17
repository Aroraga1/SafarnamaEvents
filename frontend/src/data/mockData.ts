// src/data/mockData.js
export const upcomingEvents = [
  {
    id: "up1",
    name: "Spiti Valley Expedition",
    location: "Himachal Pradesh",
    date: "2025-09-01",
    maleFee: 18000,
    femaleFee: 17500,
    image: "https://placehold.co/1280x720/6A8270/D2F8D6?text=Spiti+Valley",
    distance: "500 km",
    trekType: "Hard" as const,
    facilities: [
      "Accommodation",
      "Meals",
      "Guide",
      "Transportation",
      "First Aid",
    ],
    description:
      "Experience the breathtaking beauty of Spiti Valley with our expert guides. This challenging trek will take you through some of the most stunning landscapes in the Himalayas.",
  },
  {
    id: "up2",
    name: "Rishikesh Rafting & Camping",
    location: "Uttarakhand",
    date: "2025-08-10",
    maleFee: 4500,
    femaleFee: 4200,
    image: "https://placehold.co/1280x720/4B5D6B/C2D0D8?text=Rishikesh+Rafting",
    distance: "N/A",
    trekType: "Easy" as const,
    facilities: ["Rafting Gear", "Camping", "Bonfire", "Meals"],
    description:
      "Perfect for beginners! Enjoy white water rafting in Rishikesh followed by camping under the stars.",
  },
  {
    id: "up3",
    name: "Leh Ladakh Bike Trip",
    location: "Jammu & Kashmir",
    date: "2025-09-15",
    maleFee: 25000,
    femaleFee: 24000,
    image: "https://placehold.co/1280x720/A69B8A/F0EFEF?text=Leh+Ladakh+Bike",
    distance: "1200 km",
    trekType: "Moderate" as const,
    facilities: ["Bike Rental", "Fuel", "Accommodation", "Mechanic Support"],
    description:
      "Embark on an epic motorcycle journey through the stunning landscapes of Ladakh. Experience the highest motorable passes in the world.",
  },
];

export const pastEvents = [
  {
    id: "past1",
    name: "Chadar Trek",
    location: "Ladakh",
    date: "2024-01-20",
    image: "https://placehold.co/1280x720/8B4513/FFF8DC?text=Chadar+Trek",
    description:
      "An incredible walk on the frozen Zanskar river, an experience of a lifetime!",
    trekType: "Hard" as const,
    maleFee: 35000,
    femaleFee: 34000,
    distance: "N/A",
    facilities: [
      "Accommodation",
      "Meals",
      "Guide",
      "Transportation",
      "First Aid",
    ],
  },
  {
    id: "past2",
    name: "Goa Beach Fest",
    location: "Goa",
    date: "2023-12-30",
    image: "https://placehold.co/1280x720/FFD700/800000?text=Goa+Fest",
    description:
      "New Year's Eve celebration by the beach with amazing music and vibes.",
    trekType: "Easy" as const,
    maleFee: 8000,
    femaleFee: 7500,
    distance: "N/A",
    facilities: ["Accommodation", "Beach Access", "Party", "Meals"],
  },
];

export const reviews = [
  {
    id: "r1",
    name: "Anjali Mehta",
    rating: 5,
    comment:
      "The Spiti Valley trip was beyond amazing! Safarnama's team was super supportive.",
    eventName: "Spiti Valley Expedition",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "r2",
    name: "Vikram Singh",
    rating: 4,
    comment:
      "Rishikesh rafting was thrilling! Great experience, though food could be better.",
    eventName: "Rishikesh Rafting & Camping",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "r3",
    name: "Sneha Sharma",
    rating: 5,
    comment:
      "Leh Ladakh bike trip was a dream come true. Flawless planning and execution!",
    eventName: "Leh Ladakh Bike Trip",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];


// mockData.ts (or mockData.js depending on your setup)

export const services = [
  {
    "id": "1",
    "name": "Mountain Adventure",
    "category": "Adventure",
    "description": "Explore the majestic mountain ranges with guided tours, scenic hikes, and adrenaline-packed adventures.",
    "icon": "🏞️"
  },
  {
    "id": "2",
    "name": "Beach Relaxation",
    "category": "Chill",
    "description": "Enjoy a calm and serene beach vacation, with activities like yoga, beach lounging, and sunset views.",
    "icon": "🏖️"
  },
  {
    "id": "3",
    "name": "Custom Luxury Getaway",
    "category": "Custom",
    "description": "Create your dream vacation with fully customized experiences, from private jets to personal chefs.",
    "icon": "✈️"
  },
  {
    "id": "4",
    "name": "Desert Safari",
    "category": "Adventure",
    "description": "An exhilarating journey through the desert, featuring dune bashing, camel rides, and stargazing.",
    "icon": "🏜️"
  },
  {
    "id": "5",
    "name": "Forest Retreat",
    "category": "Chill",
    "description": "Immerse yourself in the quiet and peaceful forest, ideal for hiking, meditation, and wildlife spotting.",
    "icon": "🌲"
  },
  {
    "id": "6",
    "name": "Island Escapade",
    "category": "Adventure",
    "description": "Set sail for a tropical island adventure, with water sports, wildlife excursions, and breathtaking views.",
    "icon": "🏝️"
  },
  {
    "id": "7",
    "name": "Private Yacht Experience",
    "category": "Custom",
    "description": "Charter a private yacht and sail away into the sunset with a personalized luxury cruise experience.",
    "icon": "⛵"
  },
  {
    "id": "8",
    "name": "Mountain Lodge Getaway",
    "category": "Chill",
    "description": "Unwind in a cozy mountain lodge with hot springs, scenic views, and gourmet dining.",
    "icon": "🏔️"
  }
];



// mockData.ts (or mockData.js depending on your setup)

export const galleryImages = [
  {
    "id": "1",
    "title": "Mountain Sunrise",
    "eventName": "Alpine Adventure",
    "category": "Adventure",
    "url": "https://tse4.mm.bing.net/th/id/OIP.E1delhseDwaoupHYV_2GRQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    "id": "2",
    "title": "Beach Vibes",
    "eventName": "Tropical Getaway",
    "category": "Chill",
    "url": "https://as1.ftcdn.net/v2/jpg/02/45/68/40/1000_F_245684006_e55tOria5okQtKmiLLbY30NgEHTIB0Og.jpg"
  },
  {
    "id": "3",
    "title": "Desert Safari",
    "eventName": "Desert Expedition",
    "category": "Adventure",
    "url": "https://monkeysandmountains.com/wp-content/uploads/2019/09/monkey-sand-mountains-adventure-travel-trekking-and-hiking-tours-4.jpg"
  },
  {
    "id": "4",
    "title": "Forest Retreat",
    "eventName": "Nature Escape",
    "category": "Chill",
    "url": "https://cdn.thecrazytourist.com/wp-content/uploads/2019/03/ccimage-shutterstock_366801260.jpg"
  },
  {
    "id": "5",
    "title": "Luxury Yacht",
    "eventName": "Exclusive Cruise",
    "category": "Custom",
    "url": "https://notednames.com/ImgStoriesBig/The-Best-Himalayan-Treks-in-India---Explore-the-Majestic-Beauty-of-the-Mountains_@o@.jpg"
  },
  {
    "id": "6",
    "title": "Sky Diving Adventure",
    "eventName": "Thrill Seekers",
    "category": "Adventure",
    "url": "https://tse3.mm.bing.net/th/id/OIP.VmpfQhFuFcSDdZJpvNKVxwHaEY?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    "id": "7",
    "title": "Private Island",
    "eventName": "Island Escape",
    "category": "Custom",
    "url": "https://images.saymedia-content.com/.image/t_share/MTg3MTg3MzQ2NTIzODI2MDYx/why-you-should-travel-to-the-mountains.jpg"
  },
  {
    "id": "8",
    "title": "Sunset Over the Ocean",
    "eventName": "Tropical Retreat",
    "category": "Chill",
    "url": "https://pick-kart.com/wp-content/uploads/2021/11/Mountains.jpg"
  },
  {
    "id": "9",
    "title": "Mountain Peaks",
    "eventName": "Peak Adventure",
    "category": "Adventure",
    "url": "hhttps://resize.indiatvnews.com/en/resize/newbucket/1200_-/2018/05/solo-traveller-and-mountains-in-europe-1527585993.jpg"
  },
  {
    "id": "10",
    "title": "Winter Wonderland",
    "eventName": "Snowy Escape",
    "category": "Chill",
    "url": "https://mountaintravels.com/wp-content/uploads/2020/01/slide-7.jpg"
  }
];



// Path: src/data/mockData.js
export const faqs = [
  {
    "id": "item-1",
    "question": "What if im travelling solo?",
    "answer": "It's not just the quastion, although its the opportunity which we commits that you come solo but can't go alone cause the loving people those you would get as friends."
  },
  {
    "id": "item-2",
    "question": "What's the Refund policy?",
    "answer": "You can cancel it anytime if not possible to join, just in case you did not get our services."
  },
  {
    "id": "item-3",
    "question": "Is there any physical or help related safety available?",
    "answer": "Ofcourse, we do have proper medical kit, engaging and helping teamp members with female guid to help out comfirtablly, still we always try to ahead with full of safty."
  },
  {
    "id": "item-4",
    "question": "How to Book the track & join?",
    "answer": "Its so easy to Register you even with your friends to register at once by just filling up small details about you on the home page of our this website's, just scroll it and book your slot!"
  },
  {
    "id": "item-5",
    "question": "Is something Importent to know before coming to track?",
    "answer": "For eqach track you have to borrow a water bottle & tracking/sport shoes with comfirtable wear and next to it depends on you like face mask & all."
  },
  {
    "id": "item-5",
    "quastion": "Are Girls safe on tracks even a solo girl?",
    "answar": "Absalutelly even solo girls so feel safe here with our carring, helping, enjoying team & trackers as lovely nature with female guide & lot girls trackers"
  }
];



// Path: src/data/mockData.js
export const teamMembers = [
  {
    "id": "member-1",
    "name": "Arjun Sharma",
    "role": "Chief Explorer (CEO)",
    "image": "https://monkeysandmountains.com/wp-content/uploads/2019/09/monkey-sand-mountains-adventure-travel-trekking-and-hiking-tours-4.jpg", // Add actual image paths
    "bio": "Arjun founded Safarnama with a vision to make adventure accessible to everyone. He's passionate about trekking and exploring new cultures."
  },
  {
    "id": "member-2",
    "name": "Priya Singh",
    "role": "Experience Architect (COO)",
    "image": "https://monkeysandmountains.com/wp-content/uploads/2019/09/monkey-sand-mountains-adventure-travel-trekking-and-hiking-tours-4.jpg",
    "bio": "Priya designs our unique itineraries, ensuring every trip is a perfect blend of thrill and comfort. She's our go-to person for seamless adventures."
  },
  {
    "id": "member-3",
    "name": "Rahul Kumar",
    "role": "Logistics Maestro (Operations Head)",
    "image": "/images/rahul_kumar.jpg",
    "bio": "Rahul manages all the on-ground logistics, making sure everything runs smoothly from start to finish. He's a pro at problem-solving."
  },
  {
    "id": "member-4",
    "name": "Neha Gupta",
    "role": "Community Builder (Marketing Lead)",
    "image": "/images/neha_gupta.jpg",
    "bio": "Neha connects with our adventurous community and shares the Safarnama story. She loves fostering a sense of belonging among travelers."
  },
  {
    "id": "member-5",
    "name": "Vikram Desai",
    "role": "Wilderness Guide (Lead Guide)",
    "image": "/images/vikram_desai.jpg",
    "bio": "Vikram is our most experienced guide, leading challenging treks and expeditions. His knowledge of the mountains is unmatched."
  },
  {
    "id": "member-6",
    "name": "Sara Khan",
    "role": "Travel Storyteller (Content Creator)",
    "image": "/images/sara_khan.jpg",
    "bio": "Sara captures the magic of our trips through her lens and words, inspiring others to embark on their own Safarnama."
  }
];