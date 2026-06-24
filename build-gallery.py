import base64
import os
import json

screenshots_dir = "screenshots"
output_file = "preview-gallery.html"

entries = [
    ("homepage-light.png", "Homepage (Light Mode)", "Home"),
    ("homepage-dark.png", "Homepage (Dark Mode)", "Home"),
    ("homepage-mobile.png", "Homepage (Mobile)", "Home"),
    ("artists-listing.png", "Artists Listing", "Browse"),
    ("artist-detail.png", "Artist Detail & Booking", "Browse"),
    ("studios-listing.png", "Studios Listing", "Browse"),
    ("studio-detail.png", "Studio Detail", "Browse"),
    ("blog.png", "Blog Listing", "Browse"),
    ("blog-detail.png", "Blog Detail", "Browse"),
    ("login.png", "Login Page", "Auth"),
    ("register.png", "Client Registration", "Auth"),
    ("artist-register.png", "Artist Registration (4-step)", "Auth"),
    ("studio-register.png", "Studio Registration (3-step)", "Auth"),
    ("forgot-password.png", "Forgot Password", "Auth"),
    ("profile.png", "User Profile", "User"),
    ("favorites.png", "Favorites", "User"),
    ("messages.png", "Messages", "User"),
    ("artist-dashboard.png", "Artist Dashboard", "Dashboard"),
    ("studio-dashboard.png", "Studio Dashboard", "Dashboard"),
    ("admin.png", "Admin Panel", "Dashboard"),
]

cards_html = ""
for fname, label, category in entries:
    fpath = os.path.join(screenshots_dir, fname)
    if os.path.exists(fpath):
        with open(fpath, "rb") as f:
            b64 = base64.b64encode(f.read()).decode()
        src = f"data:image/png;base64,{b64}"
        cards_html += f'''
        <div class="card" onclick="openLightbox('{src}')">
          <div class="card-img-wrap">
            <img src="{src}" alt="{label}" loading="lazy" />
            <div class="card-overlay"></div>
          </div>
          <div class="card-body">
            <h3>{label}</h3>
            <span class="badge">{category}</span>
          </div>
        </div>'''

