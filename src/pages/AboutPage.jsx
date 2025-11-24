// src/pages/AboutPage.jsx
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

/**
 * Optimized AboutPage: same structure/layout as your previous version,
 * with performance improvements:
 * - constants defined outside component
 * - memoized styles & callbacks
 * - preloaded hover images
 * - minimal inline style churn
 *
 * NOTE: local image paths referenced in `HERO_POSTER` / `ITEMS` should be transformed
 * by your build/tooling to served URLs (unchanged from your previous file).
 */

const VIDEO_SRC =
  "https://res.cloudinary.com/dxzhnns58/video/upload/v1763970487/5322668-hd_1920_1080_30fps_d9ojxg.mp4";
// local poster / placeholder image (uploaded file path)
const HERO_POSTER = "/mnt/data/Screenshot 2025-11-19 at 2.19.14 PM.png";

/* ---------- constant data moved out to top-level ---------- */
const SECTORS = [
  {
    id: "mining",
    title: "Mining",
    desc: "Skilled operators, machine handlers, and safety-focused crews.",
    image:
      "https://res.cloudinary.com/dxzhnns58/image/upload/v1763451906/dominik-vanyi-Mk2ls9UBO2E-unsplash_1_uk97mb.jpg",
    jobsAvailable: 128,
    avgExperience: "2-5 yrs",
    commonRoles: ["Excavator Operator", "Driller", "Blaster"],
  },
  {
    id: "steel",
    title: "Steel & Aluminium",
    desc: "Production staff, maintenance, and plant logistics.",
    image:
      "https://res.cloudinary.com/dxzhnns58/image/upload/v1763451904/ant-rozetsky-_qWeqqmpBpU-unsplash_depnwu.jpg",
    jobsAvailable: 94,
    avgExperience: "1-4 yrs",
    commonRoles: ["Furnace Operator", "Maintenance Tech", "Logistics Coordinator"],
  },
  {
    id: "power",
    title: "Power & Green Energy",
    desc: "Technicians for thermal, hydro, solar & wind projects.",
    image:
      "https://res.cloudinary.com/dxzhnns58/image/upload/v1763451905/sungrow-emea-VC-m6ULjJ6Y-unsplash_fjglkj.jpg",
    jobsAvailable: 76,
    avgExperience: "3-6 yrs",
    commonRoles: ["Turbine Technician", "Solar Installer", "Electrical Technician"],
  },
  {
    id: "shipping",
    title: "Shipping & Logistics",
    desc: "Dockworkers, fleet support and logistics coordinators.",
    image:
      "https://res.cloudinary.com/dxzhnns58/image/upload/v1763451912/ozren-cuculic-eBKxooPEU5w-unsplash_jphgdn.jpg",
    jobsAvailable: 58,
    avgExperience: "1-3 yrs",
    commonRoles: ["Deckhand", "Stevedore", "Terminal Operator"],
  },
  {
    id: "ev",
    title: "Electric Vehicles",
    desc: "Battery technicians, assemblers and field service teams.",
    image:
      "https://res.cloudinary.com/dxzhnns58/image/upload/v1763451903/chuttersnap-xJLsHl0hIik-unsplash_1_pmlvht.jpg",
    jobsAvailable: 110,
    avgExperience: "0-3 yrs",
    commonRoles: ["Battery Assembler", "EV Technician", "Quality Inspector"],
  },
  {
    id: "construction",
    title: "Construction Tech & Infra Equip.",
    desc: "Equipment operators, supervisors, and site engineers.",
    image:
      "https://res.cloudinary.com/dxzhnns58/image/upload/v1763451909/luan-fonseca-azH6gVcRmBE-unsplash_otmxaa.jpg",
    jobsAvailable: 132,
    avgExperience: "2-6 yrs",
    commonRoles: ["Crane Operator", "Foreman", "Site Mechanic"],
  },
  {
    id: "water",
    title: "Water, Sanitation & FM",
    desc: "Maintenance, hygiene operators, utilities and FM staff.",
    image:
      "https://res.cloudinary.com/dxzhnns58/image/upload/v1763451908/gallery-ds-X_tEarX6svc-unsplash_sy31wa.jpg",
    jobsAvailable: 45,
    avgExperience: "1-4 yrs",
    commonRoles: ["Pump Operator", "Sanitation Worker", "FM Technician"],
  },
];

