#!/usr/bin/env python3
"""
Image Optimizer Module
Handles image download and optimization using Pillow
"""

import sys
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
from PIL import Image
import io


def download_image(url, destination):
    """
    Download image from URL to destination

    Returns:
        True if successful, False otherwise
    """
    try:
        req = Request(url)
        with urlopen(req, timeout=30) as response:
            with open(destination, "wb") as f:
                f.write(response.read())
        return True
    except (URLError, HTTPError) as e:
        print(f"❌ Failed to download {url}: {e}")
        return False


def optimize_with_pillow(jpg_path, webp_path, sizes=None):
    """
    Optimize image using Pillow (WebP conversion + responsive sizes)

    Args:
        jpg_path: Path to input JPEG
        webp_path: Path to output WebP file
        sizes: List of widths (e.g., [800, 1200, 1920])

    Returns:
        True if successful, False otherwise
    """
    if sizes is None:
        sizes = [800, 1200, 1920]

    try:
        img = Image.open(jpg_path)
        width, height = img.size

        # Save main WebP with optimization
        img.save(
            webp_path,
            "WebP",
            quality=85,
            method=6,  # Best compression (slower but better)
            optimize=True,
        )

        # Generate responsive sizes
        responsive_files = []
        for size in sizes:
            if size >= 800 and size < width:  # Only downscale, not upscale
                # Calculate height maintaining aspect ratio (16:9 for Unsplash)
                new_height = int(size * 9 / 16)
                resized = img.resize((size, new_height), Image.Resampling.LANCZOS)
                responsive_path = str(webp_path).replace(".webp", f"-{size}w.webp")
                resized.save(
                    responsive_path, "WebP", quality=85, method=6, optimize=True
                )
                responsive_files.append(responsive_path)

        return True

    except Exception as e:
        print(f"⚠️  Pillow error: {e}")
        return False
