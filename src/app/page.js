"use client";
export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useRef } from 'react';
import { 
  FaJava, FaReact, FaDocker, FaFigma, FaLaptopCode, 
  FaGraduationCap, FaMusic, FaAward, FaLanguage, 
  FaGithub, FaLinkedin, FaExternalLinkAlt,
  FaInstagram, FaYoutube, FaChevronLeft, FaChevronRight,
  FaCode, FaTools, FaBrain, FaTerminal
} from 'react-icons/fa';
import { SiSpringboot, SiNextdotjs, SiMysql, SiTailwindcss, SiCplusplus, SiPython, SiJavascript, SiHtml5, SiCss, SiPostman } from 'react-icons/si';
import { HiOutlineCode } from 'react-icons/hi';
import { useAnimate, motion } from "framer-motion";

import { client } from '../sanity/lib/client';
import { urlFor } from '../sanity/lib/image';

const randomNumberBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const retroBootVariant = {
  initial: { opacity: 0, scaleY: 0.05, scaleX: 0.3 },
  whileInView: { opacity: 1, scaleY: 1, scaleX: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: { type: "spring", stiffness: 120, damping: 14 }
};

const popContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.05 } }
};

const pixelPopItem = {
  initial: { opacity: 0, y: 15, scale: 0.85 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true },
  transition: { type: "spring", stiffness: 200, damping: 12 }
};

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [hobbyStack, setHobbyStack] = useState([]);
  const [currentProjectIdx, setCurrentProjectIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Set default initial load to light mode (false)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDateString, setCurrentDateString] = useState("");

  const canvasRef = useRef(null);
  const colorIdx = useRef(0);
  const colors = ['#f9c12f', '#da1c5c', '#f15a29', '#ff5dd4', '#ff9846'];
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const updateTimeEngine = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
      hours = hours % 12 || 12;
      setCurrentTime(`${hours}:${minutes} ${ampm}`);

      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayName = days[now.getDay()];
      const dateNum = now.getDate();
      setCurrentDateString(`${dayName}. ${dateNum}`);
    };

    updateTimeEngine();
    const interval = setInterval(updateTimeEngine, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchPortfolioData() {
      try {
        const profileData = await client.fetch(`*[_type == "profile"][0]{ ..., "resumeUrl": resume.asset->url }`);
        const projectsData = await client.fetch(`*[_type == "project"]`);
        const hobbiesData = await client.fetch(`*[_type == "hobby"] | order(id asc)`);

        if (profileData) setProfile(profileData);
        if (projectsData.length > 0) setProjects(projectsData);
        if (hobbiesData.length > 0) setHobbyStack(hobbiesData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchPortfolioData();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    let animationFrameId;
    let localTrails = [];
    const handleMouseMove = (e) => {
      localTrails.push({ x: e.clientX, y: e.clientY, size: 10, life: 1.0, color: colors[colorIdx.current % colors.length] });
      colorIdx.current++;
    };
    document.addEventListener('mousemove', handleMouseMove);
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < localTrails.length; i++) {
        let t = localTrails[i];
        t.life -= 0.04;
        if (t.life <= 0) { localTrails.splice(i, 1); i--; continue; }
        ctx.save(); ctx.globalAlpha = t.life; ctx.fillStyle = t.color;
        ctx.fillRect(t.x - (t.size * t.life) / 2, t.y - (t.size * t.life) / 2, t.size * t.life, t.size * t.life); ctx.restore();
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const rotateHobbyStack = () => {
    const sparkles = Array.from({ length: 20 });
    const sparklesReset = sparkles.map((_, index) => [`.sparkle-${index}`, { x: 0, y: 0, scale: 0, opacity: 0 }, { duration: 0.000001 }]);
    const sparklesAnimation = sparkles.map((_, index) => [`.sparkle-${index}`, { x: randomNumberBetween(isMobile ? -100 : -280, isMobile ? 100 : 280), y: randomNumberBetween(isMobile ? -100 : -220, isMobile ? 100 : 220), scale: randomNumberBetween(1.2, 2.5), opacity: 1 }, { duration: 0.2, at: "<" }]);
    const sparklesFadeOut = sparkles.map((_, index) => [`.sparkle-${index}`, { opacity: 0, scale: 0 }, { duration: 0.01, at: ">" }]);
    animate([...sparklesReset, [".active-hobby-card", { scale: 0.96 }, { duration: 0.05 }], [".active-hobby-card", { scale: 1 }, { duration: 0.05 }], ...sparklesAnimation, ...sparklesFadeOut]);
    setTimeout(() => { setHobbyStack(prev => { const [first, ...rest] = prev; return [...rest, first]; }); }, 60);
  };

  const nextProject = () => { if (projects.length) setCurrentProjectIdx((prev) => (prev + 1) % projects.length); };
  const prevProject = () => { if (projects.length) setCurrentProjectIdx((prev) => (prev - 1 + projects.length) % projects.length); };

  if (loading || !profile) return <div className="bg-[#0a0812] min-h-screen w-full" />;

  const activeProject = projects[currentProjectIdx];
  const currentBgImage = isDarkMode 
    ? (profile.darkBackgroundImage ? urlFor(profile.darkBackgroundImage).url() : (profile.backgroundImage ? urlFor(profile.backgroundImage).url() : 'none'))
    : (profile.backgroundImage ? urlFor(profile.backgroundImage).url() : 'none');

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <FaCode className="text-[#da1c5c]" />,
      skills: [{ icon: <FaJava />, name: "Java" }, { icon: <SiCplusplus />, name: "C++" }, { icon: <SiPython />, name: "Python" }, { icon: <SiJavascript />, name: "JavaScript" }, { icon: <SiMysql />, name: "SQL (MySQL)" }, { icon: <SiHtml5 />, name: "HTML5" }, { icon: <SiCss />, name: "CSS3" }]
    },
    {
      title: "Frameworks & Libraries",
      icon: <FaLaptopCode className="text-[#f9c12f]" />,
      skills: [{ icon: <SiSpringboot />, name: "Spring Boot" }, { icon: <FaReact />, name: "React.js" }, { icon: <SiTailwindcss />, name: "Tailwind CSS" }]
    },
    {
      title: "Tools & DevOps",
      icon: <FaTools className="text-[#f15a29]" />,
      skills: [{ icon: <FaGithub />, name: "Git & GitHub" }, { icon: <SiPostman />, name: "Postman" }, { icon: <FaTerminal />, name: "VS Code" }]
    },
    {
      title: "Core Competencies",
      icon: <FaBrain className="text-[#ff5dd4]" />,
      skills: [{ name: "Full-Stack Development" }, { name: "RESTful APIs" }, { name: "Object-Oriented Programming" }, { name: "Database Design" }, { name: "Data Structures & Algorithms" }]
    }
  ];

  return (
    <div 
      style={{ 
        backgroundImage: currentBgImage !== 'none' ? `url(${currentBgImage})` : 'none',
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed',
        transition: 'background-image 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      className="bg-[#0a0812] text-[#fef9e7] min-h-screen font-mono relative overflow-x-hidden w-full selection:bg-[#da1c5c]"
    >
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9999] hidden md:block" />

      <div className="flex h-[4px] fixed top-0 left-0 right-0 z-[200]">
        {colors.map((c, i) => <div key={i} className="flex-1" style={{ backgroundColor: c }} />)}
      </div>

      {/* MINIMALIST MOBILE THEME SWITCHER OVERLAY */}
      <div className="fixed top-20 right-4 z-[100] md:hidden flex items-center gap-1 bg-[#1c1830]/90 backdrop-blur-md border border-[#2a2445] p-1.5 rounded-full shadow-lg">
        <button 
          onClick={() => setIsDarkMode(false)}
          className={`p-2 rounded-full transition-all ${!isDarkMode ? 'bg-[#fcd116] text-[#2c1303]' : 'text-[#8878aa]'}`}
          aria-label="Set Day Mode"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ imageRendering: 'pixelated' }}>
            <rect x="5" y="5" width="14" height="14" fill="currentColor" rx="1" />
            <rect x="8" y="8" width="8" height="8" fill={!isDarkMode ? "#fff568" : "currentColor"} />
          </svg>
        </button>
        <button 
          onClick={() => setIsDarkMode(true)}
          className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-[#ff5dd4] text-[#12101e]' : 'text-[#8878aa]'}`}
          aria-label="Set Night Mode"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ imageRendering: 'pixelated' }}>
            <path d="M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 1-9-9Z" fill="currentColor" />
          </svg>
        </button>
      </div>

      {/* STARDEW VALLEY UNIFIED HUD CONTAINER */}
      <motion.div 
        variants={retroBootVariant}
        initial="initial"
        animate="whileInView"
        className="fixed top-14 right-4 z-[100] hidden md:flex flex-col items-center gap-2 scale-100 md:scale-110 origin-top-right select-none"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        <div className="relative w-[238px] h-[195px]">
          <img 
            src="/stardew-hud-empty.png" 
            alt="HUD Base" 
            className="w-full h-full object-contain absolute inset-0 z-0"
            style={{ imageRendering: 'pixelated' }}
          />

          <div 
            className="absolute left-[24px] top-[66px] z-20 transition-transform duration-400 ease-out" 
            style={{ 
              transform: isDarkMode ? 'rotate(32deg) translateY(2px)' : 'rotate(-32deg) translateY(-2px)', 
              transformOrigin: '48px 6px' 
            }}
          >
            <svg width="48" height="12" viewBox="0 0 48 12" className="overflow-visible" style={{ imageRendering: 'pixelated' }}>
              <path d="M 48 4 L 16 4 L 16 1 L 0 6 L 16 11 L 16 8 L 48 8 Z" fill="#f7b11c" stroke="#381502" strokeWidth="2" />
              <rect x="18" y="5" width="16" height="2" fill="#ffe982" />
              <circle cx="43" cy="6" r="3" fill="#602807" />
            </svg>
          </div>

          <div className="absolute left-[82px] top-[14px] w-[142px] h-[36px] flex items-center justify-center z-10 text-[#2c1303] font-bold text-[22px] tracking-wide antialiased">
            {currentDateString || "Mon. 29"}
          </div>

          <div className="absolute left-[95px] top-[54px] w-[38px] h-[30px] z-10 flex items-center justify-center overflow-hidden">
            <svg width="22" height="22" viewBox="0 0 24 24" style={{ imageRendering: 'pixelated' }} className={`transition-all duration-300 ${!isDarkMode ? "opacity-100 scale-100" : "opacity-25 scale-90"}`}>
              <rect x="5" y="5" width="14" height="14" fill="#fcd116" rx="1" />
              <rect x="8" y="8" width="8" height="8" fill="#fff568" />
              <rect x="11" y="1" width="2" height="3" fill="#fcd116" />
              <rect x="11" y="20" width="2" height="3" fill="#fcd116" />
              <rect x="1" y="11" width="3" height="2" fill="#fcd116" />
              <rect x="20" y="11" width="3" height="2" fill="#fcd116" />
            </svg>
          </div>
          <button 
            onClick={() => setIsDarkMode(false)}
            className={`absolute left-[94px] top-[53px] w-[40px] h-[32px] z-30 cursor-pointer rounded-sm ${!isDarkMode ? 'bg-amber-500/5' : 'hover:bg-white/5'}`}
            title="Set Day Mode"
          />
          
          <div className="absolute left-[175px] top-[54px] w-[38px] h-[30px] z-10 flex items-center justify-center overflow-hidden">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ imageRendering: 'pixelated' }} className={`transition-all duration-300 ${isDarkMode ? "opacity-100 scale-100" : "opacity-25 scale-90"}`}>
              <path d="M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 1-9-9Z" fill="#fcd116" stroke="#381502" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M12 5a7 7 0 1 0 7 7 7.75 7.75 0 0 1-7-7Z" fill="#fff568" />
            </svg>
          </div>
          <button 
            onClick={() => setIsDarkMode(true)}
            className={`absolute left-[174px] top-[53px] w-[40px] h-[32px] z-30 cursor-pointer rounded-sm ${isDarkMode ? 'bg-indigo-500/5' : 'hover:bg-white/5'}`}
            title="Set Night Mode"
          />

          <div className="absolute left-[82px] top-[88px] w-[142px] h-[38px] flex items-center justify-center z-10 text-[#2c1303] font-bold text-[22px] tracking-normal antialiased">
            {currentTime || "5:12 p.m."}
          </div>

          <div className="absolute left-[75px] top-[158px] w-[148px] h-[38px] z-10 text-[#490707] font-black text-[24px] antialiased tracking-[6px] text-right pr-[5px]">
            500
          </div>
        </div>

        <span className="text-[12px] font-bold tracking-wider text-[#ffffff] uppercase animate-pulse">
          [ Click ☀️ / 🌙 to toggle theme ]
        </span>
      </motion.div>

      {/* HEADER NAV OVERLAY BAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-4 bg-[#0a0812]/90 backdrop-blur-md border-b-2 border-[#2a2445]">
        <div className="text-[12px] font-bold text-[#f9c12f] tracking-wider">christine.dev</div>
        <div className="flex items-center gap-4 text-[10px] pr-0 md:pr-64">
          <a href="#skills" className="text-[#8878aa] hover:text-[#f9c12f]">skills</a>
          <a href="#projects" className="text-[#8878aa] hover:text-[#f9c12f]">work</a>
          <a href="#about" className="text-[#8878aa] hover:text-[#f9c12f]">about</a>
          <a href="#contact" className="text-[#da1c5c] font-bold mr-1">contact</a>
        </div>
      </nav>

      {/* HERO CONTAINER */}
      <motion.header 
        initial={{ opacity: 0, scaleY: 0.01, scaleX: 0.4 }}
        animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 15 }}
        className="max-w-[1100px] mx-auto px-4 pt-36 pb-12 min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full"
      >
        <div className="flex-1 w-full text-center lg:text-left px-2">
          <p className="text-[10px] text-[#ff5dd4] font-bold tracking-widest mb-2 uppercase">{profile.eyebrow}</p>
          {/* Forces name straight into 1 single line on screen layouts */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 text-white drop-shadow-[3px_3px_0px_#da1c5c] tracking-wide whitespace-nowrap">
            christine shane ong
          </h1>
          <h2 className="text-lg md:text-2xl text-[#ff5dd4] font-bold mb-4 uppercase tracking-wide">{profile.title}</h2>
          <p className="text-sm md:text-lg text-[#8878aa] max-w-[500px] mx-auto lg:mx-0 mb-6 leading-relaxed">{profile.bio}</p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8 max-w-xs sm:max-w-none mx-auto">
            <a href="#contact" className="bg-[#da1c5c] text-white font-bold text-xs text-center px-6 py-3.5 shadow-[3px_3px_0px_#6b0028] transition-all">SAY HELLO ↗</a>
            <a href={profile.resumeUrl || '#'} download="resume.pdf" className="bg-[#1c1830] border-2 border-[#2a2445] text-[#8878aa] hover:text-[#f9c12f] hover:border-[#f9c12f] font-bold text-xs text-center px-6 py-3.5 transition-all">RESUME ↓</a>
          </div>

          <div className="grid grid-cols-3 gap-2 max-w-[380px] mx-auto lg:mx-0 text-left">
            {[
              { label: "GPA", val: profile.gpa, color: "text-[#f9c12f]" },
              { label: "Projects", val: projects.length, color: "text-[#da1c5c]" },
              { label: "Piano", val: "Grade 8", color: "text-[#ff5dd4]" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#1c1830]/80 backdrop-blur-sm border border-[#2a2445] p-2.5 rounded">
                <span className={`text-sm font-bold block ${stat.color}`}>{stat.val}</span>
                <span className="text-[9px] text-[#8878aa] tracking-wider uppercase">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center lg:justify-start gap-5 mt-6 text-2xl text-[#fef9e7]">
            <a href={profile.github || '#'} target="_blank" rel="noreferrer" className="hover:text-[#f9c12f]"><FaGithub /></a>
            <a href={profile.linkedin || '#'} target="_blank" rel="noreferrer" className="hover:text-[#f9c12f]"><FaLinkedin /></a>
            <a href={profile.instagram || '#'} target="_blank" rel="noreferrer" className="hover:text-[#f9c12f]"><FaInstagram /></a>
            <a href={profile.youtube || '#'} target="_blank" rel="noreferrer" className="hover:text-[#f9c12f]"><FaYoutube /></a>
          </div>
        </div>

        {/* Nudged picture container slightly to the right using translate layout */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2 lg:ml-auto transform lg:translate-x-8">
          <div className="w-[280px] sm:w-[320px] md:w-[340px] relative select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]">
            <img src="/stardew-frame.png" alt="Profile Layout" className="w-full h-auto block object-contain relative z-10" style={{ imageRendering: 'pixelated' }} />
            <div className="absolute top-[8%] left-[8%] w-[84%] h-[84%] overflow-hidden bg-[#18110e] rounded-sm z-0">
              {profile.image ? <img src={urlFor(profile.image).url()} alt={profile.name} className="w-full h-full object-cover object-center" /> : <div className="w-full h-full bg-[#1c1830] flex items-center justify-center"><HiOutlineCode className="text-2xl text-[#f9c12f]" /></div>}
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-[#12101e] border border-[#f9c12f] px-2.5 py-1 text-[9px] text-[#f9c12f] font-bold tracking-wider mt-2">
            <span className="w-1.5 h-1.5 bg-[#f9c12f] rounded-full animate-pulse" /> AVAILABLE FOR INTERNSHIPS
          </div>
        </div>
      </motion.header>

      {/* TECH STACK INVENTORY */}
      <motion.section variants={retroBootVariant} initial="initial" whileInView="whileInView" viewport={retroBootVariant.viewport} id="skills" className="max-w-[1100px] mx-auto px-4 py-12 w-full">
        <div className="flex items-center gap-3 mb-8">
          <FaLaptopCode className="text-xl text-[#da1c5c]" />
          <h3 className="font-bold text-xs text-white tracking-wider uppercase">Tech Stack Inventory</h3>
          <div className="flex-1 h-[1px] bg-[#2a2445]" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIdx) => (
            <motion.div variants={popContainer} key={catIdx} className="bg-[#1c1830]/80 backdrop-blur-sm border border-[#2a2445] p-4 rounded-md">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#2a2445]">
                {category.icon}
                <h4 className="text-xs font-bold uppercase tracking-wide text-white">{category.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div variants={pixelPopItem} key={skillIdx} className="bg-[#0a0812]/90 border border-[#2a2445] px-3 py-2 rounded flex items-center gap-2 text-xs text-[#8878aa] hover:text-white hover:border-[#f9c12f] transition-all">
                    {skill.icon && <span className="text-sm">{skill.icon}</span>}
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FEATURED WORK PROJECTS */}
      <motion.section variants={retroBootVariant} initial="initial" whileInView="whileInView" viewport={retroBootVariant.viewport} id="projects" className="max-w-[1100px] mx-auto px-4 py-12 w-full">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="font-bold text-xs text-white tracking-wider uppercase">Featured Work</h3>
          <div className="flex-1 h-[1px] bg-[#2a2445]" />
        </div>

        {activeProject && (
          <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center pt-4">
            <button onClick={prevProject} className="absolute left-[-12px] sm:left-[-30px] md:left-[-70px] top-[45%] -translate-y-1/2 z-[100] bg-[#1c1830] border-2 border-[#2a2445] text-[#8878aa] p-3 rounded-full transition-all hover:text-[#ff9846]">
              <FaChevronLeft className="text-sm md:text-xl" />
            </button>
            <button onClick={nextProject} className="absolute right-[-12px] sm:right-[-30px] md:left-[-70px] top-[45%] -translate-y-1/2 z-[100] bg-[#1c1830] border-2 border-[#2a2445] text-[#8878aa] p-3 rounded-full transition-all hover:text-[#ff9846]">
              <FaChevronRight className="text-sm md:text-xl" />
            </button>

            <div className="w-full bg-[#1c1830] border-[4px] sm:border-[6px] md:border-[12px] border-[#2a2445] rounded-t-2xl p-3 shadow-2xl relative">
              <div className="w-full bg-[#0a0812] border border-[#2a2445] rounded p-4 sm:p-8 flex flex-col md:flex-row gap-6 items-center min-h-[340px]">
                <div className="flex-1 text-left w-full flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] font-bold text-[#ff5dd4] block mb-1">Build Unit: 0{currentProjectIdx + 1} / 0{projects.length}</span>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-3 uppercase tracking-wide">{activeProject.name}</h4>
                    <p className="text-xs md:text-sm text-[#8878aa] mb-4 max-w-lg">{activeProject.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {activeProject.chips?.map((c, i) => <span key={i} className="text-[10px] px-2 py-0.5 bg-[#12101e] border border-[#2a2445] text-[#8878aa] rounded-sm">{c}</span>)}
                    </div>
                  </div>
                  <div className="flex gap-2.5 pt-4 border-t border-[#2a2445]">
                    <a href={activeProject.liveUrl || '#'} target="_blank" rel="noreferrer" className="flex-1 text-center bg-[#ff9846] text-[#0a0812] font-bold text-[10px] py-3 rounded flex items-center justify-center gap-2 hover:bg-[#ffe39c]">
                      <FaExternalLinkAlt /> LIVE WEBSITE
                    </a>
                    <a href={activeProject.githubUrl || '#'} target="_blank" rel="noreferrer" className="px-4 bg-[#1c1830] border border-[#2a2445] text-[#8878aa] text-sm rounded flex items-center justify-center hover:text-white"><FaGithub /></a>
                  </div>
                </div>

                {activeProject.liveUrl ? (
                  <div className="hidden md:block w-full md:w-[380px] h-[240px] bg-[#000] border-2 border-[#2a2445] relative overflow-hidden rounded">
                    <div className="w-[1280px] h-[810px] origin-top-left absolute left-0 top-0" style={{ transform: 'scale(0.296875)' }}> 
                      <iframe src={activeProject.liveUrl} className="w-full h-full border-0 bg-white" sandbox="allow-scripts allow-same-origin" loading="lazy" />
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:flex w-full md:w-[380px] h-[240px] bg-[#000] border-2 border-[#2a2445] flex-col items-center justify-center text-[#8878aa] rounded">
                    <HiOutlineCode className="text-4xl text-[#ff5dd4] animate-pulse" />
                    <span className="text-[9px] tracking-widest">[ Missing Path ]</span>
                  </div>
                )}
              </div>
            </div>
            <div className="w-[104%] ml-[-2%] h-[24px] md:h-[30px] bg-[#2a2445] border-x-[8px] border-b-[8px] border-[#12101e] rounded-b-2xl absolute bottom-[-24px] md:bottom-[-30px] left-0 shadow-[0_20px_40px_rgba(0,0,0,0.7)] z-10" />
          </div>
        )}
      </motion.section>

      {/* INTERACTIVE HOBBIES STACK BLOCK */}
      <motion.section variants={retroBootVariant} initial="initial" whileInView="whileInView" viewport={retroBootVariant.viewport} className="max-w-[1100px] mx-auto px-4 py-12 w-full pt-16 relative overflow-visible">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="font-bold text-xs text-white tracking-wider uppercase">Hobbies Matrix</h3>
          <div className="flex-1 h-[1px] bg-[#2a2445]" />
        </div>
        
        <div ref={scope} className="relative w-full max-w-2xl mx-auto flex items-center justify-center h-[460px] sm:h-[340px] md:h-[380px] lg:h-[400px] overflow-visible">
          <div className="w-full h-full relative overflow-visible">
            {hobbyStack.map((hobby, index) => {
              if (index > 2) return null;
              const hobbyImageSrc = hobby.photo ? urlFor(hobby.photo).url() : null;
              const nodeDisplayNum = hobby.id ? hobby.id : (hobbyStack.indexOf(hobby) + 1);
              const tx = isMobile ? index * 6 : index * 16;
              const ty = isMobile ? index * -12 : index * -20;

              return (
                <div
                  key={hobby._id || index}
                  onClick={index === 0 ? rotateHobbyStack : undefined}
                  style={{ transform: `translateY(${ty}px) translateX(${tx}px) scale(${1 - index * 0.04})`, zIndex: 30 - index }}
                  className={`absolute inset-0 bg-[#1c1830] border-2 rounded-md p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row gap-4 items-center justify-between cursor-pointer shadow-2xl ${index === 0 ? 'border-[#ff5dd4] hover:border-white active-hobby-card' : 'border-[#2a2445] opacity-40'}`}
                >
                  <div className="flex-1 text-left w-full flex flex-col justify-center">
                    <span className="text-[9px] font-bold tracking-widest text-[#ff5dd4] uppercase block mb-1">Hobby Node {nodeDisplayNum < 10 ? `0${nodeDisplayNum}` : nodeDisplayNum}</span>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2 tracking-wide uppercase">{hobby.title}</h4>
                    <p className="text-[11px] sm:text-xs text-[#8878aa] leading-relaxed max-w-sm">{hobby.desc}</p>
                  </div>
                  
                  <div className="w-full sm:w-[42%] h-[160px] sm:h-full relative overflow-hidden bg-[#0a0812]/70 rounded border border-[#2a2445]">
                    {hobbyImageSrc ? <img src={hobbyImageSrc} alt={hobby.title} className="absolute inset-0 w-full h-full object-cover object-center" /> : <div className="w-full h-full flex items-center justify-center text-[9px] text-[#8878aa] uppercase font-bold">[ Slot ]</div>}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div aria-hidden className="pointer-events-none absolute inset-0 block z-[100] overflow-visible">
            {Array.from({ length: 20 }).map((_, index) => (
              <svg className={`absolute left-1/2 top-1/2 -ml-2 -mt-2 opacity-0 sparkle-${index}`} key={index} viewBox="0 0 122 117" width="16" height="16">
                <path className="fill-[#ff5dd4]" d="M64.39,2,80.11,38.76,120,42.33a3.2,3.2,0,0,1,1.83,5.59h0L91.64,74.25l8.92,39a3.2,3.2,0,0,1-4.87,3.4L61.44,96.19,27.09,116.73a3.2,3.2,0,0,1-4.76-3.46h0l8.92-39L1.09,47.92A3.2,3.2,0,0,1,3,42.32l39.74-3.56L58.49,2a3.2,3.2,0,0,1,5.9,0Z" />
              </svg>
            ))}
          </div>
        </div>
      </motion.section>

      {/* BACKGROUND MATRIX GRID */}
      <motion.section variants={retroBootVariant} initial="initial" whileInView="whileInView" viewport={retroBootVariant.viewport} id="about" className="max-w-[1100px] mx-auto px-4 py-12 w-full">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="font-bold text-xs text-white tracking-wider uppercase">Background matrix</h3>
          <div className="flex-1 h-[1px] bg-[#2a2445]" />
        </div>
        <motion.div variants={popContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: <FaGraduationCap className="text-xl text-[#f9c12f]" />, title: "Education Node", desc: "UTM Computer Science · 3.9 GPA" },
            { icon: <FaMusic className="text-xl text-[#ff5dd4]" />, title: "Acoustic Logic", desc: "ABRSM Grade 8 Classical Pianist" },
            { icon: <FaAward className="text-xl text-[#f15a29]" />, title: "Leadership Roles", desc: "SOF-EA Officer & Coordinator" },
            { icon: <FaLanguage className="text-xl text-[#ff9846]" />, title: "Languages Node", desc: "English, 中文, BM, Bahasa Indonesia" }
          ].map((item, idx) => (
            <motion.div variants={pixelPopItem} key={idx} className="bg-[#1c1830]/80 backdrop-blur-sm border border-[#2a2445] p-3.5 flex gap-3 items-center rounded">
              <div>{item.icon}</div>
              <div>
                <h4 className="text-[9px] uppercase text-[#8878aa]">{item.title}</h4>
                <p className="text-xs font-bold text-white">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* COMMS TERMINAL FOOTER */}
      <motion.footer initial={{ opacity: 0, scaleY: 0.005 }} whileInView={{ opacity: 1, scaleY: 1 }} transition={{ type: "spring", stiffness: 100, damping: 12 }} viewport={{ once: true }} id="contact" className="max-w-[1100px] mx-auto px-4 pb-20 pt-8 w-full">
        <div className="border-2 border-[#f9c12f] p-6 bg-[#12101e]/90 backdrop-blur-md text-center rounded">
          <h3 className="text-sm font-bold text-[#f9c12f] mb-2 tracking-wider uppercase">ESTABLISH COMMS TERMINAL</h3>
          <p className="text-xs text-[#8878aa] mb-5 max-w-sm mx-auto leading-relaxed">Open for 2026 internships. Based in Malaysia. Available for remote work.</p>
          <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto w-full">
            <a href={profile.github || '#'} target="_blank" rel="noreferrer" className="bg-[#1c1830] border border-[#2a2445] text-[#8878aa] text-[10px] py-2.5 rounded flex items-center justify-center gap-1.5 hover:text-white">
              <FaGithub /> GITHUB
            </a>
            <a href={profile.linkedin || '#'} target="_blank" rel="noreferrer" className="bg-[#1c1830] border border-[#2a2445] text-[#8878aa] text-[10px] py-2.5 rounded flex items-center justify-center gap-1.5 hover:text-white">
              <FaLinkedin /> LINKEDIN
            </a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}