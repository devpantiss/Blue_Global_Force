import React from "react";

// local poster/logo file you uploaded
const LOGO_URL = "https://res.cloudinary.com/dxzhnns58/image/upload/v1763625831/BGF_za5kuc.png";

export default function NeonLoader({ size = 300, rings = 15 }) {
  const items = Array.from({ length: rings });

  return (
    <>
      <style>{`
        .container-loader {
          position: relative;
          transform-style: preserve-3d;
          transform: perspective(500px) rotateX(60deg);
          display: block;
          margin: 0 auto;
          width: ${size}px;
          height: ${size}px;
          --unit: ${Math.max(size / 30, 6)}px;
        }

        .container-loader .aro {
          position: absolute;
          --s: 0;
          inset: calc(var(--s) * var(--unit));

          box-shadow:
            inset 0 0 25px #39f,
            inset 0 0 45px #0af,
            inset 0 0 80px #00f,
            0 0 25px #39f,
            0 0 45px #0af,
            0 0 80px #00f;

          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          background: rgba(0, 102, 255, 0.12);
          border: 1px solid rgba(0, 140, 255, 0.32);

          animation: strim 3s infinite ease-in-out both;
          animation-delay: calc(var(--s) * -0.08s);

          will-change: transform, filter;
          pointer-events: none;
        }

        .container-loader .loader-center {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .container-loader .loader-logo {
          width: calc(min(20%, 90px));
          height: calc(min(20%, 90px));
          object-fit: cover;
          border-radius: 12px;
          box-shadow:
            0 6px 30px rgba(0, 0, 0, 0.6),
            0 0 18px rgba(0, 160, 255, 0.18),
            0 0 36px rgba(0, 120, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255,255,255,0.02);
        }

        .container-loader .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @keyframes strim {
          0%, 100% {
            transform: translateZ(-100px) rotate(0deg);
            filter: brightness(1.2);
          }
          50% {
            transform: translateZ(100px) rotate(90deg);
            filter: brightness(1.7);
          }
        }

        @media (max-width: 420px) {
          .container-loader {
            transform: perspective(420px) rotateX(50deg);
          }
          @keyframes strim {
            0%,100% {
              transform: translateZ(-60px) rotate(0deg);
            }
            50% {
              transform: translateZ(60px) rotate(90deg);
            }
          }
        }
      `}</style>

      <aside className="container-loader" role="status" aria-label="Loading">
        {items.map((_, i) => (
          <div key={i} className="aro" style={{ "--s": i }} aria-hidden="true" />
        ))}

        <div className="loader-center" aria-hidden="true">
          <img src={LOGO_URL} alt="logo" className="loader-logo" />
        </div>

        <span className="sr-only">Loading…</span>
      </aside>
    </>
  );
}
