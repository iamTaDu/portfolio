"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaArrowUp } from "react-icons/fa";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ThemeSwitcher } from "./ThemeSwitcher";

// --- HELPER COMPONENTS ---

function ContactForm(props: { theme?: string }) {
  const [status, setStatus] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add current date to form data (only on client side)
    const form = e.currentTarget;
    const hiddenDateInput = document.createElement('input');
    hiddenDateInput.type = 'hidden';
    hiddenDateInput.name = 'sent_date';
    hiddenDateInput.value = mounted ? new Date().toLocaleString('en-US', { 
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }) : '';
    form.appendChild(hiddenDateInput);

    // EmailJS configuration
    const serviceID = "service_znw9sdc";
    const templateID = "template_bw7hg0x";
    const userID = "YONMvZ3hNfquYJkjM";

    emailjs.sendForm(serviceID, templateID, form, userID).then(
      (result) => {
        console.log(result.text);
        setStatus("SUCCESS");
        form.reset();
        // Remove the hidden input after sending
        if (hiddenDateInput.parentNode) {
          hiddenDateInput.parentNode.removeChild(hiddenDateInput);
        }
        // Auto hide success message after 10 seconds
        setTimeout(() => {
          setStatus("");
        }, 10000);
      },
      (error) => {
        console.log(error.text);
        setStatus("ERROR");
        // Remove the hidden input if error occurs
        if (hiddenDateInput.parentNode) {
          hiddenDateInput.parentNode.removeChild(hiddenDateInput);
        }
      },
    );
  };

  if (!mounted) {
    return <div className="w-full max-w-2xl mx-auto h-96"></div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={sendEmail} className="flex flex-col gap-4">
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          required
          className={`p-3 rounded-lg focus:outline-none focus:border-cyan-400 border transition-all ${props.theme === "dark" ? "bg-[#10131a] border-gray-700 text-white" : "bg-white border-gray-300 text-black"}`}
        />
        <input
          type="email"
          name="from_email"
          placeholder="Your Email"
          required
          className={`p-3 rounded-lg focus:outline-none focus:border-cyan-400 border transition-all ${props.theme === "dark" ? "bg-[#10131a] border-gray-700 text-white" : "bg-white border-gray-300 text-black"}`}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows={5}
          className={`p-3 rounded-lg focus:outline-none focus:border-cyan-400 border transition-all ${props.theme === "dark" ? "bg-[#10131a] border-gray-700 text-white" : "bg-white border-gray-300 text-black"}`}
        ></textarea>
        <button
          type="submit"
          className="font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg bg-cyan-500 text-white hover:bg-cyan-600 hover:shadow-cyan-500/50"
        >
          Send Message
        </button>
      </form>
      {status === "SUCCESS" && (
        <p className="text-green-400 mt-4 text-center">
          Message sent successfully!
        </p>
      )}
      {status === "ERROR" && (
        <p className="text-red-400 mt-4 text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}

function ProjectCard({
  title,
  type,
  description,
  tech,
  githubUrl,
  borderColor,
  theme,
}: {
  title: string;
  type: string;
  description: string;
  tech: string[];
  githubUrl: string;
  borderColor: string;
  theme?: string;
}) {
  const borderStyle = {
    "--borderColor": borderColor,
  } as React.CSSProperties;

  return (
    <div className="project-card-wrapper" style={borderStyle}>
      <div
        className={`rounded-lg p-6 flex flex-col h-full relative z-10 transition-all ${theme === "dark" ? "bg-[#10131a]" : "bg-white border border-gray-200"}`}
      >
        <h3
          className={`text-xl font-bold mb-2 ${theme === "light" ? "" : "neon"}`}
          style={{
            color: borderColor,
            textShadow: theme === "light" 
              ? "none"
              : `0 0 8px ${borderColor}, 0 0 16px ${borderColor}`,
          }}
        >
          {title}
        </h3>
        <span className="text-sm font-semibold text-pink-400 mb-4">{type}</span>
        <p
          className={`mb-4 flex-grow ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((item) => (
            <span
              key={item}
              className={`px-3 py-1 rounded text-xs border transition-all ${theme === "dark" ? "bg-black/40 text-gray-200 border-gray-600" : "bg-gray-100 text-gray-800 border-gray-300"}`}
            >
              {item}
            </span>
          ))}
        </div>
        <div
          className={`mt-auto pt-4 border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}
        >
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block font-bold py-2 px-6 rounded-lg transition-all duration-300 ${theme === "dark" ? "bg-transparent" : "bg-gray-50"}`}
            style={{
              border: `1px solid ${borderColor}`,
              color: borderColor,
              textShadow: theme === "light" 
                ? "none" 
                : `0 0 8px ${borderColor}, 0 0 16px ${borderColor}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = borderColor;
              e.currentTarget.style.color = theme === "dark" ? "#000" : "#fff";
              e.currentTarget.style.textShadow = theme === "light"
                ? "none"
                : theme === "dark"
                  ? `0 0 8px #000, 0 0 16px #000`
                  : `0 0 8px #fff, 0 0 16px #fff`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                theme === "dark" ? "transparent" : "#f9fafb";
              e.currentTarget.style.color = borderColor;
              e.currentTarget.style.textShadow = theme === "light"
                ? "none"
                : `0 0 8px ${borderColor}, 0 0 16px ${borderColor}`;
            }}
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

function AboutIntro() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => { 
    setMounted(true); 
  }, []);

  if (!mounted) {
    return (
      <div>
        <p className="text-lg text-left text-gray-200">
          Hello! I&apos;m Võ Tấn Dũng, a passionate developer who loves creating
          robust and scalable solutions. My journey in programming started with
          curiosity and has evolved into a deep passion for building digital
          experiences that matter.
        </p>
        <p className="mt-4 text-lg text-left text-gray-200">
          I specialize in backend development while maintaining strong fullstack
          capabilities. I enjoy working with modern technologies and frameworks to
          create efficient, maintainable, and user-friendly applications.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p
        className={`text-lg text-left ${theme === "light" ? "text-black" : "text-gray-200"}`}
      >
        Hello! I&apos;m Võ Tấn Dũng, a passionate developer who loves creating
        robust and scalable solutions. My journey in programming started with
        curiosity and has evolved into a deep passion for building digital
        experiences that matter.
      </p>
      <p
        className={`mt-4 text-lg text-left ${theme === "light" ? "text-black" : "text-gray-200"}`}
      >
        I specialize in backend development while maintaining strong fullstack
        capabilities. I enjoy working with modern technologies and frameworks to
        create efficient, maintainable, and user-friendly applications.
      </p>
    </div>
  );
}

function CurrentFocus({ theme }: { theme?: string }) {
  return (
    <div>
      <h3
        className={`text-2xl font-bold mb-4 ${theme === "light" ? "text-[#00eaff]" : "neon text-cyan-300"}`}
      >
        Current Focus
      </h3>
      <ul
        className={`list-disc list-inside space-y-2 ${theme === "light" ? "text-black" : "text-gray-300"}`}
      >
        <li>Building high-performance backend systems with .NET and Java.</li>
        <li>
          Exploring real-time 3D rendering with ThreeJS and React Three Fiber.
        </li>
        <li>
          Mastering cloud-native technologies and microservices architecture.
        </li>
      </ul>
    </div>
  );
}

function TechCard({
  title,
  items,
  borderColor,
  theme,
}: {
  title: string;
  items: string[];
  borderColor: string;
  theme?: string;
}) {
  const borderStyle = {
    "--borderColor": borderColor,
  } as React.CSSProperties;

  return (
    <div className="project-card-wrapper" style={borderStyle}>
      <div
        className={`rounded-lg p-6 flex flex-col h-full relative z-10 min-h-[150px] ${theme === "light" ? "bg-white border border-gray-200" : "bg-[#10131a]"}`}
      >
        <h3
          className={`text-lg font-bold mb-3 ${theme === "light" ? "" : "neon"}`}
          style={{
            color: borderColor,
            textShadow: theme === "light" 
              ? "none" 
              : `0 0 8px ${borderColor}, 0 0 16px ${borderColor}`,
          }}
        >
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {items.map((item: string) => (
            <span
              key={item}
              className={`px-3 py-1 rounded text-sm border transition-all ${theme === "light" ? "bg-gray-100 text-black border-gray-300" : "bg-black/40 text-gray-200 border-gray-700"}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Journey({ theme }: { theme?: string }) {
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const journeyData = [
    {
      year: "09/2022 - 11/2022",
      title: "Getting Started with Programming",
      content: "Introduction to basic coding with C# programming language"
    },
    {
      year: "02/2023 - 04/2023",
      title: "Database & Core Programming",
      content: "Learning database interaction with SQL Server, fundamental programming techniques: Recursion, Divide and Conquer, Sorting Algorithms, and Object-Oriented Programming (OOP)"
    },
    {
      year: "08/2023 - 10/2023",
      title: "Web Development & Data Structures",
      content: "Introduction to web development with HTML, CSS and ASP.NET MVC framework, deep dive into data structures and algorithms: OOP, Stack, Queue, Linked List, Binary Tree"
    },
    {
      year: "12/2023 - 03/2024",
      title: "Mobile Development & Graph Algorithms",
      content: "Mobile development with Java - Android Studio, learning graph algorithms like DFS, BFS, Dijkstra, Prim... and understanding software analysis and design principles"
    },
    {
      year: "05/2024 - 07/2024",
      title: "Team Collaboration & Project Management",
      content: "Learning teamwork and group project execution following the complete process from analysis and design to programming"
    },
    {
      year: "09/2024 - 11/2024",
      title: "Agile Development & APIs",
      content: "Implementing group projects using Agile-Scrum methodology and working with RESTful APIs"
    },
    {
      year: "12/2024 - 03/2025",
      title: "Design Patterns & Deployment",
      content: "Learning to apply design patterns in real projects and understanding how to deploy websites to the internet"
    },
    {
      year: "05/2025 - 07/2025",
      title: "Project Management & Internship Prep",
      content: "Learning software project management and preparing for internship opportunities"
    },
    {
      year: "08/2025 - Present",
      title: "Real-World Experience",
      content: "Preparing for internship to gain practical experience and enhance professional knowledge"
    }
  ];

  if (!mounted) {
    return (
      <div className="w-full">
        <h3
          className={`text-2xl font-bold mb-12 text-center ${theme === "light" ? "text-[#00eaff]" : "neon text-cyan-300"}`}
        >
          My Journey at HUFLIT
        </h3>
        <div className="text-center py-8">
          <div className={`inline-block animate-pulse ${theme === "light" ? "text-cyan-600" : "text-[#00eaff]"}`}>
            Loading timeline...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3
        className={`text-2xl font-bold mb-12 text-center ${theme === "light" ? "text-[#00eaff]" : "neon text-cyan-300"}`}
      >
        My Journey in HUFLIT
      </h3>
      <div className="relative max-w-4xl mx-auto">
        {/* Central Timeline Line */}
        <div className={`absolute left-1/2 top-0 bottom-0 w-1 ${theme === "light" ? "bg-cyan-400" : "bg-cyan-400"} transform -translate-x-1/2`}></div>
        
        {journeyData.map((item, index) => {
          const isLeft = index % 2 === 0;
          const Component = mounted ? motion.div : "div";
          const animationProps = mounted ? {
            initial: { opacity: 0, x: isLeft ? -100 : 100 },
            whileInView: { opacity: 1, x: 0 },
            transition: { duration: 0.8, delay: index * 0.2 },
            viewport: { once: true }
          } : {};

          return (
            <Component
              key={index}
              className={`relative flex items-center mb-12 ${isLeft ? 'justify-start' : 'justify-end'}`}
              {...animationProps}
            >
              {/* Content Container */}
              <div className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                <div className={`p-6 rounded-lg border-2 shadow-lg ${theme === "light" ? "bg-white border-cyan-400 shadow-cyan-500/20" : "bg-[#10131a] border-cyan-400 shadow-cyan-500/20"} relative`}>
                  {/* Arrow pointing to timeline */}
                  <div 
                    className={`absolute top-6 ${isLeft ? 'right-0' : 'left-0'} w-0 h-0 ${isLeft ? 'transform translate-x-full' : 'transform -translate-x-full'}`}
                    style={{
                      borderTop: `10px solid transparent`,
                      borderBottom: `10px solid transparent`,
                      [isLeft ? 'borderLeft' : 'borderRight']: `15px solid ${theme === "light" ? '#ffffff' : '#10131a'}`,
                      filter: `drop-shadow(${isLeft ? '2px' : '-2px'} 0 0 ${theme === "light" ? '#00eaff' : '#00eaff'})`
                    }}
                  ></div>
                  
                  <div className={`text-sm font-bold mb-3 px-3 py-1 rounded-full inline-block ${theme === "light" ? "bg-cyan-100 text-cyan-700" : "bg-cyan-900 text-cyan-300"}`}>
                    {item.year}
                  </div>
                  <h4 className={`text-lg font-bold mb-3 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
                    {item.title}
                  </h4>
                  <p className={`text-sm leading-relaxed ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                    {item.content}
                  </p>
                </div>
              </div>
              
              {/* Central Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                {mounted ? (
                  <motion.div 
                    className={`w-6 h-6 rounded-full border-4 ${theme === "light" ? "bg-cyan-400 border-cyan-500" : "bg-cyan-400 border-cyan-500"} shadow-lg`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  />
                ) : (
                  <div className={`w-6 h-6 rounded-full border-4 ${theme === "light" ? "bg-cyan-400 border-cyan-500" : "bg-cyan-400 border-cyan-500"} shadow-lg`} />
                )}
              </div>
            </Component>
          );
        })}
      </div>
    </div>
  );
}

function AboutMe(props: { theme?: string }) {
  return (
    <section id="about" className="w-full py-16">
      <h2
        className={`text-5xl font-bold mb-12 text-center ${props?.theme === "light" ? "text-[#00eaff]" : "neon"}`}
      >
        About Me
      </h2>
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto gap-12">
        <div className="flex-1 flex flex-col gap-8">
          <AboutIntro />
          <CurrentFocus theme={props.theme} />
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <TechCard
            title="Backend"
            items={["C#", "Java", "ASP.NET Core"]}
            borderColor="#ff2972"
            theme={props.theme}
          />
          <TechCard
            title="Frontend"
            items={["ReactJS", "NextJS", "ThreeJS"]}
            borderColor="#3b82f6"
            theme={props.theme}
          />
          <TechCard
            title="Database"
            items={["SQL Server", "MongoDB", "Firebase"]}
            borderColor="#10b981"
            theme={props.theme}
          />
        </div>
      </div>
      
      {/* Journey Section */}
      <div className="w-full max-w-6xl mx-auto mt-16">
        <Journey theme={props.theme} />
      </div>
    </section>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

// --- MAIN PAGE COMPONENT ---

function TypingText({ text, delay = 100, startDelay = 0 }: { text: string; delay?: number; startDelay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    return () => clearTimeout(startTimer);
  }, [startDelay, mounted]);

  React.useEffect(() => {
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

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    
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
      
      // Show scroll to top button when scrolled down 300px
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };
  const { theme } = useTheme();

  // Show loading state while mounting
  if (!mounted) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-8 bg-black text-white">
        {/* Loading content */}
      </main>
    );
  }
  
  return (
    <main
      className={`min-h-screen w-full flex flex-col items-center justify-start px-4 py-8 ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
    >
      {theme === "dark" && (
        <div
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            background: "linear-gradient(120deg, #0f2027, #2c5364, #00eaff)",
            backgroundSize: "400% 400%",
            animation: "gradientBG 12s ease infinite",
          }}
        ></div>
      )}

      <nav className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md border-b ${
        theme === "light" 
          ? "bg-gray-200/90 border-cyan-400/30" 
          : "bg-[#181c2b]/80 border-[#00eaff44]"
      }`}>
        <span className="text-2xl font-bold tracking-wide bg-gradient-to-r from-pink-500 via-blue-500 to-green-400 bg-clip-text text-transparent animate-gradientText">
          iamtaduuuuu portfolio
        </span>
        <div className="flex items-center gap-6">
          {[
            { id: "home", label: "Home" },
            { id: "about", label: "About" },
            { id: "projects", label: "Project" },
            { id: "contact", label: "Contact" },
          ].map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`relative font-semibold text-lg px-4 py-2 rounded transition hover:scale-105 group ${
                theme === "light" ? "text-black" : "text-white"
              } ${
                activeSection === id 
                  ? theme === "light"
                    ? 'after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-8 after:h-1 after:bg-black after:rounded-full after:content-["" ]'
                    : 'after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-8 after:h-1 after:bg-white after:rounded-full after:content-["" ]'
                  : ""
              }`}
              onClick={() => setActiveSection(id)}
            >
              <span 
                className="transition-all duration-300 group-hover:brightness-150"
                style={{
                  color: "#22d3ee", // cyan-400 cho cả 2 mode
                  textShadow: `0 0 8px #22d3ee, 0 0 2px #fff`,
                  transition: "text-shadow 0.3s, color 0.3s, filter 0.3s"
                }}
              >
                {label}
              </span>
            </a>
          ))}
          <a
            href="/Vo Tan Dung - CV.pdf"
            download
            className={`font-semibold text-lg px-4 py-2 rounded transition hover:scale-105 ml-2 border no-shadow ${
              theme === "light" 
                ? "border-black" 
                : "border-white"
            }`}
            style={{
              color: "#22d3ee", // cyan-400 cho cả 2 mode
              textDecoration: "none",
              boxShadow: "none !important",
              textShadow: "none !important",
              filter: "none !important"
            }}
          >
            Download CV
          </a>
          <ThemeSwitcher />
        </div>
      </nav>

      <motion.header
        id="home"
        className="w-full text-center mb-12 pt-32"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.span 
            className="text-3xl align-middle mr-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            👋
          </motion.span>
          <motion.span 
            className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradientText align-middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Xin chào!
          </motion.span>
          <motion.p 
            className="text-lg font-semibold mt-2 text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <TypingText 
              text="I'm Võ Tấn Dũng - Backend Developer specializing in building high-performance, secure, and scalable systems." 
              delay={80} 
              startDelay={1800} 
            />
          </motion.p>
        </motion.div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-48 h-48 md:w-64 md:h-64"
          >
            <Image
              src="/profile.jpg"
              alt="Võ Tấn Dũng"
              fill
              sizes="(max-width: 768px) 12rem, 16rem"
              className={`rounded-full border-4 object-cover border-cyan-400 ${theme === "light" ? "shadow-md shadow-cyan-400/30" : "shadow-lg shadow-cyan-400/50"}`}
              priority
            />
          </motion.div>
          <div className="text-center md:text-left">
            <motion.h1
              className={`text-7xl font-black mb-4 tracking-wide cursor-pointer transition-all duration-300 hover:brightness-150 ${theme === "light" ? "text-[#00eaff]" : "neon"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              Võ Tấn Dũng
            </motion.h1>
            <motion.p
              className={`text-xl font-black cursor-pointer transition-all duration-300 hover:brightness-150 ${theme === "light" ? "" : "neon"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 3.5 }}
              style={{
                color: theme === "light" ? "#ff0077ff" : "#ff0077ff",
                textShadow: theme === "light"
                  ? "none" // Bỏ hiệu ứng neon cho light mode
                  : "0 0 6px #ff0077ff, 0 0 12px #ff0077ff" // Giữ nguyên cho dark mode
              }}
            >
              Backend / Fullstack Developer
            </motion.p>
          </div>
        </div>
      </motion.header>

      <AboutMe theme={theme} />

      <motion.section
        id="projects"
        className="w-full max-w-6xl mx-auto py-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2
          className={`text-5xl font-bold mb-12 text-center ${theme === "light" ? "text-[#00eaff]" : "neon"}`}
        >
          My Project
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCard
            title="E-commerce Website MERDI"
            type="Fullstack"
            description="Comprehensive ASP.NET Core MVC e-commerce platform featuring advanced product management, real-time chat support with SignalR, integrated payment processing with Stripe, and dynamic user experience. Includes admin dashboard, inventory management, wishlist functionality, and responsive design with Bootstrap."
            tech={[
              "ASP.NET Core",
              "C#",
              "Entity Framework",
              "SQL Server",
              "Stripe API",
              "Bootstrap",
              "jQuery",
              "Identity Framework",
            ]}
            githubUrl="https://github.com/ComBiCha/E-commerce"
            borderColor="#ff2972"
            theme={theme}
          />
          <ProjectCard
            title="E-commerce Website SHNGear"
            type="Fullstack"
            description="A fullstack e-commerce site built with a modern tech stack, featuring a ReactJS-based frontend and a robust ASP.NET Core backend, with payment integration."
            tech={[
              "ASP.NET Core",
              "C#",
              "SQL Server",
              "Paypal API",
              "ReactJS",
              "Restful API",
            ]}
            githubUrl="https://github.com/Waito3007/SHNGear"
            borderColor="#3b82f6"
            theme={theme}
          />
          <ProjectCard
            title="E-commerce Mobile App MERDI"
            type="Frontend"
            description="A mobile application for the MERDI e-commerce platform, built with Flutter for a cross-platform experience, connected to a powerful backend."
            tech={[
              "Flutter",
              "ASP.NET Core",
              "SQL Server",
              "JWT",
              "RESTful API",
              "State Management",
            ]}
            githubUrl="https://github.com/1Tatsumi2/mobile_nang_cao"
            borderColor="#10b981"
            theme={theme}
          />
          <ProjectCard
            title="Social Network Mobile App ClaraZone"
            type="Fullstack"
            description="A mobile-first social networking application using Java and Firebase for a real-time, scalable, and engaging user experience."
            tech={["Java", "Firebase"]}
            githubUrl="https://github.com/Waito3007/ClaraZone"
            borderColor="#ffc629"
            theme={theme}
          />
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="w-full max-w-6xl mx-auto py-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2
          className={`text-5xl font-bold mb-12 text-center ${theme === "light" ? "text-[#00eaff]" : "neon"}`}
        >
          Contact Me
        </h2>
        <div className="flex flex-col md:flex-row gap-2 items-start">
          <div className="flex-1">
            <h3
              className={`text-2xl font-bold mb-4 ${theme === "light" ? "text-[#00eaff]" : "neon text-cyan-400"}`}
            >
              For Work
            </h3>
            <div className="mb-6">
              <button 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.open('mailto:iamvotandung26@gmail.com', '_blank');
                  }
                }}
                className={`text-lg px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 ${theme === "light" ? "border-cyan-400 hover:bg-white-500/10" : "border-cyan-400 hover:bg-cyan-400/10"}`}
              >
                📧 <span className={`${theme === "light" ? "text-[#00eaff]" : "neon text-[#00eaff]"}`}>iamvotandung26@gmail.com</span>
              </button>
            </div>
            <h3
              className={`text-2xl font-bold mb-4 ${theme === "light" ? "text-[#00eaff]" : "neon text-cyan-400"}`}
            >
              Follow Me
            </h3>
            <div className="flex justify-center md:justify-start space-x-6 mb-6">
              <a
                href="https://www.facebook.com/iamvotandung"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110 hover:animate-bounce"
              >
                <FaFacebook
                  size={32}
                  color={theme === "light" ? "#000" : "#fff"}
                />
              </a>
              <a
                href="https://www.instagram.com/iamtaduuuuu/?hl=vi"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110 hover:animate-bounce"
              >
                <FaInstagram
                  size={32}
                  color={theme === "light" ? "#000" : "#fff"}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/v%C3%B5-t%E1%BA%A5n-d%C5%A9ng-aa10b1323/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110 hover:animate-bounce"
              >
                <FaLinkedin
                  size={32}
                  color={theme === "light" ? "#000" : "#fff"}
                />
              </a>
              <a
                href="https://github.com/iamTaDu"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110 hover:animate-bounce"
              >
                <FaGithub
                  size={32}
                  color={theme === "light" ? "#000" : "#fff"}
                />
              </a>
            </div>
          </div>
          <div className="flex-1 md:max-w-xl mx-auto">
            <h3
              className={`text-2xl font-bold mb-4 ${theme === "light" ? "text-[#00eaff]" : "neon text-cyan-400"}`}
            >
              Send a Message
            </h3>
            <p
              className={`mb-8 ${theme === "light" ? "text-black" : "text-gray-300"}`}
            >
              I&apos;m currently open to new opportunities and collaborations.
              Feel free to send me a message using the form, or connect with me
              on social media.
            </p>
            <ContactForm theme={theme} />
          </div>
        </div>
      </motion.section>

      {/* Scroll to Top Button */}
      {mounted && showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110 ${
            theme === "dark" 
              ? "bg-cyan-500 text-white hover:bg-cyan-600 hover:shadow-cyan-500/50" 
              : "bg-cyan-500 text-white hover:bg-cyan-600 hover:shadow-cyan-500/50"
          }`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp size={20} />
        </motion.button>
      )}

      <footer
        className={`w-full text-center py-8 text-sm mt-16 ${theme === "light" ? "text-black" : "text-gray-400"}`}
      >
        © 2025 Võ Tấn Dũng. Built with NextJS, ThreeJS, Tailwind CSS.
      </footer>
    </main>
  );
}
