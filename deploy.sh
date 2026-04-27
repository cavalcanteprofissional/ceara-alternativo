#!/bin/bash
# Deploy script for Ceará Alternativo
# Usage: ./deploy.sh

set -e

echo "🔄 Starting deployment..."

# 1. Apply database migrations
echo "📊 Applying database migrations..."
npx prisma migrate deploy

# 2. Generate Prisma client
echo "⚙️ Generating Prisma client..."
npx prisma generate

# 3. Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Deployment completed successfully!"