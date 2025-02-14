#!/bin/bash

MODALS_DIR="./modals"
OUTPUT_FILE="./modals.json"

# Check if the modals directory exists
if [ ! -d "$MODALS_DIR" ]; then
  echo "Modals directory does not exist."
  exit 1
fi

# Find all HTML files in the modals directory
FILES=$(find "$MODALS_DIR" -type f -name "*.html" -exec basename {} \;)

# Create a JSON array from the filenames
JSON_ARRAY="["
for FILE in $FILES; do
  JSON_ARRAY+="\"$FILE\","
done
JSON_ARRAY="${JSON_ARRAY%,}]"

# Write the JSON array to the output file
echo "$JSON_ARRAY" > "$OUTPUT_FILE"

echo "modals.json has been created successfully."
