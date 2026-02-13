#!/usr/bin/env python3
"""
Unsplash Automation Tool
Automates searching, downloading, and optimizing Unsplash images for portfolio
"""

import os
import json
import subprocess
import sys
from pathlib import Path
from urllib.request import urlopen, Request, URLError, HTTPError
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from image_optimizer import optimize_with_pillow

# Configuration
BASE_DIR = Path("/Users/WangFu/GitHub/quangphu1912.github.io/assets/images")
UNSPLASH_ACCESS_KEY = ""  # Free tier: 50 requests/hour
UNSPLASH_API_BASE = "https://api.unsplash.com/search/photos"

# Color Temperature Map
COLOR_THEMES = {
    "aws": {
        "keywords": [
            "data infrastructure",
            "server room",
            "cloud computing",
            "network blue",
        ],
        "color": "#007AFF",  # Cool blue
        "accent": "#409CFF",
    },
    "sentiment": {
        "keywords": [
            "neural network",
            "AI abstract",
            "machine learning brain",
            "purple network",
        ],
        "color": "#AF52DE",  # Purple
        "accent": "#FF3B30",
    },
    "churn": {
        "keywords": [
            "analytics dashboard",
            "business team",
            "customer journey",
            "orange data",
        ],
        "color": "#FF9500",  # Warm orange
        "accent": "#FF6B35",
    },
    "hero": {
        "keywords": [
            "modern minimalist workspace",
            "futuristic technology office",
            "clean desk setup",
        ],
        "color": "#007AFF",  # Professional blue-gray
        "accent": "#6E7180",
    },
    "about": {
        "keywords": [
            "professional data scientist",
            "tech workspace modern",
            "data science clean",
        ],
        "color": "#007AFF",
        "accent": "#409CFF",
    },
    "projects-index": {
        "keywords": [
            "futuristic data visualization",
            "tech innovation abstract",
            "digital network",
        ],
        "color": "#007AFF",
        "accent": "#409CFF",
    },
    "case-studies-index": {
        "keywords": [
            "business analytics",
            "strategy consulting",
            "data insights",
        ],
        "color": "#007AFF",
        "accent": "#6E7180",
    },
    "context-flow": {
        "keywords": [
            "data flow abstract",
            "network visualization",
            "data pipeline",
        ],
        "color": "#007AFF",
        "accent": "#409CFF",
    },
    "context-collaboration": {
        "keywords": [
            "team collaboration",
            "whiteboard brainstorming",
            "meeting professional",
        ],
        "color": "#007AFF",
        "accent": "#6E7180",
    },
}


def search_unsplash_images(keywords, per_page=10, orientation="landscape"):
    """Search Unsplash for images matching keywords"""
    images = []

    for keyword in keywords:
        try:
            # Build search URL with URL encoding
            search_url = f"{UNSPLASH_API_BASE}?query={quote(keyword)}&per_page={per_page}&orientation={orientation}"

            # Add authorization header
            req = Request(search_url)
            req.add_header("Authorization", f"Client-ID {UNSPLASH_ACCESS_KEY}")

            with urlopen(req, timeout=10) as response:
                data = json.loads(response.read().decode("utf-8"))
                images.extend(data.get("results", []))

        except (URLError, HTTPError, json.JSONDecodeError) as e:
            print(f"⚠️  Error searching for '{keyword}': {e}", file=sys.stderr)
            continue

    # Remove duplicates based on ID
    seen = set()
    unique_images = []
    for img in images:
        img_id = img.get("id")
        if img_id and img_id not in seen:
            seen.add(img_id)
            unique_images.append(img)

    return unique_images[:per_page]


def get_image_info(image_data):
    """Extract image information from Unsplash API response"""
    return {
        "id": image_data.get("id"),
        "url": image_data.get("urls", {}).get("regular"),  # 1920×1280
        "full_url": image_data.get("links", {}).get("html", ""),
        "description": image_data.get("description") or image_data.get("alt_description") or "",
        "photographer": {
            "name": f"{image_data.get('user', {}).get('name', 'Unknown')}",
            "username": image_data.get("user", {}).get("username", "unknown"),
        },
    }


