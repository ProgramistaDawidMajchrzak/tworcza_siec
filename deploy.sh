#!/bin/bash

APP_DIR="/var/www/app"
FRONT_DIR="$APP_DIR/frontend"
BACK_DIR="$APP_DIR/backend"

echo "==> Pulling latest code..."
cd $APP_DIR
git pull origin production

echo "==> Building frontend..."
cd $FRONT_DIR
npm install
npm run build

echo "==> Installing backend deps and restarting backend..."
cd $BACK_DIR
npm install
npx prisma migrate deploy
pm2 restart ecosystem.config.js || pm2 start ecosystem.config.js
