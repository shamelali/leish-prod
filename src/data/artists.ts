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
    id: "event",
    name: "Event Makeup",
    description: "Statement-ready glam for dinners, launches, galas, and celebrations that need impact.",
    icon: "🎉",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=400&fit=crop",
    count: 18,
  },
  {
    id: "photoshoot",
    name: "Photoshoot Makeup",
    description: "Camera-ready artistry for campaigns, fashion editorials, and creative productions.",
    icon: "📸",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop",
    count: 9,
  },
  {
    id: "sfx",
    name: "SFX Makeup",
    description: "Transformational special effects artistry for film, cosplay, theatre, and concept shoots.",
    icon: "🎭",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=400&fit=crop",
    count: 6,
  },
  {
    id: "lessons",
    name: "Makeup Lessons",
    description: "Learn makeup techniques from professional artists in personalized one-on-one sessions.",
    icon: "🎓",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop",
    count: 8,
  },
  {
    id: "hari-raya",
    name: "Hari Raya Makeup",
    description: "Traditional Hari Raya makeup with elegant, modest looks perfect for festive celebrations.",
    icon: "🌙",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop",
    count: 14,
  },
  {
    id: "chinese-new-year",
    name: "Chinese New Year Makeup",
    description: "Auspicious Chinese New Year makeup featuring red accents and traditional festive styles.",
    icon: "🧧",
    image: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=600&h=400&fit=crop",
    count: 10,
  },
  {
    id: "traditional-malay",
    name: "Traditional Malay Makeup",
    description: "Authentic Malay makeup with traditional henna designs and cultural elements.",
    icon: "🌺",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    count: 11,
  },
  {
    id: "hijab",
    name: "Hijab-Friendly Makeup",
    description: "Beautiful hijab-friendly makeup that complements modest fashion and cultural preferences.",
    icon: "👗",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop",
    count: 7,
  },
];

