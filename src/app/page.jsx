"use client";

import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// ----------------------------------------------------
// Global Module Constants (Static Data)
// ----------------------------------------------------


const marqueeItems = [
  { text: "🪷 Hare Krishna" },
  { text: "✦ ISKCON Founded 1966" },
  { text: "🕉️ Bhakti Yoga" },
  { text: "✦ Padayatra Worldwide" },
  { text: "🪷 Hare Rama" },
  { text: "✦ 800+ Temples" },
  { text: "🕉️ Srila Prabhupada" },
  { text: "✦ Vraja Parikrama" },
  { text: "🪷 Noida Expressway" },
];
const repeatedMarqueeItems = [...marqueeItems, ...marqueeItems];

const maharajTags = [
  "Padayatra Founder",
  "ISKCON GBC",
  "Vraja Parikrama",
  "Centennial Minister",
  "World Holy Name Festival",
  "ISKCON Noida Expressway",
];

const timelineEvents = [
  {
    year: "1949",
    emoji: "🌸",
    title: "Divine Birth",
    text: "Born in Aravade, Maharashtra — a serene village that would give the world one of its greatest Vaishnava saints.",
    num: "01",
    accent: false,
  },
  {
    year: "1972",
    emoji: "🙏",
    title: "Initiated Disciple",
    text: "Became an initiated disciple of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada — the founder-acharya of ISKCON.",
    num: "02",
    accent: true,
  },
  {
    year: "Dec 1975",
    emoji: "🔱",
    title: "Sannyasa Order",
    text: "Received the sannyasa order of renunciation directly from Srila Prabhupada at the age of 26 — vowing a lifetime of spiritual service.",
    num: "03",
    accent: false,
  },
  {
    year: "1984",
    emoji: "🚶",
    title: "Padayatra Movement",
    text: "Organised Padayatra — a walking festival — worldwide, preaching Lord Caitanya's message so the holy name would reach every village.",
    num: "04",
    accent: true,
  },
  {
    year: "1987",
    emoji: "🛕",
    title: "Vraja Parikrama",
    text: "Provided the inspiration for ISKCON's yearly Vraja-mandala Parikrama and is credited with developing the Navadvipa Parikrama.",
    num: "05",
    accent: false,
  },
  {
    year: "1996",
    emoji: "🌍",
    title: "Centennial Minister",
    text: "Coordinated Srila Prabhupada's global Centennial campaign with unprecedented success in books, prasadam, and festivals.",
    num: "06",
    accent: true,
  },
  {
    year: "2006",
    emoji: "🎵",
    title: "World Holy Name",
    text: "Took charge of the World Holy Name Festival, carrying Srila Prabhupada's message of Harinam Sankirtan to a global audience.",
    num: "07",
    accent: false,
  },
  {
    year: "Present",
    emoji: "🏛️",
    title: "ISKCON Noida",
    text: "Directing and inspiring the congregation at ISKCON Noida Expressway (Sector 151) as a cherished sanctuary of bhakti.",
    num: "08",
    accent: true,
  },
];

const minorContributions = [
  {
    num: "02",
    title: "Vraja-mandala Parikrama",
    text: "Since 1987, Maharaj leads thousands of devotees on ISKCON's yearly circumambulation of Vrindavan — a deeply transformative spiritual pilgrimage.",
    image: "/images/maharaj_devotees.jpg",
    delay: 0,
  },
  {
    num: "03",
    title: "Prabhupada Centennial",
    text: "As ISKCON Minister for Srila Prabhupada's Centennial, coordinated a global four-year campaign achieving unprecedented success in books, prasadam, and festivals in 1996.",
    image: "/images/maharaj_stage.jpg",
    delay: 120,
  },
  {
    num: "04",
    title: "Temple Building",
    text: "Established ISKCON temples across India — Aravade, Nagpur, Amravati, Pandharpur, Solapur, and Noida — including the beloved ISKCON Noida Expressway, Sector 151.",
    image: "/images/maharaj_ceremony.jpg",
    delay: 240,
  },
];

const missionItems = [
  {
    num: "01",
    title: "Spiritual Education",
    text: "To systematically teach the science of Krishna consciousness through classes, seminars, courses, retreats, and scriptural studies.",
    delay: 0,
  },
  {
    num: "02",
    title: "Congregational Chanting",
    text: "To promote the congregational chanting of the Hare Krishna Maha-mantra and encourage spiritual awakening through the Holy Name.",
    delay: 60,
  },
  {
    num: "03",
    title: "Community Building",
    text: "To create a caring and spiritually vibrant community based on devotional service, mutual respect, and meaningful relationships.",
    delay: 120,
  },
  {
    num: "04",
    title: "Youth Development",
    text: "To inspire and empower youth through value-based education, leadership programs, mentorship, and spiritual engagement.",
    delay: 180,
  },
  {
    num: "05",
    title: "Cultural Preservation",
    text: "To preserve and promote the rich spiritual and cultural heritage of the Vedic tradition through festivals, music, drama, literature, and devotional arts.",
    delay: 240,
  },
  {
    num: "06",
    title: "Prasadam Distribution",
    text: "To distribute sanctified vegetarian food and cultivate a culture of compassion, gratitude, and spiritual nourishment.",
    delay: 300,
  },
  {
    num: "07",
    title: "Spiritual Care & Counseling",
    text: "To provide guidance, support, and spiritual solutions for individuals navigating the challenges of modern life.",
    delay: 360,
  },
  {
    num: "08",
    title: "Outreach & Preaching",
    text: "To share the teachings of Lord Krishna through literature distribution, digital outreach, public programs, Harinam Sankirtan, and personal interactions.",
    delay: 420,
  },
  {
    num: "09",
    title: "Service to Society",
    text: "To engage in humanitarian and community welfare activities that contribute to the physical, emotional, and spiritual well-being of all.",
    delay: 480,
  },
  {
    num: "10",
    title: "Continuing Srila Prabhupada's Mission",
    text: "To faithfully preserve and expand the teachings of Srila Prabhupada, ensuring that the message of Lord Krishna reaches every town, village, and heart.",
    delay: 540,
  },
];

const coreTeachings = [
  {
    num: "01",
    title: "Simple Living, High Thinking",
    text: "Maharaj exemplifies this teaching in his own life — eating simply, sleeping minimally, and dedicating every waking moment to Krishna's service. By living simply, the mind becomes clear for devotional practice and genuine spiritual insight.",
    quote: "Simplicity is the highest sophistication of the spirit.",
    icon: "🌿",
    delay: 0,
  },
  {
    num: "02",
    title: "Chant the Maha-mantra",
    text: "The Hare Krishna Maha-mantra — as revealed by Lord Chaitanya Mahaprabhu — is the supreme spiritual practice for this age. Every syllable is a name of the Lord, a direct encounter with God, available to all, anywhere, at any time.",
    quote: "The Holy Name is the shelter for this age of Kali.",
    icon: "🎵",
    delay: 100,
  },
  {
    num: "03",
    title: "Preach Lord Chaitanya's Message",
    text: "Following Srila Prabhupada's instruction, Maharaj has dedicated his life to carrying Lord Chaitanya's message of universal love through Padayatra — walking where vehicles cannot reach, bringing Krishna to every soul on earth.",
    quote: "Every town and village shall hear the Holy Name.",
    icon: "🚶",
    delay: 200,
  },
  {
    num: "04",
    title: "Develop Pure Devotion",
    text: "The ultimate perfection of human life is pure love (prema) for Krishna. Through sincere hearing, chanting, and service, every soul can awaken the dormant love that already exists within — the Bhagavad-gita's greatest promise.",
    quote: "Surrender to Krishna and all perfections will follow.",
    icon: "💖",
    delay: 300,
  },
];

const galleryImages = [
  {
    src: "/images/maharaj_holding_deity.jpg",
    cap: "Maharaj at Darshan",
    delay: 0,
    area: "[grid-area:1/1/3/5] max-[900px]:[grid-area:1/1/2/7]",
  },
  {
    src: "/images/prabhupada_walking.jpg",
    cap: "Global Preaching",
    delay: 60,
    area: "[grid-area:1/5/2/9] max-[900px]:[grid-area:2/1/3/4]",
  },
  {
    src: "/images/maharaj_with_prabhupada.jpg",
    cap: "Devotional Inspiration",
    delay: 120,
    area: "[grid-area:1/9/2/13] max-[900px]:[grid-area:2/4/3/7]",
  },
  {
    src: "/images/maharaj_kirtan2.jpg",
    cap: "Kirtan Mahotsava",
    delay: 180,
    area: "[grid-area:2/5/3/8] max-[900px]:hidden",
  },
  {
    src: "/images/maharaj_close.jpg",
    cap: "Deep Meditation",
    delay: 240,
    area: "[grid-area:2/8/3/10] max-[900px]:hidden",
  },
  {
    src: "/images/maharaj_darshan.jpg",
    cap: "Vraja-mandala Parikrama",
    delay: 300,
    area: "[grid-area:2/10/3/13] max-[900px]:hidden",
  },
];

