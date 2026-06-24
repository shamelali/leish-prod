#!/usr/bin/env python3
"""
Generate a bash sync script that writes all project files
to the user's local machine using heredocs.
"""
import os

TARGET = "$HOME/Project/leish-clone/leish-clone"
SRC_ROOT = "/home/user/leish-clone"

# All files to sync (relative to SRC_ROOT)
FILES = [
    "src/app/globals.css",
    "src/app/layout.tsx",
    "src/app/loading.tsx",
    "src/app/page.tsx",
    "src/app/not-found.tsx",
    "src/app/artists/page.tsx",
    "src/app/artists/ArtistsPageClient.tsx",
    "src/app/artists/[id]/page.tsx",
    "src/app/favorites/page.tsx",
    "src/app/forgot-password/page.tsx",
    "src/app/login/page.tsx",
    "src/app/profile/page.tsx",
    "src/app/register/page.tsx",
    "src/app/register/artist/page.tsx",
    "src/app/register/artist/success/page.tsx",
    "src/app/register/studio/page.tsx",
    "src/app/register/studio/success/page.tsx",
    "src/app/studios/page.tsx",
    "src/app/studios/[id]/page.tsx",
    "src/components/ArtistCard.tsx",
    "src/components/BackToTop.tsx",
    "src/components/CategoriesSection.tsx",
    "src/components/CTASection.tsx",
    "src/components/FeaturedArtists.tsx",
    "src/components/Footer.tsx",
    "src/components/HeroSection.tsx",
    "src/components/HowItWorks.tsx",
    "src/components/ImageWithFallback.tsx",
    "src/components/Navbar.tsx",
    "src/components/SearchModal.tsx",
    "src/components/Skeleton.tsx",
    "src/components/Testimonials.tsx",
    "src/context/AuthContext.tsx",
    "src/context/FavoritesContext.tsx",
    "src/context/ThemeContext.tsx",
    "src/context/ToastContext.tsx",
    "src/data/artists.ts",
]

# Config files
CONFIG_FILES = [
    "next.config.mjs",
    "package.json",
    "postcss.config.mjs",
    "tsconfig.json",
    ".npmrc",
]

# Public assets  
PUBLIC_FILES = [
    "public/favicon.svg",
]

# Directories to create

# Directories to create
DIRS = [
    "src/app/artists/[id]",
    "src/app/favorites",
    "src/app/forgot-password",
    "src/app/login",
    "src/app/profile",
    "src/app/register/artist/success",
    "src/app/register/studio/success",
    "src/app/studios/[id]",
    "src/components",
    "src/context",
    "src/data",
    "public",
]

lines = []
lines.append("#!/bin/bash")
lines.append("# ============================================================")
lines.append("# Leish! Clone - Full Dark Mode Sync Script")
lines.append("# Run on your local machine to sync ALL project files.")
lines.append("# Usage: chmod +x setup-sync-dark.sh && ./setup-sync-dark.sh")
lines.append("# ============================================================")
lines.append("")
lines.append("set -e")
lines.append(f'TARGET="$HOME/Project/leish-clone/leish-clone"')
lines.append('')
lines.append('echo "🎨 Syncing ALL Leish! Clone files with dark mode..."')
lines.append('')

# Create directories
lines.append("# Create directory structure")
for d in DIRS:
    lines.append(f'mkdir -p "$TARGET/{d}"')
lines.append('echo "📁 Directory structure created"')
lines.append('')

# Use a unique heredoc delimiter that won't appear in any file
DELIM = "LEISHEOF"

# Write each source file
lines.append("# === Source Files ===")
for f in FILES:
    full_path = os.path.join(SRC_ROOT, f)
    if not os.path.exists(full_path):
        print(f"WARNING: {full_path} does not exist, skipping")
        continue
    with open(full_path, "r") as fh:
        content = fh.read()
    # Escape any $ signs that aren't part of shell variables we want to keep
    # We'll use a quoted heredoc delimiter 'LEISHEOF' so no expansion happens
    target_path = f'"$TARGET/{f}"'
    lines.append(f'cat <<\'{DELIM}\' > {target_path}')
    lines.append(content)
    lines.append(DELIM)
    lines.append(f'echo "  ✓ {f}"')
    lines.append('')

# Write config files
lines.append("# === Config Files ===")
for f in CONFIG_FILES:
    full_path = os.path.join(SRC_ROOT, f)
    if not os.path.exists(full_path):
        print(f"WARNING: {full_path} does not exist, skipping")
        continue
    with open(full_path, "r") as fh:
        content = fh.read()
    target_path = f'"$TARGET/{f}"'
    lines.append(f'cat <<\'{DELIM}\' > {target_path}')
    lines.append(content)
    lines.append(DELIM)
    lines.append(f'echo "  ✓ {f}"')
    lines.append('')

# Write public files
lines.append("# === Public Assets ===")
for f in PUBLIC_FILES:
    full_path = os.path.join(SRC_ROOT, f)
    if not os.path.exists(full_path):
        print(f"WARNING: {full_path} does not exist, skipping")
        continue
    with open(full_path, "r", encoding="utf-8") as fh:
        content = fh.read()
    target_path = f'"$TARGET/{f}"'
    lines.append(f'cat <<\'{DELIM}\' > {target_path}')
    lines.append(content)
    lines.append(DELIM)
    lines.append(f'echo "  ✓ {f}"')
    lines.append('')

lines.append('')
lines.append('echo ""')
lines.append('echo "✅ All files synced! Run these commands to start:"')
lines.append('echo "  cd $TARGET"')
lines.append('echo "  npm install"')
lines.append('echo "  npm run dev"')
lines.append('echo ""')
lines.append('echo "🌙 Dark mode: Click the Sun/Moon icon in the navbar to toggle!"')

output = "\n".join(lines)
output_path = os.path.join(SRC_ROOT, "setup-sync-dark.sh")
with open(output_path, "w") as f:
    f.write(output)

print(f"Generated {output_path} ({len(output)} bytes, {len(FILES) + len(CONFIG_FILES)} files)")
