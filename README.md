# Portfolio Website - Võ Tấn Dũng

## 📋 Tổng quan dự án

Website portfolio cá nhân được xây dựng bằng Next.js 14 với TypeScript, tích hợp các hiệu ứng neon, animations và responsive design. Website bao gồm các trang chính: Home, About, Projects và Contact với theme switching (dark/light mode).

## 🛠️ Công nghệ sử dụng

### Frontend Framework
- **Next.js 14**: React framework với App Router
- **TypeScript**: Ngôn ngữ lập trình mạnh mẽ với type safety
- **React 18**: Library JavaScript để xây dựng UI

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Library animation cho React
- **CSS Custom Properties**: Biến CSS cho theming

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

## 🎨 Tính năng chính

### 1. Theme Switching (Dark/Light Mode)
```typescript
// ThemeSwitcher.tsx
const { theme, setTheme } = useTheme();
const [mounted, setMounted] = useState(false);

// Tránh hydration mismatch
useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null;
```

**Cách hoạt động:**
- Sử dụng `next-themes` để quản lý theme
- State `mounted` đảm bảo component chỉ render sau khi hydrate
- CSS variables thay đổi theo theme được chọn

### 2. Navigation với Active State
```typescript
const [activeSection, setActiveSection] = useState("home");

useEffect(() => {
  const handleScroll = () => {
    const sections = ["home", "about", "projects", "contact"];
    let current = "home";
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom > 80) {
          current = id;
        }
      }
    }
    setActiveSection(current);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

**Cách hoạt động:**
- Lắng nghe sự kiện scroll
- Kiểm tra vị trí của từng section
- Cập nhật active state dựa trên section hiện tại
- Hiển thị dot indicator cho section đang active

### 3. Typing Animation Effect
```typescript
function TypingText({ text, delay = 100, startDelay = 0 }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    return () => clearTimeout(startTimer);
  }, [startDelay, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (started && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else if (started && currentIndex >= text.length) {
      setCompleted(true);
    }
  }, [currentIndex, text, delay, started, mounted]);

  if (!mounted) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {displayText}
      {started && !completed && <span className="animate-pulse">|</span>}
    </span>
  );
}
```

**Cách hoạt động:**
- `startDelay`: Delay trước khi bắt đầu typing
- `delay`: Thời gian giữa các ký tự
- `mounted`: Tránh hydration mismatch
- Cursor nhấp nháy khi đang typing
- Hiển thị full text khi SSR, animation khi CSR

### 4. Neon Effects & Custom CSS
```css
/* globals.css */
.neon {
  color: #00eaff;
  text-shadow:
    0 0 8px #00eaff,
    0 0 2px #fff;
  transition:
    text-shadow 0.3s,
    color 0.3s;
}

.neon:hover {
  color: #fff;
  text-shadow:
    0 0 24px #00eaff,
    0 0 8px #fff;
}

