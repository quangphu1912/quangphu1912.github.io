#!/usr/bin/env python3
"""
Unsplash API Module
Handles API communication with Unsplash for image searching
"""

import json
import os
import sys
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

# Configuration
UNSPLASH_API_BASE = "https://api.unsplash.com/search/photos"
UNSPLASH_ACCESS_KEY = ""  # Using anonymous API (50 req/hour free tier)
UNSPLASH_ACCESS_KEY_DISPLAY = "anonymous"  # For display purposes


def search_images(keywords, per_page=10, orientation="landscape"):
    """
    Search Unsplash for images matching keywords

    Returns:
        List of image objects with id, urls, description, photographer info
    """
    images = []

    for keyword in keywords:
        try:
            # Build search URL with proper protocol
            search_url = f"{UNSPLASH_API_BASE}?query={keyword}&per_page={per_page}&orientation={orientation}"

            # Add authorization header for free tier
            req = Request(search_url)
            req.add_header("Authorization", f"Client-ID {UNSPLASH_ACCESS_KEY}")

            with urlopen(req, timeout=10) as response:
                data = json.loads(response.read().decode("utf-8"))
                images.extend(data.get("results", []))

        except (URLError, HTTPError, json.JSONDecodeError) as e:
            print(f"⚠️  Error searching for '{keyword}': {e}")
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
    """
    Extract image information from Unsplash API response

    Returns:
        Dict with id, url, photographer info, description
    """
    return {
        "id": image_data.get("id"),
        "url": image_data.get("urls", {}).get("regular", ""),  # 1920×1280
        "full_url": image_data.get("links", {}).get("html", ""),
        "description": image_data.get("description")
        or image_data.get("alt_description")
        or "",
        "photographer": {
            "name": f"{image_data.get('user', {}).get('name', 'Unknown')} {image_data.get('user', {}).get('first_name', '')}",
            "username": image_data.get("user", {}).get("username", "unknown"),
        },
    }