const SERVICES_ITEMS = [
  {
    id: "01",
    number: "01",
    title: "EXECUTIVE SEARCH",
    desc:
      "Tailored to your needs, we identify and attract technical, senior-level and C-Suite hires to future-proof your leadership team and close critical skills gaps.",
    image: "/mnt/data/Screenshot 2025-11-21 at 3.57.03 PM.png", // local path preserved
    accentFrom: "from-teal-400",
    linkColor: "text-teal-300",
    glowFrom: "rgba(0,240,255,0.45)",
    glowTo: "rgba(0,240,255,0)",
  },
  {
    id: "02",
    number: "02",
    title: "CONTRACT & INTERIM",
    desc:
      "We offer a temporary recruitment service to allow for the strategic deployment of highly specialized skill-sets on a short-term basis.",
    image: "https://sitescdn.wearevennture.co.uk/public/csg/assets/contract-_-interim.webp",
    accentFrom: "from-orange-400",
    linkColor: "text-orange-400",
    glowFrom: "rgba(251,146,60,0.45)",
    glowTo: "rgba(251,146,60,0)",
  },
  {
    id: "03",
    number: "03",
    title: "PROJECT RPO",
    desc:
      "If you are looking to scale hiring rapidly, our project-based volume recruitment services and large team ramp-ups support your business growth.",
    image: "https://sitescdn.wearevennture.co.uk/public/csg/assets/executive-search.webp",
    accentFrom: "from-purple-500",
    linkColor: "text-purple-400",
    glowFrom: "rgba(155,92,255,0.45)",
    glowTo: "rgba(155,92,255,0)",
  },
  {
    id: "04",
    number: "04",
    title: "TALENT STRATEGY",
    desc:
      "Our bespoke, insight-led talent reports provide you with the data and insights you need to make more informed and confident talent decisions.",
    image: "https://sitescdn.wearevennture.co.uk/public/csg/assets/talent-insights.webp",
    accentFrom: "from-pink-500",
    linkColor: "text-pink-400",
    glowFrom: "rgba(255,77,142,0.45)",
    glowTo: "rgba(255,77,142,0)",
  },
];

const SLICK_SETTINGS = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  adaptiveHeight: true,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ],
  accessibility: true,
  pauseOnHover: true,
  appendDots: (dots) => <div className="mt-4"><ul className="flex gap-2 justify-center">{dots}</ul></div>,
  customPaging: (i) => <button className="w-3 h-3 rounded-full bg-white/20" aria-label={`Go to slide ${i + 1}`} />,
};

