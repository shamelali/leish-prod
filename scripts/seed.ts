import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!) as any;

async function seed() {
  console.log('🌱 Seeding database...');

  // Clean existing data
  await sql(`TRUNCATE TABLE
    payouts, mua_bank_accounts, payments, webhook_events,
    favorites, bookings, reviews, services,
    studio_categories, artist_categories, studios,
    artists, testimonials, categories
  RESTART IDENTITY CASCADE`);

  // Categories
  const categoryData = [
    { name: 'Bridal Makeup', slug: 'bridal-makeup', description: 'Wedding day glamour', icon: 'Sparkles', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400' },
    { name: 'Special Effects', slug: 'special-effects', description: 'Creative and fantasy looks', icon: 'Palette', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
    { name: 'Everyday Glam', slug: 'everyday-glam', description: 'Daily beauty enhancement', icon: 'Sun', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400' },
    { name: 'Editorial', slug: 'editorial', description: 'Fashion and photoshoot looks', icon: 'Camera', image: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=400' },
    { name: 'Airbrush', slug: 'airbrush', description: 'Flawless airbrush application', icon: 'Wind', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400' },
    { name: 'Hair Styling', slug: 'hair-styling', description: 'Professional hair design', icon: 'Scissors', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400' },
    { name: 'Nail Art', slug: 'nail-art', description: 'Creative nail designs', icon: 'Heart', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400' },
    { name: 'Skincare', slug: 'skincare', description: 'Facial treatments and care', icon: 'Droplets', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400' },
  ];
  const cats = await Promise.all(
    categoryData.map((c) =>
      sql`INSERT INTO categories (name, slug, description, icon, image) VALUES (${c.name}, ${c.slug}, ${c.description}, ${c.icon}, ${c.image}) RETURNING id`
    )
  );
  const categoryIds = cats.map((r) => r[0].id);
  console.log(`  ✓ ${categoryData.length} categories`);

  // Artists
  const artistData = [
    { name: 'Sophia Chen', email: 'sophia@example.com', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400', location: 'Kuala Lumpur', area: 'Bukit Bintang', rating: '4.9', reviewCount: 127, bio: 'Award-winning bridal MUA with 10+ years experience. Specializing in timeless elegance.', available: true, verified: true, experience: 10, price: '350', languages: ['English', 'Mandarin', 'Cantonese'] },
    { name: 'Aisha Rahman', email: 'aisha@example.com', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', location: 'Selangor', area: 'Petaling Jaya', rating: '4.8', reviewCount: 98, bio: 'Editorial makeup artist who brings avant-garde visions to life for magazines and runway.', available: true, verified: true, experience: 8, price: '300', languages: ['English', 'Malay'] },
    { name: 'Maya Patel', email: 'maya@example.com', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', location: 'Kuala Lumpur', area: 'Mont Kiara', rating: '4.7', reviewCount: 83, bio: 'Airbrush specialist who creates flawless, camera-ready looks for any occasion.', available: true, verified: true, experience: 6, price: '280', languages: ['English', 'Tamil', 'Malay'] },
    { name: 'Lily Tanaka', email: 'lily@example.com', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', location: 'Penang', area: 'George Town', rating: '4.9', reviewCount: 145, bio: 'SFX makeup artist for film and TV. Known for prosthetic transformations.', available: true, verified: true, experience: 12, price: '400', languages: ['English', 'Japanese'] },
    { name: 'Priya Devi', email: 'priya@example.com', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', location: 'Kuala Lumpur', area: 'Cheras', rating: '4.6', reviewCount: 72, bio: 'Bridal and henna specialist preserving cultural traditions with modern flair.', available: true, verified: true, experience: 5, price: '250', languages: ['English', 'Malay', 'Hindi'] },
    { name: 'Emma Wilson', email: 'emma@example.com', image: 'https://images.unsplash.com/photo-1504593811423-9dd665bb5984?w=400', location: 'Selangor', area: 'Subang Jaya', rating: '4.8', reviewCount: 110, bio: 'Luxury hair and makeup artist for high-end events and destination weddings.', available: true, verified: true, experience: 9, price: '380', languages: ['English'] },
    { name: 'Zara Ismail', email: 'zara@example.com', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400', location: 'Johor Bahru', area: 'Iskandar Puteri', rating: '4.5', reviewCount: 55, bio: 'Self-taught nail artist turned professional. Specializing in 3D nail art.', available: true, verified: false, experience: 4, price: '180', languages: ['English', 'Malay'] },
    { name: 'Olivia Tan', email: 'olivia@example.com', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400', location: 'Kuala Lumpur', area: 'Damansara', rating: '4.7', reviewCount: 91, bio: 'Clinical aesthetician and makeup artist specializing in skincare-first approaches.', available: true, verified: true, experience: 7, price: '320', languages: ['English', 'Mandarin'] },
  ];
  const arts = await Promise.all(
    artistData.map((a) =>
      sql`INSERT INTO artists (name, email, image, location, area, rating, review_count, bio, available, verified, experience, languages, price)
          VALUES (${a.name}, ${a.email}, ${a.image}, ${a.location}, ${a.area}, ${a.rating}, ${a.reviewCount}, ${a.bio}, ${a.available}, ${a.verified}, ${a.experience}, ${a.languages}, ${a.price})
          RETURNING id`
    )
  );
  const artistIds = arts.map((r) => r[0].id);
  console.log(`  ✓ ${artistData.length} artists`);

  // Artist-Category assignments
  const artistCatAssignments = [
    [0, 0], [0, 2], [1, 3], [1, 4], [2, 4], [2, 2],
    [3, 1], [3, 5], [4, 0], [4, 2], [5, 0], [5, 5],
    [6, 6], [7, 7], [7, 2],
  ];
  for (const [ai, ci] of artistCatAssignments) {
    await sql`INSERT INTO artist_categories (artist_id, category_id) VALUES (${artistIds[ai]}, ${categoryIds[ci]})`;
  }
  console.log(`  ✓ ${artistCatAssignments.length} artist-category links`);

  // Services (4 per artist = 32)
  const serviceTemplates = [
    { name: 'Basic Makeup', duration: '60 min', price: '150', popular: true },
    { name: 'Premium Makeup', duration: '90 min', price: '250', popular: true },
    { name: 'Bridal Package', duration: '180 min', price: '500', popular: true },
    { name: 'Trial Session', duration: '60 min', price: '100', popular: false },
  ];
  const allServiceIds: number[] = [];
  for (const aid of artistIds) {
    for (const s of serviceTemplates) {
      const r = await sql`INSERT INTO services (name, duration, price, artist_id, popular)
          VALUES (${s.name}, ${s.duration}, ${s.price}, ${aid}, ${s.popular}) RETURNING id`;
      allServiceIds.push(r[0].id);
    }
  }
  console.log(`  ✓ ${allServiceIds.length} services`);

  // Studios
  const studioData = [
    { name: 'Glamour Studio KL', email: 'info@glamourkl.com', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', location: 'Kuala Lumpur', area: 'Bukit Bintang', rating: '4.8', reviewCount: 234, description: 'Premium beauty studio in the heart of KL. Home to 15+ talented artists.' },
    { name: 'Luxe Beauty Lounge', email: 'hello@luxebeauty.my', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400', location: 'Selangor', area: 'Petaling Jaya', rating: '4.7', reviewCount: 189, description: 'High-end beauty lounge offering full-service beauty treatments in a luxury setting.' },
    { name: 'Artisan Beauty Studio', email: 'book@artisanbeauty.my', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400', location: 'Penang', area: 'George Town', rating: '4.9', reviewCount: 312, description: 'Heritage studio blending traditional techniques with modern beauty trends.' },
  ];
  const studs = await Promise.all(
    studioData.map((s) =>
      sql`INSERT INTO studios (name, email, image, location, area, rating, review_count, description)
          VALUES (${s.name}, ${s.email}, ${s.image}, ${s.location}, ${s.area}, ${s.rating}, ${s.reviewCount}, ${s.description})
          RETURNING id`
    )
  );
  const studioIds = studs.map((r) => r[0].id);
  console.log(`  ✓ ${studioData.length} studios`);

  // Studio-Category assignments
  const studioCatAssignments = [
    [0, 0], [0, 2], [0, 5], [1, 2], [1, 4], [1, 7], [2, 1], [2, 3], [2, 6],
  ];
  for (const [si, ci] of studioCatAssignments) {
    await sql`INSERT INTO studio_categories (studio_id, category_id) VALUES (${studioIds[si]}, ${categoryIds[ci]})`;
  }
  console.log(`  ✓ ${studioCatAssignments.length} studio-category links`);

  // Reviews
  const reviewAuthors = [
    'Alice M.', 'Bob K.', 'Carol T.', 'David L.', 'Eve R.',
    'Frank W.', 'Grace P.', 'Henry C.', 'Ivy N.', 'Jack S.',
  ];
  const reviewTexts = [
    'Absolutely stunning work! Exceeded my expectations.',
    'Very professional and talented. Highly recommend!',
    'Loved the final look. Made me feel beautiful.',
    'Great attention to detail. Will book again!',
    'Amazing transformation. She really knows her craft.',
    'Punctual, friendly, and incredibly skilled.',
    'The airbrush finish was flawless. Lasted all day!',
    'Beautiful bridal makeup. Made my wedding day perfect.',
    'Creative and unique style. Stands out from the rest.',
    'Very patient and listened to what I wanted.',
  ];
  const usedPairs = new Set<string>();
  let reviewCount = 0;
  for (let i = 0; i < 26; i++) {
    const author = reviewAuthors[i % reviewAuthors.length];
    const ai = i % artistIds.length;
    const key = `${author}-${ai}`;
    if (usedPairs.has(key)) continue;
    usedPairs.add(key);
    const rating = Math.floor(Math.random() * 2) + 4;
    const text = reviewTexts[i % reviewTexts.length];
    const service = serviceTemplates[i % serviceTemplates.length].name;
    await sql`INSERT INTO reviews (rating, text, author, service, artist_id)
        VALUES (${rating}, ${text}, ${author}, ${service}, ${artistIds[ai]})`;
    reviewCount++;
  }
  console.log(`  ✓ ${reviewCount} reviews`);

  // Testimonials
  const testimonialData = [
    { quote: 'Leish made my wedding day absolutely perfect. Sophia created the most beautiful bridal look I could have imagined.', author: 'Sarah L.', role: 'Bride', rating: 5 },
    { quote: 'The attention to detail was incredible. I felt like a celebrity on my special day.', author: 'Amirah K.', role: 'Client', rating: 5 },
    { quote: 'Booking through Leish was seamless. Found the perfect artist for my needs within minutes.', author: 'Jennifer T.', role: 'Regular Client', rating: 5 },
    { quote: 'Professional, talented, and absolutely lovely to work with. Highly recommend!', author: 'Diana R.', role: 'Client', rating: 5 },
  ];
  for (const t of testimonialData) {
    await sql`INSERT INTO testimonials (quote, author, role, rating) VALUES (${t.quote}, ${t.author}, ${t.role}, ${t.rating})`;
  }
  console.log(`  ✓ ${testimonialData.length} testimonials`);

  console.log('✅ Database seeded successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
