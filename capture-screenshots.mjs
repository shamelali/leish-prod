import { chromium } from 'playwright';

const pages = [
  { url: 'http://localhost:3456/', name: 'homepage-light', dark: false },
  { url: 'http://localhost:3456/', name: 'homepage-dark', dark: true },
  { url: 'http://localhost:3456/artists', name: 'artists-listing', dark: false },
  { url: 'http://localhost:3456/studios', name: 'studios-listing', dark: false },
  { url: 'http://localhost:3456/login', name: 'login', dark: false },
  { url: 'http://localhost:3456/register', name: 'register', dark: false },
  { url: 'http://localhost:3456/register/artist', name: 'artist-register', dark: false },
  { url: 'http://localhost:3456/register/studio', name: 'studio-register', dark: false },
  { url: 'http://localhost:3456/blog', name: 'blog', dark: false },
  { url: 'http://localhost:3456/profile', name: 'profile', dark: false },
  { url: 'http://localhost:3456/favorites', name: 'favorites', dark: false },
  { url: 'http://localhost:3456/messages', name: 'messages', dark: false },
  { url: 'http://localhost:3456/dashboard/artist', name: 'artist-dashboard', dark: false },
  { url: 'http://localhost:3456/dashboard/studio', name: 'studio-dashboard', dark: false },
  { url: 'http://localhost:3456/admin', name: 'admin', dark: false },
  { url: 'http://localhost:3456/forgot-password', name: 'forgot-password', dark: false },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  for (const p of pages) {
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 15000 });
      
      // Set dark mode if needed
      if (p.dark) {
        await page.evaluate(() => {
          document.documentElement.classList.add('dark');
          localStorage.setItem('leish-theme', 'dark');
        });
        await page.reload({ waitUntil: 'networkidle', timeout: 15000 });
      }
      
      await page.screenshot({ 
        path: `screenshots/${p.name}.png`, 
        fullPage: false 
      });
      console.log(`✓ ${p.name}`);
    } catch (err) {
      console.log(`✗ ${p.name}: ${err.message}`);
    }
  }

  // Also capture a mobile view of homepage
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:3456/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.screenshot({ path: 'screenshots/homepage-mobile.png', fullPage: false });
  console.log('✓ homepage-mobile');

  // Artist detail page (dynamic)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3456/artists', { waitUntil: 'networkidle', timeout: 15000 });
  const artistLink = await page.$('a[href^="/artists/"]');
  if (artistLink) {
    const href = await artistLink.getAttribute('href');
    await page.goto(`http://localhost:3456${href}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.screenshot({ path: 'screenshots/artist-detail.png', fullPage: false });
    console.log('✓ artist-detail');
  }

  await browser.close();
  console.log('\nDone! All screenshots saved to screenshots/');
})();
