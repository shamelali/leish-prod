import base64
import os

screenshots_dir = "screenshots/thumb"
output_file = "preview-gallery.html"

entries = [
    ("homepage-light.jpg", "Homepage (Light Mode)", "Home"),
    ("homepage-dark.jpg", "Homepage (Dark Mode)", "Home"),
    ("homepage-mobile.jpg", "Homepage (Mobile)", "Home"),
    ("artists-listing.jpg", "Artists Listing", "Browse"),
    ("artist-detail.jpg", "Artist Detail & Booking", "Browse"),
    ("studios-listing.jpg", "Studios Listing", "Browse"),
    ("studio-detail.jpg", "Studio Detail", "Browse"),
    ("blog.jpg", "Blog Listing", "Browse"),
    ("blog-detail.jpg", "Blog Detail", "Browse"),
    ("login.jpg", "Login Page", "Auth"),
    ("register.jpg", "Client Registration", "Auth"),
    ("artist-register.jpg", "Artist Registration (4-step)", "Auth"),
    ("studio-register.jpg", "Studio Registration (3-step)", "Auth"),
    ("forgot-password.jpg", "Forgot Password", "Auth"),
    ("profile.jpg", "User Profile", "User"),
    ("favorites.jpg", "Favorites", "User"),
    ("messages.jpg", "Messages", "User"),
    ("artist-dashboard.jpg", "Artist Dashboard", "Dashboard"),
    ("studio-dashboard.jpg", "Studio Dashboard", "Dashboard"),
    ("admin.jpg", "Admin Panel", "Dashboard"),
]

# Also load full-res for lightbox
full_dir = "screenshots"

cards_html = ""
lightbox_data = {}
for fname, label, category in entries:
    thumb_path = os.path.join(screenshots_dir, fname)
    full_path = os.path.join(full_dir, fname.replace('.jpg', '.png'))
    
    if os.path.exists(thumb_path):
        with open(thumb_path, "rb") as f:
            tb64 = base64.b64encode(f.read()).decode()
        thumb_src = f"data:image/jpeg;base64,{tb64}"
        
        # For lightbox, use thumbnail (full-res too big for inline HTML)
        card_id = fname.replace('.jpg', '').replace('-', '_')
        
        cards_html += f'''
        <div class="card" data-category="{category}" onclick="openLightbox('{card_id}')">
          <div class="card-img-wrap">
            <img src="{thumb_src}" alt="{label}" loading="lazy" />
            <div class="card-overlay"></div>
          </div>
          <div class="card-body">
            <div>
              <h3>{label}</h3>
              <span class="badge">{category}</span>
            </div>
            <span class="expand-hint">Click to expand →</span>
          </div>
        </div>'''
        lightbox_data[card_id] = thumb_src

# Build lightbox data script
lb_script = "const lightboxData = {\n"
for k, v in lightbox_data.items():
    lb_script += f'  "{k}": "{v[:30]}...PLACEHOLDER",\n'
lb_script += "};\n"

# Actually, just embed the thumbnail in the lightbox too (simpler)
lightbox_imgs = ""
for card_id, src in lightbox_data.items():
    lightbox_imgs += f'<img class="lb-img" id="lb-{card_id}" src="{src}" alt="Full preview" style="display:none;max-width:95%;max-height:90vh;object-fit:contain;border-radius:12px" />\n'

