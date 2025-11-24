// src/pages/JobSeekersPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GridScan } from "../components/common/NeonGrid";

/**
 * JobSeekersPage - Extended with two new sections:
 * 1) OverseasSection (split layout with image collage left + text + progress bar right)
 * 2) CountriesSection (grid of country cards / flags)
 *
 * Note: This file uses local uploaded images which your build/tooling will
 * transform to served URLs. The local paths used below were provided earlier:
 * - /mnt/data/Screenshot 2025-11-21 at 3.20.54 PM.png
 * - /mnt/data/Screenshot 2025-11-22 at 5.09.44 PM.png
 * - /mnt/data/Screenshot 2025-11-22 at 5.10.10 PM.png
 * - /mnt/data/Screenshot 2025-11-19 at 2.19.14 PM.png
 *
 * Drop this file into your project. Tailwind classes are used throughout.
 */

const HERO_VIDEO =
  "https://res.cloudinary.com/dxzhnns58/video/upload/v1763971305/3129785-uhd_3840_2160_25fps_1_aybfha.mp4";
const HERO_POSTER = "/mnt/data/Screenshot 2025-11-19 at 2.19.14 PM.png";
const PROMO_IMG =
  "https://res.cloudinary.com/danwfu3n6/image/upload/v1763809031/luca-maffeis-iY_cqJome-A-unsplash_wrbehp.jpg";

/* new local images used for the requested sections */
const OVERSEAS_COLLAGE = "/mnt/data/Screenshot 2025-11-22 at 5.09.44 PM.png";
const COUNTRIES_BG =
  "https://res.cloudinary.com/danwfu3n6/image/upload/v1763813161/red-john-hosJZJN7HLY-unsplash_p9b277.jpg";

/* ---------------- Demo data (replace with real APIs) ---------------- */
const SAMPLE_JOBS = [
  {
    id: "J-001",
    title: "Excavator Operator",
    sector: "Mining",
    company: "OreWorks",
    location: "Jharsuguda",
    salary: "₹28k–₹35k",
    exp: "2–5 yrs",
    tags: ["Night", "On-site"],
  },
  {
    id: "J-002",
    title: "Furnace Operator",
    sector: "Steel & Aluminium",
    company: "Metallix",
    location: "Jamshedpur",
    salary: "₹30k–₹40k",
    exp: "1–4 yrs",
    tags: ["Rotational"],
  },
  {
    id: "J-003",
    title: "Turbine Technician",
    sector: "Power & Green Energy",
    company: "GreenGrid",
    location: "Bengaluru",
    salary: "₹35k–₹50k",
    exp: "3–6 yrs",
    tags: ["Certified"],
  },
];

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

const TRAININGS = [
  {
    id: "T1",
    title: "Excavator Simulator",
    duration: "2 days",
    type: "Practical",
  },
  {
    id: "T2",
    title: "Site Safety & Induction",
    duration: "1 day",
    type: "Cert",
  },
];

