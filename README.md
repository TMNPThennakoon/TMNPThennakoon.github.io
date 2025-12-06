# PlatformHub

A modern, feature-rich dashboard for managing and accessing multiple platforms and applications. Your gateway to powerful tools and platforms.

## Features

- 🎨 **Beautiful UI** - Modern design with Tailwind CSS and Framer Motion animations
- 🚀 **Platform Management** - Easy admin interface to add, edit, and delete platforms
- 🔐 **Secure Admin Access** - Hash-based admin authentication (`#NPT@1009/dasboard`)
- 📱 **Responsive Design** - Works perfectly on all devices
- ✨ **Animations** - Smooth transitions and interactions with Framer Motion
- 🌟 **Three.js Background** - Animated 3D background effects
- 🖼️ **Image Support** - Add sample images and descriptions for each platform

## Tech Stack

- **Next.js 14** - React framework
- **React 18** - UI library
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Three.js** - 3D graphics
- **TypeScript** - Type safety

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Usage

### Accessing the Dashboard

- **Main Dashboard**: Navigate to your domain (e.g., `nayana.top`)
- **Admin Dashboard**: Navigate to `nayana.top/#NPT@1009/dasboard`

### Adding Platforms

1. Access the admin dashboard using the hash route
2. Click "Add New Platform"
3. Fill in the platform details:
   - Name
   - Description
   - URL
   - Image URL (optional)
   - Category
   - Featured status
4. Click "Add Platform"

### Managing Platforms

- **Edit**: Click the "Edit" button on any platform card
- **Delete**: Click the "Delete" button (trash icon)
- **Feature**: Toggle the star icon to feature/unfeature a platform
- **Preview**: Click the external link icon to open the platform

## Default Platforms

The dashboard comes with two pre-configured platforms:
1. QR Bar Code Generator
2. Text to Voice Generator with Unlimited Translator

## Customization

- Edit `lib/platforms.ts` to modify default platforms
- Customize colors in `tailwind.config.js`
- Modify components in the `components/` directory
- Update styles in `app/globals.css`

## Deployment

This project can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting service

Make sure to set up your custom domain (`nayana.top`) in your hosting provider's settings.

## License

MIT

