 
## 🚀 Features

- **Dark Futuristic Design**: Deep purple to black gradient background with glowing highlights
- **Smooth Animations**: Framer Motion powered animations for enhanced user experience
- **Responsive Layout**: Mobile-first design that works perfectly on all devices
- **Modern Typography**: Inter and Space Grotesk fonts for a professional look
- **Interactive Elements**: Hover effects, smooth transitions, and micro-interactions
- **Bilingual Support**: Full Turkish and English language support
- **SEO Optimized**: Proper meta tags and structured content

## 🎬 Intro Animation

The portfolio features a stunning fullscreen intro animation that runs only once on first visit:

### Animation Flow:
1. **Black Screen**: Starts with a full black background
3. **Glow Effects**: Subtle pulsing glow and neon flicker effects
4. **Background Transition**: Smooth gradient transition from black to dark purple/navy
5. **Particle Effects**: Floating particles for added visual appeal
6. **Exit Animation**: Fades out with upward movement after 2.5 seconds

### Technical Features:
- **Performance Optimized**: Lightweight animations using CSS transforms
- **One-Time Only**: Uses localStorage to prevent re-running on subsequent visits
- **Accessibility**: Respects `prefers-reduced-motion` settings
- **Responsive**: Adapts to all screen sizes
- **Testing Utilities**: Development helpers for testing the animation

### Testing the Intro:
```javascript
// In browser console (development mode)
introUtils.resetIntro();     // Reset intro state
introUtils.forceShowIntro(); // Force show intro and reload
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: CSS Modules with custom animations
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter & Space Grotesk (Google Fonts)
- **Deployment**: Ready for Vercel deployment

## 📱 Sections

1. **Intro Animation**: Fullscreen cinematic intro (first visit only)
2. **Hero Section**: Bold introduction with animated code block
3. **About Me**: Personal story and statistics
4. **Tech Stack**: Interactive grid of technologies
5. **Projects**: Featured projects with hover animations
6. **Experience**: Timeline of professional experience
7. **Contact**: Contact form and social links

## 🎨 Design Highlights

- **Color Palette**: Purple (#ff6b6b), teal (#4ecdc4), deep blues (#0f0f23, #1a1a2e)
- **Visual Elements**: Floating orbs, animated code blocks, gradient backgrounds
- **Typography**: Modern, professional fonts with gradient text effects
- **Layout**: Clean, spacious design with proper visual hierarchy
- **Animations**: Spring-like bounces and smooth easing functions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── components/
│   └── IntroAnimation.tsx    # Fullscreen intro animation
├── pages/
│   ├── _app.tsx              # App wrapper
│   ├── _document.tsx         # Document head
│   └── index.tsx             # Main portfolio page
├── styles/
│   ├── globals.css           # Global styles
│   ├── Home.module.css       # Component styles
│   └── IntroAnimation.module.css # Intro animation styles
└── utils/
    └── introUtils.ts         # Intro animation utilities
```

## 🎯 Customization

### Intro Animation
Modify the intro animation in `src/components/IntroAnimation.tsx`:
- Change duration: Update the `useEffect` timer (currently 2500ms)
- Modify animations: Adjust Framer Motion parameters
- Update styling: Edit `src/styles/IntroAnimation.module.css`

### Colors
The color scheme can be customized by modifying the CSS variables:
- Primary gradient: `#ff6b6b` to `#4ecdc4`
- Background: `#0f0f23` to `#1a1a2e` to `#16213e`
- Text colors: `#ffffff`, `#b8b8b8`

### Content
Update the content in `src/pages/index.tsx`:
- Personal information
- Project details
- Experience timeline
- Contact information

### Animations
Modify animation parameters in the Framer Motion components for different effects.

## 🌟 Performance Features

- **Optimized Images**: Next.js Image component for optimal loading
- **Font Optimization**: Google Fonts with preconnect
- **Code Splitting**: Automatic code splitting with Next.js
- **SEO**: Meta tags and structured data
- **Animation Performance**: Hardware-accelerated CSS transforms
- **Lazy Loading**: Components load only when needed

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints at:
- Mobile: < 480px
- Tablet: < 768px
- Desktop: > 768px

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

