# Nayana Pabasara - Portfolio (React Version)

A modern, responsive portfolio website built with React.js showcasing engineering projects, skills, and professional experience.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, scroll animations, and dynamic content
- **Portfolio Showcase**: Filterable project gallery with detailed descriptions
- **Skills Visualization**: Progress bars and circular progress indicators
- **Contact Integration**: Social media links and contact information
- **Performance Optimized**: Fast loading times and smooth scrolling

## Technologies Used

- **Frontend**: React.js 18.2.0
- **Styling**: CSS3 with CSS Variables and Flexbox/Grid
- **Icons**: Font Awesome 6.6.0
- **Fonts**: Google Fonts (Poppins)
- **Animations**: CSS Keyframes and Intersection Observer API
- **Build Tool**: Create React App

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header with logo and menu
│   ├── Home.js            # Hero section with typing animation
│   ├── About.js           # About section with stats and skills
│   ├── Experience.js      # Work experience section
│   ├── Education.js       # Education and qualifications
│   ├── Skills.js          # Technical skills showcase
│   ├── Services.js        # Professional services offered
│   ├── Portfolio.js       # Project portfolio with filtering
│   ├── Footer.js          # Footer with contact information
│   └── ScrollToTop.js     # Scroll to top button
├── App.js                 # Main application component
├── App.css               # Main stylesheet
├── index.js              # React DOM entry point
└── index.css             # Global styles
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nayana-portfolio-react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Key Features Explained

### 1. Responsive Navigation
- Sticky header with smooth scroll navigation
- Mobile-friendly hamburger menu
- Active section highlighting
- Dropdown menu for About section

### 2. Typing Animation
- Dynamic text animation in the hero section
- Multiple rotating text options
- Smooth typing and deleting effects

### 3. Scroll Animations
- Intersection Observer API for performance
- Fade-in, slide-in, and scale animations
- Progress bar animations on scroll

### 4. Portfolio Filtering
- Filter projects by category (Web, App, IoT, Automation)
- Smooth transitions between filters
- Hover effects with project details

### 5. Interactive Elements
- Floating icons with tooltips
- Animated progress bars and circular progress
- Hover effects on cards and buttons
- Smooth scrolling between sections

## Customization

### Adding New Projects
1. Add project data to the `projects` array in `Portfolio.js`
2. Include image, title, description, tech stack, and links
3. Assign appropriate category for filtering

### Modifying Styles
- Main styles are in `App.css`
- CSS variables are defined in `:root` for easy theming
- Responsive breakpoints are clearly marked

### Updating Content
- Personal information in `Home.js`
- Skills and expertise in `About.js` and `Skills.js`
- Services in `Services.js`
- Contact information in `Footer.js`

## Performance Optimizations

- Lazy loading of images
- Debounced scroll events
- Intersection Observer for animations
- Optimized CSS animations
- Minimal JavaScript bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

The app can be deployed to any static hosting service:

- **Netlify**: Connect GitHub repository for automatic deployments
- **Vercel**: Deploy with `vercel --prod`
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload `build` folder contents

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

- **Email**: nayanapabasara1@gmail.com
- **LinkedIn**: [Nayana Pabasara](https://www.linkedin.com/in/napi-9046392b3/)
- **GitHub**: [nayanapabasara](https://github.com/nayanapabasara)
- **Website**: [nayanapabasara.me](https://nayanapabasara.me)

---

Built with ❤️ by Nayana Pabasara
