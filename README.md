# Portfolio Website - Võ Tấn Dũng

## 📋 Overview

A personal portfolio website built with Next.js 14 and TypeScript, featuring neon effects, animations, 3D elements with Three.js, and a fully responsive design. The website includes the main pages: Home, About, Projects, and Contact, with theme switching (dark/light mode).

## 🛠️ Công nghệ sử dụng

### Frontend Framework
- **Next.js 14**: React framework with App Router
- **TypeScript**: Strongly typed programming language with type safety
- **React 18**: JavaScript library for building user interfaces

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **CSS Custom Properties**: CSS variables for theming

### 3D & Visual Effects
- **Three.js**: Creating 3D effects and models

### Theme & Interactions
- **next-themes**: Theme switching (dark/light mode)
- **React Icons**: Icon library (Facebook, Instagram, LinkedIn, GitHub)

### Form & Communication
- **EmailJS**: Send emails from client-side
- **React Hooks**: useState, useEffect for state management

## 📁 Folder Structure

```
src/
├── app/
│   ├── favicon.ico          # Website icon
│   ├── globals.css          # Global CSS and neon effects
│   ├── layout.tsx           # Main application layout
│   ├── page.tsx             # Main page (Home, About, Projects, Contact)
│   ├── providers.tsx        # Theme providers
│   ├── ThemeSwitcher.tsx    # Theme switcher component
│   └── ThreeBackground.tsx  # Background 3D
public/
├── profile.jpg              # Profile picture
├── file.svg                 # Icons SVG
├── globe.svg
├── next.svg
├── vercel.svg
└── window.svg
```

## 🚀 How to run the project

### 1. Install dependencies
```bash
npm install
# or
yarn install
```

### 2. Start the development server
```bash
npm run dev
# or
yarn dev
```

### 3. Open in browser
Go to `http://localhost:3000` to view the website.

### 4. Build production
```bash
npm run build
npm start
```

## ⚙️ Config

### EmailJS Setup
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a service and a template
3. Replace the values in `ContactForm`

## 🎯 Tính năng nổi bật

### 1. Performance Optimization
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting with Next.js
- **SSR/SSG**: Server-side rendering for better SEO

### 2. Accessibility
- **Semantic HTML**: Proper usage of HTML5 tags
- **ARIA Labels**: Accessibility support for screen readers
- **Keyboard Navigation**: Supports navigation via keyboard

### 3. SEO Friendly
- **Meta Tags**: Proper meta tags in layout
- **Structured Data**: Schema markup
- **Sitemap**: Auto-generated sitemap

### 4. Cross-browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Progressive Enhancement**: Fallbacks for older browsers
- **CSS Prefixes**: Vendor prefixes for animations

## 📄 License

MIT License - free to use for both personal and commercial projects.

## 📞 Contact

- **Email**: iamvotandung26@gmail.com
- **GitHub**: [github.com/iamTaDu](https://github.com/iamTaDu)
- **LinkedIn**: [Võ Tấn Dũng](https://www.linkedin.com/in/v%C3%B5-t%E1%BA%A5n-d%C5%A9ng-aa10b1323/)

---

*This portfolio website was built with ❤️ using Next.js, TypeScript, ThreeJS, and Tailwind CSS.*

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