const discoursesLectures = [
  {
    id: "dc-watch-1",
    title: "The Power of Chanting the Maha-mantra",
    text: "Every syllable of the Hare Krishna mantra is a name of the Lord — how sincere chanting dissolves the ego and opens the heart to divine love.",
    image: "/images/prabhupada_lecture.jpg",
    duration: "45:32",
    category: "Bhakti Yoga",
    featured: false,
    delay: 0,
  },
  {
    id: "dc-watch-2",
    title: "Padayatra — Walking for God",
    text: "The miraculous origin of the Padayatra movement, Srila Prabhupada's divine instruction, and why walking barefoot is the purest form of preaching.",
    image: "/images/maharaj_lecture.jpg",
    duration: "1:02:18",
    category: "Featured",
    featured: true,
    delay: 120,
  },
  {
    id: "dc-watch-3",
    title: "Secrets of Vrindavan — Krishna's Holy Land",
    text: "The spiritual significance of Vrindavan and why every devotee should aspire to walk its sacred paths during the annual Vraja-mandala Parikrama.",
    image: "/images/maharaj_preaching.jpg",
    duration: "58:47",
    category: "Vraja Mandala",
    featured: false,
    delay: 240,
  },
];

// ----------------------------------------------------
// Main Consolidated Page Component
// ----------------------------------------------------
export default function Home() {
  // 1. Loader state and hooks
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaderDone(true);
      document.body.classList.add("ready");
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // 2. CursorGlow state and hooks
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({
        x: e.clientX - 160,
        y: e.clientY - 160,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 5. Parallax Hero hooks
  const heroImgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroImgRef.current) return;
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroImgRef.current.style.transform = `translateY(${y * 0.3}px) scale(1.0)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 6. StatsBand count up hooks and state
  const statsBandRef = useRef(null);
  const [statsValues, setStatsValues] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const element = statsBandRef.current;
    if (!element) return;
    let animated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !animated) {
          animated = true;
          let startTimestamp = null;
          const duration = 2200;
          const targets = [800, 1966, 70, 50];

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4); // ease-out-quart
            setStatsValues(targets.map((t) => Math.floor(eased * t)));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.unobserve(element);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // 7. FloatingChip intersection observers for About Us, About, and Maharaj
  const aboutUsSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const maharajSectionRef = useRef(null);
  const [aboutUsChipsVisible, setAboutUsChipsVisible] = useState([false, false]);
  const [aboutChipsVisible, setAboutChipsVisible] = useState([false, false]);
  const [maharajChipsVisible, setMaharajChipsVisible] = useState([false, false]);

  useEffect(() => {
    const element = aboutUsSectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAboutUsChipsVisible([true, false]), 0);
          setTimeout(() => setAboutUsChipsVisible([true, true]), 250);
          observer.unobserve(element);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = aboutSectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAboutChipsVisible([true, false]), 0);
          setTimeout(() => setAboutChipsVisible([true, true]), 250);
          observer.unobserve(element);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = maharajSectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setMaharajChipsVisible([true, false]), 0);
          setTimeout(() => setMaharajChipsVisible([true, true]), 250);
          observer.unobserve(element);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // 8. JourneyTimeline dragging state and actions
  const timelineRef = useRef(null);
  const [timelineIsDown, setTimelineIsDown] = useState(false);
  const [timelineStartX, setTimelineStartX] = useState(0);
  const [timelineScrollLeft, setTimelineScrollLeft] = useState(0);
  const [timelineHintOpacity, setTimelineHintOpacity] = useState(0.7);

  const handleTimelineMouseDown = (e) => {
    const el = timelineRef.current;
    if (!el) return;
    setTimelineIsDown(true);
    el.classList.add("grabbing");
    setTimelineStartX(e.pageX - el.offsetLeft);
    setTimelineScrollLeft(el.scrollLeft);
  };

  const handleTimelineMouseLeave = () => {
    setTimelineIsDown(false);
    timelineRef.current?.classList.remove("grabbing");
  };

  const handleTimelineMouseUp = () => {
    setTimelineIsDown(false);
    timelineRef.current?.classList.remove("grabbing");
  };

  const handleTimelineMouseMove = (e) => {
    const el = timelineRef.current;
    if (!timelineIsDown || !el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - timelineStartX) * 1.5;
    el.scrollLeft = timelineScrollLeft - walk;
  };

  const handleTimelineScroll = () => {
    if (timelineHintOpacity > 0) {
      setTimelineHintOpacity(0);
    }
  };

  // 9. Photo Gallery Lightbox states and listeners
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxActiveIndex, setLightboxActiveIndex] = useState(0);

  const handleOpenLightbox = (idx) => {
    setLightboxActiveIndex(idx);
    setLightboxOpen(true);
  };

  const handlePrevImage = () => {
    setLightboxActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextImage = () => {
    setLightboxActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, lightboxActiveIndex]);

  // 10. AOS Library and Logger Initialization
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 950,
      easing: "ease-out-quart",
      offset: 70,
    });

    console.log(
      "%c🪷 Jai Shri Krishna! Hare Krishna Hare Rama! 🪷",
      "color:#D4AF37; font-size:14px; font-family:serif; background:#1A0C06; padding:8px 16px; border-radius:4px;"
    );
  }, []);
  //  Our Eternal Purpose
  const leftMissionItems = missionItems.slice(6, 8); // 7,8
  const rightMissionItems = [
    ...missionItems.slice(0, 6), // 1-6
    ...missionItems.slice(8, 10), // 9-10
  ];

  return (
    <>
      {/* 1. Loader Overlay */}
      <div
        id="loader"
        className={`fixed inset-0 z-[99999] bg-dark flex flex-col items-center justify-center gap-5 transition-all duration-[800ms] ease-in-out ${loaderDone ? "opacity-0 pointer-events-none invisible" : ""
          }`}
      >
        <div className="loader-mandala w-[120px] h-[120px]">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="#D4AF37"
              strokeWidth="0.5"
              strokeDasharray="4 8"
              className="spin-cw"
            />
            <circle
              cx="100"
              cy="100"
              r="70"
              stroke="#E8721E"
              strokeWidth="0.5"
              strokeDasharray="2 6"
              className="spin-ccw"
            />
            <circle
              cx="100"
              cy="100"
              r="50"
              stroke="#D4AF37"
              strokeWidth="1"
              strokeDasharray="1 4"
              className="spin-cw"
            />
            <text
              x="50%"
              y="54%"
              textAnchor="middle"
              fill="#D4AF37"
              fontSize="28"
              fontFamily="serif"
            >
              ॐ
            </text>
          </svg>
        </div>
        <p className="loader-text font-cinzel text-[0.85rem] tracking-[0.5em] text-gold/70 uppercase">
          Hare Krishna
        </p>
      </div>

      {/* 2. Cursor Glow */}
      <div
        id="cursor-glow"
        style={{
          transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
        }}
      />





      <main>
        {/* 5. Hero Section */}
        <section id="hero" className="h-screen min-h-[700px] relative flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              ref={heroImgRef}
              src="/images/prabhupada_bliss.jpg"
              alt="HH Lokanath Swami Maharaj preaching with Srila Prabhupada portrait"
              id="heroParallaxImg"
              className="w-full h-full object-cover origin-center transition-transform duration-100 ease-linear"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(26,12,6,0.2)_0%,rgba(26,12,6,0.1)_40%,rgba(26,12,6,0.65)_75%,rgba(26,12,6,0.92)_100%)]"></div>
          </div>
          <div className="absolute top-1/2 right-[6%] -translate-y-[16.666%] w-[min(600px,55vw)] opacity-40 pointer-events-none hero-mandala-wrap max-md:hidden" aria-hidden="true">
            <svg className="w-full h-full" viewBox="0 0 600 600" fill="none">
              <circle cx="300" cy="300" r="280" stroke="rgba(212,175,55,0.12)" strokeWidth="1" />
              <circle cx="300" cy="300" r="240" stroke="rgba(212,175,55,0.08)" strokeWidth="1" strokeDasharray="8 16" />
              <circle cx="300" cy="300" r="200" stroke="rgba(232,114,30,0.1)" strokeWidth="1" />
              <circle cx="300" cy="300" r="160" stroke="rgba(212,175,55,0.15)" strokeWidth="0.5" strokeDasharray="4 8" />
              <circle cx="300" cy="300" r="120" stroke="rgba(212,175,55,0.12)" strokeWidth="1" />
              <g opacity="0.15">
                <ellipse cx="300" cy="160" rx="20" ry="60" fill="#D4AF37" />
                <ellipse cx="300" cy="160" rx="20" ry="60" fill="#D4AF37" transform="rotate(45,300,300)" />
                <ellipse cx="300" cy="160" rx="20" ry="60" fill="#D4AF37" transform="rotate(90,300,300)" />
                <ellipse cx="300" cy="160" rx="20" ry="60" fill="#D4AF37" transform="rotate(135,300,300)" />
                <ellipse cx="300" cy="160" rx="20" ry="60" fill="#D4AF37" transform="rotate(180,300,300)" />
                <ellipse cx="300" cy="160" rx="20" ry="60" fill="#D4AF37" transform="rotate(225,300,300)" />
                <ellipse cx="300" cy="160" rx="20" ry="60" fill="#D4AF37" transform="rotate(270,300,300)" />
                <ellipse cx="300" cy="160" rx="20" ry="60" fill="#D4AF37" transform="rotate(315,300,300)" />
              </g>
            </svg>
          </div>

          <div className="relative z-10 max-w-[1320px] w-full mx-auto px-12 pb-[90px] max-sm:px-6 max-sm:pb-[80px]">
            <div
              className="inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.3em] uppercase text-gold-lt/85 mb-5"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 shadow-[0_0_8px_var(--color-gold)] hb-dot"></span> ISKCON Noida Expressway · Sector 151
            </div>
            <h1
              className="flex flex-col mb-6"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="100"
            >
              <span className="font-display text-[clamp(1rem,2vw,1.4rem)] font-normal italic text-gold-lt/80 tracking-[0.15em] mb-1.5">His Holiness</span>
              <span className="font-display text-[clamp(3.5rem,8vw,8rem)] font-bold leading-[0.95] text-white shadow-[0_4px_40px_rgba(0,0,0,0.0)] max-sm:text-[3.2rem]">Lokanath<br />Swami</span>
              <span className="font-cinzel text-[clamp(1rem,2.5vw,2rem)] font-normal tracking-[0.6em] text-gold uppercase mt-3">Maharaj</span>
            </h1>
            <p
              className="text-[clamp(0.9rem,1.5vw,1.1rem)] text-white/72 max-w-[560px] leading-[1.9] mb-8"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              Senior disciple of Srila Prabhupada · Founder of the Global Padayatra
              Movement<br />
              Spiritual inspiration behind ISKCON Noida Expressway
            </p>
            <div
              className="flex gap-4 flex-wrap mb-12 max-sm:flex-col"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="450"
            >
              <a href="#maharaj" className="inline-flex items-center gap-2 px-9 py-[15px] bg-saffron text-white font-sans text-[0.9rem] font-semibold tracking-[0.05em] rounded-[4px] transition-all duration-300 relative overflow-hidden hover:bg-[#c55e14] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(232,114,30,0.35)]" id="hero-discover">Discover Maharaj</a>
              <a href="#vision" className="inline-flex items-center gap-2 px-9 py-[15px] border-[1.5px] border-white/40 text-white/85 text-[0.9rem] font-medium tracking-[0.05em] rounded-[4px] transition-all duration-300 backdrop-blur-[4px] hover:border-gold hover:text-gold max-sm:w-fit" id="hero-vision">Our Vision ↓</a>
            </div>
            <div className="inline-flex items-center gap-3 px-5 py-3.5 border-l-2 border-gold bg-gold/6 backdrop-blur-md max-w-[520px]" data-aos="fade-up" data-aos-delay="600">
              <svg viewBox="0 0 24 24" fill="#D4AF37" width="20" className="shrink-0">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
              <em className="font-display text-base italic text-white/80 leading-[1.6]">Simple Living, High Thinking — the eternal teaching of Maharaj</em>
            </div>
          </div>
          <a href="#about-us" className="absolute bottom-9 right-12 w-11 h-11 rounded-full border border-white/30 text-white/60 flex items-center justify-center transition-all duration-300 hero-scroll hover:border-gold hover:text-gold" aria-label="Scroll down">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </section>

        {/* 6. Marquee Loop */}
        <div className="bg-saffron overflow-hidden whitespace-nowrap py-3.5" aria-hidden="true">
          <div className="inline-flex gap-0 marquee-track">
            {repeatedMarqueeItems.map((item, idx) => (
              <span
                key={idx}
                className="font-cinzel text-[0.78rem] font-semibold tracking-[0.2em] text-white px-8 opacity-90"
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>

        {/* 7. StatsBand */}
        <div ref={statsBandRef} className="stats-band bg-[linear-gradient(135deg,var(--color-saffron)_0%,#c55e14_40%,#a04010_100%)] py-15 px-12 relative overflow-hidden max-sm:p-[40px_24px]">
          <div className="relative max-w-[1000px] mx-auto flex items-center justify-center gap-0 max-sm:flex-wrap">
            <div className="flex-1 text-center p-4 max-sm:flex-[0_0_50%]" data-aos="fade-up" data-aos-delay={0}>
              <div className="font-display text-[clamp(2.8rem,5vw,4.5rem)] font-bold text-white leading-none mb-2 sb-num">
                {statsValues[0]}+
              </div>
              <div className="text-[0.78rem] tracking-[0.15em] uppercase text-white/70 font-medium">Temples Worldwide</div>
            </div>
            <div className="text-white/25 text-[1.2rem] px-2 max-sm:hidden" aria-hidden="true">✦</div>

            <div className="flex-1 text-center p-4 max-sm:flex-[0_0_50%]" data-aos="fade-up" data-aos-delay={80}>
              <div className="font-display text-[clamp(2.8rem,5vw,4.5rem)] font-bold text-white leading-none mb-2 sb-num">
                {statsValues[1]}
              </div>
              <div className="text-[0.78rem] tracking-[0.15em] uppercase text-white/70 font-medium">Year ISKCON Founded</div>
            </div>
            <div className="text-white/25 text-[1.2rem] px-2 max-sm:hidden" aria-hidden="true">✦</div>

            <div className="flex-1 text-center p-4 max-sm:flex-[0_0_50%]" data-aos="fade-up" data-aos-delay={160}>
              <div className="font-display text-[clamp(2.8rem,5vw,4.5rem)] font-bold text-white leading-none mb-2 sb-num">
                {statsValues[2]}+
              </div>
              <div className="text-[0.78rem] tracking-[0.15em] uppercase text-white/70 font-medium">Volumes by Prabhupada</div>
            </div>
            <div className="text-white/25 text-[1.2rem] px-2 max-sm:hidden" aria-hidden="true">✦</div>

            <div className="flex-1 text-center p-4 max-sm:flex-[0_0_50%]" data-aos="fade-up" data-aos-delay={240}>
              <div className="font-display text-[clamp(2.8rem,5vw,4.5rem)] font-bold text-white leading-none mb-2 sb-num">
                {statsValues[3]}+
              </div>
              <div className="text-[0.78rem] tracking-[0.15em] uppercase text-white/70 font-medium">Years Maharaj's Service</div>
            </div>
          </div>
        </div>

        {/* 8. Noida Expressway About Section */}
        <section ref={aboutUsSectionRef} id="about-us" className="relative py-14 px-12 bg-ivory overflow-hidden max-sm:py-20 max-sm:px-6">
          <div className="absolute top-[60px] right-12 font-cinzel text-[8rem] font-bold text-saffron/[0.06] pointer-events-none leading-none select-none" aria-hidden="true">01</div>
          <div className="max-w-[1320px] mx-auto grid grid-cols-2 gap-[100px] items-center max-lg:gap-[60px] max-md:grid-cols-1">
            <div className="flex flex-col" data-aos="fade-left" data-aos-duration="1100" data-aos-delay="150">
              <p className="font-sans text-[0.72rem] font-semibold tracking-[0.4em] uppercase text-saffron mb-3.5 block">Welcome to ISKCON Noida Expressway</p>
              <h2 className="font-display text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.05] text-text mb-6">About<br /><em className="italic text-saffron not-italic">Us</em></h2>

              <div className="font-display text-[1.25rem] italic text-text-mid leading-[1.8] border-l-[3px] border-gold pl-5 mb-6">
                Welcome to ISKCON Noida Expressway, a spiritual sanctuary dedicated to the teachings of Lord Krishna as presented through the Gaudiya Vaishnava tradition. Inspired by the vision of His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada and guided by the blessings of His Holiness Lokanath Swami Maharaj, ISKCON Noida Expressway serves as a center for spiritual learning, devotional practice, cultural preservation, and community service.
              </div>

              <p className="text-[0.95rem] text-text-lt leading-[2] mb-4.5">
                Situated in Sector 151, Noida, our temple welcomes people from all backgrounds to experience the transformative power of Krishna consciousness through kirtan, scriptural study, deity worship, prasadam, festivals, and devotional association.
              </p>
              <p className="text-[0.95rem] text-text-lt leading-[2] mb-4.5">
                Our purpose is to help individuals discover inner peace, spiritual wisdom, and a deeper connection with the Supreme Lord, Sri Krishna.
              </p>
            </div>

            <div className="relative" data-aos="fade-right" data-aos-duration="1100">
              <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] shadow-[0_30px_80px_rgba(44,24,16,0.18)]">
                <img
                  src="/images/maharaj_assembly.jpg"
                  alt="ISKCON Noida Expressway assembly"
                  className="w-full h-full object-cover transition-transform duration-800 ease-in-out hover:scale-[1.04]"
                />
                <div className="absolute top-[-12px] left-[-12px] w-[60px] h-[60px] border-t-2 border-l-2 border-gold pointer-events-none"></div>
                <div className="absolute bottom-[-12px] right-[-12px] w-[60px] h-[60px] border-b-2 border-r-2 border-gold pointer-events-none"></div>
              </div>

              {/* Chip 1 */}
              <div
                style={{
                  opacity: aboutUsChipsVisible[0] ? 1 : 0,
                  transform: aboutUsChipsVisible[0] ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity .6s ease, transform .6s ease",
                }}
                className="absolute bg-white border border-gold/25 shadow-[0_8px_32px_rgba(44,24,16,0.12)] rounded-[12px] p-[14px_20px] flex flex-col gap-0.5 av-chip max-md:hidden bottom-[-20px] right-[-30px]"
              >
                <strong className="font-display text-[1.6rem] font-bold text-saffron leading-none">Sector 151</strong>
                <span className="text-[0.72rem] font-medium text-text-lt tracking-[0.06em] uppercase">Noida, UP</span>
              </div>

              {/* Chip 2 */}
              <div
                style={{
                  opacity: aboutUsChipsVisible[1] ? 1 : 0,
                  transform: aboutUsChipsVisible[1] ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity .6s ease, transform .6s ease",
                }}
                className="absolute bg-white border border-gold/25 shadow-[0_8px_32px_rgba(44,24,16,0.12)] rounded-[12px] p-[14px_20px] flex flex-col gap-0.5 av-chip max-md:hidden top-10 left-[-30px]"
              >
                <strong className="font-display text-[1.6rem] font-bold text-saffron leading-none">All Welcome</strong>
                <span className="text-[0.72rem] font-medium text-text-lt tracking-[0.06em] uppercase">Spiritual Center</span>
              </div>
            </div>
          </div>
        </section>

        {/* 9. About ISKCON Section */}
        <section ref={aboutSectionRef} id="about-iskcon" className="relative py-14 px-12 bg-cream overflow-hidden max-sm:py-20 max-sm:px-6">
          <div className="absolute top-[60px] right-12 font-cinzel text-[8rem] font-bold text-saffron/[0.06] pointer-events-none leading-none select-none" aria-hidden="true">02</div>
          <div className="max-w-[1320px] mx-auto grid grid-cols-2 gap-[100px] items-center max-lg:gap-[60px] max-md:grid-cols-1">
            <div className="relative" data-aos="fade-right" data-aos-duration="1100">
              <div className="relative rounded-[24px] overflow-hidden aspect-[4/5] shadow-[0_30px_80px_rgba(44,24,16,0.18)]">
                <img
                  src="/images/prabhupada_joy.jpg"
                  alt="Srila Prabhupada smiling"
                  className="w-full h-full object-cover transition-transform duration-800 ease-in-out hover:scale-[1.04]"
                />
                <div className="absolute top-[-12px] left-[-12px] w-[60px] h-[60px] border-t-2 border-l-2 border-gold pointer-events-none"></div>
                <div className="absolute bottom-[-12px] right-[-12px] w-[60px] h-[60px] border-b-2 border-r-2 border-gold pointer-events-none"></div>
              </div>

              {/* Chip 1 */}
              <div
                style={{
                  opacity: aboutChipsVisible[0] ? 1 : 0,
                  transform: aboutChipsVisible[0] ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity .6s ease, transform .6s ease",
                }}
                className="absolute bg-white border border-gold/25 shadow-[0_8px_32px_rgba(44,24,16,0.12)] rounded-[12px] p-[14px_20px] flex flex-col gap-0.5 av-chip max-md:hidden bottom-[-20px] right-[-30px]"
              >
                <strong className="font-display text-[1.6rem] font-bold text-saffron leading-none">13 July</strong>
                <span className="text-[0.72rem] font-medium text-text-lt tracking-[0.06em] uppercase">Founded, 1966</span>
              </div>

              {/* Chip 2 */}
              <div
                style={{
                  opacity: aboutChipsVisible[1] ? 1 : 0,
                  transform: aboutChipsVisible[1] ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity .6s ease, transform .6s ease",
                }}
                className="absolute bg-white border border-gold/25 shadow-[0_8px_32px_rgba(44,24,16,0.12)] rounded-[12px] p-[14px_20px] flex flex-col gap-0.5 av-chip max-md:hidden top-10 left-[-30px]"
              >
                <strong className="font-display text-[1.6rem] font-bold text-saffron leading-none">800+</strong>
                <span className="text-[0.72rem] font-medium text-text-lt tracking-[0.06em] uppercase">Temples & Centres</span>
              </div>
            </div>

            <div className="flex flex-col" data-aos="fade-left" data-aos-duration="1100" data-aos-delay="150">
              <p className="font-sans text-[0.72rem] font-semibold tracking-[0.4em] uppercase text-saffron mb-3.5 block">The Hare Krishna Movement</p>
              <h2 className="font-display text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.05] text-text mb-6">About<br /><em className="italic text-saffron not-italic">ISKCON</em></h2>

              <div className="font-display text-[1.25rem] italic text-text-mid leading-[1.8] border-l-[3px] border-gold pl-5 mb-6">
                The International Society for Krishna Consciousness (ISKCON), popularly known as the Hare
                Krishna Movement, was founded in 1966 in New York City by His Divine Grace A.C.
                Bhaktivedanta Swami Srila Prabhupada. ISKCON represents an authentic spiritual tradition that
                traces its teachings through an unbroken disciplic succession originating from Lord Sri Krishna
                Himself.
              </div>

              <p className="text-[0.95rem] text-text-lt leading-[2] mb-4.5">
                Established with the purpose of sharing the timeless wisdom of Bhagavad-gita and Srimad
                Bhagavatam, ISKCON has grown into a worldwide spiritual movement with hundreds of temples,
                educational institutions, farm communities, cultural centers, and humanitarian projects across
                more than one hundred countries.
              </p>
              <p className="text-[0.95rem] text-text-lt leading-[2] mb-4.5">
                The foundation of ISKCON rests upon the teachings of Lord Chaitanya Mahaprabhu, who taught
                that the chanting of the holy names of God is the most effective means of attaining spiritual
                realization in the present age. Through the chanting of the Hare Krishna Maha-mantra,
                devotional service, scriptural study, and saintly association, individuals can awaken their
                dormant love for God and attain genuine happiness.
              </p>
              <p className="text-[0.95rem] text-text-lt leading-[2] mb-4.5">
                Over the decades, ISKCON has positively impacted millions of lives through spiritual education,
                youth development programs, cultural festivals, prasadam distribution, literature distribution,
                environmental initiatives, and community outreach activities. The movement continues to
                inspire people worldwide to embrace a life centered on devotion, compassion, simplicity, and
                spiritual wisdom.
              </p>
              <p className="text-[0.95rem] text-text-lt leading-[2] mb-4.5">
                At ISKCON Noida Expressway, we strive to uphold these principles by creating an environment
                where individuals and families can deepen their spiritual understanding, cultivate meaningful
                relationships, and engage in devotional service. Through daily temple programs, educational
                courses, congregational gatherings, youth initiatives, and spiritual counseling, we endeavor to
                bring the teachings of Krishna consciousness to every home and heart.
              </p>

              <div className="flex flex-col gap-3 mt-8 pt-8 border-t border-gold/20">
                <div className="flex items-center gap-4 py-3">
                  <div className="text-[1.4rem] w-11 h-11 bg-warm-gray rounded-full flex items-center justify-center shrink-0">🛕</div>
                  <div className="flex flex-col">
                    <strong className="text-[0.9rem] font-semibold text-text">Deity Worship</strong>
                    <span className="text-[0.8rem] text-text-lt">Daily Mangala Arati to Sandhya</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 py-3">
                  <div className="text-[1.4rem] w-11 h-11 bg-warm-gray rounded-full flex items-center justify-center shrink-0">🎵</div>
                  <div className="flex flex-col">
                    <strong className="text-[0.9rem] font-semibold text-text">Kirtan & Satsang</strong>
                    <span className="text-[0.8rem] text-text-lt">Congregational chanting of the Holy Name</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 py-3">
                  <div className="text-[1.4rem] w-11 h-11 bg-warm-gray rounded-full flex items-center justify-center shrink-0">📖</div>
                  <div className="flex flex-col">
                    <strong className="text-[0.9rem] font-semibold text-text">Vedic Education</strong>
                    <span className="text-[0.8rem] text-text-lt">Bhagavad-gita, Srimad-Bhagavatam</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 py-3">
                  <div className="text-[1.4rem] w-11 h-11 bg-warm-gray rounded-full flex items-center justify-center shrink-0">🍽️</div>
                  <div className="flex flex-col">
                    <strong className="text-[0.9rem] font-semibold text-text">Prasadam Distribution</strong>
                    <span className="text-[0.8rem] text-text-lt">Sanctified food for all souls</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Srila Prabhupada Section */}
        <section id="prabhupada" className="relative py-0 bg-[linear-gradient(160deg,var(--color-dark)_0%,#3a1a0c_55%,#5c2010_100%)] overflow-hidden prabhupada-section">
          <div className="relative max-w-[1320px] mx-auto grid grid-cols-2 gap-20 items-center py-14 px-12 max-lg:grid-cols-1 max-lg:p-[80px_48px] max-sm:p-[80px_24px]">
            <div className="flex flex-col" data-aos="fade-right" data-aos-duration="1100">
              <p className="font-sans text-[0.72rem] font-semibold tracking-[0.4em] uppercase text-gold-lt/80 mb-3.5 block">Founder-Acharya</p>
              <h2 className="font-display text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.05] text-white mb-6">Srila<br /><em className="italic text-gold-lt not-italic">Prabhupada</em></h2>
              <div className="font-cinzel text-[0.85rem] tracking-[0.3em] text-gold/60 mb-7">1896 — 1977</div>
              <p className="text-[0.95rem] text-white/65 leading-[2] mb-4.5">
                His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada is the Founder-Acharya of the
                International Society for Krishna Consciousness and one of the most influential spiritual teachers
                of the modern era.
              </p>
              <p className="text-[0.95rem] text-white/65 leading-[2] mb-4.5">
                Born as Abhay Charan De on September 1, 1896, in Kolkata, India, Srila Prabhupada dedicated
                his life to fulfilling the instruction of his spiritual master, Srila Bhaktisiddhanta Sarasvati
                Thakura, who requested him to spread the teachings of Lord Chaitanya Mahaprabhu throughout
                the English-speaking world.
              </p>
              <p className="text-[0.95rem] text-white/65 leading-[2] mb-4.5">
                In 1965, at the age of sixty-nine, Srila Prabhupada courageously sailed alone to the United States
                aboard the cargo ship Jaladuta. Possessing little material support but immense faith in Lord
                Krishna, he began a spiritual mission that would eventually transform the lives of millions
                around the globe.
              </p>
              <p className="text-[0.95rem] text-white/65 leading-[2] mb-4.5">
                Within a short span of time, Srila Prabhupada established ISKCON and inspired thousands of
                people to adopt the principles of Krishna consciousness. He traveled extensively, delivered
                lectures, established temples, initiated disciples, and guided a growing worldwide spiritual
                movement.
              </p>
              <p className="text-[0.95rem] text-white/65 leading-[2] mb-4.5">
                One of Srila Prabhupada's greatest contributions was his extensive literary work. He translated
                and wrote authoritative commentaries on sacred Vedic scriptures, including Bhagavad-gita As It
                Is, Srimad Bhagavatam, Sri Chaitanya Charitamrita, The Nectar of Devotion, and many other
                Spiritual classics. These books have been translated into dozens of languages and continue to
                guide seekers across the world.
              </p>
              <p className="text-[0.95rem] text-white/65 leading-[2] mb-4.5">
                Srila Prabhupada envisioned a society founded upon spiritual values, God consciousness,
                compassion, and service. His teachings emphasize the chanting of the Hare Krishna Maha-mantra,
                study of scripture, association with devotees, and engagement in devotional service.
              </p>
              <p className="text-[0.95rem] text-white/65 leading-[2] mb-4.5">
                Today, his legacy lives on through thousands of temples, millions of followers, and countless
                spiritual projects worldwide. Every activity of ISKCON Noida Expressway is inspired by Srila
                Prabhupada's instructions and dedicated to carrying forward his mission of spreading Krishna
                consciousness for the welfare of humanity.
              </p>
              <div className="flex gap-8 mt-9 pt-9 border-t border-white/15">
                <div className="flex flex-col gap-1">
                  <span className="font-display text-[2.2rem] font-bold text-gold leading-none">14×</span>
                  <span className="text-[0.72rem] tracking-[0.12em] uppercase text-white/40">Circled the Globe</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-[2.2rem] font-bold text-gold leading-none">108</span>
                  <span className="text-[0.72rem] tracking-[0.12em] uppercase text-white/40">Temples Established</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-display text-[2.2rem] font-bold text-gold leading-none">70+</span>
                  <span className="text-[0.72rem] tracking-[0.12em] uppercase text-white/40">Volumes of Literature</span>
                </div>
              </div>
            </div>

            <div className="relative" data-aos="fade-left" data-aos-duration="1100" data-aos-delay="150">
              <div className="relative rounded-[24px] overflow-hidden aspect-[4/5] shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
                <img
                  src="/images/prabhupada_mala.jpg"
                  alt="Srila Prabhupada holding chanting beads"
                  className="w-full h-full object-cover transition-transform duration-800 ease-in-out hover:scale-[1.04]"
                />
                <div className="absolute top-[-12px] left-[-12px] w-[60px] h-[60px] border-t-2 border-l-2 border-gold pointer-events-none"></div>
                <div className="absolute bottom-[-12px] right-[-12px] w-[60px] h-[60px] border-b-2 border-r-2 border-gold pointer-events-none"></div>
              </div>
              <div className="absolute bottom-[-28px] left-[-28px] bg-dark/92 border border-gold/25 backdrop-blur-[20px] rounded-[16px] p-[20px_24px] max-w-[280px] shadow-[0_20px_60px_rgba(0,0,0,0.4)] z-10 max-lg:static max-lg:mt-6 max-lg:max-w-full">
                <div className="text-[1.4rem] text-gold mb-2.5 pvq-om">ॐ</div>
                <blockquote className="font-display text-[0.9rem] italic text-white/80 leading-[1.7] mb-2.5">
                  "Chanting Hare Krishna is the best service you can offer to God and to all of humanity."
                </blockquote>
                <cite className="text-[0.7rem] tracking-[0.12em] uppercase text-gold/60 not-italic">— Srila Prabhupada</cite>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Maharaj Section */}
        <section ref={maharajSectionRef} id="maharaj" className="relative py-14 px-12 bg-ivory overflow-hidden max-sm:py-20 max-sm:px-6">
          <div className="absolute top-[60px] right-12 font-cinzel text-[8rem] font-bold text-saffron/[0.06] pointer-events-none leading-none select-none" aria-hidden="true">03</div>
          <div className="max-w-[1320px] mx-auto grid grid-cols-2 gap-[100px] items-center max-lg:gap-[60px] max-md:grid-cols-1">
            <div className="relative" data-aos="fade-right" data-aos-duration="1100">
              <div className="relative rounded-[24px] overflow-hidden aspect-[4/5] shadow-[0_30px_80px_rgba(44,24,16,0.18)]">
                <img
                  src="/images/maharaj_smiling.jpg"
                  alt="HH Lokanath Swami Maharaj smiling portrait"
                  className="w-full h-full object-cover transition-transform duration-800 ease-in-out hover:scale-[1.04]"
                />
                <div className="absolute top-[-12px] left-[-12px] w-[60px] h-[60px] border-t-2 border-l-2 border-gold pointer-events-none"></div>
                <div className="absolute bottom-[-12px] right-[-12px] w-[60px] h-[60px] border-b-2 border-r-2 border-gold pointer-events-none"></div>
              </div>

              {/* Chip 1 */}
              <div
                style={{
                  opacity: maharajChipsVisible[0] ? 1 : 0,
                  transform: maharajChipsVisible[0] ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity .6s ease, transform .6s ease",
                }}
                className="absolute bg-white border border-gold/25 shadow-[0_8px_32px_rgba(44,24,16,0.12)] rounded-[12px] p-[14px_20px] flex flex-col gap-0.5 av-chip max-md:hidden bottom-[-20px] right-[-30px]"
              >
                <strong className="font-display text-[1.6rem] font-bold text-saffron leading-none">1949</strong>
                <span className="text-[0.72rem] font-medium text-text-lt tracking-[0.06em] uppercase">Born, Aravade MH</span>
              </div>

              {/* Chip 2 */}
              <div
                style={{
                  opacity: maharajChipsVisible[1] ? 1 : 0,
                  transform: maharajChipsVisible[1] ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity .6s ease, transform .6s ease",
                }}
                className="absolute bg-white border border-gold/25 shadow-[0_8px_32px_rgba(44,24,16,0.12)] rounded-[12px] p-[14px_20px] flex flex-col gap-0.5 av-chip max-md:hidden top-10 left-[-30px]"
              >
                <strong className="font-display text-[1.6rem] font-bold text-saffron leading-none">1972</strong>
                <span className="text-[0.72rem] font-medium text-text-lt tracking-[0.06em] uppercase">Initiated Disciple</span>
              </div>
            </div>

            <div className="flex flex-col" data-aos="fade-left" data-aos-duration="1100" data-aos-delay="150">
              <p className="font-sans text-[0.72rem] font-semibold tracking-[0.4em] uppercase text-saffron mb-3.5 block">Senior Disciple of Srila Prabhupada</p>
              <h2 className="font-display text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.05] text-text mb-6">HH Lokanath<br /><em className="italic text-saffron not-italic">Swami Maharaj</em></h2>
              <div className="font-display text-[1.25rem] italic text-text-mid leading-[1.8] border-l-[3px] border-gold pl-5 mb-6">
                His Holiness Lokanath Swami Maharaj is one of the most respected and beloved spiritual leaders
                within ISKCON and a senior disciple of His Divine Grace A.C. Bhaktivedanta Swami Srila
                Prabhupada.
              </div>
              <p className="text-[0.95rem] text-text-lt leading-[2] mb-4.5">
                Born in 1949 in the village of Aravade, Maharashtra, India, Maharaj developed a deep spiritual
                inclination from an early age. His quest for spiritual realization led him to Srila Prabhupada,
                from whom he received initiation in 1972. In December 1975, at the age of twenty-six, he
                accepted the renounced order of life (Sannyasa) directly from Srila Prabhupada.
              </p>
              <p className="text-[0.95rem] text-text-lt leading-[2] mb-4.5">
                Among the most significant instructions Maharaj received from Srila Prabhupada was to spread
                Lord Chaitanya Mahaprabhu's message through Padayatra—the tradition of walking from village
                to village while sharing the Holy Name of Krishna. Taking this instruction to heart, Maharaj
                dedicated himself to organizing and participating in extensive Padayatras across India and
                around the world.
              </p>
              <p className="text-[0.95rem] text-text-lt leading-[2] mb-4.5">
                Through these journeys, he carried the message of Krishna consciousness to countless people
                and helped establish a deeper appreciation for devotional culture and spiritual values. He
                personally traveled thousands of kilometers on foot, visiting many of India's sacred pilgrimage
                sites and inspiring devotees through his dedication and simplicity.
              </p>
              <p className="text-[0.95rem] text-text-lt leading-[2] mb-4.5">
                As the ISKCON Minister for Srila Prabhupada's Centennial Celebrations, Maharaj coordinated a
                historic worldwide campaign culminating in the grand centennial celebrations of 1996. The
                campaign witnessed remarkable achievements in book distribution, prasadam distribution,
                Harinam Sankirtan, and spiritual outreach activities worldwide.
              </p>
              <p className="text-[0.95rem] text-text-lt leading-[2] mb-4.5">
                Maharaj has also played a significant role in establishing and nurturing numerous ISKCON
                projects across India, including centers in Aravade, Nagpur, Amravati, Solapur, Pandharpur, and
                Noida.
              </p>
              <p className="text-[0.95rem] text-text-lt leading-[2] mb-4.5">
                One of his cherished contributions is the inspiration and guidance behind ISKCON Noida
                Expressway, envisioned as a spiritual home for the growing population of the National Capital
                Region. Through his blessings and encouragement, the temple has become a center for
                devotional service, spiritual education, youth engagement, cultural preservation, and community
                outreach.
              </p>
              <p className="text-[0.95rem] text-text-lt leading-[2] mb-4.5">
                Maharaj is widely appreciated for his heartfelt kirtans, inspiring lectures, profound scriptural
                insights, humility, and compassionate dealings. His life exemplifies the principle of “Simple
                Living and High Thinking,” encouraging devotees to cultivate devotion, purity, and service to
                Lord Krishna.
              </p>
              <p className="text-[0.95rem] text-text-lt leading-[2] mb-4.5">
                Today, Lokanath Swami Maharaj continues to inspire thousands of devotees worldwide through
                his teachings, personal example, and unwavering commitment to Srila Prabhupada's mission.
              </p>
              <div className="flex flex-wrap gap-2 mt-7 pt-7 border-t border-gold/20">
                {maharajTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex text-[0.72rem] font-semibold tracking-[0.06em] px-3.5 py-1.5 rounded-[50px] border border-saffron/25 bg-saffron/6 text-saffron transition-all duration-300 hover:bg-saffron hover:text-white hover:border-saffron cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 11. JourneyTimeline Section */}
        <section id="journey" className="relative py-14 px-0 bg-cream overflow-hidden max-sm:py-20">
          <div className="absolute top-[60px] right-12 font-cinzel text-[8rem] font-bold text-saffron/[0.06] pointer-events-none leading-none select-none" aria-hidden="true">04</div>
          <div className="text-center px-12 mb-[70px] max-sm:px-6" data-aos="fade-up">
            <p className="font-sans text-[0.72rem] font-semibold tracking-[0.4em] uppercase text-saffron mb-3.5 block">Sacred Timeline</p>
            <h2 className="font-display text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.05] text-text mb-6">Maharaj's<br /><em className="italic text-saffron not-italic">Spiritual Journey</em></h2>
            <p className="text-base text-text-lt max-w-[480px] leading-[1.9] mt-3.5 mx-auto">
              From a quiet village in Maharashtra to the hearts of millions — a life of pure devotion.
            </p>
          </div>

          <div className="relative">
            <div
              ref={timelineRef}
              onMouseDown={handleTimelineMouseDown}
              onMouseLeave={handleTimelineMouseLeave}
              onMouseUp={handleTimelineMouseUp}
              onMouseMove={handleTimelineMouseMove}
              onScroll={handleTimelineScroll}
              className="flex gap-6 px-12 py-[20px] pb-10 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-thumb-gold scrollbar-track-transparent cursor-grab select-none max-sm:px-6 journey-cards"
              id="journeyCards"
            >
              {timelineEvents.map((card, idx) => (
                <div
                  key={idx}
                  className={`snap-start shrink-0 w-[300px] rounded-[24px] p-[36px_28px] relative transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(44,24,16,0.12)] jcard max-sm:w-[260px] ${card.accent
                    ? "bg-gradient-to-br from-saffron to-[#c55e14] border-transparent text-white"
                    : "bg-white border border-gold/15 hover:border-gold/40 text-text"
                    }`}
                  data-aos="fade-up"
                  data-aos-delay={idx * 80}
                >
                  <div className={`font-cinzel text-[0.78rem] tracking-[0.25em] uppercase mb-4 ${card.accent ? "text-white/70" : "text-text-lt"}`}>
                    {card.year}
                  </div>
                  <div className="text-[1.8rem] mb-4">{card.emoji}</div>
                  <h3 className={`font-display text-[1.4rem] font-semibold mb-3 leading-tight ${card.accent ? "text-white" : "text-text"}`}>
                    {card.title}
                  </h3>
                  <p className={`text-[0.88rem] leading-[1.85] ${card.accent ? "text-white/80" : "text-text-lt"}`}>
                    {card.text}
                  </p>
                  <div className={`absolute bottom-5 right-6 font-cinzel text-[3rem] font-bold leading-none ${card.accent ? "text-white/12" : "text-saffron/[0.08]"}`}>
                    {card.num}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{ opacity: timelineHintOpacity, transition: "opacity 0.4s ease" }}
              className="text-center text-[0.75rem] tracking-[0.2em] text-text-lt mt-[10px] pb-5 jscroll-hint"
              aria-hidden="true"
            >
              ← Drag to explore →
            </div>
          </div>
        </section>

        {/* 12. Seva Section */}
        <section id="seva" className="relative py-14 px-12 bg-ivory overflow-hidden max-sm:py-20 max-sm:px-6">
          <div className="absolute top-[60px] right-12 font-cinzel text-[8rem] font-bold text-saffron/[0.06] pointer-events-none leading-none select-none" aria-hidden="true">05</div>
          <div className="max-w-[1320px] mx-auto mb-[60px]" data-aos="fade-up">
            <p className="font-sans text-[0.72rem] font-semibold tracking-[0.4em] uppercase text-saffron mb-3.5 block">Divine Service</p>
            <h2 className="font-display text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.05] text-text mb-6">Sacred<br /><em className="italic text-saffron not-italic">Contributions</em></h2>
          </div>

          <div className="max-w-[1320px] mx-auto grid grid-cols-[1.1fr_0.9fr] gap-7 items-start max-lg:grid-cols-1">
            <div
              className="bg-white rounded-[40px] overflow-hidden shadow-[0_16px_60px_rgba(44,24,16,0.1)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_80px_rgba(44,24,16,0.15)] group"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div className="h-[340px] relative overflow-hidden bg-cream">
                <img
                  src="/images/maharaj_kirtan2.jpg"
                  alt="HH Lokanath Swami Maharaj on Padayatra pilgrimage"
                  className="w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a0c06]/70 to-[100%] from-[50%]"></div>
              </div>
              <div className="p-[36px_36px_40px]">
                <span className="text-[0.7rem] font-bold tracking-[0.25em] uppercase text-saffron block mb-3.5">01 · Flagship Mission</span>
                <h3 className="font-display text-[2.2rem] font-bold text-text mb-4">Global Padayatra</h3>
                <p className="text-[0.9rem] text-text-lt leading-[1.95] mb-6">
                  On Srila Prabhupada's instruction, Maharaj initiated the worldwide
                  Padayatra movement — a sacred walking pilgrimage carrying the Holy
                  Name of Krishna to every town and village on earth. Walking
                  thousands of miles on foot, including the historic
                  Vrindavan-to-Mayapur route, he has lived the very essence of Srila
                  Prabhupada's mission.
                </p>
                <a
                  href="https://padayatra.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.85rem] font-semibold text-saffron tracking-[0.05em] transition-all duration-300 inline-flex items-center gap-1 hover:text-maroon hover:gap-2"
                  id="padayatra-link"
                >
                  Learn More ↗
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {minorContributions.map((contrib) => (
                <div
                  key={contrib.num}
                  className="flex bg-white rounded-[24px] overflow-hidden border border-gold/12 transition-all duration-300 hover:translate-x-1.5 hover:border-gold hover:shadow-[inset_4px_0_0_0_#E8721E,0_8px_30px_rgba(44,24,16,0.08)] group"
                  data-aos="fade-up"
                  data-aos-delay={contrib.delay}
                >
                  <div className="w-[130px] shrink-0 overflow-hidden bg-cream">
                    <img
                      src={contrib.image}
                      alt={contrib.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.07]"
                    />
                  </div>
                  <div className="p-[20px_24px] flex flex-col justify-center">
                    <span className="font-cinzel text-[0.65rem] tracking-[0.25em] text-saffron font-bold block mb-2">{contrib.num}</span>
                    <h3 className="font-display text-[1.1rem] font-semibold text-text mb-2 leading-tight">{contrib.title}</h3>
                    <p className="text-[0.82rem] text-text-lt leading-[1.8]">
                      {contrib.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 13. Vision & Mission Section */}
        <section id="vision" className="relative py-14 bg-[linear-gradient(180deg,var(--color-dark)_0%,#1c0f08_100%)] overflow-hidden max-lg:py-20 max-sm:py-15">
          <div className="max-w-[1500px] mx-auto px-6">
            <div className="text-center mb-[60px]" data-aos="fade-up">
              <p className="font-sans text-[0.72rem] font-semibold tracking-[0.4em] uppercase text-saffron mb-3.5 block">Our Eternal Purpose</p>
              <h2 className="font-display text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.05] text-white mb-6">Vision &amp; <em className="italic text-gold-lt not-italic">Mission</em></h2>
              <p className="text-white/65 max-w-[750px] mx-auto mt-4 leading-[1.9]">
                Inspired by the teachings of Srila Prabhupada and guided by the blessings of His Holiness
                Lokanath Swami Maharaj, our mission is implemented through the following foundational
                pillars:
              </p>
            </div>

            <div className="grid grid-cols-12 gap-4 items-start max-lg:grid-cols-1 max-lg:gap-12">
              {/* Left Column: Vision Card */}
              <div
                className="sticky top-[120px] col-span-5"
                data-aos="fade-right"
                data-aos-duration="1100"
              >
                <div className="relative bg-white/2 border border-gold/18 rounded-[24px] p-6 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] backdrop-blur-[12px] transition-all duration-300 hover:border-gold/40 max-sm:p-[36px_24px]">
                  <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(232,114,30,0.04)_0%,transparent_60%)] pointer-events-none"></div>
                  <div className="absolute bottom-[-40px] right-[-30px] text-[10rem] font-serif text-gold/2 leading-none pointer-events-none">ॐ</div>
                  <span className="inline-block font-cinzel text-[0.72rem] tracking-[0.2em] text-saffron uppercase mb-3">Our Vision</span>
                  <h3 className="font-display text-[1.8rem] font-medium text-white mb-6">A Spiritual Sanctuary</h3>
                  <blockquote className="font-display text-[1.05rem] italic leading-[1.75] text-white/90 mb-2 relative z-10 border-l-2 border-gold pl-4">
                    "To create a spiritually enlightened society where every individual has the opportunity to develop
                    a loving relationship with Lord Krishna and live a life guided by devotion, wisdom, compassion,
                    and service."
                  </blockquote>
                  <p className="text-[0.85rem] text-white/70 leading-[1.8] mb-4 relative z-10">
                    We envision ISKCON Noida Expressway as a vibrant spiritual hub that inspires people of all ages
                    and backgrounds to discover the timeless teachings of Bhagavad-gita and Srimad Bhagavatam.
                  </p>
                  <p className="text-[0.85rem] text-white/70 leading-[1.8] mb-4 relative z-10">
                    Through spiritual education, devotional practices, and community engagement, we aspire to
                    nurture individuals who contribute positively to society while advancing on their spiritual
                    journey.
                  </p>
                  <p className="text-[0.85rem] text-white/70 leading-[1.8] mb-8 relative z-10">
                    Our vision is to foster a culture of harmony, respect, and spiritual growth where families, youth,
                    professionals, and seekers can experience genuine happiness through Krishna consciousness.
                  </p>
                  <div className="flex items-center gap-2.5 text-[0.75rem] tracking-[0.15em] text-gold/60 uppercase border-t border-white/6 pt-6 relative z-10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="w-[18px] h-[18px]"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    Sector 151, Noida Expressway
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5 mt-6 ">
                  {leftMissionItems.map((item) => (
                    <div
                      key={item.num}
                      className="bg-white/1.5 border border-white/5 rounded-[16px] p-4 min-h-40 flex flex-col transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:border-gold/25 hover:bg-white/3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] group/mcard"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-cinzel text-[0.95rem] font-bold text-saffron">
                          {item.num}
                        </span>
                        <div className="w-1.5 h-1.5 bg-gold rounded-full opacity-50"></div>
                      </div>

                      <h3 className="font-display text-[1rem] font-semibold text-white mb-3 leading-[1.35] uppercase">
                        {item.title}
                      </h3>

                      <p className="text-[0.82rem] text-white/60 leading-[1.7]">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Mission Cards */}
              <div className="relative col-span-7">
                <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
                  {rightMissionItems.map((item) => (
                    <div
                      key={item.num}
                      className="bg-white/1.5 border border-white/5 rounded-[16px] p-4 transition-all duration-300 overflow-hidden hover:-translate-y-1.25 hover:border-gold/25 hover:bg-white/3 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)] group/mcard"
                      data-aos="fade-up"
                      data-aos-delay={item.delay}
                    >
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-cinzel text-[0.95rem] font-bold text-saffron tracking-[0.05em]">{item.num}</span>
                        <div className="w-1.5 h-1.5 bg-gold rounded-full opacity-50 transition-all duration-300 group-hover/mcard:opacity-100 group-hover/mcard:scale-[1.3]"></div>
                      </div>
                      <h3 className="font-display text-[1.12rem] font-semibold text-white mb-3 leading-[1.35] uppercase tracking-[0.05em]">{item.title}</h3>
                      <p className="text-[0.85rem] text-white/60 leading-[1.75]">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <div
                className="w-full max-w-[900px] bg-gradient-to-br from-gold/5 to-saffron/5 border border-gold/20 rounded-[16px] p-10 relative overflow-hidden"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="absolute top-[-20px] left-[-20px] text-[6rem] font-serif text-gold/3 pointer-events-none">
                  “
                </div>

                <blockquote className="font-display text-[1.1rem] italic leading-[1.8] text-white/90 mb-4 relative z-10 text-center">
                  "The real mission of human life is to revive our eternal relationship
                  with Krishna and return back home, back to Godhead."
                </blockquote>

                <cite className="text-[0.78rem] tracking-[0.15em] uppercase text-gold/80 not-italic block relative z-10 text-center">
                  — His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada
                </cite>
              </div>
            </div>
          </div>
        </section>

        {/* 14. Teachings Section */}
        <section id="teachings" className="bg-[linear-gradient(160deg,var(--color-dark)_0%,#3a1a0c_60%,var(--color-maroon)_100%)] py-14 relative overflow-hidden">
          <div className="relative grid grid-cols-[0.85fr_1.15fr] max-lg:grid-cols-1 min-h-screen">
            <div className="sticky top-0 h-screen flex flex-col justify-center p-[80px_60px] border-r border-gold/12 max-lg:static max-lg:h-auto max-lg:p-[80px_48px_40px] max-lg:border-r-0 max-lg:border-b max-lg:border-gold/12 max-sm:p-[60px_24px]" data-aos="fade-right">
              <div className="absolute top-[60px] right-12 font-cinzel text-[8rem] font-bold text-white/[0.05] pointer-events-none leading-none select-none" aria-hidden="true">07</div>
              <p className="font-sans text-[0.72rem] font-semibold tracking-[0.4em] uppercase text-gold-lt/80 mb-3.5 block">Timeless Wisdom</p>
              <h2 className="font-display text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.05] text-white">Core<br /><em className="italic text-gold-lt">Teachings</em></h2>
              <p className="text-[0.92rem] text-white/55 leading-[1.9] mt-5 max-w-[300px]">
                Known for soul-stirring kirtans and nectarean lectures, Maharaj
                distills centuries of Vaishnava wisdom into principles that
                transform everyday life into a sacred offering.
              </p>
              <div className="mt-12 flex flex-col gap-1.5">
                <div className="font-display text-[1.1rem] text-gold/50 italic leading-[1.8]">हरे कृष्ण हरे कृष्ण</div>
                <div className="font-display text-[1.1rem] text-gold/50 italic leading-[1.8]">कृष्ण कृष्ण हरे हरे</div>
                <div className="font-display text-[1.1rem] text-gold/50 italic leading-[1.8]">हरे राम हरे राम</div>
                <div className="font-display text-[1.1rem] text-gold/50 italic leading-[1.8]">राम राम हरे हरे</div>
              </div>
            </div>
            <div className="p-[100px_60px] flex flex-col gap-0 max-lg:p-[60px_48px] max-sm:p-[60px_24px]">
              {coreTeachings.map((teaching) => (
                <div
                  key={teaching.num}
                  className="grid grid-cols-[48px_1fr_48px] gap-6 items-start py-11 border-b border-white/7 last:border-b-0 transition-all duration-300 hover:bg-white/2 hover:rounded-lg hover:px-4 hover:-mx-4 group/trow"
                  data-aos="fade-left"
                  data-aos-delay={teaching.delay}
                >
                  <div className="font-cinzel text-[0.72rem] tracking-[0.2em] text-gold/40 pt-1.5 transition-colors duration-300 group-hover/trow:text-gold-lt">
                    {teaching.num}
                  </div>
                  <div>
                    <h3 className="font-display text-[1.6rem] font-semibold text-white mb-3 leading-tight">{teaching.title}</h3>
                    <p className="text-[0.88rem] text-white/55 leading-[1.95] mb-4">
                      {teaching.text}
                    </p>
                    <div className="font-display text-[0.95rem] italic text-gold-lt pl-3.5 border-l-2 border-saffron leading-[1.7]">
                      "{teaching.quote}"
                    </div>
                  </div>
                  <div className="text-[1.6rem] text-right pt-1 transition-transform duration-300 group-hover/trow:scale-110">
                    {teaching.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 15. FullBleedQuote Section */}
        <section id="quote-full" className="relative py-14 min-h-[480px] flex items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/maharaj_satsang.jpg"
              alt="Lokanath Swami Maharaj leading satsang"
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(26,12,6,0.88),rgba(92,26,26,0.82))]"></div>
          </div>
          <div className="relative z-10 max-w-[800px] px-10" data-aos="zoom-in" data-aos-duration="1200">
            <div className="qf-om text-[2.5rem] text-gold mb-6">ॐ</div>
            <blockquote className="font-display text-[clamp(1.8rem,4vw,3.5rem)] font-semibold italic text-white leading-[1.4] mb-5">
              The Holy Name is the shelter<br />for this age of darkness.<br />
              Chant sincerely, and Krishna<br />will guide your path.
            </blockquote>
            <cite className="text-[0.85rem] tracking-[0.2em] uppercase text-gold/70 not-italic block mb-6">— HH Lokanath Swami Maharaj</cite>
            <div className="text-[1.4rem] tracking-[8px] opacity-70" aria-hidden="true">🪷 🪷 🪷</div>
          </div>
        </section>

        {/* 16. Gallery Section */}
        <section id="gallery" className="relative py-14 px-12 bg-cream overflow-hidden max-sm:py-20 max-sm:px-6">
          <div className="absolute top-[60px] right-12 font-cinzel text-[8rem] font-bold text-saffron/[0.06] pointer-events-none leading-none select-none" aria-hidden="true">08</div>
          <div className="max-w-[1320px] mx-auto mb-[60px]" data-aos="fade-up">
            <p className="font-sans text-[0.72rem] font-semibold tracking-[0.4em] uppercase text-saffron mb-3.5 block">Divine Darshan</p>
            <h2 className="font-display text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.05] text-text">Sacred<br /><em className="italic text-saffron not-italic">Gallery</em></h2>
          </div>
          <div className="max-w-[1320px] mx-auto grid grid-cols-12 grid-rows-[280px_280px] gap-4 max-[900px]:grid-cols-6 max-[900px]:grid-rows-[200px_200px] bento-grid">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => handleOpenLightbox(idx)}
                className={`relative rounded-[24px] overflow-hidden cursor-pointer group ${img.area}`}
                data-aos="fade-up"
                data-aos-delay={img.delay}
              >
                <img
                  src={img.src}
                  alt={img.cap}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.07]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-[20px_20px_18px] bg-gradient-to-t from-dark/80 to-transparent text-[0.78rem] font-semibold text-white/85 tracking-[0.06em] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {img.cap}
                </div>
              </div>
            ))}
            <div className="hidden"></div>
            <div className="hidden"></div>
          </div>
        </section>

        {/* 17. Discourses Section */}
        <section id="discourses" className="relative py-14 px-12 bg-ivory overflow-hidden max-sm:py-20 max-sm:px-6">
          <div className="absolute top-[60px] right-12 font-cinzel text-[8rem] font-bold text-saffron/[0.06] pointer-events-none leading-none select-none" aria-hidden="true">09</div>
          <div className="max-w-[1320px] mx-auto mb-16" data-aos="fade-up">
            <p className="font-sans text-[0.72rem] font-semibold tracking-[0.4em] uppercase text-saffron mb-3.5 block">Nectarean Lectures</p>
            <h2 className="font-display text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.05] text-text">Watch &amp;<br /><em className="italic text-saffron not-italic">Listen</em></h2>
            <p className="text-base text-text-lt max-w-[480px] leading-[1.9] mt-3.5">
              Maharaj's soul-stirring kirtans and lectures have transformed
              thousands of lives. Immerse yourself in the depth of his wisdom.
            </p>
          </div>

          <div className="max-w-[1320px] mx-auto grid grid-cols-3 gap-6 mb-12 max-[900px]:grid-cols-1">
            {discoursesLectures.map((lec) => (
              <div
                key={lec.id}
                className={`bg-white rounded-[24px] overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(44,24,16,0.12)] group ${lec.featured
                  ? "border-saffron/25 shadow-[0_8px_32px_rgba(232,114,30,0.1)]"
                  : "border-gold/10 hover:border-saffron/25"
                  }`}
                data-aos="fade-up"
                data-aos-delay={lec.delay}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={lec.image}
                    alt={lec.title}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.05]"
                  />
                  <a
                    href="https://www.youtube.com/@LokanathaSwami"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[54px] h-[54px] rounded-full bg-saffron flex items-center justify-center shadow-[0_0_0_12px_rgba(232,114,30,0.18),0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 z-10 hover:scale-[1.12] hover:bg-[#c55e14]"
                  >
                    <svg viewBox="0 0 24 24" fill="white" width="22" height="22" className="ml-0.5">
                      <polygon points="8,5 19,12 8,19" />
                    </svg>
                  </a>
                  <span className="absolute bottom-2.5 right-2.5 bg-dark/75 text-white text-[0.72rem] font-semibold p-[3px_9px] rounded-[50px]">{lec.duration}</span>
                  <span
                    className={`absolute top-3 left-3 text-[0.65rem] font-bold tracking-[0.15em] uppercase p-[4px_10px] rounded-[50px] ${lec.featured ? "bg-gold text-dark" : "bg-saffron text-white"
                      }`}
                  >
                    {lec.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[1.2rem] font-semibold text-text mb-2.5 leading-[1.4]">{lec.title}</h3>
                  <p className="text-[0.85rem] text-text-lt leading-[1.85] mb-4">
                    {lec.text}
                  </p>
                  <a
                    href="https://www.youtube.com/@LokanathaSwami"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.82rem] font-semibold text-saffron tracking-[0.05em] transition-all duration-300 inline-block hover:text-maroon hover:tracking-[0.1em]"
                    id={lec.id}
                  >
                    Watch Lecture ↗
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" data-aos="fade-up">
            <a
              href="https://www.youtube.com/@LokanathaSwami"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 p-[15px_36px] bg-saffron text-white font-sans text-[0.9rem] font-semibold tracking-[0.05em] rounded-sm transition-all duration-300 relative overflow-hidden hover:bg-[#c55e14] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(232,114,30,0.35)]"
              id="disc-all-btn"
            >
              View All on YouTube ↗
            </a>
          </div>
        </section>

        {/* 18. Connect Section */}
        <section id="connect" className="overflow-hidden py-14">
          <div className="grid grid-cols-2 min-h-[620px] max-[900px]:grid-cols-1 connect-inner">
            <div
              className="relative overflow-hidden max-[900px]:h-[300px]"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <img
                src="/images/maharaj_garland.jpg"
                alt="HH Lokanath Swami Maharaj garlanded"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent from-[60%] to-cream max-[900px]:bg-gradient-to-b max-[900px]:from-transparent max-[900px]:from-[60%] max-[900px]:to-cream"></div>
            </div>
            <div
              className="bg-cream flex flex-col justify-center p-[80px_80px_80px_60px] max-sm:p-[60px_24px]"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="150"
            >
              <p className="font-sans text-[0.72rem] font-semibold tracking-[0.4em] uppercase text-saffron mb-3.5 block">Begin Your Spiritual Journey</p>
              <h2 className="font-display text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.05] text-text mb-6">
                Visit ISKCON<br />Noida<br /><em className="italic text-saffron not-italic">Expressway</em>
              </h2>
              <p className="text-[0.95rem] text-text-lt leading-[2] mb-9 max-w-[420px]">
                ISKCON Noida Expressway (Sector 151) is a sanctuary of bhakti for
                the ever-growing spiritual community of the National Capital Region,
                and one of Maharaj’s most cherished seva projects in recent years.
                Come, experience the divine presence, and find your connection with
                Krishna.
              </p>
              <div className="flex items-center gap-2 text-[0.78rem] tracking-[0.1em] text-text-lt uppercase mb-7">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  width="18"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
                Sector 151, Noida Expressway, Uttar Pradesh
              </div>
              <div className="flex flex-col gap-4 items-start mb-10">
                <a
                  href="https://lokanatha.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 p-[15px_36px] bg-saffron text-white font-sans text-[0.9rem] font-semibold tracking-[0.05em] rounded-sm transition-all duration-300 relative overflow-hidden hover:bg-[#c55e14] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(232,114,30,0.35)]"
                  id="cta-join"
                >
                  Join the Community
                </a>
                <a
                  href="mailto:contact@lokanatha.com"
                  className="text-[0.88rem] text-saffron font-semibold tracking-[0.04em] transition-all duration-300 hover:text-maroon hover:tracking-[0.1em]"
                  id="cta-email"
                >
                  contact@lokanatha.com ↗
                </a>
              </div>
              <div className="font-cinzel text-[0.7rem] tracking-[0.1em] text-text-lt leading-[2]">
                Hare Krishna Hare Krishna · Krishna Krishna Hare Hare<br />
                Hare Rama Hare Rama · Rama Rama Hare Hare
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 20. Reusable Photo Lightbox Modal Overlay */}
      {lightboxOpen && galleryImages.length > 0 && (
        <div id="lb" className="fixed inset-0 z-[9999] flex items-center justify-center animate-[lbIn_0.3s_ease]">
          <div
            id="lb-backdrop"
            onClick={() => setLightboxOpen(false)}
            className="absolute inset-0 bg-[#0a0402]/94 backdrop-blur-md cursor-pointer"
          />
          <div id="lb-box" className="relative z-10 flex flex-col items-center gap-[14px] max-w-[90vw]">
            <button
              id="lb-close"
              aria-label="Close"
              onClick={() => setLightboxOpen(false)}
              className="fixed top-5 right-6 w-[42px] h-[42px] rounded-full bg-white/8 border border-white/15 text-white text-base cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-saffron/40 hover:border-saffron"
            >
              ✕
            </button>
            <button
              id="lb-prev"
              aria-label="Previous"
              onClick={handlePrevImage}
              className="fixed left-5 top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-white/7 border border-white/12 text-white text-[1.8rem] cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-saffron/40"
            >
              ‹
            </button>
            <button
              id="lb-next"
              aria-label="Next"
              onClick={handleNextImage}
              className="fixed right-5 top-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-white/7 border border-white/12 text-white text-[1.8rem] cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-saffron/40"
            >
              ›
            </button>
            <div id="lb-img-wrap" className="max-w-[88vw] max-h-[80vh] rounded-[20px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.7)]">
              <img
                id="lb-img"
                src={galleryImages[lightboxActiveIndex].src}
                alt={galleryImages[lightboxActiveIndex].cap}
                className="max-w-[88vw] max-h-[80vh] object-contain block animate-[lbIn_0.3s_ease]"
              />
            </div>
            <div id="lb-cap" className="font-cinzel text-[0.8rem] tracking-[0.2em] text-gold/80 text-center">
              {galleryImages[lightboxActiveIndex].cap}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
