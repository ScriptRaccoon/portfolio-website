#!/usr/bin/env python3

from pathlib import Path
from datetime import date
import sys


def main():
    slug = input("input the slug: ").strip()
    title = input("input the title: ").strip()
    description = input("input the description: ").strip()

    if not slug or not title or not description:
        print("error: all fields are required")
        sys.exit(1)

    today = date.today().isoformat()  # YYYY-MM-DD
    directory = Path("src/data/posts")
    file_path = directory / f"{slug}.md"

    directory.mkdir(parents=True, exist_ok=True)

    if file_path.exists():
        print(f"error: {file_path} already exists")
        sys.exit(1)

    content = f"""---
title: {title}
published: {today}
updated:
description: {description}
---

## Introduction

"""

    file_path.write_text(content, encoding="utf-8")
    print(f"created {file_path}")


if __name__ == "__main__":
    main()