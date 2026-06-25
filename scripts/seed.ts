import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env.local') });

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!) as any;

async function seed() {
  console.log('🌱 Seeding database...');

  // Clean existing app data (keep users/auth tables intact)
  await sql.query(`TRUNCATE TABLE
    payouts, mua_bank_accounts, payments, webhook_events,
    favorites, bookings, reviews, services,
    studio_categories, artist_categories, studios,
    artists, testimonials, categories
  RESTART IDENTITY CASCADE`);

  // Categories
  const categoryData = [
    { name: 'Bridal Makeup', slug: 'bridal-makeup', description: 'Wedding day glamour', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400' },
    { name: 'Special Effects', slug: 'special-effects', description: 'Creative and fantasy looks', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
    { name: 'Everyday Glam', slug: 'everyday-glam', description: 'Daily beauty enhancement', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400' },
    { name: 'Editorial', slug: 'editorial', description: 'Fashion and photoshoot looks', image: 'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=400' },
    { name: 'Airbrush', slug: 'airbrush', description: 'Flawless airbrush application', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400' },
    { name: 'Hair Styling', slug: 'hair-styling', description: 'Professional hair design', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400' },
    { name: 'Nail Art', slug: 'nail-art', description: 'Creative nail designs', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400' },
    { name: 'Skincare', slug: 'skincare', description: 'Facial treatments and care', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400' },
  ];
  const cats = await Promise.all(
    categoryData.map((c) =>
      sql`INSERT INTO categories (id, name, slug, description, image)
          VALUES (${c.slug}, ${c.name}, ${c.slug}, ${c.description}, ${c.image}) RETURNING id`
    )
  );
  const categoryIds = Object.fromEntries(
    cats.map((r, i) => [categoryData[i].slug, r[0].id])
  );
  console.log(`  ✓ ${categoryData.length} categories`);

  // Fetch registered users to link artists/studios to
  const existingUsers = await sql`SELECT id, name, email, role FROM "user" ORDER BY role, name`;
  console.log(`  Found ${existingUsers.length} registered users`);

  // Pick 8 users for artists, 3 for studios
  const artistUserIds = existingUsers
    .filter((u: any) => u.role === 'artist' || u.role === 'admin')
    .slice(0, 8)
    .map((u: any) => u.id);

  const customerUserIds = existingUsers
    .filter((u: any) => u.role === 'customer' || u.role === 'client')
    .map((u: any) => u.id);

  // Fill remaining artist slots with customer users (update their role)
  const extraArtistsNeeded = 8 - artistUserIds.length;
  const promoCustomers = customerUserIds.slice(0, Math.max(0, extraArtistsNeeded));
  for (const uid of promoCustomers) {
    await sql`UPDATE "user" SET role = 'artist' WHERE id = ${uid}`;
  }
  const allArtistUserIds = [...artistUserIds, ...promoCustomers].slice(0, 8);

  const remainingCustomers = customerUserIds.slice(promoCustomers.length);
  const studioUserIds = remainingCustomers.slice(0, 3);
  for (const uid of studioUserIds) {
    await sql`UPDATE "user" SET role = 'studio' WHERE id = ${uid}`;
  }

  console.log(`  Assigned ${allArtistUserIds.length} users as artists, ${studioUserIds.length} as studios`);

  // Fetch the user details for display names
  const artistUsers = await sql`SELECT id, name, email, image FROM "user" WHERE id = ANY(${allArtistUserIds})`;
  const studioUsers = await sql`SELECT id, name, email, image FROM "user" WHERE id = ANY(${studioUserIds})`;
  const artistUserMap = Object.fromEntries(artistUsers.map((u: any) => [u.id, u]));
  const studioUserMap = Object.fromEntries(studioUsers.map((u: any) => [u.id, u]));

  // Artists (linked to registered users)
  const artistNames = [
    'Sophia Chen', 'Aisha Rahman', 'Maya Patel', 'Lily Tanaka',
    'Priya Devi', 'Emma Wilson', 'Zara Ismail', 'Olivia Tan',
  ];
  const artistSlugs = [
    'sophia-chen', 'aisha-rahman', 'maya-patel', 'lily-tanaka',
    'priya-devi', 'emma-wilson', 'zara-ismail', 'olivia-tan',
  ];
  const artistDetails = [
    { location: 'Kuala Lumpur', area: 'Bukit Bintang', rating: '4.9', reviewCount: 127, bio: 'Award-winning bridal MUA with 10+ years experience. Specializing in timeless elegance.', available: true, verified: true, yearsExperience: 10, price: '350', languages: ['English', 'Mandarin', 'Cantonese'], slug: 'sophia-chen' },
    { location: 'Selangor', area: 'Petaling Jaya', rating: '4.8', reviewCount: 98, bio: 'Editorial makeup artist who brings avant-garde visions to life for magazines and runway.', available: true, verified: true, yearsExperience: 8, price: '300', languages: ['English', 'Malay'], slug: 'aisha-rahman' },
    { location: 'Kuala Lumpur', area: 'Mont Kiara', rating: '4.7', reviewCount: 83, bio: 'Airbrush specialist who creates flawless, camera-ready looks for any occasion.', available: true, verified: true, yearsExperience: 6, price: '280', languages: ['English', 'Tamil', 'Malay'], slug: 'maya-patel' },
    { location: 'Penang', area: 'George Town', rating: '4.9', reviewCount: 145, bio: 'SFX makeup artist for film and TV. Known for prosthetic transformations.', available: true, verified: true, yearsExperience: 12, price: '400', languages: ['English', 'Japanese'], slug: 'lily-tanaka' },
    { location: 'Kuala Lumpur', area: 'Cheras', rating: '4.6', reviewCount: 72, bio: 'Bridal and henna specialist preserving cultural traditions with modern flair.', available: true, verified: true, yearsExperience: 5, price: '250', languages: ['English', 'Malay', 'Hindi'], slug: 'priya-devi' },
    { location: 'Selangor', area: 'Subang Jaya', rating: '4.8', reviewCount: 110, bio: 'Luxury hair and makeup artist for high-end events and destination weddings.', available: true, verified: true, yearsExperience: 9, price: '380', languages: ['English'], slug: 'emma-wilson' },
    { location: 'Johor Bahru', area: 'Iskandar Puteri', rating: '4.5', reviewCount: 55, bio: 'Self-taught nail artist turned professional. Specializing in 3D nail art.', available: true, verified: false, yearsExperience: 4, price: '180', languages: ['English', 'Malay'], slug: 'zara-ismail' },
    { location: 'Kuala Lumpur', area: 'Damansara', rating: '4.7', reviewCount: 91, bio: 'Clinical aesthetician and makeup artist specializing in skincare-first approaches.', available: true, verified: true, yearsExperience: 7, price: '320', languages: ['English', 'Mandarin'], slug: 'olivia-tan' },
  ];

  const artistIds: string[] = [];
  for (let i = 0; i < allArtistUserIds.length; i++) {
    const uid = allArtistUserIds[i];
    const user = artistUserMap[uid];
    const d = artistDetails[i];
    const slug = artistSlugs[i];
    const r = await sql`
      INSERT INTO artists (id, name, slug, image, bio, rating, "reviewCount", price, location, area, available, verified, languages, "yearsExperience", "userId")
      VALUES (${slug}, ${artistNames[i]}, ${slug}, ${user?.image || ''}, ${d.bio}, ${d.rating}, ${d.reviewCount}, ${d.price}, ${d.location}, ${d.area}, ${d.available}, ${d.verified}, ${d.languages}, ${d.yearsExperience}, ${uid})
      RETURNING id
    `;
    artistIds.push(r[0].id);
  }
  console.log(`  ✓ ${artistIds.length} artists (linked to registered users)`);

  // Artist-Category assignments
  const artistCatAssignments: [number, string][] = [
    [0, 'bridal-makeup'], [0, 'everyday-glam'],
    [1, 'editorial'], [1, 'airbrush'],
    [2, 'airbrush'], [2, 'everyday-glam'],
    [3, 'special-effects'], [3, 'hair-styling'],
    [4, 'bridal-makeup'], [4, 'everyday-glam'],
    [5, 'bridal-makeup'], [5, 'hair-styling'],
    [6, 'nail-art'],
    [7, 'skincare'], [7, 'everyday-glam'],
  ];
  for (const [ai, catSlug] of artistCatAssignments) {
    await sql`INSERT INTO artist_categories ("artistId", "categoryId") VALUES (${artistIds[ai]}, ${categoryIds[catSlug]})`;
  }
  console.log(`  ✓ ${artistCatAssignments.length} artist-category links`);

  // Services (4 per artist)
  const serviceTemplates = [
    { name: 'Basic Makeup', duration: '60 min', price: '150', popular: true },
    { name: 'Premium Makeup', duration: '90 min', price: '250', popular: true },
    { name: 'Bridal Package', duration: '180 min', price: '500', popular: true },
    { name: 'Trial Session', duration: '60 min', price: '100', popular: false },
  ];
  let svcCount = 0;
  for (const aid of artistIds) {
    for (const s of serviceTemplates) {
      const id = `${aid}-${s.name.toLowerCase().replace(/\s+/g, '-')}`;
      await sql`
        INSERT INTO services (id, "artistId", name, description, price, duration, popular)
        VALUES (${id}, ${aid}, ${s.name}, ${s.name}, ${s.price}, ${s.duration}, ${s.popular})
      `;
      svcCount++;
    }
  }
  console.log(`  ✓ ${svcCount} services`);

  // Studios (linked to registered users)
  const studioNames = ['Glam Studio KL', 'Beauty Haven PJ', 'Editorial Haus'];
  const studioSlugs = ['glam-studio-kl', 'beauty-haven-pj', 'editial-haus'];
  const studioDetails = [
    { location: 'Kuala Lumpur', area: 'Bukit Bintang', rating: '4.8', reviewCount: 234, bio: 'Premium beauty studio in the heart of KL. Home to 15+ talented artists.', price: '500', slug: 'glam-studio-kl' },
    { location: 'Selangor', area: 'Petaling Jaya', rating: '4.7', reviewCount: 189, bio: 'High-end beauty lounge offering full-service beauty treatments in a luxury setting.', price: '450', slug: 'beauty-haven-pj' },
    { location: 'Penang', area: 'George Town', rating: '4.9', reviewCount: 312, bio: 'Heritage studio blending traditional techniques with modern beauty trends.', price: '400', slug: 'editial-haus' },
  ];

  const studioIds: string[] = [];
  for (let i = 0; i < studioUserIds.length; i++) {
    const uid = studioUserIds[i];
    const user = studioUserMap[uid];
    const d = studioDetails[i];
    const slug = studioSlugs[i];
    const r = await sql`
      INSERT INTO studios (id, name, slug, image, bio, rating, "reviewCount", price, location, area, "userId")
      VALUES (${slug}, ${studioNames[i]}, ${slug}, ${user?.image || ''}, ${d.bio}, ${d.rating}, ${d.reviewCount}, ${d.price}, ${d.location}, ${d.area}, ${uid})
      RETURNING id
    `;
    studioIds.push(r[0].id);
  }
  console.log(`  ✓ ${studioIds.length} studios (linked to registered users)`);

  // Studio-Category assignments
  const studioCatAssignments: [number, string][] = [
    [0, 'bridal-makeup'], [0, 'everyday-glam'], [0, 'hair-styling'],
    [1, 'everyday-glam'], [1, 'airbrush'], [1, 'skincare'],
    [2, 'special-effects'], [2, 'editorial'], [2, 'nail-art'],
  ];
  for (const [si, catSlug] of studioCatAssignments) {
    await sql`INSERT INTO studio_categories ("studioId", "categoryId") VALUES (${studioIds[si]}, ${categoryIds[catSlug]})`;
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
    const id = `review-${Date.now()}-${i}`;
    await sql`
      INSERT INTO reviews (id, "artistId", rating, comment, author, service)
      VALUES (${id}, ${artistIds[ai]}, ${rating}, ${text}, ${author}, ${service})
    `;
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
  for (let i = 0; i < testimonialData.length; i++) {
    const t = testimonialData[i];
    await sql`
      INSERT INTO testimonials (id, quote, name, role, rating)
      VALUES (${`testimonial-${i + 1}`}, ${t.quote}, ${t.author}, ${t.role}, ${t.rating})
    `;
  }
  console.log(`  ✓ ${testimonialData.length} testimonials`);

  console.log('✅ Database seeded successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
