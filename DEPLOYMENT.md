# Deployment Guide for nayana.top

This guide will help you deploy the Platform Dashboard to **nayana.top** domain.

## Prerequisites

- Domain name: `nayana.top` (already owned)
- GitHub repository: [PlatformHub.github.io](https://github.com/TMNPThennakoon/PlatformHub.github.io)
- Node.js 18+ installed

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

Vercel is the recommended hosting platform for Next.js applications.

#### Steps:

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository: `TMNPThennakoon/PlatformHub.github.io`
   - Vercel will auto-detect Next.js settings

3. **Configure Domain**
   - Go to Project Settings → Domains
   - Add `nayana.top` and `www.nayana.top`
   - Follow DNS configuration instructions:
     - Add A record: `@` → Vercel IP (provided)
     - Add CNAME record: `www` → `cname.vercel-dns.com`

4. **Environment Variables** (if needed)
   - Go to Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_DOMAIN=https://nayana.top`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `nayana.top`

#### Vercel Configuration:
- Framework: Next.js (auto-detected)
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

---

### Option 2: Netlify

#### Steps:

1. **Sign up/Login to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with your GitHub account

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select `PlatformHub.github.io`
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

3. **Configure Domain**
   - Go to Site Settings → Domain Management
   - Add custom domain: `nayana.top`
   - Follow DNS instructions:
     - Add A record: `@` → Netlify IP
     - Add CNAME: `www` → your-site.netlify.app

4. **Deploy**
   - Click "Deploy site"
   - Site will be live after DNS propagates

---

### Option 3: GitHub Pages (Static Export)

For GitHub Pages, you need to export Next.js as static files.

#### Steps:

1. **Update next.config.js**
   ```javascript
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     // ... rest of config
   }
   ```

2. **Update package.json**
   ```json
   {
     "scripts": {
       "export": "next build && next export"
     }
   }
   ```

3. **Build and Export**
   ```bash
   npm run build
   ```

4. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `out` folder
   - Save

5. **Custom Domain**
   - In Pages settings, add custom domain: `nayana.top`
   - Create `CNAME` file in repository root with: `nayana.top`
   - Configure DNS:
     - A records: GitHub Pages IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)
     - CNAME: `www` → `TMNPThennakoon.github.io`

---

## DNS Configuration

### For nayana.top Domain:

#### A Records (for root domain):
```
Type: A
Name: @
Value: [Your hosting provider's IP]
TTL: 3600
```

#### CNAME Records (for www subdomain):
```
Type: CNAME
Name: www
Value: [Your hosting provider's CNAME]
TTL: 3600
```

### DNS Providers:
- **Cloudflare** (Recommended)
- **Namecheap**
- **GoDaddy**
- **Google Domains**

---

## Post-Deployment Checklist

- [ ] Domain is accessible at `nayana.top`
- [ ] HTTPS/SSL certificate is active (automatic with Vercel/Netlify)
- [ ] Admin dashboard accessible at `nayana.top/#NPT@1009/dashboard`
- [ ] All platform cards load correctly
- [ ] Images display properly
- [ ] GitHub auto-sync is configured (if using)
- [ ] Mobile responsiveness tested

---

## Environment Variables

If you need to set environment variables:

### Vercel:
- Project Settings → Environment Variables
- Add: `NEXT_PUBLIC_DOMAIN=https://nayana.top`

### Netlify:
- Site Settings → Environment Variables
- Add: `NEXT_PUBLIC_DOMAIN=https://nayana.top`

---

## Troubleshooting

### Domain Not Loading:
1. Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net)
2. Wait 24-48 hours for DNS to fully propagate
3. Clear browser cache
4. Check SSL certificate status

### Build Errors:
1. Ensure Node.js version is 18+
2. Run `npm install` locally to check for errors
3. Check build logs in hosting dashboard

### Admin Dashboard Not Accessible:
1. Verify hash route: `#NPT@1009/dashboard`
2. Check browser console for errors
3. Ensure JavaScript is enabled

---

## Continuous Deployment

Once set up, every push to the `main` branch will automatically trigger a new deployment:

```bash
git add .
git commit -m "Update platform"
git push origin main
```

The hosting provider will automatically build and deploy the changes.

---

## Support

For issues or questions:
- Check hosting provider documentation
- Review Next.js deployment guide
- Check DNS configuration with your domain registrar

---

**Recommended:** Use **Vercel** for the best Next.js experience and automatic HTTPS.

