export interface Event {
  id: string;
  name: string;
  image: string;
  location: string;
  date: string;
  maleFee: number;
  femaleFee: number;
  facilities: string[];
  distance: string;
  trekType: "Easy" | "Moderate" | "Hard";
  description: string;
  priceMale: number;
  priceFemale: number;
  whatsappGroupJoiningLink: string;
  meetingPointMapLink: string;
}

export interface Booking {
  id?: string;
  eventId: string;
  name: string;
  email: string;
  age: number;
  whatsapp: string;
  people: number;
  joinedWhatsappGroup: boolean;
  createdAt?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  title: string;
  eventName: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  image?: string;
  eventName: string;
}
