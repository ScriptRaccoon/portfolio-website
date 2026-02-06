#!/usr/bin/env bash

set -euo pipefail

input_dir="$1"

for file in "$input_dir"/*.png; do
	[ -e "$file" ] || continue
	output_file="${file%.png}.webp"
	cwebp "$file" -o "$output_file"
done