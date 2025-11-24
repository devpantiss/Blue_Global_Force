import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * HomePage (Futuristic Hero)
 * - Video background with poster fallback (local poster path used)
 * - Respects prefers-reduced-motion
 * - Accessible CTAs using react-router Link
 * - Neon SVG overlays and glassy content card
 */

const VIDEO_SRC =
  "https://res.cloudinary.com/dxzhnns58/video/upload/v1763970487/5322668-hd_1920_1080_30fps_d9ojxg.mp4";

// Local poster (uploaded file path). Build tooling should transform this to an accessible URL.
const POSTER = "/mnt/data/Screenshot 2025-11-19 at 2.19.14 PM.png";

export default function HomePage() {
  const videoRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const handle = () => setPrefersReducedMotion(Boolean(mq?.matches));
    handle();
    mq?.addEventListener?.("change", handle);
    return () => mq?.removeEventListener?.("change", handle);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    const el = videoRef.current;

    if (!prefersReducedMotion) {
      const p = el.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {
          // autoplay blocked: leave it paused (poster visible)
        });
      }
    }
  }, [prefersReducedMotion]);

  return (
    <main className="relative h-screen min-h-[720px] overflow-hidden bg-black text-white">
      {/* Background video (behind everything) */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        src={VIDEO_SRC}
        poster={POSTER}
        muted
        loop={!prefersReducedMotion}
        playsInline
        preload="metadata"
        aria-hidden="true"
        onCanPlay={() => setVideoLoaded(true)}
        autoPlay={!prefersReducedMotion}
      />

      {/* Soft dark vignette for readable text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 20%, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Neon SVG overlay (blend-mode) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-90"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gNeon" x1="0" x2="1">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.38" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ff4dff" stopOpacity="0.22" />
          </linearGradient>
        </defs>

        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={generateWavePath(i)}
            fill="none"
            stroke="url(#gNeon)"
            strokeWidth={1 + (i % 3) * 0.6}
            strokeOpacity={0.08 + i * 0.04}
            transform={`translate(0, ${8 + i * 16}) scale(1, ${1 + i * 0.02})`}
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* Centered hero content (glass panel) */}
      <div className="relative z-10 flex items-center justify-center h-full px-6 sm:px-8">
        <section
          aria-labelledby="hero-heading"
          className="w-full max-w-4xl backdrop-blur-md bg-linear-to-b from-white/6 to-white/4 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <header className="text-center">
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight"
            >
              <span className="block text-gray-200/90">
                Connecting top talent with
              </span>
              <span
                className="block mt-2 text-transparent bg-clip-text bg-linear-to-r from-teal-300 via-violet-400 to-pink-400"
                style={{ WebkitBackgroundClip: "text" }}
              >
                the right employers
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
              Your ideal opportunity is just a click away — discover vetted jobs
              or find top talent faster with smart matching and clarity.
            </p>
          </header>

          {/* CTAs — both buttons styled identically and using Link */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/job-seekers"
              className="inline-flex items-center gap-3 rounded-full px-7 py-3 text-sm font-semibold bg-linear-to-r from-teal-400 to-violet-500 text-black shadow-[0_8px_30px_rgba(124,58,237,0.25)] transform transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-400/30"
              aria-label="Explore jobs (Job Seeker)"
            >
              Job Seeker
            </Link>

            <Link
              to="/recruiters"
              className="inline-flex items-center gap-3 rounded-full px-7 py-3 text-sm font-semibold bg-linear-to-r from-teal-400 to-violet-500 text-black shadow-[0_8px_30px_rgba(124,58,237,0.25)] transform transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-400/30"
              aria-label="Hire talent (Recruiter)"
            >
              Recruiter
            </Link>
          </div>

          {/* subtle divider and small links */}
          <div className="mt-8 border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-300">
            <div className="flex items-center gap-3">
              <span className="text-teal-300 font-medium">
                Download the App
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/6 border border-white/8 hover:bg-white/8"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M4 4h16v16H4z"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                  <span className="text-xs text-gray-200">App Store</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/6 border border-white/8 hover:bg-white/8"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                  <span className="text-xs text-gray-200">Play Store</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
              <div className="flex items-center gap-2">
                {["F", "I", "S", "X", "In"].map((s) => (
                  <span
                    key={s}
                    aria-hidden
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs text-teal-300 bg-black/30"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Loading hint for accessibility (screen readers) */}
      <div className="sr-only" aria-live="polite">
        {prefersReducedMotion
          ? "Animations reduced. Static hero poster is displayed."
          : videoLoaded
          ? "Video background loaded."
          : "Loading hero background."}
      </div>
    </main>
  );
}

/* -------------------------
   Small helper (pure)
   ------------------------- */
function generateWavePath(index) {
  const amplitude = 28 + index * 4;
  const frequency = 2 + (index % 3);
  const height = 220;
  const segments = 10;
  let d = `M0 ${height}`;
  for (let i = 0; i <= segments; i++) {
    const x = (1440 / segments) * i;
    const sin = Math.sin((i / segments) * Math.PI * frequency + index * 0.45);
    const y = height - amplitude * sin - index * 2;
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  d += ` L 1440 600 L 0 600 Z`;
  return d;
}