html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Leish.my Clone — Preview Gallery</title>
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{ 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    background: #0a0a0f; color: #e5e5e5; min-height: 100vh;
  }}
  .container {{ max-width: 1400px; margin: 0 auto; padding: 2rem; }}
  
  /* Header */
  .header {{ margin-bottom: 2rem; }}
  .logo-row {{ display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }}
  .logo {{ width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #ec4899, #e11d48); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; color: white; }}
  h1 {{ font-size: 2rem; font-weight: 800; background: linear-gradient(to right, #f472b6, #fda4af); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }}
  .subtitle {{ color: #9ca3af; font-size: 1.1rem; margin-top: 4px; }}
  
  /* Stats */
  .stats {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-top: 1.5rem; }}
  .stat {{ background: #111118; border: 1px solid #1f1f2e; border-radius: 12px; padding: 16px; }}
  .stat-value {{ font-size: 1.75rem; font-weight: 800; }}
  .stat-value.pink {{ background: linear-gradient(to right, #ec4899, #f43f5e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
  .stat-value.violet {{ background: linear-gradient(to right, #8b5cf6, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
  .stat-value.blue {{ background: linear-gradient(to right, #3b82f6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
  .stat-value.amber {{ background: linear-gradient(to right, #f59e0b, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
  .stat-value.green {{ background: linear-gradient(to right, #10b981, #22c55e); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
  .stat-label {{ color: #6b7280; font-size: 0.85rem; margin-top: 4px; }}
  
  /* Filter */
  .filters {{ display: flex; gap: 8px; margin: 1.5rem 0; flex-wrap: wrap; }}
  .filter-btn {{ 
    padding: 8px 16px; border-radius: 9999px; font-size: 0.875rem; font-weight: 500;
    background: #1f1f2e; color: #9ca3af; border: none; cursor: pointer;
    transition: all 0.2s;
  }}
  .filter-btn:hover {{ background: #2a2a3d; color: white; }}
  .filter-btn.active {{ background: #db2777; color: white; box-shadow: 0 4px 15px rgba(219,39,119,0.3); }}
  
  /* Grid */
  .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(600px, 1fr)); gap: 1.5rem; }}
  @media (max-width: 700px) {{ .grid {{ grid-template-columns: 1fr; }} }}
  
  /* Card */
  .card {{ 
    background: #111118; border: 1px solid #1f1f2e; border-radius: 16px; overflow: hidden;
    cursor: pointer; transition: all 0.3s;
  }}
  .card:hover {{ border-color: rgba(236,72,153,0.5); box-shadow: 0 8px 30px rgba(236,72,153,0.1); transform: translateY(-2px); }}
  .card-img-wrap {{ position: relative; aspect-ratio: 16/10; overflow: hidden; }}
  .card-img-wrap img {{ width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 0.5s; }}
  .card:hover .card-img-wrap img {{ transform: scale(1.02); }}
  .card-overlay {{ position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); opacity: 0; transition: opacity 0.3s; pointer-events: none; }}
  .card:hover .card-overlay {{ opacity: 1; }}
  .card-body {{ padding: 16px; display: flex; align-items: center; justify-content: space-between; }}
  .card-body h3 {{ font-weight: 600; font-size: 0.95rem; }}
  .badge {{ font-size: 0.75rem; color: #f472b6; background: rgba(236,72,153,0.1); padding: 2px 10px; border-radius: 9999px; }}
  .card:hover .expand-hint {{ color: #f472b6; }}
  .expand-hint {{ color: #6b7280; font-size: 0.8rem; transition: color 0.2s; }}
  
  /* Lightbox */
  .lightbox {{ 
    position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.92);
    display: none; align-items: center; justify-content: center; padding: 2rem;
  }}
  .lightbox.open {{ display: flex; }}
  .lightbox img {{ max-width: 95%; max-height: 90vh; object-fit: contain; border-radius: 12px; }}
  .lightbox-close {{ 
    position: absolute; top: 1.5rem; right: 1.5rem; width: 40px; height: 40px;
    border-radius: 50%; background: rgba(255,255,255,0.1); backdrop-filter: blur(8px);
    border: none; color: white; font-size: 1.25rem; cursor: pointer; display: flex;
    align-items: center; justify-content: center; transition: background 0.2s;
  }}
  .lightbox-close:hover {{ background: rgba(255,255,255,0.2); }}
  
  /* Footer */
  .footer {{ text-align: center; color: #4b5563; font-size: 0.85rem; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #1f1f2e; }}
  
  /* Route list */
  .routes {{ margin-top: 1.5rem; }}
  .routes h2 {{ font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; color: #e5e5e5; }}
  .route-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 6px; }}
  .route {{ background: #111118; border: 1px solid #1f1f2e; border-radius: 8px; padding: 8px 12px; font-size: 0.8rem; font-family: 'SF Mono', 'Fira Code', monospace; }}
  .route .method {{ color: #10b981; font-weight: 600; margin-right: 6px; }}
  .route .path {{ color: #9ca3af; }}
  .route .type {{ color: #6b7280; font-size: 0.7rem; float: right; }}
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
      <button class="filter-btn active" onclick="filterCards('All')">All</button>
      <button class="filter-btn" onclick="filterCards('Home')">Home</button>
      <button class="filter-btn" onclick="filterCards('Browse')">Browse</button>
      <button class="filter-btn" onclick="filterCards('Auth')">Auth</button>
      <button class="filter-btn" onclick="filterCards('User')">User</button>
      <button class="filter-btn" onclick="filterCards('Dashboard')">Dashboard</button>
    </div>
  </div>

  <div class="grid">
    {cards_html}
  </div>

  <div class="routes">
    <h2>📋 All 39 Routes</h2>
    <div class="route-grid">
      <div class="route"><span class="method">GET</span><span class="path">/</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/artists</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/artists/[id]</span><span class="type">ƒ Dynamic</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/studios</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/studios/[id]</span><span class="type">ƒ Dynamic</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/blog</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/blog/[slug]</span><span class="type">● SSG</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/login</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/register</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/register/artist</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/register/artist/success</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/register/studio</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/register/studio/success</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/forgot-password</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/reset-password</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/verify-email</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/profile</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/favorites</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/messages</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/dashboard/artist</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/dashboard/studio</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/admin</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">GET</span><span class="path">/preview</span><span class="type">○ Static</span></div>
      <div class="route"><span class="method">API</span><span class="path">/api/artists</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method">API</span><span class="path">/api/artists/[id]</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method">API</span><span class="path">/api/studios</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method">API</span><span class="path">/api/studios/[id]</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method">API</span><span class="path">/api/bookings</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method">API</span><span class="path">/api/reviews</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method">API</span><span class="path">/api/availability</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method">API</span><span class="path">/api/messages</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method">API</span><span class="path">/api/notifications</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method">API</span><span class="path">/api/promo</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method">API</span><span class="path">/api/auth/login</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method">API</span><span class="path">/api/auth/register</span><span class="type">ƒ</span></div>
      <div class="route"><span class="method">API</span><span class="path">/api/auth/forgot-password</span><span class="type">ƒ</span></div>
    </div>
  </div>

  <div class="footer">Leish.my Clone — Built with Next.js 16, Tailwind CSS v4, TypeScript — 2026</div>
</div>

<div class="lightbox" id="lightbox" onclick="closeLightbox()">
  <img id="lightbox-img" src="" alt="Preview" onclick="event.stopPropagation()" />
  <button class="lightbox-close" onclick="closeLightbox()">✕</button>
</div>

<script>
function openLightbox(src) {{
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}}
function closeLightbox() {{
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('lightbox-img').src = '';
}}
document.addEventListener('keydown', function(e) {{
  if (e.key === 'Escape') closeLightbox();
}});

function filterCards(category) {{
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.card').forEach(card => {{
    const badge = card.querySelector('.badge').textContent;
    card.style.display = (category === 'All' || badge === category) ? '' : 'none';
  }});
}}
</script>
</body>
</html>'''

with open(output_file, "w") as f:
    f.write(html)

size_mb = os.path.getsize(output_file) / (1024*1024)
print(f"Created {output_file} ({size_mb:.1f} MB)")
