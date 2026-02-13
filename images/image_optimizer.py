#!/usr/bin/env python3
"""
Image Optimizer Module
Handles image download and optimization using squoosh CLI
"""

import subprocess
import sys
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError


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


def optimize_with_squoosh(input_path, output_webp, sizes=None):
    """
    Optimize image using squoosh CLI (WebP conversion + responsive sizes)

    Args:
        input_path: Path to input image
        output_webp: Path to output WebP file (without extension)
        sizes: List of sizes (e.g., ['800:', '1200:', '1920:'])

    Returns:
        True if successful, False otherwise
    """
    if sizes is None:
        sizes = ["800:", "1200:", "1920:"]

    try:
        # Build squoosh command
        cmd = ["squoosh-cli", str(input_path), "--optimize", "--quiet"]

        # Add WebP conversion
        cmd.extend(["--format", "webp"])

        # Add responsive sizes
        for size in sizes:
            size_val = int(size.rstrip(":"))
            if size_val >= 800:  # Only generate sizes >= 800px
                width_str = f"{size_val}w"
                output_name = f"{output_webp}-{width_str}.webp"
                cmd.extend(["-d", width_str, output_name])

        # Execute
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)

        if result.returncode == 0:
            return {
                "webp": str(output_webp) + ".webp"
                if cmd.count("--format") > 0
                else str(input_path),
                "sizes": [f for f in cmd if f.endswith(".webp") or "-d" in f],
            }
        else:
            print(f"⚠️  Squoosh error: {result.stderr}")
            return False

    except subprocess.TimeoutExpired:
        print(f"⚠️  Squoosh timeout optimizing {input_path.name}")
        return False
    except FileNotFoundError:
        print(f"⚠️  Squoosh not found (install: npm install -g squoosh-cli)")
        return False