def download_image(url, destination):
    """Download image from URL"""
    try:
        req = Request(url)
        with urlopen(req, timeout=30) as response:
            with open(destination, "wb") as f:
                f.write(response.read())
        return True
    except (URLError, HTTPError) as e:
        print(f"❌ Failed to download {url}: {e}", file=sys.stderr)
        return False


def optimize_with_squoosh(input_path, output_webp, sizes=None):
    """Optimize image using squoosh CLI"""
    if sizes is None:
        sizes = ["800:", "1200:", "1920:"]

    try:
        # Build squoosh command
        cmd = ["squoosh-cli", input_path, "--optimize", "--quiet"]

        # Add WebP conversion
        cmd.extend(["--format", "webp"])
        cmd.extend(["-o", output_webp])

        # Add responsive sizes
        for size in sizes:
            size_val = int(size.rstrip(":"))
            if size_val >= 800:  # Only generate sizes >= 800px
                width_str = f"{size_val}w"
                output_name = output_webp.replace(".webp", f"-{width_str}.webp")
                cmd.extend(["-d", width_str, output_name])

        # Execute
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)

        if result.returncode == 0:
            return True
        else:
            print(f"⚠️  Squoosh error: {result.stderr}", file=sys.stderr)
            return False

    except (subprocess.TimeoutExpired, FileNotFoundError) as e:
        print(f"⚠️  Squoosh not found or timeout: {e}", file=sys.stderr)
        return False


def download_and_optimize(image_info, dest_dir, image_name, theme_key):
    """Download, optimize, and save image with metadata"""
    dest_dir.mkdir(parents=True, exist_ok=True)

    # Download original
    original_jpg = dest_dir / f"{image_name}.jpg"
    image_url = image_info["url"]

    if not download_image(image_url, original_jpg):
        return {"jpg": str(original_jpg), "webp": None, "metadata": None}

    # Convert to WebP
    webp_path = dest_dir / f"{image_name}.webp"

    if not optimize_with_pillow(original_jpg, webp_path):
        # Fallback: keep JPEG
        webp_path = None

    # Save metadata
    metadata = {
        "unsplash_id": image_info["id"],
        "photographer": image_info["photographer"],
        "theme_color": COLOR_THEMES[theme_key]["color"],
        "theme_accent": COLOR_THEMES[theme_key]["accent"],
        "source_url": image_info["full_url"],
    }

    metadata_file = dest_dir / f".{image_name}.json"
    with open(metadata_file, "w") as f:
        json.dump(metadata, f, indent=2)

    print(f"✅ {image_name}:")
    print(f"   Theme: {theme_key}")
    print(f"   Photographer: {image_info['photographer']['name']}")
    print(f"   Size: {original_jpg.stat().st_size} bytes")
    if webp_path:
        print(
            f"   WebP: {webp_path.stat().st_size} bytes ({int((1 - webp_path.stat().st_size / original_jpg.stat().st_size) * 100)}% smaller)"
        )
    else:
        print(f"   WebP: Failed (using JPEG)")

    return {
        "jpg": str(original_jpg),
        "webp": str(webp_path) if webp_path else None,
        "metadata": str(metadata_file),
    }


def source_hero_images():
    """Source all hero images"""
    print("\n🎨 Sourcing Hero Images...")

    hero_themes = ["hero", "about", "projects-index", "case-studies-index"]

    for theme in hero_themes:
        print(f"\n🏠  {theme.upper()}")

        keywords = COLOR_THEMES[theme]["keywords"]
        images = search_unsplash_images(keywords, per_page=5)

        if not images:
            print(f"   ⚠️  No images found for {theme}", file=sys.stderr)
            continue

        # Use first image
        image_info = get_image_info(images[0])
        image_name = theme.replace("-", "_")

        result = download_and_optimize(image_info, BASE_DIR / "hero", image_name, theme)

        if result["webp"]:
            print(f"   ✅ Saved: {result['webp']}")