html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Leish.my Clone — Preview Gallery</title>
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; background: #0a0a0f; color: #e5e5e5; min-height: 100vh; }}
  .container {{ max-width: 1400px; margin: 0 auto; padding: 2rem; }}
  .header {{ margin-bottom: 2rem; }}
  .logo-row {{ display: flex; align-items: center; gap: 12px; margin-bottom: 8px; flex-wrap: wrap; }}
  .logo {{ width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #ec4899, #e11d48); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; color: white; flex-shrink: 0; }}
  h1 {{ font-size: 1.75rem; font-weight: 800; background: linear-gradient(to right, #f472b6, #fda4af); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }}
  .subtitle {{ color: #9ca3af; font-size: 1rem; margin-top: 4px; }}
  .stats {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-top: 1.25rem; }}
  .stat {{ background: #111118; border: 1px solid #1f1f2e; border-radius: 12px; padding: 14px; }}
  .stat-value {{ font-size: 1.5rem; font-weight: 800; }}
  .stat-value.pink {{ background: linear-gradient(to right, #ec4899, #f43f5e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
  .stat-value.violet {{ background: linear-gradient(to right, #8b5cf6, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
  .stat-value.blue {{ background: linear-gradient(to right, #3b82f6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
  .stat-value.amber {{ background: linear-gradient(to right, #f59e0b, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
  .stat-value.green {{ background: linear-gradient(to right, #10b981, #22c55e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
  .stat-label {{ color: #6b7280; font-size: 0.8rem; margin-top: 2px; }}
  .filters {{ display: flex; gap: 8px; margin: 1.25rem 0; flex-wrap: wrap; }}
  .filter-btn {{ padding: 6px 14px; border-radius: 9999px; font-size: 0.8rem; font-weight: 500; background: #1f1f2e; color: #9ca3af; border: none; cursor: pointer; transition: all 0.2s; }}
  .filter-btn:hover {{ background: #2a2a3d; color: white; }}
  .filter-btn.active {{ background: #db2777; color: white; box-shadow: 0 4px 15px rgba(219,39,119,0.3); }}
  .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(580px, 1fr)); gap: 1.25rem; }}
  @media (max-width: 640px) {{ .grid {{ grid-template-columns: 1fr; }} }}
  .card {{ background: #111118; border: 1px solid #1f1f2e; border-radius: 16px; overflow: hidden; cursor: pointer; transition: all 0.3s; }}
  .card:hover {{ border-color: rgba(236,72,153,0.5); box-shadow: 0 8px 30px rgba(236,72,153,0.08); transform: translateY(-2px); }}
  .card-img-wrap {{ position: relative; aspect-ratio: 16/10; overflow: hidden; }}
  .card-img-wrap img {{ width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 0.5s; }}
  .card:hover .card-img-wrap img {{ transform: scale(1.03); }}
  .card-overlay {{ position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.6), transparent); opacity: 0; transition: opacity 0.3s; pointer-events: none; }}
  .card:hover .card-overlay {{ opacity: 1; }}
  .card-body {{ padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; }}
  .card-body h3 {{ font-weight: 600; font-size: 0.9rem; }}
  .badge {{ font-size: 0.7rem; color: #f472b6; background: rgba(236,72,153,0.1); padding: 2px 8px; border-radius: 9999px; }}
  .expand-hint {{ color: #6b7280; font-size: 0.75rem; transition: color 0.2s; white-space: nowrap; }}
  .card:hover .expand-hint {{ color: #f472b6; }}
  .lightbox {{ position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.92); display: none; align-items: center; justify-content: center; padding: 2rem; }}
  .lightbox.open {{ display: flex; }}
  .lightbox-close {{ position: absolute; top: 1.5rem; right: 1.5rem; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.1); border: none; color: white; font-size: 1.25rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }}
  .lightbox-close:hover {{ background: rgba(255,255,255,0.2); }}
  .routes {{ margin-top: 2rem; }}
  .routes h2 {{ font-size: 1.1rem; font-weight: 700; margin-bottom: 0.75rem; }}
  .route-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 5px; }}
  .route {{ background: #111118; border: 1px solid #1f1f2e; border-radius: 6px; padding: 6px 10px; font-size: 0.75rem; font-family: 'SF Mono', 'Fira Code', monospace; }}
  .route .method {{ font-weight: 600; margin-right: 4px; }}
  .route .m-get {{ color: #10b981; }}
  .route .m-api {{ color: #8b5cf6; }}
  .route .path {{ color: #9ca3af; }}
  .route .type {{ color: #6b7280; font-size: 0.65rem; float: right; }}
  .footer {{ text-align: center; color: #4b5563; font-size: 0.8rem; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #1f1f2e; }}
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <div class="logo-row">
      <div class="logo">L</div>
      <h1>Leish.my Clone — Preview Gallery</h1>
    </div>
    <p class="subtitle">Next.js 16 + Tailwind CSS v4 + TypeScript — 39 routes, 20 pages, 11 APIs, 0 build errors</p>
    <div class="stats">
      <div class="stat"><div class="stat-value pink">20+</div><div class="stat-label">Pages</div></div>
      <div class="stat"><div class="stat-value violet">11</div><div class="stat-label">API Routes</div></div>
      <div class="stat"><div class="stat-value blue">21</div><div class="stat-label">Components</div></div>
      <div class="stat"><div class="stat-value amber">✓</div><div class="stat-label">Dark Mode</div></div>
      <div class="stat"><div class="stat-value green">0</div><div class="stat-label">Build Errors</div></div>
    </div>
    <div class="filters">
      <button class="filter-btn active" onclick="filterCards('All', this)">All</button>
      <button class="filter-btn" onclick="filterCards('Home', this)">Home</button>
      <button class="filter-btn" onclick="filterCards('Browse', this)">Browse</button>
      <button class="filter-btn" onclick="filterCards('Auth', this)">Auth</button>
      <button class="filter-btn" onclick="filterCards('User', this)">User</button>
      <button class="filter-btn" onclick="filterCards('Dashboard', this)">Dashboard</button>
    </div>
  </div>
  <div class="grid">
    {cards_html}
  </div>
  <div class="routes">
    <h2>📋 All 39 Routes</h2>
    <div class="route-grid">
      <div class="route"><span class="method m-get">GET</span><span class="path">/</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/artists</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/artists/[id]</span><span class="type">ƒ Dynamic</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/studios</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/studios/[id]</span><span class="type">ƒ Dynamic</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/blog</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/blog/[slug]</span><span class="type">● SSG</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/login</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/register</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/register/artist</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/register/artist/success</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/register/studio</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/register/studio/success</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/forgot-password</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/reset-password</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/verify-email</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/profile</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/favorites</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/messages</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/dashboard/artist</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/dashboard/studio</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/admin</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-get">GET</span><span class="path">/preview</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method m-api">API</span><span class="path">/api/artists</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method m-api">API</span><span class="path">/api/artists/[id]</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method m-api">API</span><span class="path">/api/studios</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method m-api">API</span><span class="path">/api/studios/[id]</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method m-api">API</span><span class="path">/api/bookings</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method m-api">API</span><span class="path">/api/reviews</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method m-api">API</span><span class="path">/api/availability</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method m-api">API</span><span class="path">/api/messages</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method m-api">API</span><span class="path">/api/notifications</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method m-api">API</span><span class="path">/api/promo</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method m-api">API</span><span class="path">/api/auth/login</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method m-api">API</span><span class="path">/api/auth/register</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method m-api">API</span><span class="path">/api/auth/forgot-password</span><span class="type">ƒ</span></div>
    </div>
  </div>
  <div class="footer">Leish.my Clone — Next.js 16 + Tailwind CSS v4 + TypeScript — 2026</div>
</div>
<div class="lightbox" id="lightbox" onclick="closeLightbox()">
  {lightbox_imgs}
  <button class="lightbox-close" onclick="closeLightbox()">✕</button>
</div>
<script>
let currentImg = null;
function openLightbox(id) {{
  closeLightbox();
  const img = document.getElementById('lb-' + id);
  if (img) {{ img.style.display = 'block'; currentImg = img; }}
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}}
function closeLightbox() {{
  document.querySelectorAll('.lb-img').forEach(i => i.style.display = 'none');
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  currentImg = null;
}}
document.addEventListener('keydown', function(e) {{ if (e.key === 'Escape') closeLightbox(); }});
function filterCards(category, btn) {{
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.card').forEach(card => {{
    const cat = card.getAttribute('data-category');
    card.style.display = (category === 'All' || cat === category) ? '' : 'none';
  }});
}}
</script>
</body>
</html>'''

with open(output_file, "w") as f:
    f.write(html)

size_kb = os.path.getsize(output_file) / 1024
print(f"Created {output_file} ({size_kb:.0f} KB)")
