# Image URL Guide

## Supported Image Sources

The dashboard supports images from various sources:

### ✅ Google Drive
**How to use:**
1. Upload your image to Google Drive
2. Right-click the file → "Share" → Set to "Anyone with the link can view"
3. Copy the sharing link
4. Paste it in the Image URL field

**Supported Google Drive URL formats:**
- `https://drive.google.com/file/d/FILE_ID/view`
- `https://drive.google.com/open?id=FILE_ID`
- `https://drive.google.com/uc?id=FILE_ID`

The system will automatically convert these to direct image URLs.

**Important:** Make sure the file sharing is set to "Anyone with the link can view" for the image to display correctly.

### ✅ Other Supported Sources
- **Direct image URLs** (any .jpg, .png, .gif, .webp, etc.)
- **Imgur** - Direct image links
- **Dropbox** - Sharing links (automatically converted)
- **GitHub** - Raw image URLs
- **Cloudinary, Unsplash, Pexels** - Direct image URLs
- **Any public image hosting service**

## Tips

1. **For Google Drive:** Always ensure the file is set to "Anyone with the link can view"
2. **For best results:** Use direct image URLs when possible
3. **Image formats:** JPG, PNG, GIF, WebP are all supported
4. **Image size:** Recommended max 2MB for faster loading

## Troubleshooting

**Image not showing?**
- Check if the URL is accessible (try opening it in a new tab)
- For Google Drive: Verify sharing permissions
- Check browser console for CORS errors
- Try using a different image hosting service

**Google Drive images not working?**
- Make sure sharing is set to "Anyone with the link can view"
- Try copying the link again from Google Drive
- The system automatically converts Google Drive URLs, but if it fails, try using a direct image URL instead



