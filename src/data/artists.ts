export interface Artist {
  id: string;
  name: string;
  image: string;
  location: string;
  area: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  price: number;
  bio: string;
  portfolio: string[];
  services: Service[];
  reviews: Review[];
  available: boolean;
  verified: boolean;
  experience: number;
  languages: string[];
  responseTime: string;
}

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  popular?: boolean;
}

export interface Review {
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
  service?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  count: number;
}

export interface Studio {
  id: string;
  name: string;
  image: string;
  location: string;
  area: string;
  rating: number;
  reviewCount: number;
  artists: number;
  price: number;
  categories: string[];
  description: string;
}

export const categories: Category[] = [
  {
    id: "airbrush",
    name: "Airbrush",
    description: "Flawless airbrush application",
    icon: "🎨",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    count: 12,
  },
  {
    id: "bridal-makeup",
    name: "Bridal Makeup",
    description: "Wedding day glamour",
    icon: "💍",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400",
    count: 24,
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "Fashion and photoshoot looks",
    icon: "📸",
    image: "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=400",
    count: 8,
  },
  {
    id: "everyday-glam",
    name: "Everyday Glam",
    description: "Daily beauty enhancement",
    icon: "✨",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
    count: 18,
  },
  {
    id: "hair-styling",
    name: "Hair Styling",
    description: "Professional hair design",
    icon: "💇",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400",
    count: 15,
  },
  {
    id: "nail-art",
    name: "Nail Art",
    description: "Creative nail designs",
    icon: "💅",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400",
    count: 10,
  },
  {
    id: "skincare",
    name: "Skincare",
    description: "Facial treatments and care",
    icon: "🧴",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400",
    count: 9,
  },
  {
    id: "special-effects",
    name: "Special Effects",
    description: "Creative and fantasy looks",
    icon: "🎭",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400",
    count: 6,
  },
];

export const artists: Artist[] = [
  {
    id: "sophia-chen",
    name: "Sophia Chen",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    location: "Kuala Lumpur",
    area: "Bukit Bintang",
    rating: 4.9,
    reviewCount: 127,
    categories: ["bridal-makeup", "everyday-glam"],
    price: 350,
    bio: "Award-winning bridal MUA with 10+ years experience.",
    portfolio: [],
    services: [
      {
        id: "s1",
        name: "Bridal Trial",
        duration: "2 hrs",
        price: 200,
        description: "Pre-wedding trial session",
      },
      {
        id: "s2",
        name: "Bridal Full Glam",
        duration: "3 hrs",
        price: 450,
        description: "Complete bridal makeup",
      },
    ],
    reviews: [],
    available: true,
    verified: true,
    experience: 10,
    languages: ["English", "Mandarin", "Cantonese"],
    responseTime: "Under 1 hour",
  },
  {
    id: "lily-tanaka",
    name: "Lily Tanaka",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    location: "Penang",
    area: "George Town",
    rating: 4.9,
    reviewCount: 145,
    categories: ["hair-styling", "special-effects"],
    price: 400,
    bio: "SFX makeup artist for film and TV.",
    portfolio: [],
    services: [
      {
        id: "s3",
        name: "SFX Consultation",
        duration: "1 hr",
        price: 150,
        description: "Discuss your vision",
      },
      {
        id: "s4",
        name: "Full SFX Application",
        duration: "4 hrs",
        price: 600,
        description: "Complete special effects makeup",
      },
    ],
    reviews: [],
    available: true,
    verified: true,
    experience: 12,
    languages: ["English", "Japanese"],
    responseTime: "Under 1 hour",
  },
  {
    id: "aisha-rahman",
    name: "Aisha Rahman",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    location: "Selangor",
    area: "Petaling Jaya",
    rating: 4.8,
    reviewCount: 98,
    categories: ["airbrush", "editorial"],
    price: 300,
    bio: "Editorial makeup artist who brings avant-garde visions to life.",
    portfolio: [],
    services: [
      {
        id: "s5",
        name: "Editorial Look",
        duration: "2 hrs",
        price: 300,
        description: "Fashion photoshoot makeup",
      },
      {
        id: "s6",
        name: "Airbrush Glam",
        duration: "1.5 hrs",
        price: 250,
        description: "Flawless airbrush application",
      },
    ],
    reviews: [],
    available: true,
    verified: true,
    experience: 8,
    languages: ["English", "Malay"],
    responseTime: "Under 1 hour",
  },
];

export const studios: Studio[] = [
  {
    id: "glam-haven",
    name: "Glam Haven Studio",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    location: "Kuala Lumpur",
    area: "Bangsar",
    rating: 4.8,
    reviewCount: 89,
    artists: 6,
    price: 250,
    categories: ["bridal-makeup", "hair-styling", "skincare"],
    description: "Premium beauty studio with a team of experienced artists.",
  },
  {
    id: "beauty-vault",
    name: "Beauty Vault",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
    location: "Selangor",
    area: "Subang Jaya",
    rating: 4.7,
    reviewCount: 64,
    artists: 4,
    price: 200,
    categories: ["everyday-glam", "nail-art", "airbrush"],
    description: "Your one-stop beauty destination for everyday glam.",
  },
  {
    id: "luxe-looks",
    name: "Luxe Looks Studio",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    location: "Kuala Lumpur",
    area: "Mont Kiara",
    rating: 4.9,
    reviewCount: 112,
    artists: 8,
    price: 350,
    categories: ["bridal-makeup", "editorial", "special-effects"],
    description:
      "High-end beauty studio specializing in luxury bridal and editorial looks.",
  },
];

export const testimonials: {
  quote: string;
  author: string;
  role: string;
  rating: number;
}[] = [
  {
    quote:
      "Leish made my wedding day absolutely perfect. Sophia created the most beautiful bridal look I could have imagined.",
    author: "Sarah L.",
    role: "Bride",
    rating: 5,
  },
  {
    quote:
      "The attention to detail was incredible. I felt like a celebrity on my special day.",
    author: "Amirah K.",
    role: "Client",
    rating: 5,
  },
  {
    quote:
      "Booking through Leish was seamless. Found the perfect artist for my needs within minutes.",
    author: "Jennifer T.",
    role: "Regular Client",
    rating: 5,
  },
  {
    quote:
      "Professional, talented, and absolutely lovely to work with. Highly recommend!",
    author: "Diana R.",
    role: "Client",
    rating: 5,
  },
];
