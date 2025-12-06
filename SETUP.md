# Quick Setup Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Dashboard**
   - Main Dashboard: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/#NPT@1009/dasboard

## Custom Domain Setup

When deploying to your custom domain (`nayana.top`):

1. **Deploy to Vercel (Recommended)**
   - Connect your GitHub repository
   - Add custom domain: `nayana.top`
   - Deploy

2. **Access URLs**
   - Main Dashboard: `https://nayana.top`
   - Admin Dashboard: `https://nayana.top/#NPT@1009/dasboard`

## Updating Platform URLs

Edit the default platforms in `lib/platforms.ts` to update the URLs for:
- QR Bar Code Generator
- Text to Voice Generator

Or use the admin dashboard to manage them after deployment.

## Adding Images

1. Place images in `public/images/` directory
2. Reference them as `/images/your-image.jpg` in the admin dashboard
3. Or use external URLs (e.g., `https://example.com/image.jpg`)

## Features

✅ Hash-based admin authentication  
✅ Add/Edit/Delete platforms  
✅ Featured platform toggle  
✅ Image upload support  
✅ Responsive design  
✅ Dark mode support  
✅ Smooth animations  
✅ 3D background effects  

## Next Steps

1. Update platform URLs in `lib/platforms.ts` with your actual platform links
2. Add platform images to `public/images/` or use external URLs
3. Customize colors in `tailwind.config.js` if needed
4. Deploy to your custom domain



