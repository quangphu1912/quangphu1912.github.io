#!/usr/bin/env python3
"""
Metadata Handler Module
Saves and loads JSON metadata for images
"""

import json
import sys
from pathlib import Path


def save_metadata(image_info, dest_dir, filename):
    """
    Save metadata to JSON file

    Args:
        image_info: Dict with unsplash_id, photographer, theme_color, theme_accent
        dest_dir: Directory to save metadata
        filename: Base filename (without extension)
    """
    dest_dir = Path(dest_dir)
    dest_dir.mkdir(parents=True, exist_ok=True)

    metadata = {
        "unsplash_id": image_info.get("id"),
        "photographer": image_info.get("photographer"),
        "theme_color": image_info.get("theme_color"),
        "theme_accent": image_info.get("theme_accent"),
        "source_url": image_info.get("source_url"),
    }

    metadata_file = dest_dir / f".{filename}.json"
    with open(metadata_file, "w") as f:
        json.dump(metadata, f, indent=2)