export const artists: Artist[] = [
  {
    id: "aiko-nakamura",
    name: "Aiko Nakamura",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&crop=face",
    location: "Selangor",
    area: "Petaling",
    rating: 4.9,
    reviewCount: 127,
    categories: ["event"],
    price: 250,
    bio: "With over 8 years of experience specializing in wedding and event makeup, Aiko brings a refined touch of elegance to every client. Her signature soft glam style has graced over 500 weddings across Malaysia, blending contemporary trends with timeless sophistication. Aiko is passionate about making every bride feel like the most beautiful version of themselves on their special day.",
    portfolio: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "aiko-1", name: "Glam Full Package", duration: "3 hours", price: 450, description: "Complete wedding makeup with trial session, airbrush finish, and touch-up kit.", popular: true },
      { id: "aiko-2", name: "Natural Glam", duration: "2 hours", price: 300, description: "Soft, natural wedding look focusing on enhancing your natural beauty." },
      { id: "aiko-3", name: "Event Glam", duration: "1.5 hours", price: 250, description: "Full glam makeup for galas, dinners, and special events.", popular: true },
      { id: "aiko-4", name: "Touch-up Session", duration: "1 hour", price: 150, description: "Quick touch-up and refresh for any occasion." },
    ],
    reviews: [
      { author: "Catherine M.", rating: 5, text: "Aiko made me feel like a queen on my wedding day. Absolutely stunning work!", date: "2025-12-15", service: "Glam Full Package" },
      { author: "Sarah L.", rating: 5, text: "The best makeup artist I've ever worked with. Professional and talented.", date: "2025-11-20", service: "Event Glam" },
      { author: "Priya K.", rating: 5, text: "My wedding makeup lasted the entire night. Aiko is a true artist!", date: "2025-10-08", service: "Glam Full Package" },
      { author: "Amirah H.", rating: 5, text: "So happy with the natural wedding look. Exactly what I wanted.", date: "2025-09-14", service: "Natural Glam" },
    ],
    available: true,
    verified: true,
    experience: 8,
    languages: ["English", "Malay", "Japanese"],
    responseTime: "Under 1 hour",
  },
  {
    id: "mei-lin",
    name: "Mei Lin",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop&crop=face",
    location: "Wilayah Persekutuan Kuala Lumpur",
    area: "Bukit Bintang",
    rating: 4.8,
    reviewCount: 89,
    categories: ["photoshoot", "event", "sfx"],
    price: 300,
    bio: "Mei Lin is a visionary makeup artist known for her bold editorial work and creative SFX transformations. With a background in fashion and film, she brings an artistic edge to every project. Her work has been featured in Vogue Malaysia, Harper's Bazaar, and numerous international campaigns.",
    portfolio: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "mei-1", name: "Editorial Shoot", duration: "3 hours", price: 500, description: "High-fashion editorial makeup for magazine shoots and campaigns.", popular: true },
      { id: "mei-2", name: "SFX Full Transformation", duration: "4 hours", price: 600, description: "Complete special effects transformation for film, cosplay, or concept shoots.", popular: true },
      { id: "mei-3", name: "Event Glam", duration: "1.5 hours", price: 300, description: "Bold, statement-making makeup for high-profile events." },
      { id: "mei-4", name: "Creative Consultation", duration: "1 hour", price: 200, description: "One-on-one creative consultation for your project vision." },
    ],
    reviews: [
      { author: "Alexandra R.", rating: 5, text: "Mei Lin understands editorial beauty at the highest level. Incredibly talented.", date: "2025-12-01", service: "Editorial Shoot" },
      { author: "James T.", rating: 5, text: "Her SFX work is mind-blowing. Transformed our entire film set.", date: "2025-11-15", service: "SFX Full Transformation" },
      { author: "Nina W.", rating: 4, text: "Creative and professional. A true artist in every sense.", date: "2025-10-22", service: "Event Glam" },
    ],
    available: true,
    verified: true,
    experience: 6,
    languages: ["English", "Mandarin", "Malay"],
    responseTime: "Under 2 hours",
  },
  {
    id: "kenji-sato",
    name: "Kenji Sato",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face",
    location: "Pulau Pinang",
    area: "Timur Laut",
    rating: 4.9,
    reviewCount: 95,
    categories: ["photoshoot", "event", "sfx"],
    price: 275,
    bio: "Kenji brings a unique fusion of Japanese precision and Malaysian warmth to his artistry. Specializing in photoshoot and SFX makeup, he has built a reputation for creating looks that are both technically flawless and deeply creative. His calm demeanor puts clients at ease while his artistry speaks for itself.",
    portfolio: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "kenji-1", name: "Photoshoot Package", duration: "2.5 hours", price: 400, description: "Complete photoshoot makeup with touch-ups between looks.", popular: true },
      { id: "kenji-2", name: "SFX Character Design", duration: "4 hours", price: 550, description: "Full character design and application for film or cosplay.", popular: true },
      { id: "kenji-3", name: "Event Makeup", duration: "1.5 hours", price: 275, description: "Polished event makeup tailored to your outfit and occasion." },
      { id: "kenji-4", name: "Modern Glam", duration: "2 hours", price: 350, description: "Contemporary wedding look with modern techniques and finishes." },
    ],
    reviews: [
      { author: "Diana K.", rating: 5, text: "Kenji's work is absolutely impeccable. I recommend him to all my clients.", date: "2025-12-10", service: "Photoshoot Package" },
      { author: "Raj M.", rating: 5, text: "Professional, creative, and incredibly talented. A joy to work with.", date: "2025-11-28", service: "SFX Character Design" },
      { author: "Lisa P.", rating: 4, text: "Great SFX work for our theatre production. Very detailed and creative.", date: "2025-10-15", service: "SFX Character Design" },
    ],
    available: true,
    verified: true,
    experience: 7,
    languages: ["English", "Japanese", "Malay"],
    responseTime: "Under 1 hour",
  },
  {
    id: "nurul-ain",
    name: "Nurul Ain",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=600&fit=crop&crop=face",
    location: "Johor",
    area: "Johor Bahru",
    rating: 4.9,
    reviewCount: 142,
    categories: ["event", "traditional-malay", "hijab", "hari-raya"],
    price: 200,
    bio: "Nurul Ain is a master of traditional Malay wedding beauty, with a deep understanding of cultural heritage and modern aesthetics. Her hijab-friendly techniques have made her one of the most sought-after artists in Southern Malaysia. She combines traditional henna artistry with contemporary makeup trends for a truly unique wedding experience.",
    portfolio: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "nurul-1", name: "Traditional Malay Glam", duration: "3 hours", price: 380, description: "Complete traditional Malay wedding package with henna and cultural styling.", popular: true },
      { id: "nurul-2", name: "Hijab Wedding Package", duration: "2.5 hours", price: 320, description: "Wedding makeup designed to perfectly complement hijab styling.", popular: true },
      { id: "nurul-3", name: "Henna Artistry", duration: "2 hours", price: 200, description: "Intricate traditional henna designs for hands and feet." },
      { id: "nurul-4", name: "Hari Raya Glam", duration: "1.5 hours", price: 180, description: "Elegant festive makeup perfect for Hari Raya celebrations." },
    ],
    reviews: [
      { author: "Fatimah Z.", rating: 5, text: "Nurul made my traditional wedding absolutely magical. Her henna work is breathtaking.", date: "2025-12-05", service: "Traditional Malay Glam" },
      { author: "Aisyah R.", rating: 5, text: "The best hijab-friendly makeup artist in Malaysia. Truly understands our needs.", date: "2025-11-18", service: "Hijab Wedding Package" },
      { author: "Siti N.", rating: 5, text: "My wedding party all used Nurul and we were all stunning. Highly recommend!", date: "2025-10-30", service: "Traditional Malay Glam" },
      { author: "Hafiza M.", rating: 5, text: "Her Hari Raya look was perfect for our family gathering. Elegant and modest.", date: "2025-10-01", service: "Hari Raya Glam" },
    ],
    available: true,
    verified: true,
    experience: 10,
    languages: ["Malay", "English"],
    responseTime: "Under 30 min",
  },
  {
    id: "rachel-tan",
    name: "Rachel Tan",
    image: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=600&h=600&fit=crop&crop=face",
    location: "Wilayah Persekutuan Kuala Lumpur",
    area: "Mont Kiara",
    rating: 4.7,
    reviewCount: 76,
    categories: ["event", "chinese-new-year", "lessons"],
    price: 280,
    bio: "Rachel combines Eastern and Western beauty techniques to create stunning, versatile looks. As a certified makeup educator, she's passionate about empowering women through makeup knowledge. Her Chinese New Year packages are legendary, blending traditional auspicious elements with modern elegance.",
    portfolio: [
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "rachel-1", name: "Luxury Glam Package", duration: "3 hours", price: 500, description: "Premium wedding experience with airbrush, touch-up kit, and evening refresh.", popular: true },
      { id: "rachel-2", name: "CNY Glam Package", duration: "2 hours", price: 350, description: "Auspicious CNY look with traditional red accents and modern styling.", popular: true },
      { id: "rachel-3", name: "Personal Makeup Lesson", duration: "3 hours", price: 280, description: "Learn professional techniques in a personalized one-on-one session." },
      { id: "rachel-4", name: "Group Makeup Workshop", duration: "4 hours", price: 180, description: "Fun group workshop for 4-6 people. Perfect for wedding showers!" },
    ],
    reviews: [
      { author: "Michelle L.", rating: 5, text: "Rachel's CNY makeup was absolutely stunning. I got so many compliments!", date: "2025-12-08", service: "CNY Glam Package" },
      { author: "Hannah C.", rating: 4, text: "The makeup lesson was so informative. I finally learned how to do my own glam look.", date: "2025-11-25", service: "Personal Makeup Lesson" },
      { author: "Wendy T.", rating: 5, text: "My wedding makeup was flawless. Rachel is so talented and patient.", date: "2025-10-12", service: "Luxury Glam Package" },
    ],
    available: true,
    verified: true,
    experience: 5,
    languages: ["English", "Mandarin", "Cantonese"],
    responseTime: "Under 1 hour",
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop&crop=face",
    location: "Selangor",
    area: "Subang Jaya",
    rating: 4.8,
    reviewCount: 108,
    categories: ["event", "photoshoot"],
    price: 220,
    bio: "Priya's multicultural background informs her versatile approach to beauty. She seamlessly blends South Asian wedding traditions with modern Malaysian aesthetics, creating looks that honor heritage while embracing contemporary style. Her calm, nurturing presence makes every bride feel at ease.",
    portfolio: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "priya-1", name: "Glam Fusion", duration: "3 hours", price: 400, description: "East-meets-West wedding look blending cultural traditions with modern elegance.", popular: true },
      { id: "priya-2", name: "Pre-Wedding Shoot", duration: "2 hours", price: 300, description: "Camera-ready makeup for pre-wedding photography sessions." },
      { id: "priya-3", name: "Event Statement", duration: "1.5 hours", price: 220, description: "Bold, confident makeup for galas and celebrations.", popular: true },
      { id: "priya-4", name: "Cultural Consultation", duration: "1 hour", price: 150, description: "Guidance on choosing the perfect look for your cultural celebration." },
    ],
    reviews: [
      { author: "Anita S.", rating: 5, text: "Priya understood exactly what I wanted for my fusion wedding. She's amazing!", date: "2025-12-12", service: "Glam Fusion" },
      { author: "Deepa M.", rating: 5, text: "The best decision I made for my wedding was booking Priya. Absolutely beautiful work.", date: "2025-11-05", service: "Glam Fusion" },
      { author: "Karen W.", rating: 4, text: "Priya is so talented and makes you feel so comfortable. Love her energy!", date: "2025-10-18", service: "Event Statement" },
    ],
    available: true,
    verified: true,
    experience: 9,
    languages: ["English", "Tamil", "Malay", "Hindi"],
    responseTime: "Under 30 min",
  },
  {
    id: "farah-izyan",
    name: "Farah Izyan",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&fit=crop&crop=face",
    location: "Selangor",
    area: "Shah Alam",
    rating: 4.8,
    reviewCount: 93,
    categories: ["event", "hijab", "hari-raya"],
    price: 180,
    bio: "Farah Izyan specializes in creating elegant, modest beauty looks that celebrate Islamic values while embracing modern trends. Her hijab styling and modest makeup techniques have earned her a devoted following across Malaysia. Every look she creates tells a story of grace and sophistication.",
    portfolio: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "farah-1", name: "Hijab Glam Complete", duration: "3 hours", price: 350, description: "Full hijab wedding styling with makeup, tudung draping, and accessories.", popular: true },
      { id: "farah-2", name: "Modest Glam Session", duration: "1.5 hours", price: 180, description: "Elegant modest makeup perfect for any occasion." },
      { id: "farah-3", name: "Raya Collection", duration: "2 hours", price: 220, description: "Exclusive Hari Raya look with hijab styling and festive makeup.", popular: true },
      { id: "farah-4", name: "Tudung Styling Only", duration: "1 hour", price: 120, description: "Professional hijab draping and styling session." },
    ],
    reviews: [
      { author: "Zainab A.", rating: 5, text: "Farah's hijab styling for my wedding was absolute perfection. I felt so beautiful.", date: "2025-12-18", service: "Hijab Glam Complete" },
      { author: "Huda M.", rating: 5, text: "My Raya look was the talk of the family. Farah is incredibly talented!", date: "2025-11-30", service: "Raya Collection" },
      { author: "Nur I.", rating: 4, text: "Very professional and understanding of modesty requirements. Loved it!", date: "2025-10-25", service: "Modest Glam Session" },
    ],
    available: true,
    verified: true,
    experience: 6,
    languages: ["Malay", "English", "Arabic"],
    responseTime: "Under 1 hour",
  },
  {
    id: "elaine-ong",
    name: "Elaine Ong",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=600&fit=crop&crop=face",
    location: "Pulau Pinang",
    area: "George Town",
    rating: 4.7,
    reviewCount: 68,
    categories: ["event", "chinese-new-year", "lessons"],
    price: 240,
    bio: "Elaine brings a refined Peranakan sensibility to her artistry, drawing inspiration from the rich cultural tapestry of Penang. Her ability to blend traditional Chinese wedding elements with contemporary style has made her a favorite for weddings and festive celebrations across Northern Malaysia.",
    portfolio: [
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
    ],
    services: [
      { id: "elaine-1", name: "Peranakan Glam", duration: "3 hours", price: 420, description: "Traditional Peranakan-inspired wedding makeup with modern finishes.", popular: true },
      { id: "elaine-2", name: "CNY Luxe Package", duration: "2 hours", price: 320, description: "Premium CNY look with gold and red traditional elements." },
      { id: "elaine-3", name: "Event Elegance", duration: "1.5 hours", price: 240, description: "Sophisticated event makeup for any celebration." },
      { id: "elaine-4", name: "Makeup Masterclass", duration: "4 hours", price: 350, description: "Intimate masterclass covering wedding and festive techniques.", popular: true },
    ],
    reviews: [
      { author: "Lilian C.", rating: 5, text: "Elaine captured the Peranakan heritage in my wedding look beautifully. Stunning work!", date: "2025-12-03", service: "Peranakan Glam" },
      { author: "Jasmine L.", rating: 4, text: "The CNY makeup was gorgeous with perfect red accents. Very skilled.", date: "2025-11-10", service: "CNY Luxe Package" },
      { author: "Rebecca T.", rating: 5, text: "Her masterclass was worth every ringgit. I learned so much!", date: "2025-10-20", service: "Makeup Masterclass" },
    ],
    available: true,
    verified: false,
    experience: 4,
    languages: ["English", "Mandarin", "Hokkien"],
    responseTime: "Under 2 hours",
  },
];

