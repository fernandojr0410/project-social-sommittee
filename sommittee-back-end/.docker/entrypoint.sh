#!/bin/sh

echo "Starting entrypoint script..."

npm install
echo "npm install completed."

npm run build
echo "npm run build completed."

npm run start:dev
echo "npm run start:dev completed."

echo "Entrypoint script completed."
