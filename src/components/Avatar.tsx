import { profile } from "@/data/content";

/**
 * Animated monogram: initials inside an orbiting ring with a small "moon"
 * travelling around it. Pure SVG + CSS, so it works without JavaScript.
 */
export default function Avatar({ size = 40 }: { size?: number }) {
  return (
    <span
      className="relative inline-grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="absolute inset-0 rounded-full bg-signal/25 blur-md animate-pulse-glow" />
      <svg viewBox="0 0 48 48" width={size} height={size} className="relative">
        <defs>
          <linearGradient id="hb-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#eaf0ff" />
            <stop offset="1" stopColor="#4f9dff" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="21" fill="#0b1122" stroke="#1e2a4a" strokeWidth="1" />
        <g className="origin-center animate-[spin_9s_linear_infinite]">
          <circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            stroke="url(#hb-ring)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeDasharray="38 94"
          />
          <circle cx="24" cy="3" r="2.2" fill="#eaf0ff" />
        </g>
        <text
          x="24"
          y="29.5"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill="#eaf0ff"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}
        >
          {profile.initials}
        </text>
      </svg>
    </span>
  );
}
