// src/pages/RecruitersPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Marquee from "react-fast-marquee";

/**
 * RecruitersPage — Option A (timeline updated)
 * - Replaced the previous "Deployment lifecycle" horizontal strip with a modern,
 *   accessible timeline component that shows steps, descriptions and optional attachments.
 * - Uses local uploaded brochure/poster path (will be transformed by build tooling):
 *     /mnt/data/Screenshot 2025-11-19 at 2.19.14 PM.png
 *
 * Keep Tailwind available in project.
 */

/* ---------------- assets (local uploaded path requested by developer) ---------------- */
const HERO_VIDEO =
  "https://res.cloudinary.com/danwfu3n6/video/upload/v1763808781/3129902-uhd_3840_2160_25fps_fiyxjf.mp4";
const BROCHURE = "/mnt/data/Screenshot 2025-11-19 at 2.19.14 PM.png"; // local uploaded path

/* ---------------- sample / sector data (7 sectors) ---------------- */
const SECTORS_PREVIEW = [
  {
    id: "mining",
    title: "Mining",
    desc: "Skilled operators, machine handlers, and safety-focused crews.",
    image:
      "https://res.cloudinary.com/dxzhnns58/image/upload/v1763451906/dominik-vanyi-Mk2ls9UBO2E-unsplash_1_uk97mb.jpg",
    jobsAvailable: 128,
    avgExperience: "2-5 yrs",
    commonRoles: [
      "Excavator Operator",
      "Driller",
      "Blaster",
      "Dumper Operator",
    ],
  },
  {
    id: "steel",
    title: "Steel & Aluminium",
    desc: "Production staff, maintenance, and plant logistics.",
    image:
      "https://res.cloudinary.com/dxzhnns58/image/upload/v1763451904/ant-rozetsky-_qWeqqmpBpU-unsplash_depnwu.jpg",
    jobsAvailable: 94,
    avgExperience: "1-4 yrs",
    commonRoles: [
      "Furnace Operator",
      "Maintenance Tech",
      "Logistics Coordinator",
    ],
  },
  {
    id: "power",
    title: "Power & Green Energy",
    desc: "Technicians for thermal, hydro, solar & wind projects.",
    image:
      "https://res.cloudinary.com/dxzhnns58/image/upload/v1763451905/sungrow-emea-VC-m6ULjJ6Y-unsplash_fjglkj.jpg",
    jobsAvailable: 76,
    avgExperience: "3-6 yrs",
    commonRoles: [
      "Turbine Technician",
      "Solar Installer",
      "Electrical Technician",
    ],
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

/* ---------------- other sample data ---------------- */
const CLIENT_LOGOS = [
  "https://dummyimage.com/200x80/111827/ffffff&text=OreWorks",
  "https://dummyimage.com/200x80/111827/ffffff&text=Metallix",
  "https://dummyimage.com/200x80/111827/ffffff&text=GreenGrid",
  "https://dummyimage.com/200x80/111827/ffffff&text=HarborCo",
  "https://dummyimage.com/200x80/111827/ffffff&text=BuildPro",
];

const PRICING = [
  {
    id: "p1",
    name: "RPO (Volume)",
    price: "Custom",
    bullets: ["Dedicated team", "SLA-backed", "Compliance included"],
  },
  {
    id: "p2",
    name: "Contract Staffing",
    price: "Monthly",
    bullets: ["Short to mid-term", "Flexible scale"],
  },
  {
    id: "p3",
    name: "Executive Search",
    price: "Success fee",
    bullets: ["Senior hires", "Assessment & vetting"],
  },
];

/* ---------------- small hooks & helpers ---------------- */
function useAnimatedCount(target = 0, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = null;
    let start = null;
    const from = 0;
    const to = target;
    const step = (ts) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(from + (to - from) * prog));
      if (prog < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------- Main page ---------------- */
export default function RecruitersPage() {
  const workersDeployed = useAnimatedCount(1520, 1300);
  const avgFill = useAnimatedCount(12, 900);
  const repeatClients = useAnimatedCount(78, 900);
  const compliance = useAnimatedCount(98, 900);

  // slider ref for sectors
  const sectorsSliderRef = useRef(null);
  const sectorsSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
    appendDots: (dots) => (
      <div className="mt-4">
        <ul className="flex gap-2 justify-center">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button
        className="w-3 h-3 rounded-full bg-white/20"
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
  };

  return (
    <main className="min-h-screen bg-black text-white antialiased">
      {/* HERO */}
      <header
        className="relative overflow-hidden"
        style={{ minHeight: "78vh" }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_VIDEO}
          poster={BROCHURE}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/60" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 max-w-2xl">
            <div className="text-sm uppercase tracking-wider text-teal-300 font-semibold">
              For Recruiters
            </div>
            <h1 className="mt-4 text-3xl lg:text-5xl font-extrabold leading-tight">
              Hire compliant, trained teams — faster with Blue Global Force
            </h1>
            <p className="mt-4 text-gray-300">
              Enterprise-grade workforce solutions for heavy industry. RPO,
              contract staffing, overseas placements and role-specific training
              — all under one roof.
            </p>

            <div className="mt-6 flex gap-3">
              <Link
                to="/contact"
                className="rounded-full px-5 py-3 bg-linear-to-r from-teal-400 to-violet-500 text-black font-semibold"
              >
                Request Talent
              </Link>
              <a
                href={BROCHURE}
                download
                className="rounded-full px-5 py-3 border border-white/10 bg-black/30"
              >
                Download Brochure
              </a>
            </div>
          </div>

          <div className="w-full lg:w-96 bg-white/5 border border-white/6 rounded-2xl p-4">
            <div className="text-sm text-gray-300">Quick stats</div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <StatCard
                label="Workers Deployed"
                value={workersDeployed}
                accent="text-teal-300"
              />
              <StatCard
                label="Avg Fill (days)"
                value={avgFill}
                accent="text-indigo-300"
              />
              <StatCard
                label="Repeat Clients"
                value={repeatClients}
                accent="text-amber-300"
              />
              <StatCard
                label="Compliance"
                value={`${compliance}%`}
                accent="text-pink-300"
              />
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        {/* AI MATCHING */}
        <section className="bg-white/4 border border-white/6 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold">
                AI-Enhanced Talent Matching
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Visualize how our matching engine ranks candidates for a role —
                quick preview for recruiters.
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <Link
                to="/solutions"
                className="px-3 py-2 rounded-full bg-white/6"
              >
                See solutions
              </Link>
              <Link to="/demo" className="px-3 py-2 rounded-full bg-white/6">
                Request demo
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2 p-4 rounded-lg bg-black/6 border border-white/6">
              <div className="flex gap-3">
                <input
                  defaultValue="Excavator Operator"
                  className="flex-1 px-3 py-2 rounded-md bg-transparent border border-white/8"
                />
                <input
                  defaultValue="Hydraulic experience"
                  className="w-56 px-3 py-2 rounded-md bg-transparent border border-white/8"
                />
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MatchCard label="Skill fit" percent={82} />
                <MatchCard label="Experience" percent={74} />
                <MatchCard label="Availability" percent={91} />
              </div>

              <div className="mt-6 text-sm text-gray-300">
                <div>
                  <strong>Top signals:</strong> Certification, safety
                  compliance, simulator hours
                </div>
                <div className="mt-2">
                  Tip: add role-specific keywords to improve match precision.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-black/6 border border-white/6">
              <h3 className="font-semibold">Candidate Snapshot</h3>
              <div className="mt-3 space-y-3 text-sm text-gray-300">
                <div className="flex items-center justify-between">
                  <div>Avg match score</div>
                  <div className="font-semibold">82%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Verified certifications</div>
                  <div className="font-semibold">70%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>Safety trained</div>
                  <div className="font-semibold">Yes</div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/match"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-teal-400 to-violet-500 text-black font-semibold"
                >
                  Run full match
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PARALLAX SECTORS */}
        {/* <ParallaxSectors items={SECTORS_PREVIEW} /> */}

        {/* RECRUITER TOOL CARDS */}
        <section className="bg-white/4 border border-white/6 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recruiter Tools</h2>
            <p className="text-sm text-gray-400">
              Tools built for operational scale
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ToolCard
              title="Bulk Screening"
              desc="Upload CVs; run auto-screening rules & shortlisting"
            />
            <ToolCard
              title="Simulator Assessments"
              desc="Role-specific simulator scoring & report"
            />
            <ToolCard
              title="Compliance Hub"
              desc="Medical checks, document vault and audit trail"
            />
            <ToolCard
              title="Onboarding Manager"
              desc="Digital induction, e-signatures & attendance"
            />
          </div>
        </section>

        {/* SECTORS SLIDER (react-slick) - 7 sector cards */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Sectors we hire for</h2>
              <p className="text-sm text-gray-400">
                Browse domain-specific talent pools
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => sectorsSliderRef.current?.slickPrev()}
                className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/6"
              >
                ‹
              </button>
              <button
                onClick={() => sectorsSliderRef.current?.slickNext()}
                className="hidden md:inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/6"
              >
                ›
              </button>
            </div>
          </div>

          <div>
            <Slider ref={sectorsSliderRef} {...sectorsSettings}>
              {SECTORS_PREVIEW.map((s) => (
                <div key={s.id} className="px-3">
                  <article className="rounded-2xl overflow-hidden border border-white/6 bg-white/4 shadow-md">
                    <div className="h-[400px] w-full relative">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                      <div className="absolute left-0 bottom-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4">
                        <h3 className="text-lg font-semibold text-white">
                          {s.title}
                        </h3>
                        <p className="text-xs text-gray-200 mt-1 line-clamp-2">
                          {s.desc}
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1 text-xs">
                          <strong className="text-white">
                            {s.jobsAvailable}
                          </strong>
                          <span className="text-gray-300">open roles</span>
                        </div>

                        <div className="text-xs text-gray-300">
                          {s.avgExperience}
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-gray-300">
                        <strong className="text-white">Common:</strong>{" "}
                        {s.commonRoles.join(", ")}
                      </p>

                      <div className="mt-4 flex gap-2">
                        <Link
                          to={`/sectors/${s.id}`}
                          className="text-sm text-teal-300 font-semibold"
                        >
                          See roles →
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* TRUSTED BY — MARQUEE */}
        <section className="bg-transparent py-10">
          <h2 className="text-2xl font-semibold mb-6">Trusted by</h2>

          <Marquee
            gradient={false}
            speed={40}
            pauseOnHover={true}
            className="flex items-center"
          >
            {CLIENT_LOGOS.map((src, i) => (
              <div
                key={i}
                className="w-48 h-20 mx-6 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg"
              >
                <img
                  src={src}
                  alt={`client-${i}`}
                  className="max-h-14 object-contain"
                />
              </div>
            ))}
          </Marquee>
        </section>

        {/* CLIENT LOGOS
        <section className="bg-transparent">
          <h2 className="text-2xl font-semibold mb-4">Trusted by</h2>
          <div className="overflow-x-auto no-scrollbar -mx-4 px-4 snap-x snap-mandatory flex gap-4">
            {CLIENT_LOGOS.map((src, i) => (
              <div key={i} className="snap-start shrink-0 w-52 h-20 flex items-center justify-center bg-white/5 border border-white/6 rounded-lg">
                <img src={src} alt={`client-${i}`} className="max-h-14 object-contain" />
              </div>
            ))}
          </div>
        </section> */}

        {/* TIMELINE: Modern Deployment Lifecycle */}
        <Timeline />

        {/* Pricing & Downloads */}
        <section className="bg-transparent">
          <h2 className="text-2xl font-semibold">Engagement Models & Docs</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICING.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl p-6 bg-white/5 border border-white/6"
              >
                <div className="text-sm text-gray-300">{p.name}</div>
                <div className="mt-2 text-3xl font-extrabold">{p.price}</div>
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1">
                        <IconCheck />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    to="/contact"
                    className="rounded-full px-5 py-2 bg-linear-to-r from-teal-400 to-violet-500 text-black font-semibold"
                  >
                    Get quote
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <DocCard
              title="Compliance Pack"
              desc="Audit-ready checklist"
              href={BROCHURE}
            />
            <DocCard
              title="Service SLA"
              desc="Typical SLAs for RPO & contract staffing"
              href={BROCHURE}
            />
            <DocCard
              title="Training Matrix"
              desc="Simulator & on-site training overview"
              href={BROCHURE}
            />
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/6 py-8 mt-8">
        <div className="max-w-6xl mx-auto px-6 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="font-semibold text-white">Blue Global Force</div>
              <div className="mt-2">
                Workforce solutions & manpower for heavy industries
              </div>
            </div>

            <div className="flex gap-6">
              <div>
                <div className="font-semibold text-white">Quick links</div>
                <ul className="mt-2 space-y-1 text-gray-400">
                  <li>
                    <Link to="/jobs" className="hover:underline">
                      Browse jobs
                    </Link>
                  </li>
                  <li>
                    <Link to="/trainings" className="hover:underline">
                      Training
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <div className="font-semibold text-white">Contact</div>
                <div className="mt-2 text-gray-400">
                  Helpline:{" "}
                  <a href="tel:+911234567890" className="text-teal-300">
                    +91 12345 67890
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/6 pt-4 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Blue Global Force — All rights
            reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ---------------- subcomponents ---------------- */

function StatCard({ label, value, accent = "text-white" }) {
  return (
    <div className="p-3 rounded-lg bg-black/6 border border-white/6 flex flex-col items-start">
      <div className={`text-2xl font-extrabold ${accent}`}>{value}</div>
      <div className="text-xs text-gray-300 mt-1">{label}</div>
    </div>
  );
}

function MatchCard({ label, percent = 0 }) {
  return (
    <div className="p-4 rounded-lg bg-black/6 border border-white/6 flex flex-col items-center">
      <svg viewBox="0 0 36 36" className="w-20 h-20">
        <path
          d="M18 2a16 16 0 1 0 0 32 16 16 0 1 0 0-32"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-10"
        />
        <path
          d="M18 2a16 16 0 1 0 0 32 16 16 0 1 0 0-32"
          fill="none"
          stroke="url(#grad)"
          strokeWidth="2.6"
          strokeDasharray={`${percent},100`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="grad" x1="0" x2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="52%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-white"
          style={{ fontSize: "0.9rem", fill: "white" }}
        >
          {percent}%
        </text>
      </svg>
      <div className="mt-3 text-sm text-gray-300 text-center">{label}</div>
    </div>
  );
}

function ToolCard({ title, desc }) {
  return (
    <div className="p-4 rounded-lg bg-black/6 border border-white/6 flex flex-col justify-between">
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-300 mt-2">{desc}</div>
      </div>
      <div className="mt-4">
        <Link to="/tools" className="text-teal-300 text-sm font-semibold">
          Open tool →
        </Link>
      </div>
    </div>
  );
}

function DocCard({ title, desc, href }) {
  return (
    <div className="p-4 rounded-lg bg-black/6 border border-white/6 flex items-start justify-between">
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-300 mt-1">{desc}</div>
      </div>
      <a
        href={href}
        download
        className="ml-4 px-3 py-2 rounded-md bg-linear-to-r from-teal-400 to-violet-500 text-black text-sm"
      >
        Download
      </a>
    </div>
  );
}

/* ---------------- ParallaxSectors (visual highlight) ---------------- */
function ParallaxSectors({ items = [] }) {
  const bg = items[0]?.image || null;
  const style = bg
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(6,6,6,0.22), rgba(6,6,6,0.32)), url("${bg}")`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { background: "linear-gradient(90deg,#0f172a,#020617)" };

  return (
    <section
      className="rounded-2xl overflow-hidden"
      aria-label="Sector highlights"
    >
      <div className="relative h-64 md:h-80" style={style}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 h-full flex items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {items.slice(0, 3).map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-lg bg-white/5 border border-white/6 backdrop-blur-sm"
              >
                <div className="h-32 w-full overflow-hidden rounded-md">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3">
                  <div className="font-semibold">{s.title}</div>
                  <div className="text-sm text-gray-300 mt-1">
                    Skilled teams & on-site readiness
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to={`/sectors/${s.id}`}
                    className="text-teal-300 text-sm font-semibold"
                  >
                    Explore roles →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   Timeline component
   - Modern vertical timeline with step cards, icons, small attachments
   - Accessible: uses list semantics; each item can be expanded (aria)
   ========================= */
function Timeline() {
  const steps = [
    {
      id: "plan",
      title: "Plan & Requirements",
      when: "Day 0",
      detail:
        "Define volumes, roles, KPIs, medical & safety criteria. Agree SLAs and timelines with Blue Global Force account team.",
      docs: [{ name: "Requirement Sheet", href: BROCHURE }],
    },
    {
      id: "source",
      title: "Sourcing & Outreach",
      when: "Day 1–7",
      detail:
        "Targeted sourcing from verified pools, local partners and training centres. Shortlist via automated screening.",
      docs: [{ name: "Sourcing Report", href: BROCHURE }],
    },
    {
      id: "screen",
      title: "Screening & Assessment",
      when: "Day 7–14",
      detail:
        "Document verification, background checks and simulator/skill assessments. We surface top-scoring candidates for your review.",
      docs: [{ name: "Assessment Matrix", href: BROCHURE }],
    },
    {
      id: "compliance",
      title: "Compliance & Medical",
      when: "Day 10–18",
      detail:
        "Medicals, safety certifications and legal compliance processed. Digital audit trail stored in our Compliance Hub.",
      docs: [{ name: "Compliance Pack", href: BROCHURE }],
    },
    {
      id: "onboard",
      title: "Onboarding & Induction",
      when: "Day 18–21",
      detail:
        "Site induction, e-signatures, PPE allocation and role-specific induction delivered via our Onboarding Manager.",
      docs: [{ name: "Induction Checklist", href: BROCHURE }],
    },
    {
      id: "deploy",
      title: "Deployment",
      when: "Day 21",
      detail:
        "Candidates mobilised to site. First-week supervision and performance check-ins managed by Blue Global Force field team.",
      docs: [{ name: "Deployment Brief", href: BROCHURE }],
    },
    {
      id: "aftercare",
      title: "Aftercare & Retention",
      when: "Week 1–12",
      detail:
        "Post-deployment support, performance tracking and replacement guarantee where applicable. Dedicated AM for escalations.",
      docs: [{ name: "Aftercare SLA", href: BROCHURE }],
    },
  ];

  return (
    <section
      className="bg-white/5 border border-white/6 rounded-2xl p-6"
      aria-label="Deployment lifecycle timeline"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Deployment Lifecycle</h2>
        <p className="text-sm text-gray-400">
          A modern timeline from requirement to retention
        </p>
      </div>

      <ol
        className="mt-6 relative border-l border-white/6 ml-2 space-y-8"
        role="list"
      >
        {steps.map((s, idx) => (
          <li
            key={s.id}
            className="relative"
            aria-labelledby={`step-title-${s.id}`}
          >
            {/* marker */}
            <span
              className={`absolute -left-[14px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-black/60 ${
                idx % 2 === 0
                  ? "bg-teal-300 text-black"
                  : "bg-indigo-400 text-black"
              }`}
              aria-hidden
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M12 2v6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 16v6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <div className="ml-6 md:ml-8 p-4 rounded-lg bg-black/6 border border-white/6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div
                    id={`step-title-${s.id}`}
                    className="flex items-baseline gap-3"
                  >
                    <h3 className="font-semibold text-lg">{s.title}</h3>
                    <span className="text-xs text-gray-400">• {s.when}</span>
                  </div>

                  <p className="mt-2 text-sm text-gray-300">{s.detail}</p>

                  {s.docs?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.docs.map((d) => (
                        <a
                          key={d.name}
                          href={d.href}
                          download
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/6 text-sm"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden
                          >
                            <path
                              d="M12 3v12"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8 11l4 4 4-4"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M20 21H4"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {d.name}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>

                {/* small metadata / ETA card */}
                <div className="hidden sm:flex flex-col items-end text-right">
                  <div className="text-xs text-gray-400">ETA</div>
                  <div className="font-semibold">{s.when}</div>

                  {/* subtle micro-progress for long steps */}
                  {s.id === "compliance" || s.id === "aftercare" ? (
                    <div className="mt-3 w-28 bg-white/8 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: s.id === "compliance" ? "88%" : "64%",
                          background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
                        }}
                        aria-hidden
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* timeline footer CTA */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="text-sm text-gray-300">
          Want this tailored into your SLA? Our enterprise team will map
          timelines to your project KPIs.
        </div>
        <div>
          <Link
            to="/contact"
            className="rounded-full px-4 py-2 bg-linear-to-r from-teal-400 to-violet-500 text-black font-semibold"
          >
            Request SLA
          </Link>
        </div>
      </div>
    </section>
  );
}