/* ---------------- small hooks ---------------- */
function useDebounced(value, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}
function useAnimatedCount(target, duration = 1200) {
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

/* ---------------- Main page ---------------- */
export default function JobSeekersPage() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("all");
  const [location, setLocation] = useState("");
  const debouncedQuery = useDebounced(query, 300);

  const jobs = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return SAMPLE_JOBS.filter((j) => {
      if (sector !== "all" && j.sector.toLowerCase() !== sector.toLowerCase())
        return false;
      if (
        location &&
        !j.location.toLowerCase().includes(location.toLowerCase())
      )
        return false;
      if (!q) return true;
      return [j.title, j.company, j.location].some((f) =>
        f.toLowerCase().includes(q)
      );
    });
  }, [debouncedQuery, sector, location]);

  const memoSectors = useMemo(() => SECTORS, []);
  const memoTrainings = useMemo(() => TRAININGS, []);

  return (
    <main className="min-h-screen text-white antialiased bg-linear-to-b from-black via-black to-black">
      {/* HERO */}
      <header
        aria-label="Hero"
        className="relative overflow-hidden"
        style={{ minHeight: "100vh" }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/35 to-black/50" />

        <div className="relative z-10 max-w-7xl mt-44 mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Get placed faster. Work safer.
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              Blue Global Force connects trained blue-collar talent with
              responsible employers across Mining, Steel, Power, Shipping, EV
              and Construction.
            </p>
          </div>

          <form
            className="mt-8 bg-white/6 border border-white/8 rounded-full p-2 flex gap-2 items-center shadow-lg max-w-4xl"
            role="search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search role, company or location — e.g. Excavator Operator, Jamshedpur"
              className="flex-1 bg-transparent placeholder:text-gray-300 text-white px-4 py-3 rounded-full focus:outline-none"
            />
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              aria-label="Sector"
              className="bg-black/20 text-sm px-3 py-2 rounded-full focus:outline-none"
            >
              <option value="all">All sectors</option>
              {memoSectors.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (optional)"
              className="hidden md:inline-block bg-transparent placeholder:text-gray-300 px-3 py-2 rounded-full focus:outline-none"
            />
            <button className="ml-2 rounded-full bg-linear-to-r from-teal-400 to-violet-500 text-black px-5 py-2 font-semibold">
              Search
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-300 flex gap-4 items-center">
            <span className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-teal-300" /> Urgent
              hires: 300+
            </span>
            <span className="text-gray-400">
              Need help?{" "}
              <a href="#contact" className="text-teal-300 hover:underline">
                Contact us
              </a>
            </span>
          </div>
        </div>
      </header>

      {/* MAIN WRAPPER */}
      <div className="px-6 py-12 lg:py-20 space-y-12">
        {/* Quick Filters */}
        <section className="max-w-7xl mx-auto bg-white/5 border border-white/6 rounded-2xl p-6 lg:flex lg:items-center lg:gap-6">
          <div>
            <h2 className="text-xl font-semibold">Quick Filters</h2>
            <p className="text-sm text-gray-300 mt-1">
              Narrow by sector, location or experience to surface the best
              matches.
            </p>
          </div>

          <div className="mt-4 lg:mt-0 flex-1 flex gap-3 items-center">
            <select
              className="bg-black/10 px-3 py-2 rounded-md text-sm"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
            >
              <option value="all">All sectors</option>
              {memoSectors.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>

            <input
              className="flex-1 px-3 py-2 rounded-md bg-black/10 text-sm"
              placeholder="City / State"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <select className="bg-black/10 px-3 py-2 rounded-md text-sm">
              <option>Any experience</option>
              <option>0–2 yrs</option>
              <option>2–5 yrs</option>
              <option>5+ yrs</option>
            </select>

            <button
              onClick={() => {
                setSector("all");
                setLocation("");
                setQuery("");
              }}
              className="px-4 py-2 rounded-md border border-white/10 text-sm"
            >
              Reset
            </button>
          </div>

          <div className="mt-3 lg:mt-0 lg:ml-auto text-sm text-gray-300">
            Matches:{" "}
            <span className="text-white font-medium">{jobs.length}</span>
          </div>
        </section>

        {/* FEATURED JOBS */}
        <section className="max-w-7xl mx-auto bg-linear-to-r from-slate-900 to-slate-800 border border-white/6 rounded-2xl p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold">Featured Roles</h2>
              <p className="text-sm text-gray-400 mt-1">
                Highlighted and urgent openings
              </p>
            </div>

            <div className="hidden md:flex gap-3">
              <Link to="/jobs" className="px-4 py-2 rounded-full bg-white/6">
                Browse all jobs
              </Link>
              <Link
                to="/trainings"
                className="px-4 py-2 rounded-full bg-white/6"
              >
                Training
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length ? (
              jobs.map((j) => (
                <article
                  key={j.id}
                  className="rounded-xl p-4 bg-black/10 border border-white/6 hover:scale-[1.01] transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-linear-to-br from-sky-400 to-indigo-600 text-white font-bold">
                      {j.title
                        .split(" ")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{j.title}</h3>
                      <div className="text-xs text-gray-400">
                        {j.company} • {j.location}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-sm text-gray-300">
                    <div>{j.salary}</div>
                    <div className="text-xs">{j.exp}</div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {j.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-white/6 px-2 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 rounded-full px-4 py-2 bg-linear-to-r from-teal-400 to-violet-500 text-black font-semibold">
                      Quick Apply
                    </button>
                    <button className="px-3 py-2 rounded-md border border-white/10">
                      Details
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-gray-400 p-6">
                No roles found. Try removing filters or broaden your search.
              </div>
            )}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-7xl mx-auto bg-white/4 border border-white/6 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">How it works</h2>
            <p className="text-sm text-gray-300 mt-1">
              A simple three step process from search to deployment.
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-black/6 border border-white/6">
              <div className="text-teal-300 font-semibold">Step 1</div>
              <h3 className="font-semibold mt-2">Search & Shortlist</h3>
              <p className="text-sm text-gray-300 mt-2">
                Filter by role, sector & location. Save favourites.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-black/6 border border-white/6">
              <div className="text-teal-300 font-semibold">Step 2</div>
              <h3 className="font-semibold mt-2">Verify & Train</h3>
              <p className="text-sm text-gray-300 mt-2">
                Upload documents; enroll for short courses and simulators.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-black/6 border border-white/6">
              <div className="text-teal-300 font-semibold">Step 3</div>
              <h3 className="font-semibold mt-2">Deploy</h3>
              <p className="text-sm text-gray-300 mt-2">
                Fast placement with employer match and on-site onboarding.
              </p>
            </div>
          </div>
        </section>

        {/* SECTORS: Carousel (uses simple CSS scroll snap for light-weight slider) */}
        <SectorsCarousel items={memoSectors} />

        {/* TRAINING & CAREER PATHWAYS */}
        <section className="max-w-7xl mx-auto bg-white/5 border border-white/6 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold">Training & Upskilling</h2>
            <p className="text-sm text-gray-300 mt-1">
              Short courses to boost deployability and wages.
            </p>

            <div className="mt-4 space-y-3">
              {memoTrainings.map((t) => (
                <div
                  key={t.id}
                  className="p-4 rounded-lg bg-black/6 border border-white/6 flex items-center justify-between"
                >
                  <div>
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-xs text-gray-300">
                      {t.duration} • {t.type}
                    </div>
                  </div>
                  <button className="rounded-md px-3 py-2 bg-linear-to-r from-teal-400 to-violet-500 text-black text-sm">
                    Book
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Career Pathways</h2>
            <p className="text-sm text-gray-300 mt-1">
              Clear progression lanes across sectors.
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-black/6 border border-white/6">
                <div className="font-semibold">Mining</div>
                <ol className="text-sm text-gray-300 mt-2 list-decimal list-inside">
                  <li>Helper → Machine Assistant</li>
                  <li>Machine Assistant → Certified Operator</li>
                  <li>Operator → Supervisor</li>
                </ol>
              </div>

              <div className="rounded-lg p-4 bg-black/6 border border-white/6">
                <div className="font-semibold">Power / EV</div>
                <ol className="text-sm text-gray-300 mt-2 list-decimal list-inside">
                  <li>Trainee → Field Technician</li>
                  <li>Technician → Specialist</li>
                  <li>Specialist → Trainer / Lead</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- PROMOTIONAL PARALLAX BANNER (full-bleed, fixed background) ---------- */}
        <PromotionalBanner
          imageUrl={PROMO_IMG}
          title="Get Job-Ready — Fast Track Programs"
          subtitle="Enrol in short practical courses & simulator sessions. Certification increases your match rate."
          ctaText="Explore Programs"
          ctaHref="/trainings"
        />
        {/* ---------------------------------------------------------------- */}

        {/* ---------- NEW: OVERSEAS / ABOUT SPLIT SECTION (as per image) ---------- */}
        <OverseasSection />
        {/* ---------------------------------------------------------------- */}

        {/* IMPACT SECTION */}
        <ImpactSection />

        {/* ---------- NEW: COUNTRIES / INTERNATIONAL RECRUITMENT (flag grid) ---------- */}
        <CountriesSection />
        {/* ---------------------------------------------------------------- */}
        {/* <div className="w-screen h-[80vh] bg-black">
          <GridScan
            enableWebcam={true} // Enable face tracking
            showPreview={true} // Show webcam preview
            sensitivity={0.6} // Adjust tracking sensitivity
            linesColor="#00ff00" // Custom green lines
            scanColor="#ff00ff" // Magenta scan
            enablePost={true} // Enable bloom/chroma effects
            bloomIntensity={0.5}
            scanOnClick={true} // Trigger scan on click
          />
        </div> */}

        {/* RESOURCES */}
        <section className="max-w-7xl mx-auto rounded-2xl p-6 bg-linear-to-r from-slate-900 to-black border border-white/6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Resources</h2>
            <p className="text-sm text-gray-400">
              Brochures, checklists & FAQs
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-black/10 border border-white/6 flex items-center justify-between">
              <div>
                <div className="font-semibold">Candidate Brochure</div>
                <div className="text-xs text-gray-300 mt-1">
                  Placement overview & training
                </div>
              </div>
              <a
                href={HERO_POSTER}
                download
                className="px-3 py-2 rounded-md bg-linear-to-r from-teal-400 to-violet-500 text-black text-sm"
              >
                Download
              </a>
            </div>

            <div className="p-4 rounded-lg bg-black/10 border border-white/6">
              <div className="font-semibold">Site Induction Checklist</div>
              <div className="text-xs text-gray-300 mt-1">
                PPE, documents & medical
              </div>
            </div>

            <div className="p-4 rounded-lg bg-black/10 border border-white/6">
              <div className="font-semibold">Document Help</div>
              <div className="text-xs text-gray-300 mt-1">
                Assistance for verification
              </div>
            </div>
          </div>
        </section>

        {/* COMMUNITY & EVENTS */}
        <section className="bg-white/4 rounded-2xl border border-white/6 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Community & Events</h2>
            <p className="text-sm text-gray-400">
              Upcoming training & hiring drives
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Simulator Bootcamp",
                date: "Dec 5, 2025",
                place: "Jharsuguda",
              },
              {
                title: "Mass Hiring Drive",
                date: "Dec 12, 2025",
                place: "Jamshedpur",
              },
              {
                title: "Safety Refresher",
                date: "Jan 8, 2026",
                place: "Bengaluru",
              },
            ].map((e, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-black/6 border border-white/6 flex flex-col justify-between"
              >
                <div>
                  <div className="font-semibold">{e.title}</div>
                  <div className="text-xs text-gray-300 mt-1">
                    {e.date} • {e.place}
                  </div>
                </div>
                <div className="mt-4">
                  <button className="rounded-md px-3 py-2 bg-linear-to-r from-teal-400 to-violet-500 text-black text-sm">
                    Register
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ & SUPPORT */}
        <section className="rounded-2xl p-6 bg-linear-to-r from-slate-900 to-black border border-white/6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-semibold">Need support?</h2>
              <p className="text-sm text-gray-300 mt-1">
                Help with registration, verification or document uploads
              </p>

              <div className="mt-4 space-y-3">
                <div className="p-4 rounded-lg bg-black/10 border border-white/6">
                  <div className="font-semibold">Registration Assistance</div>
                  <div className="text-sm text-gray-300 mt-1">
                    Call our helpline for step-by-step help.
                  </div>
                  <div className="mt-3 text-teal-300 font-semibold">
                    +91 12345 67890
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-black/10 border border-white/6">
                  <div className="font-semibold">Document Verification</div>
                  <div className="text-sm text-gray-300 mt-1">
                    Fast-track verification for certified candidates.
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">FAQs</h2>
              <div className="mt-4 space-y-2">
                <details className="bg-black/6 p-3 rounded-md border border-white/6">
                  <summary className="cursor-pointer font-medium">
                    What documents do I need?
                  </summary>
                  <div className="mt-2 text-sm text-gray-300">
                    Government ID (Aadhaar/Voter), experience letters, medical
                    if required.
                  </div>
                </details>

                <details className="bg-black/6 p-3 rounded-md border border-white/6">
                  <summary className="cursor-pointer font-medium">
                    Do you provide training?
                  </summary>
                  <div className="mt-2 text-sm text-gray-300">
                    Yes — short, role-specific courses and simulator sessions.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="text-sm text-gray-400">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="font-semibold text-white">Blue Global Force</div>
              <div className="mt-2">
                Trusted workforce partner for heavy industries
              </div>
              <div className="mt-2">
                Helpline:{" "}
                <a href="tel:+911234567890" className="text-teal-300">
                  +91 12345 67890
                </a>
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
                <div className="font-semibold text-white">Office</div>
                <div className="mt-2 text-gray-400">
                  123 Industrial Park, Sample City
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/6 pt-4 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Blue Global Force — All rights
            reserved.
          </div>
        </footer>
      </div>
    </main>
  );
}

/* =========================
   SectorsCarousel (lightweight, CSS scroll-snap)
   - Uses SECTORS dataset provided by user
   ========================= */
/* Replace existing SectorsCarousel with this fixed version */
function SectorsCarousel({ items = [] }) {
  const scrollerRef = useRef(null);

  const scrollBy = (amount) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const scrollNext = () => {
    if (!scrollerRef.current) return;
    const el = scrollerRef.current;
    // scroll by one card width (includes gap)
    const card = el.querySelector("[data-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.7;
    scrollBy(step);
  };

  const scrollPrev = () => {
    if (!scrollerRef.current) return;
    const el = scrollerRef.current;
    const card = el.querySelector("[data-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.7;
    scrollBy(-step);
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Sectors We Serve</h2>
        <p className="text-sm text-gray-400">Swipe or use arrows to browse</p>
      </div>

      <div className="relative">
        {/* Arrows (desktop) */}
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
          <button
            onClick={scrollPrev}
            aria-label="Previous"
            className="w-10 h-10 rounded-full bg-white/6 hover:bg-white/10 flex items-center justify-center"
          >
            ‹
          </button>
        </div>

        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
          <button
            onClick={scrollNext}
            aria-label="Next"
            className="w-10 h-10 rounded-full bg-white/6 hover:bg-white/10 flex items-center justify-center"
          >
            ›
          </button>
        </div>

        {/* Horizontal scroller: flex-based, no-overlap, snap */}
        <div
          ref={scrollerRef}
          className="overflow-x-auto no-scrollbar snap-x snap-mandatory px-2 -mx-2"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex gap-4 pb-2">
            {items.map((s) => (
              <article
                key={s.id}
                data-card
                className="snap-start shrink-0 rounded-2xl overflow-hidden border border-white/6 bg-white/3 min-w-[320px] max-w-[380px]"
                style={{ scrollSnapAlign: "start" }}
              >
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
                      <strong className="text-white">{s.jobsAvailable}</strong>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   PromotionalBanner (full-bleed earlier) - unchanged
   ========================= */
function PromotionalBanner({ imageUrl, title, subtitle, ctaText, ctaHref }) {
  // simple parallax: background-attachment fixed for desktop
  const bgStyle = {
    backgroundImage: `linear-gradient(180deg, rgba(6,6,6,0.28), rgba(6,6,6,0.28)), url("${imageUrl}")`,
    backgroundSize: "cover",
    backgroundPosition: "center 50%",
    backgroundAttachment: "fixed",
  };

  return (
    <section
      className="relative rounded-2xl overflow-hidden h-56 md:h-72 flex items-center -mx-6 px-6 md:mx-0"
      style={bgStyle}
      aria-label="Promotional banner"
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6">
          <div className="max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-extrabold">{title}</h3>
            <p className="mt-2 text-gray-200">{subtitle}</p>
          </div>

          <div>
            <Link
              to={ctaHref || "#"}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 bg-linear-to-r from-teal-400 to-violet-500 text-black font-semibold"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   ImpactSection (KPI counters)
   ========================= */
function ImpactSection() {
  const targets = useMemo(
    () => [
      {
        id: "t1",
        label: "Workers Deployed",
        value: 1520,
        accent: "text-teal-300",
      },
      {
        id: "t2",
        label: "Active Openings",
        value: 340,
        accent: "text-indigo-300",
      },
      {
        id: "t3",
        label: "Partner Companies",
        value: 28,
        accent: "text-amber-300",
      },
      {
        id: "t4",
        label: "Training Hours Delivered",
        value: 12400,
        accent: "text-pink-300",
      },
    ],
    []
  );
  const counts = targets.map((t) => useAnimatedCount(t.value, 1200));

  return (
    <section className="max-w-7xl mx-auto rounded-2xl p-6 bg-white/5 border border-white/6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Our Impact</h2>
        <p className="text-sm text-gray-400">Real numbers, real outcomes</p>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {targets.map((t, i) => (
          <div
            key={t.id}
            className="p-4 rounded-lg bg-black/6 border border-white/6 flex flex-col items-start"
          >
            <div className={`text-3xl font-extrabold ${t.accent}`}>
              {counts[i].toLocaleString()}
            </div>
            <div className="text-xs text-gray-300 mt-1">{t.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================
   OverseasSection (left image collage + right copy + progress)
   - Uses OVERSEAS_COLLAGE local image
   - Uses Blue Global Force as the name
   ========================= */
function OverseasSection() {
  return (
    <section className="max-w-7xl mx-auto rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 bg-transparent">
      {/* left: collage visual */}
      <div className="relative hidden lg:block">
        {/* full-bleed image inside left column — artistic collage look */}
        <div className="absolute inset-0">
          <img
            src={OVERSEAS_COLLAGE}
            alt="Blue Global Force collage"
            className="object-cover w-full h-full"
            loading="lazy"
          />
          {/* soft overlay to ensure legibility where needed */}
          <div className="absolute inset-0 bg-linear-to-r from-black/10 to-black/30" />
        </div>
        <div className="relative p-12 h-full" aria-hidden>
          {/* Decorative shapes are intentionally empty — visual only */}
          <div className="w-20 h-20 bg-teal-400/20 rounded-sm transform -translate-x-4 -translate-y-4" />
        </div>
      </div>

      {/* right: content */}
      <div className="bg-white/4 border border-white/6 rounded-2xl p-8 flex flex-col justify-center">
        <div className="max-w-xl">
          <div className="text-sm uppercase text-teal-300 font-semibold">
            Welcome to Blue Global Force
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold mt-3">
            Global Career Opportunities with Blue Global Force
          </h2>

          <p className="mt-6 text-gray-300 leading-relaxed">
            We connect Indian skilled workers with vetted international
            employers. Our expertise covers selection, compliance, pre-departure
            training, and on-site support — ensuring safe, legal and
            well-prepared deployments.
          </p>

          <p className="mt-4 text-sm text-gray-400">
            Whether you're seeking short-term projects or long-term placements,
            we help you prepare with role-specific training, certifications and
            verified employer matches.
          </p>

          {/* progress / KPI bar */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Overseas Recruitment</div>
              <div className="text-sm text-gray-300">98%</div>
            </div>

            <div className="mt-2 w-full bg-white/8 h-3 rounded-full overflow-hidden">
              <div
                className="h-3 rounded-full"
                style={{
                  width: "98%",
                  background: "linear-gradient(90deg,#0ee6d7,#4f46e5)",
                }}
              />
            </div>

            <div className="mt-4 flex gap-3">
              <Link
                to="/overseas"
                className="px-4 py-2 rounded-full bg-linear-to-r from-teal-400 to-violet-500 text-black font-semibold"
              >
                Learn more
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 rounded-md border border-white/10"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   CountriesSection (flags grid)
   - Uses COUNTRIES_BG as subtle decorative background behind the section
   - Displays country cards (simple, accessible)
   ========================= */
function CountriesSection() {
  const COUNTRIES = [
    {
      name: "Saudi Arabia",
      flag: "https://flagcdn.com/w320/sa.png",
    },
    {
      name: "Kuwait",
      flag: "https://flagcdn.com/w320/kw.png",
    },
    {
      name: "Russia",
      flag: "https://flagcdn.com/w320/ru.png",
    },
    {
      name: "Qatar",
      flag: "https://flagcdn.com/w320/qa.png",
    },
    {
      name: "UAE",
      flag: "https://flagcdn.com/w320/ae.png",
    },
    {
      name: "UK",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    {
      name: "Europe Country",
      flag: "https://flagcdn.com/w320/eu.png",
    },
    {
      name: "USA",
      flag: "https://flagcdn.com/w320/us.png",
    },
    {
      name: "Australia",
      flag: "https://flagcdn.com/w320/au.png",
    },
    {
      name: "Romania",
      flag: "https://flagcdn.com/w320/ro.png",
    },
    {
      name: "Maldives",
      flag: "https://flagcdn.com/w320/mv.png",
    },
    {
      name: "Singapore",
      flag: "https://flagcdn.com/w320/sg.png",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0 -z-10 opacity-7">
        <img
          src={COUNTRIES_BG}
          alt=""
          className="object-cover w-full h-full"
          style={{ filter: "brightness(0.08) saturate(0.9)" }}
        />
      </div>

      <div className="bg-transparent border border-white/6 rounded-2xl p-8">
        <div className="text-center">
          <div className="text-sm uppercase text-gray-400">
            We deal in country
          </div>
          <h2 className="text-3xl font-extrabold mt-3">
            We specialize in international recruitment
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {COUNTRIES.map((c) => (
            <div
              key={c.name}
              className="bg-white/4 rounded-lg p-4 flex flex-col items-center justify-center text-center border border-white/6 shadow-sm"
            >
              <img
                src={c.flag}
                alt={c.name}
                className="w-14 h-10 object-cover rounded-sm mb-3"
              />
              <div className="text-sm font-semibold">{c.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