.neon-light {
  color: #ffd600;
  text-shadow:
    0 0 8px #ffd600,
    0 0 2px #fff;
  transition:
    text-shadow 0.3s,
    color 0.3s;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**Cách hoạt động:**
- Text-shadow tạo hiệu ứng phát sáng
- Multiple shadow layers cho độ sáng
- Transition mượt mà khi hover
- Gradient background animation

### 5. Timeline Journey (Zigzag Layout)
```typescript
function Journey({ theme }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const journeyData = [
    {
      year: "2022",
      title: "Getting Started with Programming",
      content: "Introduction to basic coding with C# programming language"
    },
    // ... more data
  ];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Central Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-cyan-400 transform -translate-x-1/2"></div>
      
      {journeyData.map((item, index) => {
        const isLeft = index % 2 === 0;
        const Component = mounted ? motion.div : "div";
        
        return (
          <Component
            key={index}
            className={`relative flex items-center mb-12 ${isLeft ? 'justify-start' : 'justify-end'}`}
            initial={mounted ? { opacity: 0, x: isLeft ? -100 : 100 } : {}}
            whileInView={mounted ? { opacity: 1, x: 0 } : {}}
            transition={mounted ? { duration: 0.8, delay: index * 0.2 } : {}}
          >
            {/* Content */}
          </Component>
        );
      })}
    </div>
  );
}
```

**Cách hoạt động:**
- Timeline ở giữa với `absolute` positioning
- Zigzag layout: chẵn bên trái, lẻ bên phải
- Conditional motion components để tránh hydration mismatch
- Stagger animation với delay

### 6. Project Cards với Hover Effects
```typescript
function ProjectCard({ title, type, description, tech, githubUrl, borderColor, theme }) {
  return (
    <div className="project-card-wrapper" style={{"--borderColor": borderColor}}>
      <div className="rounded-lg p-6 flex flex-col h-full relative z-10">
        <h3 
          className="text-xl font-bold mb-2 neon"
          style={{
            color: borderColor,
            textShadow: `0 0 8px ${borderColor}, 0 0 16px ${borderColor}`
          }}
        >
          {title}
        </h3>
        {/* ... content */}
        <a
          href={githubUrl}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = borderColor;
            e.currentTarget.style.color = theme === "dark" ? "#000" : "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = borderColor;
          }}
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}
```

**Cách hoạt động:**
- CSS custom properties cho border color
- Dynamic styling với inline styles
- Hover effects thay đổi background và text color
- Mỗi project có màu riêng biệt

### 7. Contact Form với EmailJS
```typescript
function ContactForm({ theme }) {
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    
    const serviceID = "YOUR_SERVICE_ID";
    const templateID = "YOUR_TEMPLATE_ID";
    const userID = "YOUR_USER_ID";

    emailjs.sendForm(serviceID, templateID, e.currentTarget, userID)
      .then((result) => {
        console.log(result.text);
        setStatus("SUCCESS");
        e.target.reset();
      })
      .catch((error) => {
        console.log(error.text);
        setStatus("ERROR");
      });
  };

  return (
    <form onSubmit={sendEmail}>
      <input type="text" name="from_name" placeholder="Your Name" required />
      <input type="email" name="from_email" placeholder="Your Email" required />
      <textarea name="message" placeholder="Your Message" required />
      <button type="submit">Send Message</button>
      {status === "SUCCESS" && <p>Message sent successfully!</p>}
      {status === "ERROR" && <p>Something went wrong. Please try again.</p>}
    </form>
  );
}
```

**Cách hoạt động:**
- EmailJS gửi email trực tiếp từ client
- Form validation với HTML5 attributes
- Status feedback cho user
- Auto reset form sau khi gửi thành công

### 8. Responsive Design
```typescript
// Navigation responsive
<div className="flex items-center gap-6">
  {navItems.map(({ id, label }) => (
    <a
      key={id}
      className="relative font-semibold text-lg px-4 py-2 rounded transition hover:scale-105"
    >
      <span style={{
        color: id === "home" ? "#f472b6" : 
              id === "about" ? "#10b981" : 
              id === "projects" ? "#f59e0b" : 
              id === "contact" ? "#8b5cf6" : "#00eaff"
      }}>
        {label}
      </span>
    </a>
  ))}
</div>

// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Project cards */}
</div>

// Flex responsive
<div className="flex flex-col md:flex-row items-center justify-center gap-8">
  {/* Content */}
</div>
```

**Cách hoạt động:**
- Tailwind responsive prefixes (`md:`, `lg:`)
- Mobile-first approach
- Flexible grid và flexbox layouts
- Breakpoints tự động điều chỉnh

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
3. Thay thế các giá trị trong `ContactForm`:
   ```typescript
   const serviceID = "YOUR_SERVICE_ID";
   const templateID = "YOUR_TEMPLATE_ID"; 
   const userID = "YOUR_USER_ID";
   ```

### Theme Configuration
```typescript
// providers.tsx
import { ThemeProvider } from 'next-themes';

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

### Tailwind Configuration
```javascript
// tailwind.config.ts
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'gradientText': 'gradientTextMove 4s ease-in-out infinite',
        'gradientBG': 'gradientBG 12s ease infinite',
      }
    },
  },
}
```

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

## 🐛 Troubleshooting

### Hydration Mismatch
**Vấn đề**: Server và client render khác nhau
**Giải pháp**: Sử dụng `mounted` state
```typescript
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null; // hoặc fallback UI
```

### Theme Flashing
**Vấn đề**: Flash theme khi load trang
**Giải pháp**: Script injection trong HTML head
```typescript
// layout.tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      try {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } catch (_) {}
    `,
  }}
/>
```

### Animation Performance
**Vấn đề**: Animations lag trên mobile
**Giải pháp**: 
- Sử dụng `transform` thay vì position
- `will-change` CSS property
- `transform3d` để trigger GPU acceleration

## 📱 Mobile Optimization

### Touch Interactions
```css
/* Larger touch targets */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Disable touch callouts */
.no-touch-callout {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}
```

### Responsive Images
```typescript
<Image
  src="/profile.jpg"
  alt="Võ Tấn Dũng"
  fill
  sizes="(max-width: 768px) 12rem, 16rem"
  className="rounded-full"
  priority
/>
```

## 🔧 Development Tools

### Recommended Extensions
- **ESLint**: Code linting
- **Prettier**: Code formatting  
- **Tailwind CSS IntelliSense**: Autocomplete cho Tailwind
- **TypeScript Hero**: Import organization

### Scripts hữu ích
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build", 
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  }
}
```

## 📊 Performance Metrics

### Core Web Vitals Targets
- **FCP (First Contentful Paint)**: < 1.8s
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Techniques
- Image optimization với WebP format
- Font preloading
- Critical CSS inlining
- Resource prefetching

## 🤝 Contributing

### Code Style
- Sử dụng TypeScript cho type safety
- ESLint + Prettier cho code formatting
- Conventional Commits cho git messages

### Component Structure
```typescript
// Component template
interface ComponentProps {
  theme?: string;
  // other props
}

function Component({ theme, ...props }: ComponentProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    // JSX
  );
}

export default Component;
```

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