/* ---------- component ---------- */
export default function AboutPage() {
  const videoRef = useRef(null);
  const slickRef = useRef(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [active, setActive] = useState(null); // moved state usage here for hover section control

  // reduced motion MQ
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const handle = () => setPrefersReducedMotion(Boolean(mq?.matches));
    handle();
    mq?.addEventListener?.("change", handle);
    return () => mq?.removeEventListener?.("change", handle);
  }, []);

  // play hero video if allowed
  useEffect(() => {
    if (!videoRef.current) return;
    const el = videoRef.current;
    if (!prefersReducedMotion) {
      const p = el.play();
      if (p && typeof p.then === "function") p.catch(() => {});
    }
  }, [prefersReducedMotion]);

  // preload images for hover backgrounds to avoid on-first-hover lag
  useEffect(() => {
    const imgs = SERVICES_ITEMS.map((it) => it.image);
    const imageObjects = imgs.map((src) => {
      try {
        const img = new Image();
        img.src = src;
        return img;
      } catch {
        return null;
      }
    });
    return () => {
      // allow GC
      imageObjects.forEach((i) => {
        /* nothing required */
      });
    };
  }, []);

  const next = useCallback(() => slickRef.current?.slickNext(), []);
  const prev = useCallback(() => slickRef.current?.slickPrev(), []);

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_SRC}
          poster={HERO_POSTER}
          muted
          playsInline
          loop={!prefersReducedMotion}
          autoPlay={!prefersReducedMotion}
          preload="metadata"
          onCanPlay={() => setVideoReady(true)}
          aria-hidden="true"
        />

        {/* slightly lighter vignette so hero text reads but not too dark */}
        <div className="absolute inset-0 bg-linear-to-b from-black/35 via-black/40 to-black/60" />

        <svg className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-70" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="abNeon" x1="0" x2="1">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.28" />
              <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ff4dff" stopOpacity="0.16" />
            </linearGradient>
          </defs>
          <path d="M0 200 C360 120 1080 280 1440 200 L1440 600 L0 600 Z" fill="none" stroke="url(#abNeon)" strokeWidth="2" strokeOpacity="0.45" />
        </svg>

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 mt-14 lg:px-12 h-full flex items-center">
          <div className="w-full backdrop-blur-md bg-white/6 border border-white/8 rounded-3xl p-6 md:p-10 shadow-xl">
            <h2 className="text-sm tracking-widest text-teal-300 font-semibold">ABOUT</h2>
            <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">Blue Global Force</h1>
            <p className="mt-3 text-gray-200 max-w-3xl">
              We are a dedicated workforce & manpower agency specializing in placing skilled blue-collar talent across heavy industry sectors — matching people, skills and safety-first cultures to projects that drive growth.
            </p>

            <div className="mt-6 flex gap-3">
              <Link to="/jobs" className="inline-flex items-center gap-2 rounded-full px-5 py-2 bg-linear-to-r from-teal-400 to-violet-500 text-black font-semibold shadow-md">
                Find Jobs
              </Link>
              <Link to="/recruiters" className="inline-flex items-center gap-2 rounded-full px-5 py-2 border border-white/10 bg-black/30 text-white font-medium">
                Hire Talent
              </Link>
            </div>
          </div>
        </div>

        <div className="sr-only" aria-live="polite">
          {prefersReducedMotion ? "Static hero displayed." : videoReady ? "Hero video playing." : "Loading hero."}
        </div>
      </section>

      {/* CONTENT AREA */}
      <section className="px-6 sm:px-8 lg:px-12 py-0 lg:py-20">
        {/* Who We Are + What We Do */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
          <div className="bg-linear-to-b from-white/4 to-white/3 border border-white/6 rounded-2xl p-6 md:p-8 shadow-lg">
            <h3 className="text-xl font-semibold">Who We Are</h3>
            <p className="mt-3 text-gray-300">
              Blue Global Force is a workforce solutions partner focused on delivering dependable, trained and safety-conscious manpower for industrial projects across India and international markets.
            </p>

            <h4 className="mt-6 font-semibold">Core values</h4>
            <ul className="mt-3 space-y-2 text-gray-300">
              <li>• Safety-first approach</li>
              <li>• Skill-focused training</li>
              <li>• Transparent staffing</li>
            </ul>
          </div>

          <div className="bg-linear-to-b from-white/4 to-white/3 border border-white/6 rounded-2xl p-6 md:p-8 shadow-lg">
            <h3 className="text-xl font-semibold">What We Do</h3>
            <p className="mt-3 text-gray-300">
              We source, vet, train, and deploy skilled blue-collar teams — tailored to project-specific needs. Services include recruitment, training, logistics and on-site support.
            </p>
          </div>
        </div>

        {/* Slider header + controls */}
        <div className="max-w-6xl mx-auto flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-semibold">Sectors We Serve</h3>
            <p className="mt-1 text-gray-300 max-w-2xl">Informational cards — browse horizontally.</p>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={prev} aria-label="Previous" className="p-2 rounded-full bg-white/6 hover:bg-white/8">
              ‹
            </button>
            <button onClick={next} aria-label="Next" className="p-2 rounded-full bg-white/6 hover:bg-white/8">
              ›
            </button>
          </div>
        </div>

        {/* react-slick slider */}
        <div className="max-w-6xl mx-auto">
          <Slider ref={slickRef} {...SLICK_SETTINGS} className="py-2">
            {SECTORS.map((s) => (
              <div key={s.id} className="px-3">
                <article className="rounded-2xl border border-white/6 bg-white/3 overflow-hidden shadow-md">
                  <div className="h-[400px] w-full relative">
                    <img
                      src={s.image || HERO_POSTER}
                      alt={`${s.title} illustrative`}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    <div className="absolute left-0 bottom-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
                      <h4 className="text-lg font-semibold text-white">{s.title}</h4>
                      <p className="text-xs text-gray-200 mt-1 line-clamp-2">{s.desc}</p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-xs">
                        <strong className="text-white">{s.jobsAvailable}</strong>
                        <span className="text-gray-300">open roles</span>
                      </div>

                      <div className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-xs">
                        <strong className="text-white">{s.avgExperience}</strong>
                        <span className="text-gray-300">avg exp.</span>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-300">
                      <strong className="text-white">Common roles:</strong> {s.commonRoles.join(", ")}
                    </div>

                    <div className="mt-4 text-xs text-gray-400">Informational only</div>
                  </div>
                </article>
              </div>
            ))}
          </Slider>
        </div>

        {/* ---------- INSERT SERVICES HOVER SECTION HERE ---------- */}
        <section aria-label="Strategic Talent Services" className="relative w-full overflow-hidden mt-10">
          {/* BACKGROUND LAYER - computed only when `active` changes */}
          <BackgroundLayer active={active} items={SERVICES_ITEMS} reducedMotion={prefersReducedMotion} />

          {/* lighter vignette so background reads */}
          <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-black/30 to-black/40" />

          <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 py-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Strategic Talent Services</h2>
              <p className="mt-3 text-gray-300 max-w-xl">
                We are more than just executive recruiters; we offer world-class talent acquisition services and provide recruitment solutions that address a range of talent challenges and goals.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES_ITEMS.map((it, idx) => {
                // memoize glow gradient string per card
                const glowGradient = useMemo(
                  () => `linear-gradient(180deg, transparent 0%, ${it.glowFrom} 100%)`,
                  [it.glowFrom]
                );

                return (
                  <div
                    key={it.id}
                    tabIndex={0}
                    onMouseEnter={() => setActive(idx)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(idx)}
                    onBlur={() => setActive(null)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActive((prev) => (prev === idx ? null : idx));
                      }
                      if (e.key === "Escape") setActive(null);
                    }}
                    className={`relative group rounded-2xl p-6 lg:p-8 min-h-[360px] flex flex-col justify-between
                      border border-white/6 bg-black/10 backdrop-blur-sm transition-all duration-300
                      ${active === idx ? "scale-[1.01] shadow-2xl" : "hover:scale-[1.01]"} overflow-hidden`}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    {/* Bottom Glow (memoized gradient) */}
                    <div
                      aria-hidden
                      className={`absolute inset-x-6 bottom-0 h-32 pointer-events-none transition-all ${prefersReducedMotion ? "" : "duration-500 ease-out"}`}
                      style={{
                        background: glowGradient,
                        filter: "blur(36px)",
                        opacity: active === idx ? 0.95 : 0,
                        transform: active === idx ? "translateY(-28px)" : "translateY(12px)",
                      }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div
                          className={`text-[88px] leading-none font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-br ${it.accentFrom}`}
                          style={{ WebkitBackgroundClip: "text" }}
                        >
                          {it.number}
                        </div>
                      </div>

                      <h3
                        className="mt-4 text-2xl lg:text-3xl font-semibold text-white uppercase"
                        style={{ letterSpacing: "0.25em", lineHeight: 1.05 }}
                      >
                        {it.title}
                      </h3>

                      <p className="mt-6 text-sm text-gray-200 leading-relaxed">{it.desc}</p>
                    </div>

                    <div className="mt-6 flex items-center justify-between relative z-10">
                      <span className={`${it.linkColor} font-semibold text-sm flex items-center gap-2`}>
                        Find Out More
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M5 12h14M13 5l6 7-6 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>

                      <div className="w-3 h-3 rounded-full bg-white/10 group-hover:bg-white/20" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="sr-only" aria-live="polite">
              {active === null ? "Hover or focus a service to preview its background." : `Previewing ${SERVICES_ITEMS[active].title}`}
            </div>
          </div>
        </section>
        {/* ---------- END SERVICES SECTION ---------- */}

        {/* Mission & Vision, Why choose us, CTA (unchanged layout) */}
        <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/6 bg-linear-to-b from-white/4 to-white/3 p-6">
            <h4 className="font-semibold text-lg">Our Mission</h4>
            <p className="mt-3 text-gray-300">To enable industrial growth by providing reliable, trained and compliant blue-collar teams.</p>
          </div>
          <div className="rounded-2xl border border-white/6 bg-linear-to-b from-white/4 to-white/3 p-6">
            <h4 className="font-semibold text-lg">Our Vision</h4>
            <p className="mt-3 text-gray-300">To be the trusted workforce partner for heavy industries.</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 text-center">
          <h4 className="text-xl font-semibold">Ready to partner with us?</h4>
          <p className="mt-2 text-gray-300">Whether you are hiring or seeking work, let’s start a conversation.</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link to="/recruiters" className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-linear-to-r from-violet-500 to-teal-400 text-black font-semibold">Hire Talent</Link>
            <Link to="/jobs" className="inline-flex items-center gap-2 rounded-full px-6 py-3 border border-white/10 text-white">Find Jobs</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/6 py-8">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-sm text-gray-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© {new Date().getFullYear()} Blue Global Force — All rights reserved.</div>
            <div className="flex items-center gap-4">
              <a href="#privacy" className="hover:underline">Privacy</a>
              <a href="#terms" className="hover:underline">Terms</a>
              <a href="#contact" className="hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ---------- Background layer component (memoized style) ---------- */
function BackgroundLayer({ active, items, reducedMotion }) {
  const style = useMemo(() => {
    if (active === null || items[active] == null) {
      return {
        background: "linear-gradient(180deg, rgba(6,6,10,0.55), rgba(6,6,10,0.60))",
      };
    }
    const img = items[active].image;
    return {
      backgroundImage: `linear-gradient(180deg, rgba(6,6,10,0.28), rgba(6,6,10,0.36)), url("${img}")`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
      transform: "scale(1.02)",
      filter: "contrast(1.03) saturate(1.05)",
    };
  }, [active, items]);

  return (
    <div
      aria-hidden
      className={`absolute inset-0 transition-all ${reducedMotion ? "" : "duration-700 ease-[cubic-bezier(.2,.9,.2,1)]"}`}
      style={style}
    />
  );
}
