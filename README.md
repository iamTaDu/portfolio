# Portfolio Website - Võ Tấn Dũng

## 📋 Tổng quan dự án

Website portfolio cá nhân được xây dựng bằng Next.js 14 với TypeScript, tích hợp các hiệu ứng neon, animations, 3D elements với Three.js và responsive design. Website bao gồm các trang chính: Home, About, Projects và Contact với theme switching (dark/light mode).

## 🛠️ Công nghệ sử dụng

### Frontend Framework
- **Next.js 14**: React framework với App Router
- **TypeScript**: Ngôn ngữ lập trình mạnh mẽ với type safety
- **React 18**: Library JavaScript để xây dựng UI

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Library animation cho React
- **CSS Custom Properties**: Biến CSS cho theming

### 3D & Visual Effects
- **Three.js**: Tạo hiệu ứng và mô hình 3D

### Theme & Interactions
- **next-themes**: Theme switching (dark/light mode)
- **React Icons**: Icon library (Facebook, Instagram, LinkedIn, GitHub)

### Form & Communication
- **EmailJS**: Gửi email từ client-side
- **React Hooks**: useState, useEffect cho state management

## 📁 Cấu trúc thư mục

```
src/
├── app/
│   ├── favicon.ico          # Icon trang web
│   ├── globals.css          # CSS toàn cục và hiệu ứng neon
│   ├── layout.tsx           # Layout chính của ứng dụng
│   ├── page.tsx             # Trang chính (Home, About, Projects, Contact)
│   ├── providers.tsx        # Theme providers
│   ├── ThemeSwitcher.tsx    # Component chuyển đổi theme
│   └── ThreeBackground.tsx  # Background 3D (nếu có)
public/
├── profile.jpg              # Ảnh profile
├── file.svg                 # Icons SVG
├── globe.svg
├── next.svg
├── vercel.svg
└── window.svg
```

## 🚀 Cách chạy dự án

### 1. Cài đặt dependencies
```bash
npm install
# hoặc
yarn install
```

### 2. Chạy development server
```bash
npm run dev
# hoặc
yarn dev
```

### 3. Mở trình duyệt
Truy cập `http://localhost:3000` để xem website.

### 4. Build production
```bash
npm run build
npm start
```

## ⚙️ Cấu hình

### EmailJS Setup
1. Tạo tài khoản tại [EmailJS](https://www.emailjs.com/)
2. Tạo service và template
3. Thay thế các giá trị trong `ContactForm`

## 🎯 Tính năng nổi bật

### 1. Performance Optimization
- **Image Optimization**: Next.js Image component với lazy loading
- **Code Splitting**: Automatic code splitting với Next.js
- **SSR/SSG**: Server-side rendering cho SEO tốt hơn

### 2. Accessibility
- **Semantic HTML**: Sử dụng đúng các thẻ HTML5
- **ARIA Labels**: Accessibility cho screen readers
- **Keyboard Navigation**: Hỗ trợ điều hướng bằng phím

### 3. SEO Friendly
- **Meta Tags**: Proper meta tags trong layout
- **Structured Data**: Schema markup
- **Sitemap**: Auto-generated sitemap

### 4. Cross-browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Progressive Enhancement**: Fallbacks cho older browsers
- **CSS Prefixes**: Vendor prefixes cho animations

## 📄 License

MIT License - có thể sử dụng tự do cho projects cá nhân và thương mại.

## 📞 Contact

- **Email**: iamvotandung26@gmail.com
- **GitHub**: [github.com/iamTaDu](https://github.com/iamTaDu)
- **LinkedIn**: [Võ Tấn Dũng](https://www.linkedin.com/in/v%C3%B5-t%E1%BA%A5n-d%C5%A9ng-aa10b1323/)

---

*Website portfolio này được xây dựng với ❤️ bằng Next.js, TypeScript và Tailwind CSS.*

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
