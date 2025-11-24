import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      className="
      fixed left-1/2 top-5 -translate-x-1/2 
      w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] 
      max-w-6xl z-50
    "
    >
      <div
        className="
        flex items-center justify-between
        backdrop-blur-xl bg-white/10 
        border border-white/20 
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        rounded-2xl px-5 py-3
      "
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dxzhnns58/image/upload/v1763625831/BGF_za5kuc.png" // <-- update path if needed
              alt="Imploy Logo"
              className="h-[70px] rounded-xl object-cover shadow-lg"
            />
          </Link>
        </div>

        {/* Center Navigation */}
        <nav>
          <ul className="flex items-center gap-8 text-sm font-medium">
            <li>
              <a
                href="/about"
                className="text-gray-200 hover:text-white transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-200 hover:text-white transition"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#faqs"
                className="text-gray-200 hover:text-white transition"
              >
                FAQs
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