def source_project_thumbnails():
    """Source project thumbnails for all 6 projects"""
    print("\n🖼️  Sourcing Project Thumbnails...")

    projects = {
        "aws-ml-pipeline": "aws",
        "sentiment-analysis": "sentiment",
        "churn-prediction": "churn",
    }

    for project_slug, theme_key in projects.items():
        print(f"\n📊 {project_slug.upper()}")

        keywords = COLOR_THEMES[theme_key]["keywords"]
        images = search_unsplash_images(keywords, per_page=5)

        if not images:
            print(f"   ⚠️  No images found", file=sys.stderr)
            continue

        # Use first image
        image_info = get_image_info(images[0])

        result = download_and_optimize(image_info, BASE_DIR / "projects", project_slug, theme_key)

        if result["webp"]:
            print(f"   ✅ Saved: {result['webp']}")


def source_case_study_features():
    """Source case study feature images"""
    print("\n📄  Sourcing Case Study Features...")

    case_studies = {
        "aws-ml-pipeline-feature": "aws",
        "sentiment-analysis-feature": "sentiment",
        "churn-prediction-feature": "churn",
    }

    for study_slug, theme_key in case_studies.items():
        print(f"\n📈 {study_slug.upper()}")

        keywords = COLOR_THEMES[theme_key]["keywords"]
        images = search_unsplash_images(keywords, per_page=5)

        if not images:
            print(f"   ⚠️  No images found", file=sys.stderr)
            continue

        # Use first image
        image_info = get_image_info(images[0])

        result = download_and_optimize(image_info, BASE_DIR / "case-studies", study_slug, theme_key)

        if result["webp"]:
            print(f"   ✅ Saved: {result['webp']}")


def source_context_images():
    """Source context illustration images"""
    print("\n🎨 Sourcing Context Illustrations...")

    context = {"data-flow": "context-flow", "collaboration": "context-collaboration"}

    for img_slug, theme_key in context.items():
        print(f"\n📊 {img_slug.upper()}")

        keywords = COLOR_THEMES[theme_key]["keywords"]
        images = search_unsplash_images(keywords, per_page=5)

        if not images:
            print(f"   ⚠️  No images found", file=sys.stderr)
            continue

        # Use first image
        image_info = get_image_info(images[0])

        result = download_and_optimize(image_info, BASE_DIR / "context", img_slug, theme_key)

        if result["webp"]:
            print(f"   ✅ Saved: {result['webp']}")


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Automate Unsplash image sourcing for portfolio")
    parser.add_argument("--heroes", action="store_true", help="Download hero images")
    parser.add_argument("--thumbnails", action="store_true", help="Download project thumbnails")
    parser.add_argument("--features", action="store_true", help="Download case study features")
    parser.add_argument("--context", action="store_true", help="Download context illustrations")
    parser.add_argument("--all", action="store_true", help="Download all images")

    args = parser.parse_args()

    # Default to --all if no flags
    if not any([args.heroes, args.thumbnails, args.features, args.context]):
        args.all = True

    print("🎨 Unsplash Automation Tool")
    print(f"📁 Output: {BASE_DIR}")
    print(f"🔑 API Key: {UNSPLASH_ACCESS_KEY[:10]}...")
    print("=" * 50)

    try:
        if args.all or args.heroes:
            source_hero_images()

        if args.all or args.thumbnails:
            source_project_thumbnails()

        if args.all or args.features:
            source_case_study_features()

        if args.all or args.context:
            source_context_images()

        print("\n" + "=" * 50)
        print("✅ All downloads complete!")
        print(f"📁 Images saved to: {BASE_DIR}")
        print("\n📝 Next steps:")
        print("   1. Review images (quality check)")
        print("   2. Update Jekyll frontmatter (use .json metadata files)")
        print("   3. Test: bundle exec jekyll build && bundle exec jekyll serve")
        print("   4. Commit and push to GitHub")

    except KeyboardInterrupt:
        print("\n\n⚠️  Download interrupted by user", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