export const studios: Studio[] = [
  {
    id: "glam-studio-kl",
    name: "Glam Studio KL",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop",
    location: "Kuala Lumpur",
    area: "Bukit Bintang",
    rating: 4.9,
    reviewCount: 234,
    artists: 8,
    price: 200,
    categories: ["event", "photoshoot"],
    description: "Kuala Lumpur's premier beauty studio featuring a team of award-winning artists. Full-service wedding suites, professional photography setup, and a luxurious client experience.",
  },
  {
    id: "beauty-haven-pj",
    name: "Beauty Haven PJ",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop",
    location: "Selangor",
    area: "Petaling Jaya",
    rating: 4.8,
    reviewCount: 189,
    artists: 5,
    price: 150,
    categories: ["event", "hijab", "hari-raya"],
    description: "A warm and welcoming studio specializing in modest beauty and hijab-friendly services. Known for exceptional Malay wedding work and festive makeup.",
  },
  {
    id: "editial-haus",
    name: "Editorial Haus",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop",
    location: "Kuala Lumpur",
    area: "Bangsar",
    rating: 4.7,
    reviewCount: 156,
    artists: 6,
    price: 280,
    categories: ["photoshoot", "sfx", "event"],
    description: "A cutting-edge creative studio for editorial, fashion, and SFX work. Home to some of Malaysia's most innovative makeup artists.",
  },
];

export const testimonials = [
  {
    quote: "Leish! connected me with the most incredible artist for my wedding. The whole experience, from browsing to booking, was seamless and luxurious.",
    author: "Catherine M.",
    role: "Bride",
    rating: 5,
  },
  {
    quote: "As someone who works in fashion, I have high standards. Leish! consistently delivers artists who understand editorial beauty at the highest level.",
    author: "Alexandra R.",
    role: "Fashion Editor",
    rating: 5,
  },
  {
    quote: "I recommend Leish! to all my clients. The quality of artists on this platform is unmatched, and the booking process is effortless.",
    author: "Diana K.",
    role: "Event Planner",
    rating: 5,
  },
  {
    quote: "Booked a hijab-friendly artist through Leish! for my Raya celebration and she was absolutely wonderful. Will definitely use again!",
    author: "Nurul H.",
    role: "Client",
    rating: 5,
  },
];
