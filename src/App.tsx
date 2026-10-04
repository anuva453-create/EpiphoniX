import React from "react";
import { useState, useEffect, useMemo, type ReactNode } from "react";
import logoImg from "@/imports/EpiphoniX logo.png";
import dividerImg from "@/imports/divider.png";
import scenarioLogoImg from "@/imports/scenario-logo.png";
// Direct Cloudinary URL (replace with your actual Cloudinary video link)
const networkVideoSrc = "https://res.cloudinary.com/lxo3kbga/video/upload/v1791099610/Animated_Epiphonix_Network.mp4";
function EpiphonixLogo({ size = 48 }: { size?: number }) {
  return (
    <img
      src={logoImg}
      alt="EpiphoniX logo"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "contain", mixBlendMode: "screen" }}
    />
  );
}

function NetworkNode({
  x, y, label, sublabel, color, delay = 0, size = "normal"
}: {
  x: number; y: number; label: string; sublabel: string;
  color: string; delay?: number; size?: "normal" | "small";
}) {
  const w = size === "small" ? 130 : 155;
  const h = size === "small" ? 50 : 62;
  return (
    <g style={{ animation: `float-node 4s ease-in-out ${delay}s infinite` }}>
      <rect
        x={x - w / 2} y={y - h / 2} width={w} height={h}
        rx="12" ry="12"
        fill="rgba(14,14,28,0.85)"
        stroke={color} strokeWidth="1.2"
        style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
      />
      <text x={x - w / 2 + 14} y={y - 8} fill={color} fontSize="13" fontWeight="600" fontFamily="Inter, sans-serif">{label}</text>
      <text x={x - w / 2 + 14} y={y + 10} fill="rgba(200,200,220,0.6)" fontSize="10.5" fontFamily="Inter, sans-serif">{sublabel}</text>
    </g>
  );
}

function NetworkGraph() {
  const cx = 420;
  const cy = 260;

  const nodes = [
    { id: "research", x: cx - 30, y: cy - 145, label: "Research", sublabel: "Turning knowledge into clarity", color: "#a78bfa", delay: 0 },
    { id: "solutions", x: cx + 160, y: cy - 105, label: "Solutions", sublabel: "Designing better alternatives", color: "#6ee7b7", delay: 0.7 },
    { id: "problems", x: cx - 215, y: cy - 20, label: "Problems", sublabel: "Understanding the real challenge", color: "#93c5fd", delay: 1.1 },
    { id: "people", x: cx + 230, y: cy + 35, label: "People", sublabel: "Uniting the right minds", color: "#6ee7b7", delay: 1.6 },
    { id: "impact", x: cx - 95, y: cy + 160, label: "Impact", sublabel: "Creating measurable change", color: "#f9a8d4", delay: 0.4 },
    { id: "future", x: cx + 145, y: cy + 165, label: "Future", sublabel: "Building a better tomorrow", color: "#6ee7b7", delay: 1.9 },
  ];

  const connections = [
    [cx, cy, nodes[0].x, nodes[0].y],
    [cx, cy, nodes[1].x, nodes[1].y],
    [cx, cy, nodes[2].x, nodes[2].y],
    [cx, cy, nodes[3].x, nodes[3].y],
    [cx, cy, nodes[4].x, nodes[4].y],
    [cx, cy, nodes[5].x, nodes[5].y],
    [nodes[0].x, nodes[0].y, nodes[1].x, nodes[1].y],
    [nodes[0].x, nodes[0].y, nodes[2].x, nodes[2].y],
    [nodes[1].x, nodes[1].y, nodes[3].x, nodes[3].y],
    [nodes[2].x, nodes[2].y, nodes[4].x, nodes[4].y],
    [nodes[3].x, nodes[3].y, nodes[5].x, nodes[5].y],
    [nodes[4].x, nodes[4].y, nodes[5].x, nodes[5].y],
  ];

  return (
    <svg viewBox="0 0 720 520" width="100%" height="100%" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9d7dff" stopOpacity="1" />
          <stop offset="40%" stopColor="#e879f9" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7c5cfc" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="inner-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <filter id="blur-sm">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id="blur-md">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* Connection lines */}
      {connections.map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <line
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#7c5cfc" strokeWidth="1" opacity="0.25"
          />
          <line
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#a78bfa" strokeWidth="1.5" opacity="0.15"
            strokeDasharray="8 16"
            style={{
              animation: `orbit-line ${3 + i * 0.4}s linear infinite`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        </g>
      ))}

      {/* Outer orbit rings */}
      <ellipse cx={cx} cy={cy} rx="260" ry="190" stroke="#7c5cfc" strokeWidth="0.8" fill="none" opacity="0.15" transform={`rotate(-20 ${cx} ${cy})`} />
      <ellipse cx={cx} cy={cy} rx="200" ry="140" stroke="#a78bfa" strokeWidth="0.6" fill="none" opacity="0.12" transform={`rotate(15 ${cx} ${cy})`} />
      <ellipse cx={cx} cy={cy} rx="150" ry="100" stroke="#e879f9" strokeWidth="0.6" fill="none" opacity="0.1" />

      {/* Small scattered dots */}
      {[
        [cx - 180, cy + 60, "#a78bfa"],
        [cx + 100, cy - 170, "#6ee7b7"],
        [cx - 60, cy + 220, "#f9a8d4"],
        [cx + 280, cy + 100, "#93c5fd"],
        [cx + 50, cy + 280, "#fbbf24"],
        [cx - 280, cy - 60, "#a78bfa"],
        [cx + 310, cy - 50, "#6ee7b7"],
        [cx - 100, cy - 250, "#e879f9"],
      ].map(([dx, dy, c], i) => (
        <circle key={i} cx={dx as number} cy={dy as number} r="3.5"
          fill={c as string} opacity="0.7"
          style={{ animation: `glow-pulse ${2 + i * 0.3}s ease-in-out ${i * 0.4}s infinite` }}
        />
      ))}

      {/* Central glow */}
      <circle cx={cx} cy={cy} r="60" fill="url(#center-glow)" opacity="0.5" filter="url(#blur-md)" />
      <circle cx={cx} cy={cy} r="30" fill="url(#center-glow)" opacity="0.8" filter="url(#blur-sm)" />
      <circle cx={cx} cy={cy} r="12" fill="#9d7dff" opacity="0.9" style={{ animation: "glow-pulse 2s ease-in-out infinite" }} />
      <circle cx={cx} cy={cy} r="6" fill="#fbbf24" opacity="1" />

      {/* Intersection accent nodes */}
      {[
        [cx - 95, cy + 70, "#e879f9"],
        [cx + 60, cy + 110, "#f9a8d4"],
        [cx + 120, cy - 70, "#a78bfa"],
      ].map(([dx, dy, c], i) => (
        <g key={i}>
          <circle cx={dx as number} cy={dy as number} r="8" fill={c as string} opacity="0.25" filter="url(#blur-sm)" />
          <circle cx={dx as number} cy={dy as number} r="4" fill={c as string} opacity="0.8" />
        </g>
      ))}

      {/* Network nodes */}
      {nodes.map((n) => (
        <NetworkNode key={n.id} {...n} />
      ))}
    </svg>
  );
}

function AppMockup() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ background: "#0c0c1e", boxShadow: "0 0 60px rgba(124,92,252,0.15), inset 0 0 40px rgba(0,0,0,0.5)" }}>
      {/* Title bar */}
      <div className="px-5 py-3 border-b border-white/8 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-xs tracking-[0.2em] text-white/30 font-medium uppercase">Epiphonix</span>
      </div>

      <div className="flex" style={{ minHeight: 380 }}>
        {/* Sidebar */}
        <div className="w-44 border-r border-white/8 p-3 flex flex-col gap-0.5 shrink-0" style={{ background: "#09091a" }}>
          {SIDEBAR_ITEMS.map((item) => (
            <div key={item.label}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg text-xs cursor-pointer transition-colors ${
                item.active ? "bg-violet-600/20 text-violet-300" : "text-white/40 hover:text-white/60"
              }`}>
              <span className="shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
          <div className="mt-auto pt-2">
            <div className="w-7 h-7 rounded-full bg-violet-500/30 flex items-center justify-center text-xs text-violet-300 font-semibold">A</div>
          </div>
        </div>

        {/* Main panel */}
        <div className="flex-1 p-6 flex flex-col justify-center items-center">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-light text-white mb-1" style={{ fontFamily: "'Fraunces', serif", letterSpacing: "0.04em" }}>
              START WITH
            </h2>
            <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: "'Fraunces', serif", letterSpacing: "0.04em", color: "#9d7dff" }}>
              YOUR SOLUTION
            </h2>

            {/* Upload area */}
            <div className="border border-dashed border-white/20 rounded-xl p-4 mb-3 text-center cursor-pointer hover:border-violet-500/40 transition-colors">
              <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
                <span>{"\u2191"}</span>
                <span>Upload file</span>
              </div>
              <p className="text-white/25 text-[10px] mt-1">PDF, DOC and video is supported too</p>
            </div>

            {/* Uploaded file */}
            <div className="flex items-center gap-2 border border-white/15 rounded-lg px-3 py-2.5 mb-3" style={{ background: "rgba(255,255,255,0.03)" }}>
              <span className="text-white/40 text-sm">{"\u{1F4C4}"}</span>
              <div className="flex-1">
                <p className="text-white/70 text-xs">Plastic_solution.pdf</p>
                <p className="text-white/30 text-[10px]">1.3 MB</p>
              </div>
              <button className="text-white/30 hover:text-white/60 text-xs">{"\u2715"}</button>
            </div>

            {/* Analyze input */}
            <p className="text-white/40 text-xs mb-1.5">What would you like to analyse?</p>
            <div className="border border-white/15 rounded-lg p-3 mb-4" style={{ background: "rgba(255,255,255,0.03)" }}>
              <p className="text-white/35 text-xs">Analyze this plastic solution for its potential to create real-world impact</p>
            </div>

            <button className="w-full py-2.5 rounded-lg text-white text-sm font-medium transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #7c5cfc, #a855f7)" }}>
              Analyze Solution
            </button>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-44 right-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(60,40,120,0.3), transparent)" }}>
            <svg viewBox="0 0 600 64" width="100%" height="64" preserveAspectRatio="none" opacity="0.4">
              <path d="M0,32 Q150,0 300,32 Q450,64 600,32 L600,64 L0,64 Z" fill="#4c1d95" opacity="0.5" />
              <path d="M0,40 Q200,10 400,40 Q500,55 600,36 L600,64 L0,64 Z" fill="#7c3aed" opacity="0.3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImpactScoreScreen() {
  const dims = [
    { label: "Evidence strength", value: 81, color: "#60a5fa" },
    { label: "Feasibility", value: 67, color: "#a78bfa" },
    { label: "Scalability", value: 74, color: "#34d399" },
    { label: "System alignment", value: 58, color: "#fbbf24" },
  ];

  const score = 74;
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ background: "#0c0c1e", boxShadow: "0 0 60px rgba(96,165,250,0.15), inset 0 0 40px rgba(0,0,0,0.5)" }}>
      {/* Title bar */}
      <div className="px-5 py-3 border-b border-white/8 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-xs tracking-[0.2em] text-white/30 font-medium uppercase">Epiphonix</span>
      </div>

      <div className="flex" style={{ minHeight: 380 }}>
        {/* Sidebar */}
        <div className="w-44 border-r border-white/8 p-3 flex flex-col gap-0.5 shrink-0" style={{ background: "#09091a" }}>
          {SIDEBAR_ITEMS.map((item) => (
            <div key={item.label}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg text-xs cursor-pointer transition-colors ${
                item.active ? "bg-blue-500/15 text-blue-300" : "text-white/40 hover:text-white/60"
              }`}>
              <span className="shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
          <div className="mt-auto pt-2">
            <div className="w-7 h-7 rounded-full bg-blue-500/25 flex items-center justify-center text-xs text-blue-300 font-semibold">A</div>
          </div>
        </div>

        {/* Main panel */}
        <div className="flex-1 p-6 flex flex-col">
          <h2 className="text-lg font-light text-white mb-0.5" style={{ fontFamily: "'Fraunces', serif", letterSpacing: "0.06em" }}>
            REAL-WORLD
          </h2>
          <h2 className="text-lg font-semibold mb-5" style={{ fontFamily: "'Fraunces', serif", letterSpacing: "0.06em", color: "#60a5fa" }}>
            IMPACT SCORE
          </h2>

          <div className="flex items-start gap-6">
            {/* Circular gauge */}
            <div className="relative shrink-0">
              <svg width="130" height="130" viewBox="0 0 130 130">
                <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                <circle
                  cx="65" cy="65" r={r}
                  fill="none"
                  stroke="url(#score-grad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${circ}`}
                  transform="rotate(-90 65 65)"
                  style={{ filter: "drop-shadow(0 0 6px rgba(96,165,250,0.6))" }}
                />
                <defs>
                  <linearGradient id="score-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{score}</span>
                <span className="text-white/40 text-[10px] mt-0.5">/ 100</span>
              </div>
            </div>

            {/* Dimension bars */}
            <div className="flex-1 space-y-3 pt-1">
              {dims.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[10px] text-white/50">{d.label}</span>
                    <span className="text-[10px] font-semibold" style={{ color: d.color }}>{d.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${d.value}%`,
                        background: d.color,
                        boxShadow: `0 0 6px ${d.color}80`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status tag */}
          <div className="mt-5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400" style={{ boxShadow: "0 0 6px #60a5fa" }} />
            <span className="text-xs text-white/50">Promising — ready for deeper analysis</span>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex gap-3">
            <button
              className="flex-1 py-2 rounded-lg text-xs font-medium text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #1d4ed8, #3b82f6)" }}
            >
              View impact analysis
            </button>
            <button
              className="flex-1 py-2 rounded-lg text-xs font-medium transition-all hover:border-blue-400/50"
              style={{
                border: "1px solid rgba(96,165,250,0.3)",
                color: "#60a5fa",
                background: "rgba(96,165,250,0.06)",
              }}
            >
              View impact pathway
            </button>
          </div>

          {/* Bottom wave */}
          <div className="absolute bottom-0 left-44 right-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(20,40,100,0.3), transparent)" }}>
            <svg viewBox="0 0 600 64" width="100%" height="64" preserveAspectRatio="none" opacity="0.4">
              <path d="M0,32 Q150,0 300,32 Q450,64 600,32 L600,64 L0,64 Z" fill="#1e3a8a" opacity="0.5" />
              <path d="M0,40 Q200,10 400,40 Q500,55 600,36 L600,64 L0,64 Z" fill="#1d4ed8" opacity="0.3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

const NAV_ICONS = {
  Home: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Analyse: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Projects: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
  ScenarioLab: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg>,
  KnowledgeGraph: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  Collaboration: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Plugin: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>,
  Settings: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
};

const SIDEBAR_ITEMS = [
  { icon: NAV_ICONS.Home,        label: "Home",         active: false },
  { icon: NAV_ICONS.Analyse,     label: "Analyse",      active: true  },
  { icon: NAV_ICONS.Projects,    label: "My Projects",  active: false },
  { icon: NAV_ICONS.ScenarioLab, label: "Scenario Lab", active: false },
  { icon: NAV_ICONS.KnowledgeGraph, label: "Knowledge Graph", active: false },
  { icon: NAV_ICONS.Collaboration,  label: "Collaboration",   active: false },
  { icon: NAV_ICONS.Plugin,      label: "Plugin",       active: false },
  { icon: NAV_ICONS.Settings,    label: "Settings",     active: false },
];

function MockupChrome({ children, accentClass = "bg-violet-600/20 text-violet-300", dotAccent = "#7c5cfc" }: {
  children: ReactNode;
  accentClass?: string;
  dotAccent?: string;
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ background: "#0c0c1e", boxShadow: `0 0 60px ${dotAccent}26, inset 0 0 40px rgba(0,0,0,0.5)` }}>
      <div className="px-5 py-3 border-b border-white/8 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-xs tracking-[0.2em] text-white/30 font-medium uppercase">Epiphonix</span>
      </div>
      <div className="flex" style={{ minHeight: 380 }}>
        <div className="w-44 border-r border-white/8 p-3 flex flex-col gap-0.5 shrink-0" style={{ background: "#09091a" }}>
          {SIDEBAR_ITEMS.map((item) => (
            <div key={item.label} className={`flex items-center gap-2 px-2 py-1 rounded-lg text-xs cursor-pointer transition-colors ${item.active ? accentClass : "text-white/40 hover:text-white/60"}`}>
              <span className="shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
          <div className="mt-auto pt-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: `${dotAccent}40`, color: dotAccent }}>A</div>
          </div>
        </div>
        <div className="flex-1 relative overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function DriversScreen() {
  // Same Tailwind-400 accent palette used by screens 1 & 2
  const nodes = [
    { label: "Scientific Foundation",      pct: "88%", border: "#a78bfa", color: "#a78bfa", cx: 210, cy: 68  },
    { label: "Environmental Impact",       pct: "85%", border: "#34d399", color: "#34d399", cx: 390, cy: 82  },
    { label: "Social & Community Benefit", pct: "54%", border: "#60a5fa", color: "#60a5fa", cx: 82,  cy: 170 },
    { label: "Technical Feasibility",      pct: "76%", border: "#f472b6", color: "#f472b6", cx: 425, cy: 185 },
    { label: "Economic Viability",         pct: "48%", border: "#fbbf24", color: "#fbbf24", cx: 190, cy: 278 },
    { label: "Innovation & Novelty",       pct: "72%", border: "#34d399", color: "#34d399", cx: 370, cy: 272 },
  ];
  const HUB = { cx: 255, cy: 172, r: 56 };

  // Edges from hub surface to each node
  const edges = [
    { x1: 234, y1: 120, x2: 218, y2: 90,  color: "#a78bfa" },
    { x1: 296, y1: 128, x2: 358, y2: 100, color: "#34d399" },
    { x1: 202, y1: 178, x2: 142, y2: 172, color: "#60a5fa" },
    { x1: 308, y1: 182, x2: 368, y2: 184, color: "#f472b6" },
    { x1: 228, y1: 222, x2: 208, y2: 256, color: "#fbbf24" },
    { x1: 284, y1: 224, x2: 348, y2: 252, color: "#34d399" },
  ];

  const trustItems = [
    { color: "#a78bfa", tag: "Enterprise Foundation",                desc: "Your solution is backed by peer-reviewed evidence supporting long-term impact.", achieve: "82%" },
    { color: "#fbbf24", tag: "Market Opportunity: Economic Viability", desc: "Demonstrates strong economic scalability when viability protection is considered.", achieve: "81%" },
    { color: "#34d399", tag: "Key Strategic: Environmental Impact",   desc: "Environmental metrics consistently promote ecosystem growth potential.", achieve: "84%" },
    { color: "#f472b6", tag: "Market Barrier: Technical Feasibility", desc: "Requires specialized expertise and resource allocation for barrier mitigation.", achieve: "85%" },
  ];

  const metrics = [
    { label: "Translation Coefficient",    value: "59%", color: "#60a5fa" },
    { label: "Translation Friction Score", value: "81%", color: "#fbbf24" },
  ];

  const NODE_W = 120, NODE_H = 66;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10"
      style={{ background: "#0c0c1e", boxShadow: "0 0 60px rgba(251,191,36,0.12), inset 0 0 40px rgba(0,0,0,0.5)" }}>

      {/* Title bar -- matches screens 1 & 2 exactly */}
      <div className="px-5 py-3 border-b border-white/8 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-xs tracking-[0.2em] text-white/30 font-medium uppercase">Epiphonix</span>
      </div>

      <div className="flex" style={{ minHeight: 380 }}>
       {/* Sidebar -- same w-44, p-4, text-xs as screens 1 & 2 */}
        <div className="w-44 border-r border-white/8 p-3 flex flex-col gap-0.5 shrink-0" style={{ background: "#09091a" }}>
          {SIDEBAR_ITEMS.map((item) => (
            <div key={item.label}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg text-xs cursor-pointer transition-colors ${
                item.active ? "bg-yellow-500/15 text-yellow-300" : "text-white/40 hover:text-white/60"
              }`}>
              <span className="shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
          <div className="mt-auto pt-2">
            <div className="w-7 h-7 rounded-full bg-yellow-500/25 flex items-center justify-center text-xs text-yellow-300 font-semibold">{"\u26A1"}</div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 flex flex-col min-w-0">

         {/* Heading -- Fraunces serif like screens 1 & 2 */}
          <h2 className="text-lg font-light text-white leading-tight mb-0.5"
            style={{ fontFamily: "'Fraunces', serif", letterSpacing: "0.06em" }}>
            UNDERSTAND WHAT DRIVES
          </h2>
          <h2 className="text-lg font-semibold leading-tight mb-4"
            style={{ fontFamily: "'Fraunces', serif", letterSpacing: "0.06em", color: "#fbbf24" }}>
            YOUR SCORE.
          </h2>

          {/* Metric buttons */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {/* Active button -- the analysis currently displayed */}
            <button className="flex flex-col items-start px-3 py-2 rounded-lg transition-all"
              style={{ border: "1px solid #fbbf24", background: "rgba(251,191,36,0.15)", boxShadow: "0 0 10px rgba(251,191,36,0.2)" }}>
              <span className="text-[9px] font-medium mb-0.5" style={{ color: "#fbbf24" }}>Intervention Quality</span>
              <span className="text-sm font-bold text-white">82%</span>
            </button>
            {metrics.map((m) => (
              <button key={m.label}
                className="flex flex-col items-start px-3 py-2 rounded-lg transition-all hover:opacity-80"
                style={{ border: `1px solid ${m.color}35`, background: `${m.color}08` }}>
                <span className="text-[9px] text-white/40 mb-0.5">{m.label}</span>
                <span className="text-sm font-semibold" style={{ color: m.color }}>{m.value}</span>
              </button>
            ))}
          </div>

          {/* Graph panel + Trust Engine row */}
          <div className="flex gap-3">

            {/* Graph panel */}
            <div className="flex-1 relative rounded-xl border border-white/8 overflow-hidden min-w-0"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="px-3 pt-2.5 pb-1 border-b border-white/6">
                <p className="text-[10px] font-medium text-white/60">Intervention Quality</p>
              </div>

              <svg viewBox="0 0 510 310" width="100%"
                style={{ display: "block" }}
                fontFamily="Inter, sans-serif">
                <defs>
                  <radialGradient id="dg-hub" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#2d1a00" />
                    <stop offset="100%" stopColor="#0c0a00" />
                  </radialGradient>
                  <radialGradient id="dg-hub-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                  </radialGradient>
                  <filter id="dg-glow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="5" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {edges.map((e, i) => (
                  <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                    stroke={e.color} strokeWidth="1" opacity="0.45" />
                ))}

                {/* Hub */}
                <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r + 20} fill="url(#dg-hub-glow)" />
                <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r} fill="url(#dg-hub)" stroke="#fbbf24" strokeWidth="1" opacity="0.9" />
                <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r - 8} fill="none" stroke="#fbbf24" strokeWidth="0.4" strokeDasharray="3 4" opacity="0.2" />
                <text x={HUB.cx} y={HUB.cy - 14} textAnchor="middle" fill="#fbbf24" fontSize="9.5" letterSpacing="0.06em" opacity="0.65">Intervention</text>
                <text x={HUB.cx} y={HUB.cy - 3}  textAnchor="middle" fill="#fbbf24" fontSize="9.5" letterSpacing="0.06em" opacity="0.65">Quality</text>
                <text x={HUB.cx} y={HUB.cy + 17} textAnchor="middle" fill="white"   fontSize="20" fontWeight="700">82%</text>

                {/* Node cards */}
                {nodes.map((n, i) => {
                  const w = n.label.length > 16 ? 136 : NODE_W;
                  const lx = n.cx - w / 2, y = n.cy - NODE_H / 2;
                  const split = n.label.lastIndexOf(" ", 16);
                  const line1 = split > 0 ? n.label.slice(0, split) : n.label.slice(0, 14);
                  const line2 = split > 0 ? n.label.slice(split + 1) : n.label.slice(14);
                  return (
                    <g key={i}>
                      <rect x={lx} y={y} width={w} height={NODE_H}
                        fill="rgba(12,12,30,0.95)" stroke={n.border} strokeWidth="0.8" opacity="0.9" />
                      <rect x={lx} y={y} width={w} height={2} fill={n.border} opacity="0.7" />
                      <text x={lx + 8} y={y + 15} fill="rgba(255,255,255,0.72)" fontSize="9" fontWeight="500">{line1}</text>
                      {line2 && <text x={lx + 8} y={y + 27} fill="rgba(255,255,255,0.50)" fontSize="8.5">{line2}</text>}
                      <line x1={lx + 7} y1={y + 34} x2={lx + w - 7} y2={y + 34} stroke={n.border} strokeWidth="0.4" opacity="0.25" />
                      <text x={lx + w / 2} y={y + 52} textAnchor="middle" fill={n.color} fontSize="13" fontWeight="700"
                        style={{ filter: `drop-shadow(0 0 4px ${n.color}60)` }}>{n.pct}</text>
                    </g>
                  );
                })}
              </svg>

              {/* Wave + Expert Report -- same style as screen 2 bottom */}
              <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
                <svg viewBox="0 0 500 36" width="100%" height="36" preserveAspectRatio="none">
                  <path d="M0 20 C80 8, 160 32, 240 20 C320 8, 400 30, 500 18 L500 36 L0 36 Z" fill="rgba(251,191,36,0.05)" />
                  <path d="M0 22 C100 10, 200 34, 300 20 C380 10, 440 26, 500 20" fill="none" stroke="rgba(251,191,36,0.25)" strokeWidth="0.7" />
                </svg>
              </div>
              <div className="flex justify-center pb-2">
                <span className="text-[8px] text-white/25 border border-white/8 px-3 py-0.5 rounded cursor-pointer hover:text-white/45 transition-colors"
                  style={{ background: "rgba(255,255,255,0.02)" }}>Expert Report</span>
              </div>
            </div>

            {/* Trust Engine panel */}
            <div className="rounded-xl border border-white/8 p-3 flex flex-col shrink-0 overflow-y-auto"
              style={{ width: 160, background: "rgba(255,255,255,0.02)" }}>
              <p className="text-xs font-medium text-white/50 mb-3">Trust Engine</p>
              <div className="flex flex-col divide-y divide-white/6">
                {trustItems.map((t, i) => (
                  <div key={i} className={i > 0 ? "pt-2" : ""} style={{ paddingBottom: i < trustItems.length - 1 ? "8px" : 0 }}>
                    <div className="flex items-start gap-1.5 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-0.5"
                        style={{ background: t.color, boxShadow: `0 0 5px ${t.color}80` }} />
                      <p className="text-[8px] font-semibold leading-snug" style={{ color: t.color }}>{t.tag}</p>
                    </div>
                    <p className="text-[8px] text-white/35 leading-relaxed mb-1">{t.desc}</p>
                    <p className="text-[8px] text-white/40">
                      Confidence Score: <span className="font-semibold" style={{ color: t.color }}>{t.achieve}</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="pt-2 mt-2 border-t border-white/8">
                <p className="text-[8px] text-white/40 hover:text-white/60 cursor-pointer transition-colors">
                  Explore more dimensions {"\u2192"}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


function PathwayScreen() {
  const [activeTab, setActiveTab] = useState<"Pathway" | "Stakeholder" | "Timeline">("Pathway");

  const pathNodes = [
    {
      num: "01",
      title: "Strengthen Validation",
      desc: "Build stronger evidence through deeper cost-efficacy and multi-site pilot programs.",
      impact: "High Impact",
      impactColor: "#7C5CFC",
      time: "1\u20133 months",
      actions: ["Expand clinical evidence base", "Commission independent RCT study", "Publish peer-reviewed findings"],
    },
    {
      num: "02",
      title: "Connect The Ecosystem",
      desc: "Engage key stakeholders and government agencies for ecosystem improvements.",
      impact: "Medium Impact",
      impactColor: "#60A5FA",
      time: "2\u20134 months",
      actions: ["Join sector working groups", "Partner with policy bodies", "Map ecosystem dependencies"],
    },
    {
      num: "03",
      title: "Reduce Adoption Barriers",
      desc: "Collaborate with policymakers and ecosystem workers to reduce adoption challenges.",
      impact: "High Impact",
      impactColor: "#7C5CFC",
      time: "3\u20136 months",
      actions: ["Create sliding-scale pricing", "Deploy with champion partners", "Reduce integration friction"],
    },
    {
      num: "04",
      title: "Scale for Lasting Impact",
      desc: "Develop partnerships for better long-term social value and sustained growth.",
      impact: "High Impact",
      impactColor: "#7C5CFC",
      time: "4+ months",
      actions: ["Drive partnerships and alliances", "Grow adoption and reach", "Build sustainability and policy support"],
    },
  ];

  const sidebarItems = SIDEBAR_ITEMS;

  const focusChips = ["Adoption Readiness", "Evidence Strength", "+ Scalability"];

  // Nodes alternate left/right. Tighter vertical spacing so all 4 cards fit.
  const CARD_W = 114, CARD_H = 60;
  const nodePositions = [
    { x: 22,  y: 38  },   // left dot
    { x: 256, y: 108 },   // right dot
    { x: 22,  y: 178 },   // left dot
    { x: 256, y: 248 },   // right dot
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10"
      style={{ background: "#07071a", boxShadow: "0 0 60px rgba(124,92,252,0.15), inset 0 0 40px rgba(0,0,0,0.5)" }}>

      {/* Title bar */}
      <div className="px-4 py-2.5 border-b border-white/8 flex items-center gap-3" style={{ background: "#09091a" }}>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
        </div>
        <span className="text-[10px] tracking-[0.2em] text-white/25 font-medium uppercase">Epiphonix</span>
      </div>

      <div className="flex" style={{ minHeight: 380 }}>
        {/* Sidebar */}
        <div className="border-r border-white/8 p-3 flex flex-col gap-0.5 shrink-0" style={{ background: "#09091a", width: 110 }}>
          <div className="mb-3 px-1">
            <span className="text-[9px] font-bold tracking-[0.15em] text-white/70 uppercase">Epiphonix</span>
          </div>
          {sidebarItems.map((item) => (
            <div key={item.label}
              className={`flex items-center gap-2 px-2 py-1 rounded-lg text-[10px] cursor-pointer transition-colors ${
                item.active ? "bg-violet-500/15 text-violet-300" : "text-white/30 hover:text-white/55"
              }`}>
              <span className="shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
          <div className="mt-auto pt-3">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold"
              style={{ background: "rgba(124,92,252,0.35)", color: "#c4b5fd" }}>{"\u25B2"}</div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* Page header */}
          <div className="px-5 pt-4 pb-3 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-[8px] tracking-[0.18em] text-white/35 uppercase mb-1">Impact Pathway</p>
              <h2 className="text-[13px] font-black leading-tight tracking-wide text-white uppercase">Explore your path</h2>
              <h2 className="text-[13px] font-black leading-tight tracking-wide uppercase italic" style={{ color: "#7C5CFC" }}>
                to real-world impact.
              </h2>
            </div>

            {/* Score gauge + key focus areas */}
            <div className="flex flex-col items-end gap-2 shrink-0">
              {/* Gauge + buttons row */}
              <div className="flex items-center gap-3">
                {/* Circular gauge */}
                <div className="relative flex items-center justify-center" style={{ width: 56, height: 56 }}>
                  <svg width="56" height="56" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                    <circle cx="28" cy="28" r="24" fill="none" stroke="#4F46E5" strokeWidth="4"
                      strokeDasharray={`${2 * Math.PI * 24 * 0.70} ${2 * Math.PI * 24 * 0.30}`}
                      strokeLinecap="round" transform="rotate(-90 28 28)" />
                  </svg>
                  <div className="absolute text-center">
                    <p className="text-[11px] font-bold text-white leading-none">70%</p>
                  </div>
                </div>
                <div>
                  <p className="text-[7px] text-white/40 leading-tight">Real World</p>
                  <p className="text-[7px] text-white/40 leading-tight">Impact Score</p>
                  <p className="text-[6.5px] text-white/25 mt-0.5">Quantitative</p>
                  <div className="flex gap-1.5 mt-1">
                    <button className="px-2 py-0.5 text-[7px] rounded border border-violet-500/40 text-violet-300/80 hover:bg-violet-500/10 transition-colors">
                      View Impact Analysis {"\u2192"}
                    </button>
                  </div>
                </div>
              </div>
              {/* Key focus chips */}
              <div className="flex items-center gap-1 flex-wrap justify-end">
                <span className="text-[7px] text-white/30">Key Focus Areas:</span>
                {focusChips.map((c) => (
                  <span key={c} className="px-1.5 py-0.5 text-[6.5px] rounded border border-white/15 text-white/45"
                    style={{ background: "rgba(255,255,255,0.03)" }}>{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Pathway panel + Detail panel */}
          <div className="flex flex-1 gap-2 px-3 pb-3 min-h-0">

            {/* Pathway graph panel */}
            <div className="flex-1 rounded-xl border border-white/10 flex flex-col overflow-hidden"
              style={{ background: "rgba(255,255,255,0.015)" }}>
              {/* Tab bar */}
              <div className="flex items-center gap-0 px-3 pt-2 pb-1.5 border-b border-white/8">
                <span className="text-[7px] tracking-[0.15em] text-white/25 uppercase mr-3">Impact Pathway</span>
                {(["Pathway", "Stakeholder", "Timeline"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-0.5 text-[8px] rounded transition-all mr-1 ${
                      activeTab === tab
                        ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                        : "text-white/30 hover:text-white/55"
                    }`}>
                    {tab}
                  </button>
                ))}
                <span className="ml-auto text-white/20 text-[10px] cursor-pointer hover:text-white/40">⛶</span>
              </div>

              {/* SVG pathway map */}
              <div className="flex-1 relative p-2">
                <svg viewBox="0 0 290 286" width="100%"
                  style={{ display: "block" }} fontFamily="Inter, sans-serif">
                  <defs>
                    <filter id="pw-glow" x="-60%" y="-60%" width="220%" height="220%">
                      <feGaussianBlur stdDeviation="3" result="b" />
                      <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>

                  {/* Connecting S-curve through all 4 dot centres */}
                  <path
                    d={[
                      `M ${nodePositions[0].x} ${nodePositions[0].y}`,
                      `C 139 ${nodePositions[0].y}, 139 ${nodePositions[1].y}, ${nodePositions[1].x} ${nodePositions[1].y}`,
                      `C 139 ${nodePositions[1].y}, 139 ${nodePositions[2].y}, ${nodePositions[2].x} ${nodePositions[2].y}`,
                      `C 139 ${nodePositions[2].y}, 139 ${nodePositions[3].y}, ${nodePositions[3].x} ${nodePositions[3].y}`,
                    ].join(" ")}
                    fill="none" stroke="rgba(124,92,252,0.35)" strokeWidth="1.4" strokeDasharray="5 3"
                  />

                  {/* Nodes + cards */}
                  {pathNodes.map((n, i) => {
                    const pos = nodePositions[i];
                    const isLeft = i % 2 === 0;
                    // Card sits with its left edge 10px right of dot (left nodes) or 10px left of card right edge = dot (right nodes)
                    const cardX = isLeft ? pos.x + 10 : pos.x - CARD_W - 10;
                    // Card vertically centred on dot
                    const cardY = pos.y - CARD_H / 2;

                    // Text rows: all relative to cardY, padded 8px from top
                    const t1 = cardY + 11;    // num
                    const t2 = cardY + 21;    // title
                    const t3 = cardY + 31;    // desc line 1
                    const t4 = cardY + 40;    // desc line 2
                    const badgeY = cardY + 47; // impact badge top
                    const badgeTY = badgeY + 7; // badge text baseline

                    // Split desc into at most two lines, each max 24 chars (word boundary)
                    const words = n.desc.split(" ");
                    let l1 = "", l2 = "";
                    for (const w of words) {
                      if ((l1 + " " + w).trim().length <= 24) {
                        l1 = (l1 + " " + w).trim();
                      } else if (l2 === "" || (l2 + " " + w).trim().length <= 24) {
                        l2 = (l2 + " " + w).trim();
                      } else {
                        l2 = l2.trimEnd() + "\u2026";
                        break;
                      }
                    }

                    return (
                      <g key={i}>
                        {/* Card */}
                        <rect x={cardX} y={cardY} width={CARD_W} height={CARD_H}
                          fill="rgba(9,9,26,0.93)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.7" />
                        {/* Top accent */}
                        <rect x={cardX} y={cardY} width={CARD_W} height={2} fill={n.impactColor} opacity="0.6" />

                        {/* Text */}
                        <text x={cardX + 8} y={t1} fill="rgba(255,255,255,0.35)" fontSize="6.5">{n.num}</text>
                        <text x={cardX + 8} y={t2} fill="rgba(255,255,255,0.85)" fontSize="8" fontWeight="600">{n.title}</text>
                        <text x={cardX + 8} y={t3} fill="rgba(255,255,255,0.3)" fontSize="6.5">{l1}</text>
                        {l2 && <text x={cardX + 8} y={t4} fill="rgba(255,255,255,0.3)" fontSize="6.5">{l2}</text>}

                        {/* Impact badge */}
                        <rect x={cardX + 8} y={badgeY} width={44} height={9} rx="2"
                          fill={`${n.impactColor}20`} stroke={n.impactColor} strokeWidth="0.5" />
                        <text x={cardX + 30} y={badgeTY} textAnchor="middle" fill={n.impactColor} fontSize="5.5">{n.impact}</text>
                        <text x={cardX + 57} y={badgeTY} fill="rgba(255,255,255,0.22)" fontSize="5.5">{"\u00B7"} {n.time}</text>

                        {/* Node dot — drawn last so it sits on top of path */}
                        <circle cx={pos.x} cy={pos.y} r={7} fill="#09091a" stroke="#7C5CFC" strokeWidth="1.3" filter="url(#pw-glow)" />
                        <circle cx={pos.x} cy={pos.y} r={3} fill="white" opacity="0.85" />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Bottom note */}
              <div className="px-3 pb-2">
                <p className="text-[6.5px] text-white/20 italic">This pathway is a suggestion for your solution's next steps.</p>
              </div>
            </div>

            {/* Detailed Pathway panel */}
            <div className="rounded-xl border border-white/10 flex flex-col overflow-y-auto shrink-0"
              style={{ width: 172, background: "rgba(255,255,255,0.015)" }}>
              <p className="text-[8.5px] font-semibold text-white/60 px-3 pt-2.5 pb-2 border-b border-white/8 sticky top-0"
                style={{ background: "rgba(7,7,26,0.95)" }}>Detailed Pathway</p>
              <div className="flex flex-col gap-0 divide-y divide-white/6">
                {pathNodes.map((n, i) => (
                  <div key={i} className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[7px] text-white/35">{n.num}</span>
                      <span className="text-[8px] font-semibold text-white/80">{n.title}</span>
                    </div>
                    <p className="text-[6.5px] text-white/30 leading-relaxed mb-1.5">{n.desc}</p>
                    <p className="text-[6.5px] text-white/40 font-medium mb-1">Key actions:</p>
                    {n.actions.map((a) => (
                      <div key={a} className="flex items-start gap-1 mb-0.5">
                        <span className="text-white/25 text-[7px] mt-px">{"\u00B7"}</span>
                        <span className="text-[6.5px] text-white/30 leading-relaxed">{a}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="px-1.5 py-0.5 text-[5.5px] rounded" style={{
                        background: `${n.impactColor}18`, border: `0.5px solid ${n.impactColor}60`, color: n.impactColor
                      }}>{n.impact}</span>
                      <span className="text-[6px] text-white/22">{"\u00B7"} {n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

const steps = [
  {
    color: "#a78bfa",
    title: "Start with your solution",
    desc: "Upload your Research, Prototype or Solution and let EpiphoniX understand what you are building",
  },
  {
    color: "#60a5fa",
    title: "See the impact before the leap",
    desc: "Real-World Impact Score measures how ready your solution is to move from promising idea to meaningful change.",
  },
  {
    color: "#fbbf24",
    title: "See what drives your impact",
    desc: "Go beyond the score. Explore the evidence, strengths, barriers, and system factors shaping your solution's potential for real-world impact.",
  },
  {
    color: "#34d399",
    title: "Find your path forward",
    desc: "Turn the insights from your analysis into practical next steps.",
  },
];

function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: "#07070f" }}>
      
      {/* ❌ Confirming the separate background glow div is removed */}

      {/* Main 2-column container */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-8 lg:px-16 xl:px-24 pt-32">
        
        {/* Left Column (kept as is) */}
        <div className="animate-fade-up relative z-10">
          <h1 className="text-6xl xl:text-7xl font-light leading-[1.05] text-white mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
            Every breakthrough<br />starts with<br />
            <span style={{ color: "#9d7dff", fontStyle: "italic" }}>one bold question.</span>
          </h1>
          <p className="text-white/50 text-base leading-relaxed mb-10 max-w-sm">
            EpiphoniX connects ideas, evidence and people to turn complex challenges into real world impact
          </p>
          <div className="flex items-center gap-6">
            <button
              className="px-7 py-3.5 rounded-full text-white font-semibold text-sm transition-all hover:shadow-lg"
              style={{
                background: "#0e0e1c",
                border: "1.5px solid rgba(157,125,255,0.6)",
                boxShadow: "0 0 20px rgba(124,92,252,0.2), inset 0 0 20px rgba(124,92,252,0.05)"
              }}
            >
              Enter Nexus
            </button>
            <button className="flex items-center gap-2.5 text-white/60 text-sm hover:text-white/90 transition-colors">
              <span>Explore the platform</span>
              <span className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center text-xs">{"\u25B6"}</span>
            </button>
          </div>
        </div>

        {/* Right Column Container */}
        <div className="relative h-[480px] xl:h-[560px] animate-fade-up-delay-2 flex items-center justify-center">
          
          {/* ✅ New, Broadly Feathered Video Blending Logic (No visible circle) */}
          <video
            src={networkVideoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-contain scale-130 pointer-events-none z-0"
            style={{
              mixBlendMode: "screen", // KEY blend mode to drop out black
              filter: "brightness(1.4) contrast(1.1) saturate(1.3)", // Makes nodes bright & vibrant without crushing lines
              WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)", // Softly dissolves frame edges
              maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 95%)",
              transform: "translateZ(0)", // Forces hardware GPU blending to remove video box artifacts
            }}
          />

          {/* Floating UI components above the video (kept as is) */}
          <div className="relative z-10 w-full flex flex-col items-center justify-center">
            {/* Cards / Scenario Lab UI */}
          </div>

        </div>

      </div> 
    </section>
  );
}

const STEP_DWELL = [2800, 4200, 4200, 2800];

function FeaturesSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const dwell = STEP_DWELL[activeStep] ?? 2800;
    const timer = setTimeout(() => {
      setActiveStep((s) => (s + 1) % steps.length);
    }, dwell);
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center" style={{ background: "#07070f" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 50% at 30% 50%, rgba(60,40,150,0.08) 0%, transparent 70%)"
      }} />

      <div className="grid grid-cols-1 lg:[grid-template-columns:2fr_3fr] gap-8 xl:gap-12 items-center px-8 lg:px-16 xl:px-24 py-20">
        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-5 py-5 cursor-pointer group"
              onClick={() => setActiveStep(i)}
            >
              {/* Indicator + line */}
              <div className="flex flex-col items-center gap-0 shrink-0">
                <div
                  className="w-4 h-4 rounded-full mt-1 transition-all duration-300 shrink-0"
                  style={{
                    background: step.color,
                    boxShadow: activeStep === i ? `0 0 14px ${step.color}` : "none",
                    opacity: activeStep === i ? 1 : 0.45,
                    transform: activeStep === i ? "scale(1.2)" : "scale(1)",
                  }}
                />
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 mt-2" style={{ background: "rgba(255,255,255,0.08)", minHeight: 36 }} />
                )}
              </div>
              {/* Text */}
              <div className={`transition-opacity duration-300 ${activeStep === i ? "opacity-100" : "opacity-45"}`}>
                <h3 className="text-white font-semibold text-sm mb-1">{step.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* App mockup / screen */}
        <div className="relative" style={{ width: 640 }}>
          <div style={{ width: 640, maxHeight: 460, overflow: "hidden", borderRadius: 16 }}>
          {activeStep === 1 ? <ImpactScoreScreen /> : activeStep === 2 ? <DriversScreen /> : activeStep === 3 ? <PathwayScreen /> : <AppMockup />}
          </div>
          {/* Outer glow ring */}
          <div
            className="absolute -inset-4 rounded-3xl pointer-events-none"
            style={{
              background: activeStep === 1
                ? "radial-gradient(ellipse at center, rgba(96,165,250,0.1) 0%, transparent 70%)"
                : activeStep === 2
                ? "radial-gradient(ellipse at center, rgba(251,191,36,0.08) 0%, transparent 70%)"
                : activeStep === 3
                ? "radial-gradient(ellipse at center, rgba(52,211,153,0.08) 0%, transparent 70%)"
                : "radial-gradient(ellipse at center, rgba(124,92,252,0.08) 0%, transparent 70%)"
            }}
          />
        </div>
      </div>
    </section>
  );
}

function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(7,7,15,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div className="flex items-center justify-between px-8 lg:px-16 xl:px-24 h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <EpiphonixLogo size={44} />
          <span className="text-white font-medium tracking-[0.22em] text-sm uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
            Epiphonix
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {["Vision", "Platform", "Solution", "Resources", "About us"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <a href="#" className="text-white/60 hover:text-white text-sm transition-colors hidden md:block">
            Log in
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-all hover:shadow-lg"
            style={{
              border: "1.5px solid rgba(157,125,255,0.55)",
              boxShadow: "0 0 16px rgba(124,92,252,0.15)"
            }}
          >
            Enter Nexus
            <span>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}

// EPIPHONIX — SCENARIO LAB
// Shared-state / radial knowledge graph version
// ============================================================

// ============================================================
// TYPES
// ============================================================

type ScenarioLabSource =
  | "initial"
  | "suggested"
  | "custom"
  | "remedy";

type ScenarioLabCard = {
  id: string;
  label: string;
  sub: string;
  category: string;
  icon: string;
  color: string;
  description?: string;
};

type ScenarioLabNode = ScenarioLabCard & {
  x: number;
  y: number;
  source: ScenarioLabSource;
};

type ScenarioLabEdge = {
  id: string;
  from: string;
  to: string;
  color: string;
  confidence: number;
  relationship: string;
  role: string;
  evidence: ScenarioLabEvidence[];
};

type ScenarioLabEvidence = {
  title: string;
  source: string;
  supports: string;
  strength: "High" | "Medium" | "Emerging";
};

type ScenarioLabRemedy = {
  id: string;
  label: string;
  sub: string;
  icon: string;
  description: string;
};

type ScenarioLabFriction = {
  id: string;
  edgeId: string;
  title: string;
  type: string;
  severity: "High" | "Medium" | "Low";
  description: string;
  impact: string;
  confidence: number;
  t: number;
  suggestions: ScenarioLabRemedy[];
};

type ScenarioLabState = {
  question: string;
  nodes: ScenarioLabNode[];
  edges: ScenarioLabEdge[];
  frictions: ScenarioLabFriction[];
};

// ============================================================
// DRAG TYPES
// ============================================================

const SCENARIO_LAB_NODE_DRAG = "application/epiphonix-node";
const SCENARIO_LAB_REMEDY_DRAG = "application/epiphonix-remedy";

// ============================================================
// HELPERS
// ============================================================

function scenarioLabCreateId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function scenarioLabClamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function scenarioLabGetPanBounds(
  nodes: ScenarioLabNode[],
  width: number,
  height: number
) {
  if (!nodes.length || width <= 0 || height <= 0) {
    return {
      minX: -120,
      maxX: 120,
      minY: -70,
      maxY: 70,
    };
  }

  // Approximate the largest half-size of the graph cards.
  // The important part is that the whole visible graph, not an arbitrary
  // fixed-size world, determines how far the user can pan.
  const halfCardWidth = 82;
  const halfCardHeight = 38;

  const minX =
    Math.min(
      ...nodes.map(
        (node) =>
          (node.x / 100) * width
      )
    ) - halfCardWidth;

  const maxX =
    Math.max(
      ...nodes.map(
        (node) =>
          (node.x / 100) * width
      )
    ) + halfCardWidth;

  const minY =
    Math.min(
      ...nodes.map(
        (node) =>
          (node.y / 100) * height
      )
    ) - halfCardHeight;

  const maxY =
    Math.max(
      ...nodes.map(
        (node) =>
          (node.y / 100) * height
      )
    ) + halfCardHeight;

  return {
    minX: -minX,
    maxX: width - maxX,
    minY: -minY,
    maxY: height - maxY,
  };
}

function scenarioLabSetDragData(
  dataTransfer: DataTransfer,
  type: string,
  data: unknown
) {
  dataTransfer.effectAllowed = "copy";
  dataTransfer.setData(type, JSON.stringify(data));
}

function scenarioLabReadDragData(dataTransfer: DataTransfer) {
  const nodeData = dataTransfer.getData(SCENARIO_LAB_NODE_DRAG);

  if (nodeData) {
    try {
      return {
        type: "node" as const,
        data: JSON.parse(nodeData),
      };
    } catch {
      return null;
    }
  }

  const remedyData = dataTransfer.getData(SCENARIO_LAB_REMEDY_DRAG);

  if (remedyData) {
    try {
      return {
        type: "remedy" as const,
        data: JSON.parse(remedyData),
      };
    } catch {
      return null;
    }
  }

  return null;
}

// ============================================================
// RADIAL POSITIONING
// Every initial node lives on the same mathematical radius.
// ============================================================

function scenarioLabRadialPosition(
  index: number,
  total: number,
  radius = 28,
  centerX = 50,
  centerY = 50
) {
  const angle =
    (-Math.PI / 2) +
    (index / total) * Math.PI * 2;

  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius,
  };
}

// ============================================================
// INITIAL CARDS
// ============================================================

const SCENARIO_LAB_INITIAL_CARDS: ScenarioLabCard[] = [
  {
    id: "research",
    label: "Research Evidence",
    sub: "Research",
    category: "Research",
    icon: "⌬",
    color: "#60a5fa",
    description:
      "Evidence supporting the underlying material or technology hypothesis.",
  },
  {
    id: "material",
    label: "Biodegradable Material",
    sub: "Material",
    category: "Material",
    icon: "◈",
    color: "#34d399",
    description:
      "An alternative material intended to replace conventional plastic.",
  },
  {
    id: "technology",
    label: "Enzyme Process",
    sub: "Technology",
    category: "Technology",
    icon: "◌",
    color: "#a78bfa",
    description:
      "A biological process enabling material transformation or processing.",
  },
  {
    id: "manufacturer",
    label: "Manufacturer",
    sub: "Stakeholder",
    category: "Stakeholder",
    icon: "▣",
    color: "#fbbf24",
    description:
      "Production capacity required to move the concept toward market.",
  },
  {
    id: "packaging",
    label: "Packaging Innovation",
    sub: "Opportunity",
    category: "Opportunity",
    icon: "◇",
    color: "#818cf8",
    description:
      "The application layer connecting material innovation to a real product.",
  },
  {
    id: "policy",
    label: "Policy",
    sub: "Regulation",
    category: "Policy",
    icon: "≡",
    color: "#c084fc",
    description:
      "Regulatory conditions affecting adoption and certification.",
  },
  {
    id: "consumer",
    label: "Consumer Adoption",
    sub: "Market",
    category: "Stakeholder",
    icon: "○",
    color: "#f472b6",
    description:
      "Whether downstream users accept and adopt the solution.",
  },
  {
    id: "environment",
    label: "Environmental Impact",
    sub: "Impact",
    category: "Impact",
    icon: "✦",
    color: "#4ade80",
    description:
      "The eventual environmental outcome of successful implementation.",
  },
];

// ============================================================
// OPPORTUNITY LIBRARY
// ============================================================

const SCENARIO_LAB_SUGGESTIONS: ScenarioLabCard[] = [
  {
    id: "bio",
    label: "Biodegradable Material",
    sub: "Material",
    category: "Material",
    icon: "◈",
    color: "#34d399",
    description: "Alternative material pathway.",
  },
  {
    id: "enzyme",
    label: "Enzyme-based Process",
    sub: "Technology",
    category: "Technology",
    icon: "◌",
    color: "#a78bfa",
    description: "Biological processing technology.",
  },
  {
    id: "manufacturer",
    label: "Local Manufacturer",
    sub: "Stakeholder",
    category: "Stakeholder",
    icon: "▣",
    color: "#fbbf24",
    description: "Potential production partner.",
  },
  {
    id: "policy",
    label: "Plastic Reduction Policy",
    sub: "Policy",
    category: "Policy",
    icon: "≡",
    color: "#c084fc",
    description: "Policy pathway that may influence adoption.",
  },
  {
    id: "research",
    label: "Microplastic Research",
    sub: "Research",
    category: "Research",
    icon: "⌬",
    color: "#60a5fa",
    description: "Research evidence node.",
  },
  {
    id: "packaging",
    label: "Packaging Innovation",
    sub: "Opportunity",
    category: "Opportunity",
    icon: "◇",
    color: "#818cf8",
    description: "Application opportunity.",
  },
  {
    id: "certification",
    label: "Certification Body",
    sub: "Validation",
    category: "Stakeholder",
    icon: "✓",
    color: "#22d3ee",
    description: "Independent certification pathway.",
  },
  {
    id: "investor",
    label: "Impact Investor",
    sub: "Capital",
    category: "Stakeholder",
    icon: "◎",
    color: "#f59e0b",
    description: "Potential capital source for scale-up.",
  },
];

// ============================================================
// EVIDENCE
// These are deliberately presented as evidence previews.
// Replace with EpiphoniX's real evidence engine later.
// ============================================================

const EVIDENCE = {
  researchMaterial: [
    {
      title: "Material performance evidence",
      source: "Research evidence layer",
      supports:
        "Provides evidence that the proposed material can perform under defined experimental conditions.",
      strength: "Medium" as const,
    },
    {
      title: "Independent validation",
      source: "Evidence registry",
      supports:
        "Additional validation would be required before generalizing laboratory performance to production conditions.",
      strength: "Emerging" as const,
    },
  ],
  materialTechnology: [
    {
      title: "Process compatibility",
      source: "Technical literature layer",
      supports:
        "The process relationship is technically plausible within the defined material pathway.",
      strength: "Medium" as const,
    },
  ],
  materialPackaging: [
    {
      title: "Application pathway",
      source: "Translation evidence layer",
      supports:
        "Connects material characteristics with a potential packaging application.",
      strength: "Medium" as const,
    },
  ],
  technologyManufacturer: [
    {
      title: "Scale-up pathway",
      source: "Manufacturing evidence layer",
      supports:
        "A manufacturing pathway is conceptually possible but production constraints remain to be validated.",
      strength: "Emerging" as const,
    },
  ],
  packagingPolicy: [
    {
      title: "Regulatory dependency",
      source: "Policy evidence layer",
      supports:
        "Packaging adoption can depend on certification, material definitions and regulatory treatment.",
      strength: "Medium" as const,
    },
  ],
  packagingConsumer: [
    {
      title: "Adoption pathway",
      source: "Market evidence layer",
      supports:
        "Consumer acceptance can influence whether an alternative packaging pathway reaches meaningful scale.",
      strength: "Emerging" as const,
    },
  ],
  policyConsumer: [
    {
      title: "Policy-to-adoption pathway",
      source: "Policy evidence layer",
      supports:
        "Policy conditions may alter incentives and constraints affecting adoption.",
      strength: "Medium" as const,
    },
  ],
  consumerEnvironment: [
    {
      title: "Impact pathway",
      source: "Impact evidence layer",
      supports:
        "Successful adoption is expected to influence the environmental outcome pathway.",
      strength: "Medium" as const,
    },
  ],
};

// ============================================================
// INITIAL GRAPH
// ============================================================

function createInitialNodes(): ScenarioLabNode[] {
  return SCENARIO_LAB_INITIAL_CARDS.map((card, index) => {
    const position = scenarioLabRadialPosition(
      index,
      SCENARIO_LAB_INITIAL_CARDS.length
    );

    return {
      ...card,
      x: position.x,
      y: position.y,
      source: "initial",
    };
  });
}

function createInitialEdges(): ScenarioLabEdge[] {
  return [
    {
      id: "research-material",
      from: "research",
      to: "material",
      color: "#60a5fa",
      confidence: 76,
      relationship: "Evidence → Material",
      role: "Validates the material hypothesis.",
      evidence: EVIDENCE.researchMaterial,
    },
    {
      id: "material-technology",
      from: "material",
      to: "technology",
      color: "#8b7cf6",
      confidence: 68,
      relationship: "Material → Technology",
      role: "Connects material properties with processing requirements.",
      evidence: EVIDENCE.materialTechnology,
    },
    {
      id: "research-manufacturer",
      from: "research",
      to: "manufacturer",
      color: "#6d8de8",
      confidence: 49,
      relationship: "Research → Manufacturing",
      role: "Translates evidence toward production requirements.",
      evidence: [
        {
          title: "Translation gap",
          source: "Implementation evidence layer",
          supports:
            "Research evidence does not automatically establish production readiness.",
          strength: "Emerging",
        },
      ],
    },
    {
      id: "material-packaging",
      from: "material",
      to: "packaging",
      color: "#52bca1",
      confidence: 73,
      relationship: "Material → Application",
      role: "Connects the material with its packaging use case.",
      evidence: EVIDENCE.materialPackaging,
    },
    {
      id: "technology-manufacturer",
      from: "technology",
      to: "manufacturer",
      color: "#a78bfa",
      confidence: 55,
      relationship: "Technology → Manufacturing",
      role: "Determines whether the process can survive scale-up.",
      evidence: EVIDENCE.technologyManufacturer,
    },
    {
      id: "packaging-policy",
      from: "packaging",
      to: "policy",
      color: "#9b7de5",
      confidence: 61,
      relationship: "Application → Regulation",
      role: "Connects the product pathway with regulatory requirements.",
      evidence: EVIDENCE.packagingPolicy,
    },
    {
      id: "packaging-consumer",
      from: "packaging",
      to: "consumer",
      color: "#d477ae",
      confidence: 57,
      relationship: "Application → Adoption",
      role: "Tests whether the proposed product pathway can gain adoption.",
      evidence: EVIDENCE.packagingConsumer,
    },
    {
      id: "policy-consumer",
      from: "policy",
      to: "consumer",
      color: "#c084fc",
      confidence: 64,
      relationship: "Policy → Adoption",
      role: "Policy conditions influence adoption incentives.",
      evidence: EVIDENCE.policyConsumer,
    },
    {
      id: "consumer-environment",
      from: "consumer",
      to: "environment",
      color: "#54c49a",
      confidence: 71,
      relationship: "Adoption → Impact",
      role: "Connects real-world adoption with environmental outcome.",
      evidence: EVIDENCE.consumerEnvironment,
    },
  ];
}

// ============================================================
// FRICTIONS
// IMPORTANT:
// Frictions are attached ONLY to explicit edges.
// Adding a card does NOT create friction.
// ============================================================

function createInitialFrictions(): ScenarioLabFriction[] {
  return [
    {
      id: "scientific",
      edgeId: "research-material",
      title: "Scientific uncertainty",
      type: "Scientific Uncertainty",
      severity: "High",
      description:
        "The material shows promise in controlled research, but its behavior across real packaging conditions is not sufficiently validated.",
      impact:
        "Low evidence transfer confidence can slow the transition from research evidence to an implementation decision.",
      confidence: 82,
      t: 0.5,
      suggestions: [
        {
          id: "pilot-study",
          label: "Pilot validation study",
          sub: "Generate field evidence",
          icon: "⌁",
          description:
            "Generate evidence under realistic operating conditions.",
        },
        {
          id: "lab-validation",
          label: "Independent lab validation",
          sub: "Strengthen evidence",
          icon: "⌬",
          description:
            "Add independent validation to the evidence chain.",
        },
      ],
    },
    {
      id: "availability",
      edgeId: "material-technology",
      title: "Material availability",
      type: "Material Availability",
      severity: "Medium",
      description:
        "The pathway depends on reliable access to suitable feedstock with consistent quality at the required scale.",
      impact:
        "Supply instability can prevent a technically viable process from becoming operational.",
      confidence: 71,
      t: 0.5,
      suggestions: [
        {
          id: "supplier",
          label: "Regional material supplier",
          sub: "Secure supply",
          icon: "↗",
          description:
            "Create a regional supplier pathway.",
        },
        {
          id: "feedstock",
          label: "Alternative feedstock",
          sub: "Reduce dependency",
          icon: "◈",
          description:
            "Introduce an alternative feedstock option.",
        },
      ],
    },
    {
      id: "manufacturing",
      edgeId: "technology-manufacturer",
      title: "Manufacturing readiness",
      type: "Manufacturing Readiness",
      severity: "High",
      description:
        "The process works as a concept, but transferring it into repeatable production introduces equipment and quality constraints.",
      impact:
        "Scale-up uncertainty can increase time, cost and operational risk.",
      confidence: 78,
      t: 0.5,
      suggestions: [
        {
          id: "manufacturing-pilot",
          label: "Manufacturing pilot",
          sub: "Test scale-up",
          icon: "▣",
          description:
            "Test repeatability under controlled manufacturing conditions.",
        },
        {
          id: "process-audit",
          label: "Scale-up process audit",
          sub: "Find bottlenecks",
          icon: "⌁",
          description:
            "Identify process constraints before larger investment.",
        },
      ],
    },
    {
      id: "cost",
      edgeId: "material-packaging",
      title: "Cost",
      type: "Cost",
      severity: "High",
      description:
        "The alternative material may introduce higher production or processing costs before economies of scale are reached.",
      impact:
        "High unit cost can prevent technically feasible packaging from reaching commercial adoption.",
      confidence: 74,
      t: 0.5,
      suggestions: [
        {
          id: "cost-optimization",
          label: "Cost optimization",
          sub: "Reduce unit cost",
          icon: "↘",
          description:
            "Identify and reduce the largest cost drivers.",
        },
        {
          id: "impact-funding",
          label: "Impact funding partner",
          sub: "Bridge early cost",
          icon: "◎",
          description:
            "Provide capital support during early implementation.",
        },
      ],
    },
    {
      id: "coordination",
      edgeId: "packaging-policy",
      title: "Stakeholder coordination",
      type: "Stakeholder Coordination",
      severity: "Medium",
      description:
        "Manufacturers, policymakers, researchers and downstream actors need aligned incentives and shared implementation information.",
      impact:
        "Fragmented responsibilities can leave technically viable pathways without an execution owner.",
      confidence: 69,
      t: 0.5,
      suggestions: [
        {
          id: "working-group",
          label: "Multi-stakeholder working group",
          sub: "Align actors",
          icon: "◌",
          description:
            "Create a shared implementation structure.",
        },
        {
          id: "implementation-partner",
          label: "Implementation partner",
          sub: "Coordinate execution",
          icon: "↗",
          description:
            "Add an actor responsible for moving the pathway forward.",
        },
      ],
    },
    {
      id: "regulation",
      edgeId: "policy-consumer",
      title: "Policy / regulation",
      type: "Policy / Regulation",
      severity: "Medium",
      description:
        "Adoption may depend on certification requirements and how the material is treated under existing regulations.",
      impact:
        "Regulatory ambiguity can delay market entry even when the underlying technology works.",
      confidence: 72,
      t: 0.5,
      suggestions: [
        {
          id: "regulatory-map",
          label: "Regulatory mapping",
          sub: "Identify requirements",
          icon: "≡",
          description:
            "Map the relevant certification and regulatory pathway.",
        },
        {
          id: "policy-alignment",
          label: "Policy alignment partner",
          sub: "Reduce uncertainty",
          icon: "⚖",
          description:
            "Connect implementation with relevant policy expertise.",
        },
      ],
    },
  ];
}

// ============================================================
// INITIAL STATE
// ============================================================

function createInitialScenarioState(): ScenarioLabState {
  return {
    question:
      "What if we replace conventional plastic with biodegradable material in packaging for consumer goods?",
    nodes: createInitialNodes(),
    edges: createInitialEdges(),
    frictions: createInitialFrictions(),
  };
}

// ============================================================
// CURVED CONNECTION GEOMETRY
// ============================================================

function scenarioLabGetCurve(
  from: ScenarioLabNode,
  to: ScenarioLabNode
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  const distance = Math.sqrt(dx * dx + dy * dy);

  const nx = -dy / Math.max(distance, 0.001);
  const ny = dx / Math.max(distance, 0.001);

  const bend = Math.min(9, Math.max(4, distance * 0.12));

  const p0 = {
    x: from.x,
    y: from.y,
  };

  const p3 = {
    x: to.x,
    y: to.y,
  };

  const p1 = {
    x: from.x + dx * 0.32 + nx * bend,
    y: from.y + dy * 0.32 + ny * bend,
  };

  const p2 = {
    x: to.x - dx * 0.32 + nx * bend,
    y: to.y - dy * 0.32 + ny * bend,
  };

  return {
    p0,
    p1,
    p2,
    p3,
    d: `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`,
  };
}

function scenarioLabBezierPoint(
  curve: ReturnType<typeof scenarioLabGetCurve>,
  t: number
) {
  const mt = 1 - t;

  return {
    x:
      mt ** 3 * curve.p0.x +
      3 * mt ** 2 * t * curve.p1.x +
      3 * mt * t ** 2 * curve.p2.x +
      t ** 3 * curve.p3.x,

    y:
      mt ** 3 * curve.p0.y +
      3 * mt ** 2 * t * curve.p1.y +
      3 * mt * t ** 2 * curve.p2.y +
      t ** 3 * curve.p3.y,
  };
}

// ============================================================
// SCREEN 1
// ============================================================

function ScenarioLabQuestionScreen({
  question,
  onQuestionChange,
  onEnter,
}: {
  question: string;
  onQuestionChange: (value: string) => void;
  onEnter: () => void;
}) {
  return (
    <div className="relative flex h-full min-h-[600px] items-center justify-center overflow-hidden bg-[#07080d]">
      {/* ======================================================
          ATMOSPHERE
      ====================================================== */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.045] blur-[150px]" />

      <div className="pointer-events-none absolute left-[18%] top-[20%] h-1 w-1 rounded-full bg-white/60 shadow-[0_0_35px_10px_rgba(167,139,250,0.2)]" />

      <div className="pointer-events-none absolute right-[22%] top-[28%] h-1 w-1 rounded-full bg-white/40 shadow-[0_0_30px_8px_rgba(96,165,250,0.18)]" />

      <div className="pointer-events-none absolute bottom-[22%] left-[27%] h-1 w-1 rounded-full bg-white/40 shadow-[0_0_30px_8px_rgba(244,114,182,0.14)]" />

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 w-full max-w-[900px] px-6 text-center sm:px-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] border border-violet-300/10 bg-violet-300/[0.035] shadow-[0_0_70px_rgba(139,92,246,0.08)]">
          <span className="text-2xl text-violet-200">
            ✦
          </span>
        </div>

        <p className="mt-8 text-[9px] uppercase tracking-[0.3em] text-violet-300/65">
          Scenario intelligence
        </p>

        <h3
          className="mt-5 text-5xl font-normal tracking-[-0.055em] text-white sm:text-6xl"
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
          }}
        >
          What if...
        </h3>

        <p className="mx-auto mt-5 max-w-xl text-[11px] leading-6 text-slate-400/70">
          Start with a hypothesis. EpiphoniX maps the ecosystem,
          relationships, friction and possible pathways around it.
        </p>

        {/* ======================================================
            QUESTION INPUT
            Explicitly isolated from canvas interactions.
        ====================================================== */}

        <div
          data-interactive
          className="mx-auto mt-10 max-w-[760px] rounded-[26px] border border-white/[0.08] bg-white/[0.025] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
        >
          <div className="flex items-center gap-3 rounded-[19px] border border-white/[0.07] bg-black/30 px-5 py-4">
            <span className="shrink-0 text-violet-300">
              ✦
            </span>

            <input
              data-interactive
              autoComplete="off"
              value={question}
              onChange={(event) => {
                onQuestionChange(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onEnter();
                }
              }}
              className="min-w-0 flex-1 bg-transparent text-left text-[11px] leading-6 text-slate-100 outline-none placeholder:text-slate-700"
              placeholder="Ask a question about an idea, technology or pathway..."
            />

            <button
              type="button"
              data-interactive
              onClick={onEnter}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-400/[0.10] text-violet-200 transition hover:bg-violet-400/[0.17] active:scale-95"
            >
              ↵
            </button>
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {[
              "Explore a pathway",
              "Compare scenarios",
              "Find opportunities",
              "Identify missing stakeholders",
            ].map((item) => (
              <button
                key={item}
                type="button"
                data-interactive
                onClick={() => {
                  onQuestionChange(
                    `What if we ${item.toLowerCase()}?`
                  );
                }}
                className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[7px] text-slate-500 transition hover:border-violet-300/15 hover:bg-violet-300/[0.035] hover:text-violet-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-center justify-center gap-2 text-[8px] uppercase tracking-[0.16em] text-slate-600">
          <span className="h-px w-8 bg-white/[0.08]" />
          Map what happens next
          <span className="h-px w-8 bg-white/[0.08]" />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SMALL CARD
// ============================================================

function ScenarioLabLibraryCard({
  card,
  onDragStart,
}: {
  card: ScenarioLabCard;
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>
  ) => void;
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="group cursor-grab rounded-xl border border-white/[0.055] bg-white/[0.018] p-3 transition duration-200 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.04] active:cursor-grabbing"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[12px]"
          style={{
            color: card.color,
            backgroundColor: `${card.color}0d`,
            border: `1px solid ${card.color}25`,
            boxShadow: `0 0 20px ${card.color}08`,
          }}
        >
          {card.icon}
        </div>

        <div className="min-w-0">
          <p className="truncate text-[8px] font-medium text-slate-200/90">
            {card.label}
          </p>

          <p
            className="mt-1 text-[6px] uppercase tracking-[0.13em]"
            style={{
              color: `${card.color}aa`,
            }}
          >
            {card.sub}
          </p>
        </div>

        <span className="ml-auto text-[10px] text-slate-700 transition group-hover:text-slate-400">
          ⠿
        </span>
      </div>
    </div>
  );
}

// ============================================================
// SCREEN 2
// ============================================================

function ScenarioLabBuilderScreen({
  state,
  setState,
}: {
  state: ScenarioLabState;
  setState: React.Dispatch<React.SetStateAction<ScenarioLabState>>;
}) {
  const [selectedFrictionId, setSelectedFrictionId] =
    useState<string | null>(null);

  const [selectedNodeId, setSelectedNodeId] =
    useState<string | null>(null);

  const [customIdea, setCustomIdea] = useState("");

  const [dropActive, setDropActive] = useState(false);

  const [draggingLabel, setDraggingLabel] =
    useState<string | null>(null);

  const [libraryOpen, setLibraryOpen] = useState(true);

  const [inspectorOpen, setInspectorOpen] = useState(false);

  /*
   * IMPORTANT:
   * There is deliberately NO zoom state.
   *
   * The graph is a large world.
   * We only move the world around the viewport.
   */
  const [pan, setPan] = useState({
    x: 0,
    y: 0,
  });

  const [isPanning, setIsPanning] = useState(false);

  const panStartRef = React.useRef({
    x: 0,
    y: 0,
  });

  const panOriginRef = React.useRef({
    x: 0,
    y: 0,
  });

  const graphWorldRef = React.useRef<HTMLDivElement | null>(null);

  const canvasViewportRef =
    React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const viewport =
      canvasViewportRef.current;

    if (!viewport) return;

    const clampPanToGraph = () => {
      const bounds =
        scenarioLabGetPanBounds(
          state.nodes,
          viewport.clientWidth,
          viewport.clientHeight
        );

      setPan((current) => {
        const x = scenarioLabClamp(
          current.x,
          Math.min(bounds.minX, bounds.maxX),
          Math.max(bounds.minX, bounds.maxX)
        );

        const y = scenarioLabClamp(
          current.y,
          Math.min(bounds.minY, bounds.maxY),
          Math.max(bounds.minY, bounds.maxY)
        );

        if (
          x === current.x &&
          y === current.y
        ) {
          return current;
        }

        return { x, y };
      });
    };

    clampPanToGraph();

    const observer =
      typeof ResizeObserver !==
      "undefined"
        ? new ResizeObserver(
            clampPanToGraph
          )
        : null;

    observer?.observe(viewport);

    return () => {
      observer?.disconnect();
    };
  }, [
    libraryOpen,
    inspectorOpen,
    state.nodes.length,
  ]);

  const selectedFriction = state.frictions.find(
    (item) => item.id === selectedFrictionId
  );

  const selectedNode = state.nodes.find(
    (item) => item.id === selectedNodeId
  );

  // ==========================================================
  // SELECTION
  // ==========================================================

  const selectFriction = (id: string) => {
    setSelectedFrictionId(id);
    setSelectedNodeId(null);
    setInspectorOpen(true);
  };

  const selectNode = (id: string) => {
    setSelectedNodeId(id);
    setSelectedFrictionId(null);
    setInspectorOpen(true);
  };

  // ==========================================================
  // PAN
  // ==========================================================

  const handleCanvasPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (event.button !== 0) return;

    const target = event.target as HTMLElement;

    /*
     * Anything interactive belongs to the UI layer,
     * not the canvas layer.
     */
    if (
      target.closest(
        "button, input, textarea, select, [data-interactive], [data-control], [data-friction]"
      )
    ) {
      return;
    }

    setIsPanning(true);

    panStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    panOriginRef.current = {
      x: pan.x,
      y: pan.y,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  const handleCanvasPointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isPanning) return;

    const dx =
      event.clientX -
      panStartRef.current.x;

    const dy =
      event.clientY -
      panStartRef.current.y;

    const viewport = canvasViewportRef.current;

    const bounds = scenarioLabGetPanBounds(
      state.nodes,
      viewport?.clientWidth ?? 0,
      viewport?.clientHeight ?? 0
    );

    setPan({
      x: scenarioLabClamp(
        panOriginRef.current.x + dx,
        Math.min(bounds.minX, bounds.maxX),
        Math.max(bounds.minX, bounds.maxX)
      ),
      y: scenarioLabClamp(
        panOriginRef.current.y + dy,
        Math.min(bounds.minY, bounds.maxY),
        Math.max(bounds.minY, bounds.maxY)
      ),
    });
  };

  const stopPanning = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isPanning) return;

    setIsPanning(false);

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    } catch {
      // Pointer capture already released.
    }
  };

  // ==========================================================
  // CREATE NODE
  // ==========================================================

  const createNode = (
    card: ScenarioLabCard,
    x: number,
    y: number
  ) => {
    const newNode: ScenarioLabNode = {
      ...card,
      id: scenarioLabCreateId("node"),
      x: scenarioLabClamp(x, 5, 95),
      y: scenarioLabClamp(y, 8, 92),
      source: card.id.startsWith("custom-")
        ? "custom"
        : "suggested",
    };

    const relationships: Record<
      string,
      string[]
    > = {
      Material: [
        "Research",
        "Opportunity",
      ],
      Technology: [
        "Material",
        "Stakeholder",
      ],
      Stakeholder: [
        "Opportunity",
        "Policy",
      ],
      Policy: [
        "Opportunity",
        "Stakeholder",
      ],
      Research: [
        "Material",
        "Technology",
      ],
      Opportunity: [
        "Material",
        "Stakeholder",
      ],
    };

    const preferred =
      relationships[card.category] || [];

    const ranked = [...state.nodes].sort(
      (a, b) => {
        const aPreferred =
          preferred.includes(a.category)
            ? 0
            : 1;

        const bPreferred =
          preferred.includes(b.category)
            ? 0
            : 1;

        if (
          aPreferred !==
          bPreferred
        ) {
          return (
            aPreferred -
            bPreferred
          );
        }

        const distanceA =
          Math.hypot(
            newNode.x - a.x,
            newNode.y - a.y
          );

        const distanceB =
          Math.hypot(
            newNode.x - b.x,
            newNode.y - b.y
          );

        return (
          distanceA -
          distanceB
        );
      }
    );

    const targets = ranked
      .filter(
        (node) =>
          !preferred.length ||
          preferred.includes(
            node.category
          )
      )
      .slice(0, 2);

    const newEdges: ScenarioLabEdge[] =
      targets.map(
        (target, index) => ({
          id: scenarioLabCreateId(
            `edge-${index}`
          ),
          from: newNode.id,
          to: target.id,
          color:
            index === 0
              ? newNode.color
              : target.color,
          confidence:
            index === 0
              ? 62
              : 54,
          relationship:
            `${card.sub} → ${target.sub}`,
          role:
            "Suggested relationship generated from the current ecosystem.",
          evidence: [
            {
              title:
                "EpiphoniX relationship inference",
              source:
                "Scenario intelligence",
              supports:
                "This connection is suggested from semantic and ecosystem relationships and should be validated.",
              strength:
                "Emerging",
            },
          ],
        })
      );

    setState((current) => ({
      ...current,
      nodes: [
        ...current.nodes,
        newNode,
      ],
      edges: [
        ...current.edges,
        ...newEdges,
      ],
    }));

    setSelectedNodeId(
      newNode.id
    );

    setSelectedFrictionId(null);
    setInspectorOpen(true);
  };

  // ==========================================================
  // RESOLVE FRICTION
  // ==========================================================

  const resolveFriction = (
    friction: ScenarioLabFriction,
    remedy: ScenarioLabRemedy,
    x: number,
    y: number
  ) => {
    const edge = state.edges.find(
      (item) =>
        item.id === friction.edgeId
    );

    if (!edge) return;

    const fromNode =
      state.nodes.find(
        (node) =>
          node.id === edge.from
      );

    const toNode =
      state.nodes.find(
        (node) =>
          node.id === edge.to
      );

    if (!fromNode || !toNode) {
      return;
    }

    const remedyNode: ScenarioLabNode = {
      id: scenarioLabCreateId(
        "remedy"
      ),
      label: remedy.label,
      sub: "Intervention",
      category: "Intervention",
      icon: remedy.icon,
      color: "#4ade80",
      x: scenarioLabClamp(
        x,
        5,
        95
      ),
      y: scenarioLabClamp(
        y,
        8,
        92
      ),
      source: "remedy",
      description:
        remedy.description,
    };

    const fixEdgeA: ScenarioLabEdge = {
      id: scenarioLabCreateId(
        "fix"
      ),
      from: remedyNode.id,
      to: fromNode.id,
      color: "#4ade80",
      confidence: 79,
      relationship:
        "Intervention → Pathway",
      role:
        "Applies the intervention to the affected pathway.",
      evidence: [
        {
          title:
            "Intervention pathway",
          source:
            "Scenario intelligence",
          supports:
            "The intervention is mapped as a mechanism capable of reducing the selected friction.",
          strength: "Medium",
        },
      ],
    };

    const fixEdgeB: ScenarioLabEdge = {
      id: scenarioLabCreateId(
        "fix"
      ),
      from: remedyNode.id,
      to: toNode.id,
      color: "#4ade80",
      confidence: 75,
      relationship:
        "Intervention → Outcome",
      role:
        "Connects the intervention with the affected outcome.",
      evidence: [
        {
          title:
            "Outcome relationship",
          source:
            "Scenario intelligence",
          supports:
            "The intervention is intended to improve pathway continuity.",
          strength: "Medium",
        },
      ],
    };

    setState((current) => ({
      ...current,
      nodes: [
        ...current.nodes,
        remedyNode,
      ],
      edges: [
        ...current.edges,
        fixEdgeA,
        fixEdgeB,
      ],
      frictions:
        current.frictions.filter(
          (item) =>
            item.id !==
            friction.id
        ),
    }));

    setSelectedFrictionId(null);
    setSelectedNodeId(
      remedyNode.id
    );
    setInspectorOpen(true);
  };

  // ==========================================================
  // DROP
  // ==========================================================

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    const payload =
      scenarioLabReadDragData(
        event.dataTransfer
      );

    setDropActive(false);
    setDraggingLabel(null);

    if (!payload) return;

    const worldRect =
      graphWorldRef.current?.getBoundingClientRect();

    if (!worldRect) return;

    // The graph world already includes the current pan, so use its
    // actual rectangle rather than guessing with fixed 1600×1000 dimensions.
    const x =
      ((event.clientX - worldRect.left) /
        worldRect.width) *
      100;

    const y =
      ((event.clientY - worldRect.top) /
        worldRect.height) *
      100;

    if (payload.type === "node") {
      createNode(
        payload.data as ScenarioLabCard,
        x,
        y
      );

      return;
    }

    if (
      payload.type === "remedy" &&
      selectedFriction
    ) {
      resolveFriction(
        selectedFriction,
        payload.data as ScenarioLabRemedy,
        x,
        y
      );
    }
  };

  // ==========================================================
  // RESET
  // ==========================================================

  const resetScenario = () => {
    setState(
      createInitialScenarioState()
    );

    setSelectedFrictionId(null);
    setSelectedNodeId(null);
    setCustomIdea("");
    setInspectorOpen(false);

    setPan({
      x: 0,
      y: 0,
    });
  };

  // ==========================================================
  // CUSTOM IDEA
  // ==========================================================

  const addCustomIdea = () => {
    const clean =
      customIdea.trim();

    if (!clean) return;

    const card: ScenarioLabCard = {
      id: `custom-${clean}-${Date.now()}`,
      label: clean,
      sub: "Custom",
      category: "Opportunity",
      icon: "✦",
      color: "#c084fc",
    };

    createNode(
      card,
      50,
      50
    );

    setCustomIdea("");
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="relative h-full min-h-[600px] overflow-hidden bg-[#07080d]">
      {/* ======================================================
          ACTIVE HYPOTHESIS
          Compact. Top-left only.
      ====================================================== */}

      <div className="pointer-events-none absolute left-4 top-4 z-[200] max-w-[min(560px,calc(100%-32px))] sm:left-5 sm:top-5">
        <div className="pointer-events-auto rounded-2xl border border-white/[0.07] bg-[#0b0c12]/94 px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
          <p className="text-[6px] uppercase tracking-[0.18em] text-violet-300/55">
            Active hypothesis
          </p>

          <p className="mt-1 truncate text-[8px] text-slate-300/80 sm:text-[9px]">
            {state.question}
          </p>
        </div>
      </div>

      {/* ======================================================
          TOP RIGHT CONTROLS
      ====================================================== */}

      <div className="absolute right-4 top-4 z-[200] flex items-center gap-2 sm:right-5 sm:top-5">
        <button
          type="button"
          data-control
          onClick={resetScenario}
          className="rounded-xl border border-white/[0.07] bg-[#0b0c12]/94 px-3.5 py-2.5 text-[7px] uppercase tracking-[0.15em] text-slate-500 shadow-xl backdrop-blur-xl transition hover:border-white/[0.14] hover:text-white"
        >
          Reset
        </button>
      </div>

      {/* ======================================================
          CANVAS VIEWPORT
      ====================================================== */}

      <div
        ref={canvasViewportRef}
        className={`absolute inset-0 overflow-hidden touch-none ${
          isPanning
            ? "cursor-grabbing"
            : "cursor-grab"
        } ${
          dropActive
            ? "bg-violet-950/[0.09]"
            : ""
        }`}
        onPointerDown={
          handleCanvasPointerDown
        }
        onPointerMove={
          handleCanvasPointerMove
        }
        onPointerUp={
          stopPanning
        }
        onPointerCancel={
          stopPanning
        }
        onDragOver={(event) => {
          event.preventDefault();

          event.dataTransfer.dropEffect =
            "copy";

          setDropActive(true);
        }}
        onDragLeave={() => {
          setDropActive(false);
        }}
        onDrop={handleDrop}
      >
        {/* ====================================================
            GRID
        ==================================================== */}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize:
              "44px 44px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 78%)",
          }}
        />

        {/* ====================================================
            LARGE GRAPH WORLD

            This is intentionally larger than the viewport.
            There is no scale transform anymore.
        ==================================================== */}

        <div
          ref={graphWorldRef}
          className="absolute bottom-0 top-[70px] overflow-visible"
          style={{
            left: libraryOpen
              ? "234px"
              : "0px",
            right: inspectorOpen
              ? "346px"
              : "0px",
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0)`,
          }}
        >
          {/* RADIAL CORE */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/[0.025] bg-violet-500/[0.018] shadow-[0_0_140px_rgba(139,92,246,0.055)]" />

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/[0.035]" />

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/[0.035] blur-2xl" />

          {/* ==================================================
              CONNECTIONS
          ================================================== */}

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <filter
                id="scenarioGlowBuilder"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur
                  stdDeviation="0.32"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient
                id="scenarioLineBuilder"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#a78bfa"
                  stopOpacity="0.12"
                />

                <stop
                  offset="50%"
                  stopColor="#c4b5fd"
                  stopOpacity="0.8"
                />

                <stop
                  offset="100%"
                  stopColor="#60a5fa"
                  stopOpacity="0.15"
                />
              </linearGradient>
            </defs>

            {state.edges.map((edge) => {
              const from =
                state.nodes.find(
                  (node) =>
                    node.id ===
                    edge.from
                );

              const to =
                state.nodes.find(
                  (node) =>
                    node.id ===
                    edge.to
                );

              if (!from || !to) {
                return null;
              }

              const curve =
                scenarioLabGetCurve(
                  from,
                  to
                );

              const friction =
                state.frictions.find(
                  (item) =>
                    item.edgeId ===
                    edge.id
                );

              const selected =
                selectedFriction?.edgeId ===
                edge.id;

              const nodeSelected =
                selectedNodeId ===
                  edge.from ||
                selectedNodeId ===
                  edge.to;

              return (
                <g key={edge.id}>
                  <path
                    d={curve.d}
                    fill="none"
                    stroke={edge.color}
                    strokeWidth={
                      selected || nodeSelected
                        ? "0.72"
                        : "0.46"
                    }
                    opacity={
                      selected ||
                      nodeSelected
                        ? "0.18"
                        : "0.06"
                    }
                    filter="url(#scenarioGlowBuilder)"
                  />

                  <path
                    d={curve.d}
                    fill="none"
                    stroke={
                      selected
                        ? "#f87171"
                        : nodeSelected
                        ? edge.color
                        : "url(#scenarioLineBuilder)"
                    }
                    strokeWidth={
                      selected
                        ? "0.62"
                        : nodeSelected
                        ? "0.48"
                        : "0.24"
                    }
                    strokeLinecap="round"
                    strokeDasharray={
                      friction
                        ? "1.5 1.5"
                        : undefined
                    }
                    opacity={
                      selected
                        ? "0.9"
                        : nodeSelected
                        ? "0.68"
                        : "0.32"
                    }
                  />

                  {!friction && (
                    <circle
                      r="0.38"
                      fill={edge.color}
                      opacity="0.65"
                    >
                      <animateMotion
                        dur="5s"
                        repeatCount="indefinite"
                        path={curve.d}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* FRICTION POINTS */}

            {state.frictions.map(
              (friction) => {
                const edge =
                  state.edges.find(
                    (item) =>
                      item.id ===
                      friction.edgeId
                  );

                if (!edge) {
                  return null;
                }

                const from =
                  state.nodes.find(
                    (node) =>
                      node.id ===
                      edge.from
                  );

                const to =
                  state.nodes.find(
                    (node) =>
                      node.id ===
                      edge.to
                  );

                if (!from || !to) {
                  return null;
                }

                const curve =
                  scenarioLabGetCurve(
                    from,
                    to
                  );

                const marker =
                  scenarioLabBezierPoint(
                    curve,
                    friction.t
                  );

                const selected =
                  selectedFrictionId ===
                  friction.id;

                return (
                  <g
                    key={friction.id}
                    data-friction
                    transform={`translate(${marker.x} ${marker.y})`}
                    pointerEvents="auto"
                    className="cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation();

                      selectFriction(
                        friction.id
                      );
                    }}
                  >
                    <circle
                      r="5"
                      fill="transparent"
                    />

                    <circle
                      r={
                        selected
                          ? "2.5"
                          : "1.8"
                      }
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="0.25"
                      opacity="0.22"
                    >
                      <animate
                        attributeName="r"
                        values="1.5;2.8;1.5"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />

                      <animate
                        attributeName="opacity"
                        values="0.3;0.05;0.3"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    <circle
                      r={
                        selected
                          ? "1.45"
                          : "1.05"
                      }
                      fill="#ef4444"
                      opacity="0.10"
                    />

                    <circle
                      r={
                        selected
                          ? "0.72"
                          : "0.52"
                      }
                      fill="#f87171"
                      filter="url(#scenarioGlowBuilder)"
                    />

                    <circle
                      r="0.18"
                      fill="#fff1f2"
                    />
                  </g>
                );
              }
            )}
          </svg>

          {/* ==================================================
              NODES
          ================================================== */}

          {state.nodes.map((node) => {
            const selected =
              selectedNodeId ===
              node.id;

            const connectedToSelected =
              selectedNodeId &&
              state.edges.some(
                (edge) =>
                  (edge.from ===
                    selectedNodeId &&
                    edge.to ===
                      node.id) ||
                  (edge.to ===
                    selectedNodeId &&
                    edge.from ===
                      node.id)
              );

            return (
              <button
                key={node.id}
                type="button"
                data-interactive
                onClick={(event) => {
                  event.stopPropagation();

                  selectNode(
                    node.id
                  );
                }}
                className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-[17px] border px-3.5 py-2.75 text-left backdrop-blur-2xl transition-all duration-300 ${
                  selected
                    ? "scale-[1.045] border-white/[0.2] bg-[#12131c] shadow-[0_0_45px_rgba(139,92,246,0.18),0_20px_50px_rgba(0,0,0,0.5)]"
                    : connectedToSelected
                    ? "border-white/[0.14] bg-[#101119]/95 shadow-[0_0_30px_rgba(139,92,246,0.08)]"
                    : "border-white/[0.065] bg-[#101119]/94 shadow-[0_16px_45px_rgba(0,0,0,0.35)] hover:-translate-y-[3px] hover:border-white/[0.14]"
                }`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  minWidth: "150px",
                }}
              >
                <div
                  className="absolute bottom-0 left-4 right-4 h-px opacity-60"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${node.color}, transparent)`,
                  }}
                />

                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[13px]"
                    style={{
                      color:
                        node.color,
                      backgroundColor:
                        `${node.color}0d`,
                      border:
                        `1px solid ${node.color}24`,
                      boxShadow:
                        selected
                          ? `0 0 24px ${node.color}18`
                          : "none",
                    }}
                  >
                    {node.icon}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[9px] font-medium text-slate-100/95">
                      {node.label}
                    </p>

                    <p
                      className="mt-1 text-[6px] uppercase tracking-[0.12em]"
                      style={{
                        color:
                          `${node.color}b0`,
                      }}
                    >
                      {node.sub}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ====================================================
            DROP OVERLAY
        ==================================================== */}

        {dropActive && (
          <div className="pointer-events-none absolute inset-5 z-[80] rounded-[26px] border border-dashed border-violet-300/25 bg-violet-400/[0.015]">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/15 bg-[#101019]/95 px-5 py-3 text-[7px] uppercase tracking-[0.18em] text-violet-200/80 shadow-2xl backdrop-blur-xl">
              Drop into ecosystem
            </div>
          </div>
        )}

        {draggingLabel && (
          <div className="pointer-events-none absolute left-1/2 top-[82px] z-[170] -translate-x-1/2 rounded-full border border-violet-300/15 bg-[#101019]/95 px-4 py-2 text-[7px] uppercase tracking-[0.16em] text-violet-200/80 shadow-2xl backdrop-blur-xl">
            Adding {draggingLabel}
          </div>
        )}

        {/* ====================================================
            LEFT LIBRARY
        ==================================================== */}

        <aside
          data-interactive
          onPointerDown={(event) => event.stopPropagation()}
          onMouseDown={(event) => event.stopPropagation()}
          className={`absolute bottom-4 left-4 top-[84px] z-[140] w-[218px] overflow-hidden rounded-2xl border border-white/[0.07] bg-[#090a10]/96 shadow-[0_25px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 ${
            libraryOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-[calc(100%+24px)] pointer-events-none opacity-0"
          }`}
        >
          <div className="border-b border-white/[0.055] px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-violet-300/70">
                  Ecosystem cards
                </p>

                <p className="mt-2 text-[7px] leading-4 text-slate-600">
                  Drag possibilities into the live ecosystem.
                </p>
              </div>

              <button
                type="button"
                data-control
                onClick={() =>
                  setLibraryOpen(false)
                }
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[14px] text-slate-600 transition hover:bg-white/[0.05] hover:text-white"
              >
                ×
              </button>
            </div>
          </div>

          <div className="h-[calc(100%-84px)] overflow-y-auto p-3">
            <div className="space-y-2">
              {SCENARIO_LAB_SUGGESTIONS.map(
                (card) => (
                  <ScenarioLabLibraryCard
                    key={card.id}
                    card={card}
                    onDragStart={(event) => {
                      scenarioLabSetDragData(
                        event.dataTransfer,
                        SCENARIO_LAB_NODE_DRAG,
                        card
                      );

                      setDraggingLabel(
                        card.label
                      );
                    }}
                  />
                )
              )}
            </div>

            <div className="mt-4 border-t border-white/[0.055] pt-4">
              <p className="mb-2 text-[6px] uppercase tracking-[0.16em] text-slate-600">
                Add your own
              </p>

              <div className="flex gap-2">
                <input
                  data-interactive
                  onPointerDown={(event) => event.stopPropagation()}
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={(event) => event.stopPropagation()}
                  value={customIdea}
                  onChange={(event) =>
                    setCustomIdea(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key ===
                        "Enter" &&
                      customIdea.trim()
                    ) {
                      event.preventDefault();
                      addCustomIdea();
                    }
                  }}
                  placeholder="Type an idea..."
                  className="min-w-0 flex-1 rounded-lg border border-white/[0.065] bg-white/[0.02] px-3 py-2.5 text-[8px] text-white outline-none placeholder:text-slate-700 focus:border-violet-300/25"
                />

                <button
                  type="button"
                  data-control
                  disabled={
                    !customIdea.trim()
                  }
                  onClick={
                    addCustomIdea
                  }
                  className="rounded-lg border border-violet-300/10 bg-violet-400/[0.06] px-3 text-violet-200 disabled:opacity-30"
                >
                  +
                </button>
              </div>

              {customIdea.trim() && (
                <div className="mt-2 rounded-xl border border-violet-400/15 bg-violet-400/[0.035] p-3">
                  <p className="truncate text-[8px] text-slate-200">
                    {customIdea}
                  </p>

                  <p className="mt-1 text-[6px] uppercase tracking-[0.12em] text-violet-300/50">
                    Press Enter or +
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {!libraryOpen && (
          <button
            type="button"
            data-control
            onClick={() =>
              setLibraryOpen(true)
            }
            className="absolute left-4 top-[84px] z-[140] rounded-xl border border-white/[0.07] bg-[#0b0c12]/95 px-3 py-2.5 text-[7px] uppercase tracking-[0.14em] text-slate-400 shadow-2xl backdrop-blur-xl"
          >
            Cards
          </button>
        )}

        {/* ====================================================
            RIGHT INSPECTOR

            IMPORTANT:
            This is NOT part of the graph world.
            It is a viewport overlay.
        ==================================================== */}

        {inspectorOpen && (
          <aside
            data-interactive
            className="absolute bottom-0 right-0 top-0 z-[300] w-[330px] max-w-[calc(100%-16px)] border-l border-white/[0.07] bg-[#090a10]/98 shadow-[-30px_0_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
          >
            {(selectedFriction ||
              selectedNode) && (
              <div className="flex h-full flex-col">
                {/* HEADER */}

                <div className="shrink-0 border-b border-white/[0.06] px-5 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[7px] uppercase tracking-[0.18em] text-violet-300/60">
                        {selectedFriction
                          ? "Friction intelligence"
                          : "Card intelligence"}
                      </p>

                      <h4 className="mt-2 truncate text-[17px] font-medium tracking-[-0.025em] text-white">
                        {selectedFriction
                          ? selectedFriction.title
                          : selectedNode?.label}
                      </h4>

                      <p className="mt-1.5 text-[7px] uppercase tracking-[0.14em] text-slate-600">
                        {selectedFriction
                          ? selectedFriction.type
                          : selectedNode?.sub}
                      </p>
                    </div>

                    <button
                      type="button"
                      data-control
                      aria-label="Close inspector"
                      onClick={() => {
                        setSelectedFrictionId(
                          null
                        );

                        setSelectedNodeId(
                          null
                        );

                        setInspectorOpen(
                          false
                        );
                      }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-[17px] text-slate-500 transition hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* BODY */}

                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
                  {/* ==================================================
                      FRICTION
                  ================================================== */}

                  {selectedFriction && (
                    <>
                      <div className="flex items-center justify-between rounded-xl border border-red-400/10 bg-red-400/[0.025] px-3.5 py-3">
                        <span className="text-[7px] uppercase tracking-[0.14em] text-slate-600">
                          Severity
                        </span>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[7px] ${
                            selectedFriction.severity ===
                            "High"
                              ? "bg-red-400/[0.10] text-red-300"
                              : selectedFriction.severity ===
                                "Medium"
                              ? "bg-amber-400/[0.10] text-amber-300"
                              : "bg-emerald-400/[0.10] text-emerald-300"
                          }`}
                        >
                          {
                            selectedFriction.severity
                          }
                        </span>
                      </div>

                      <div className="mt-6">
                        <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                          What is happening?
                        </p>

                        <p className="mt-2.5 text-[9px] leading-5 text-slate-300/65">
                          {
                            selectedFriction.description
                          }
                        </p>
                      </div>

                      <div className="mt-6">
                        <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                          Why it matters
                        </p>

                        <div className="mt-2.5 rounded-xl border border-white/[0.055] bg-white/[0.018] p-3.5">
                          <p className="text-[9px] leading-5 text-slate-300/65">
                            {
                              selectedFriction.impact
                            }
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                            Detection confidence
                          </p>

                          <span className="text-[9px] text-violet-300">
                            {
                              selectedFriction.confidence
                            }
                            %
                          </span>
                        </div>

                        <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
                            style={{
                              width: `${selectedFriction.confidence}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="mt-7">
                        <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-emerald-300/60">
                          Remove this friction
                        </p>

                        <p className="mt-2 text-[7px] text-slate-600">
                          Drag an intervention onto the canvas.
                        </p>

                        <div className="mt-3 space-y-2">
                          {selectedFriction.suggestions.map(
                            (remedy) => (
                              <div
                                key={
                                  remedy.id
                                }
                                draggable
                                onDragStart={(
                                  event
                                ) => {
                                  scenarioLabSetDragData(
                                    event.dataTransfer,
                                    SCENARIO_LAB_REMEDY_DRAG,
                                    remedy
                                  );

                                  setDraggingLabel(
                                    remedy.label
                                  );
                                }}
                                onDragEnd={() =>
                                  setDraggingLabel(
                                    null
                                  )
                                }
                                className="group cursor-grab rounded-xl border border-emerald-400/[0.11] bg-emerald-400/[0.025] p-3.5 transition hover:border-emerald-300/25 hover:bg-emerald-400/[0.05]"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-400/[0.06] text-[14px] text-emerald-300">
                                    {
                                      remedy.icon
                                    }
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <p className="text-[8px] font-medium text-slate-200">
                                      {
                                        remedy.label
                                      }
                                    </p>

                                    <p className="mt-1 text-[7px] text-slate-600">
                                      {
                                        remedy.sub
                                      }
                                    </p>
                                  </div>

                                  <span className="text-[12px] text-slate-700 group-hover:text-emerald-300/60">
                                    ⠿
                                  </span>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* ==================================================
                      NODE
                  ================================================== */}

                  {selectedNode && (
                    <>
                      <div className="rounded-xl border border-white/[0.055] bg-white/[0.018] p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl text-[15px]"
                            style={{
                              color:
                                selectedNode.color,
                              backgroundColor:
                                `${selectedNode.color}0d`,
                              border:
                                `1px solid ${selectedNode.color}25`,
                            }}
                          >
                            {
                              selectedNode.icon
                            }
                          </div>

                          <div>
                            <p className="text-[10px] text-white">
                              {
                                selectedNode.label
                              }
                            </p>

                            <p
                              className="mt-1 text-[6px] uppercase tracking-[0.14em]"
                              style={{
                                color:
                                  `${selectedNode.color}b0`,
                              }}
                            >
                              {
                                selectedNode.category
                              }
                            </p>
                          </div>
                        </div>

                        <p className="mt-4 text-[8px] leading-5 text-slate-400/65">
                          {
                            selectedNode.description ||
                            "This card represents an entity or opportunity within the current implementation ecosystem."
                          }
                        </p>
                      </div>

                      <div className="mt-6">
                        <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                          Role in pathway
                        </p>

                        <p className="mt-2.5 text-[9px] leading-5 text-slate-300/65">
                          {selectedNode.source ===
                          "remedy"
                            ? "Intervention introduced to reduce a detected implementation friction."
                            : selectedNode.source ===
                              "custom"
                            ? "User-defined concept introduced into the ecosystem for exploration."
                            : "Existing ecosystem entity contributing to the implementation pathway."}
                        </p>
                      </div>

                      <div className="mt-7">
                        <div className="flex items-center justify-between">
                          <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                            Connected relationships
                          </p>

                          <span className="text-[7px] text-violet-300/60">
                            {
                              state.edges.filter(
                                (edge) =>
                                  edge.from ===
                                    selectedNode.id ||
                                  edge.to ===
                                    selectedNode.id
                              ).length
                            }{" "}
                            links
                          </span>
                        </div>

                        <div className="mt-3 space-y-2">
                          {state.edges
                            .filter(
                              (edge) =>
                                edge.from ===
                                  selectedNode.id ||
                                edge.to ===
                                  selectedNode.id
                            )
                            .map(
                              (edge) => {
                                const otherId =
                                  edge.from ===
                                  selectedNode.id
                                    ? edge.to
                                    : edge.from;

                                const other =
                                  state.nodes.find(
                                    (node) =>
                                      node.id ===
                                      otherId
                                  );

                                if (!other) {
                                  return null;
                                }

                                const friction =
                                  state.frictions.find(
                                    (item) =>
                                      item.edgeId ===
                                      edge.id
                                  );

                                return (
                                  <button
                                    key={
                                      edge.id
                                    }
                                    type="button"
                                    data-interactive
                                    onClick={() => {
                                      if (
                                        friction
                                      ) {
                                        selectFriction(
                                          friction.id
                                        );
                                      }
                                    }}
                                    className="w-full rounded-xl border border-white/[0.055] bg-white/[0.018] p-3 text-left transition hover:border-white/[0.12]"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <div
                                        className="h-2 w-2 rounded-full"
                                        style={{
                                          backgroundColor:
                                            edge.color,
                                          boxShadow: `0 0 10px ${edge.color}`,
                                        }}
                                      />

                                      <div className="min-w-0 flex-1">
                                        <p className="truncate text-[8px] text-slate-200">
                                          {
                                            other.label
                                          }
                                        </p>

                                        <p className="mt-1 text-[6px] uppercase tracking-[0.1em] text-slate-600">
                                          {
                                            edge.relationship
                                          }
                                        </p>
                                      </div>

                                      <span className="text-[8px] text-violet-300">
                                        {
                                          edge.confidence
                                        }
                                        %
                                      </span>
                                    </div>

                                    <div className="mt-3 h-px bg-white/[0.045]" />

                                    <p className="mt-2 text-[7px] leading-4 text-slate-600">
                                      {
                                        edge.role
                                      }
                                    </p>

                                    {friction && (
                                      <p className="mt-2 text-[6px] uppercase tracking-[0.1em] text-red-300/60">
                                        Friction detected · click to inspect
                                      </p>
                                    )}
                                  </button>
                                );
                              }
                            )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </aside>
        )}

        {!inspectorOpen && (
          <button
            type="button"
            data-control
            onClick={() =>
              setInspectorOpen(true)
            }
            className="absolute right-4 top-[84px] z-[140] rounded-xl border border-white/[0.07] bg-[#0b0c12]/95 px-3 py-2.5 text-[7px] uppercase tracking-[0.14em] text-slate-400 shadow-2xl backdrop-blur-xl"
          >
            Details
          </button>
        )}

        {/* ====================================================
            BOTTOM STATUS
            NO ZOOM CONTROLS
        ==================================================== */}

        {!selectedFriction &&
          !selectedNode && (
            <div className="absolute bottom-5 left-1/2 z-40 hidden -translate-x-1/2 rounded-full border border-white/[0.055] bg-[#0a0b11]/80 px-4 py-2.5 text-[7px] uppercase tracking-[0.15em] text-slate-600 backdrop-blur-xl sm:block">
              Drag canvas · Select a card or friction
            </div>
          )}

        <div className="absolute bottom-4 left-1/2 z-40 hidden -translate-x-1/2 sm:block">
          <div className="flex items-center gap-4 rounded-full border border-white/[0.055] bg-black/35 px-4 py-2.5 text-[6px] uppercase tracking-[0.14em] text-slate-600 backdrop-blur-xl">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
              Connection
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.7)]" />
              Friction
            </span>

            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Intervention
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
// ============================================================
// SCREEN 3
// LIVE PATHWAY / IMPLEMENTATION INTELLIGENCE
// ============================================================
function ScenarioLabPathwayScreen({
  state,
  onBackToBuilder,
}: {
  state: ScenarioLabState;
  onBackToBuilder: () => void;
}) {
  const [selectedNodeId, setSelectedNodeId] =
    useState<string | null>(null);

  const [selectedEdgeId, setSelectedEdgeId] =
    useState<string | null>(null);

  const [inspectorOpen, setInspectorOpen] =
    useState(false);

  /*
   * No zoom.
   * The pathway is a pannable world.
   */
  const [pan, setPan] = useState({
    x: 0,
    y: 0,
  });

  const [isPanning, setIsPanning] =
    useState(false);

  const panStartRef =
    React.useRef({
      x: 0,
      y: 0,
    });

  const panOriginRef =
    React.useRef({
      x: 0,
      y: 0,
    });

  const pathwayWorldRef =
    React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const world =
      pathwayWorldRef.current;

    if (!world) return;

    const clampPanToGraph = () => {
      const bounds =
        scenarioLabGetPanBounds(
          state.nodes,
          world.clientWidth,
          world.clientHeight
        );

      setPan((current) => {
        const x = scenarioLabClamp(
          current.x,
          Math.min(bounds.minX, bounds.maxX),
          Math.max(bounds.minX, bounds.maxX)
        );

        const y = scenarioLabClamp(
          current.y,
          Math.min(bounds.minY, bounds.maxY),
          Math.max(bounds.minY, bounds.maxY)
        );

        if (
          x === current.x &&
          y === current.y
        ) {
          return current;
        }

        return { x, y };
      });
    };

    clampPanToGraph();

    const observer =
      typeof ResizeObserver !==
      "undefined"
        ? new ResizeObserver(
            clampPanToGraph
          )
        : null;

    observer?.observe(world);

    return () => {
      observer?.disconnect();
    };
  }, [
    inspectorOpen,
    state.nodes.length,
  ]);

  const selectedNode =
    state.nodes.find(
      (node) =>
        node.id ===
        selectedNodeId
    );

  const selectedEdge =
    state.edges.find(
      (edge) =>
        edge.id ===
        selectedEdgeId
    );

  // ==========================================================
  // SCORE
  // ==========================================================

  const score = useMemo(() => {
    if (!state.edges.length) {
      return 0;
    }

    const averageConfidence =
      state.edges.reduce(
        (sum, edge) =>
          sum +
          edge.confidence,
        0
      ) /
      state.edges.length;

    const frictionPenalty =
      state.frictions.reduce(
        (sum, friction) => {
          if (
            friction.severity ===
            "High"
          ) {
            return sum + 12;
          }

          if (
            friction.severity ===
            "Medium"
          ) {
            return sum + 7;
          }

          return sum + 3;
        },
        0
      );

    const graphBonus =
      Math.min(
        12,
        state.nodes.length *
          0.75
      );

    return Math.round(
      scenarioLabClamp(
        averageConfidence +
          graphBonus -
          frictionPenalty,
        0,
        100
      )
    );
  }, [state]);

  const scoreLabel =
    score >= 80
      ? "Strong pathway"
      : score >= 60
      ? "Developing pathway"
      : "Early-stage pathway";

  // ==========================================================
  // PAN
  // ==========================================================

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (event.button !== 0) {
      return;
    }

    const target =
      event.target as HTMLElement;

    if (
      target.closest(
        "button, input, textarea, select, [data-interactive], [data-control]"
      )
    ) {
      return;
    }

    setIsPanning(true);

    panStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    panOriginRef.current = {
      x: pan.x,
      y: pan.y,
    };

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isPanning) {
      return;
    }

    const world = pathwayWorldRef.current;

    const bounds = scenarioLabGetPanBounds(
      state.nodes,
      world?.clientWidth ?? 0,
      world?.clientHeight ?? 0
    );

    setPan({
      x: scenarioLabClamp(
        panOriginRef.current.x +
          (event.clientX - panStartRef.current.x),
        Math.min(bounds.minX, bounds.maxX),
        Math.max(bounds.minX, bounds.maxX)
      ),
      y: scenarioLabClamp(
        panOriginRef.current.y +
          (event.clientY - panStartRef.current.y),
        Math.min(bounds.minY, bounds.maxY),
        Math.max(bounds.minY, bounds.maxY)
      ),
    });
  };

  const stopPanning = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isPanning) {
      return;
    }

    setIsPanning(false);

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    } catch {
      // Already released.
    }
  };

  return (
    <div
      className={`relative h-full min-h-[600px] overflow-hidden bg-[#07080d] ${
        isPanning
          ? "cursor-grabbing"
          : "cursor-grab"
      }`}
      onPointerDown={
        handlePointerDown
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerUp={
        stopPanning
      }
      onPointerCancel={
        stopPanning
      }
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="absolute left-4 right-4 top-4 z-[200] flex items-start justify-between gap-3 sm:left-6 sm:right-6 sm:top-5">
        <div className="min-w-0 max-w-[600px]">
          <p className="text-[8px] uppercase tracking-[0.2em] text-violet-300/65">
            Implementation intelligence
          </p>

          <p className="mt-1 truncate text-[8px] text-slate-300/65 sm:text-[10px]">
            {state.question}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden rounded-full border border-white/[0.06] bg-white/[0.025] px-3 py-1.5 text-[7px] text-slate-500 sm:block">
            {state.nodes.length} nodes
          </div>

          <div className="hidden rounded-full border border-red-400/10 bg-red-400/[0.025] px-3 py-1.5 text-[7px] text-red-300/70 sm:block">
            {state.frictions.length} open
          </div>

          <button
            type="button"
            data-control
            onClick={
              onBackToBuilder
            }
            className="rounded-full border border-violet-300/10 bg-violet-400/[0.05] px-3 py-1.5 text-[7px] text-violet-200 transition hover:bg-violet-400/[0.10]"
          >
            Edit
          </button>
        </div>
      </div>

      {/* ======================================================
          LARGE PANNABLE WORLD
      ====================================================== */}

      <div
        ref={pathwayWorldRef}
        className="absolute inset-y-0 left-0 overflow-visible"
        style={{
          right: inspectorOpen
            ? "346px"
            : "0px",
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0)`,
        }}
      >
        {/* ====================================================
            SCORE CORE
        ==================================================== */}

        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex h-[175px] w-[175px] items-center justify-center rounded-full border border-violet-300/[0.08] bg-violet-400/[0.018] shadow-[0_0_100px_rgba(139,92,246,0.08)]">
            <div className="absolute inset-3 rounded-full border border-white/[0.035]" />

            <div className="text-center">
              <p className="text-[7px] uppercase tracking-[0.2em] text-slate-600">
                Real-world
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.15em] text-violet-300/60">
                implementation
              </p>

              <p className="mt-2 text-5xl font-light tracking-[-0.06em] text-white">
                {score}
              </p>

              <p className="mt-1 text-[7px] uppercase tracking-[0.14em] text-slate-600">
                {scoreLabel}
              </p>
            </div>

            <svg className="pointer-events-none absolute inset-0 h-full w-full -rotate-90">
              <circle
                cx="87.5"
                cy="87.5"
                r="78"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
              />

              <circle
                cx="87.5"
                cy="87.5"
                r="78"
                fill="none"
                stroke="#a78bfa"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray={`${score * 4.9} 490`}
                opacity="0.8"
              />
            </svg>
          </div>
        </div>

        {/* ====================================================
            CONNECTIONS
        ==================================================== */}

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <filter
              id="pathwayGlowNoZoom"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur
                stdDeviation="0.3"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {state.edges.map(
            (edge) => {
              const from =
                state.nodes.find(
                  (node) =>
                    node.id ===
                    edge.from
                );

              const to =
                state.nodes.find(
                  (node) =>
                    node.id ===
                    edge.to
                );

              if (!from || !to) {
                return null;
              }

              const curve =
                scenarioLabGetCurve(
                  from,
                  to
                );

              const selected =
                selectedEdgeId ===
                edge.id;

              return (
                <g key={edge.id}>
                  <path
                    d={curve.d}
                    fill="none"
                    stroke={edge.color}
                    strokeWidth={
                      selected ? "0.7" : "0.42"
                    }
                    opacity={
                      selected
                        ? "0.18"
                        : "0.07"
                    }
                    filter="url(#pathwayGlowNoZoom)"
                  />

                  <path
                    d={curve.d}
                    fill="none"
                    stroke={
                      selected
                        ? "#ffffff"
                        : edge.color
                    }
                    strokeWidth={
                      selected ? "0.58" : "0.24"
                    }
                    opacity={
                      selected
                        ? "0.82"
                        : "0.35"
                    }
                    strokeLinecap="round"
                  />

                  <path
                    d={curve.d}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="3"
                    pointerEvents="stroke"
                    className="cursor-pointer"
                    onClick={(event) => {
                      event.stopPropagation();

                      setSelectedEdgeId(
                        edge.id
                      );

                      setSelectedNodeId(
                        null
                      );

                      setInspectorOpen(
                        true
                      );
                    }}
                  />
                </g>
              );
            }
          )}
        </svg>

        {/* ====================================================
            NODES
        ==================================================== */}

        {state.nodes.map(
          (node) => {
            const selected =
              selectedNodeId ===
              node.id;

            return (
              <button
                key={node.id}
                type="button"
                data-interactive
                onClick={(event) => {
                  event.stopPropagation();

                  setSelectedNodeId(
                    node.id
                  );

                  setSelectedEdgeId(
                    null
                  );

                  setInspectorOpen(
                    true
                  );
                }}
                className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 rounded-[16px] border px-3.5 py-2.75 backdrop-blur-xl transition-all ${
                  selected
                    ? "scale-105 border-white/[0.2] bg-[#12131b] shadow-[0_0_40px_rgba(139,92,246,0.16)]"
                    : "border-white/[0.06] bg-[#101119]/94 shadow-[0_15px_40px_rgba(0,0,0,0.35)] hover:border-white/[0.13]"
                }`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  minWidth: "145px",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[13px]"
                    style={{
                      color:
                        node.color,
                      backgroundColor:
                        `${node.color}0d`,
                      border:
                        `1px solid ${node.color}22`,
                    }}
                  >
                    {node.icon}
                  </div>

                  <div className="min-w-0 text-left">
                    <p className="truncate text-[9px] font-medium text-slate-100">
                      {node.label}
                    </p>

                    <p
                      className="mt-1 text-[6px] uppercase tracking-[0.11em]"
                      style={{
                        color:
                          `${node.color}aa`,
                      }}
                    >
                      {node.sub}
                    </p>
                  </div>
                </div>
              </button>
            );
          }
        )}
      </div>

      {/* ======================================================
          RIGHT INTELLIGENCE SIDEBAR
          Viewport overlay, NOT part of graph world.
      ====================================================== */}

      {inspectorOpen && (
        <aside
          data-interactive
          className="absolute bottom-0 right-0 top-0 z-[300] w-[340px] max-w-[calc(100%-16px)] border-l border-white/[0.07] bg-[#090a10]/98 shadow-[-30px_0_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
        >
          <div className="flex h-full flex-col">
            {/* HEADER */}

            <div className="shrink-0 border-b border-white/[0.06] px-5 py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[7px] uppercase tracking-[0.18em] text-violet-300/60">
                    Intelligence layer
                  </p>

                  <p className="mt-2 truncate text-[15px] font-medium text-white">
                    {selectedNode
                      ? selectedNode.label
                      : selectedEdge
                      ? selectedEdge.relationship
                      : "Pathway evidence"}
                  </p>
                </div>

                <button
                  type="button"
                  data-control
                  aria-label="Close intelligence panel"
                  onClick={() => {
                    setInspectorOpen(
                      false
                    );

                    setSelectedNodeId(
                      null
                    );

                    setSelectedEdgeId(
                      null
                    );
                  }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] text-[17px] text-slate-500 transition hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white"
                >
                  ×
                </button>
              </div>

              <p className="mt-1.5 text-[7px] leading-4 text-slate-600">
                {selectedNode
                  ? "Connection map and role within the ecosystem."
                  : selectedEdge
                  ? "Evidence and confidence behind this relationship."
                  : "A live interpretation of the current ecosystem."}
              </p>
            </div>

            {/* BODY */}

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
              {/* ==================================================
                  DEFAULT
              ================================================== */}

              {!selectedNode &&
                !selectedEdge && (
                  <>
                    <div className="rounded-2xl border border-violet-300/10 bg-violet-400/[0.025] p-4">
                      <p className="text-[7px] uppercase tracking-[0.16em] text-violet-300/60">
                        Real-world implementation score
                      </p>

                      <div className="mt-3 flex items-end gap-2">
                        <span className="text-4xl font-light text-white">
                          {score}
                        </span>

                        <span className="pb-1 text-[8px] text-slate-600">
                          / 100
                        </span>
                      </div>

                      <div className="mt-4 h-1 rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
                          style={{
                            width: `${score}%`,
                          }}
                        />
                      </div>

                      <p className="mt-3 text-[8px] leading-5 text-slate-400/60">
                        The score reflects connection confidence,
                        ecosystem completeness and unresolved friction.
                      </p>
                    </div>

                    <div className="mt-7">
                      <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                        Evidence coverage
                      </p>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="rounded-xl border border-white/[0.055] bg-white/[0.018] p-3">
                          <p className="text-[6px] uppercase tracking-[0.12em] text-slate-600">
                            Connections
                          </p>

                          <p className="mt-2 text-[14px] text-white">
                            {
                              state.edges.length
                            }
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/[0.055] bg-white/[0.018] p-3">
                          <p className="text-[6px] uppercase tracking-[0.12em] text-slate-600">
                            Evidence links
                          </p>

                          <p className="mt-2 text-[14px] text-white">
                            {
                              state.edges.filter(
                                (edge) =>
                                  edge.evidence
                                    .length >
                                  0
                              ).length
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-7">
                      <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                        Open implementation gaps
                      </p>

                      <div className="mt-3 space-y-2">
                        {state.frictions.map(
                          (friction) => (
                            <button
                              key={
                                friction.id
                              }
                              type="button"
                              data-interactive
                              onClick={() => {
                                setSelectedEdgeId(
                                  friction.edgeId
                                );

                                setSelectedNodeId(
                                  null
                                );
                              }}
                              className="w-full rounded-xl border border-red-400/[0.08] bg-red-400/[0.018] p-3 text-left transition hover:border-red-300/20"
                            >
                              <div className="flex items-center justify-between">
                                <p className="text-[8px] text-slate-300">
                                  {
                                    friction.title
                                  }
                                </p>

                                <span className="text-[6px] uppercase text-red-300/60">
                                  {
                                    friction.severity
                                  }
                                </span>
                              </div>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </>
                )}

              {/* ==================================================
                  NODE
              ================================================== */}

              {selectedNode && (
                <>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.018] p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-[15px]"
                        style={{
                          color:
                            selectedNode.color,
                          backgroundColor:
                            `${selectedNode.color}0d`,
                          border:
                            `1px solid ${selectedNode.color}22`,
                        }}
                      >
                        {
                          selectedNode.icon
                        }
                      </div>

                      <div>
                        <p className="text-[10px] text-white">
                          {
                            selectedNode.label
                          }
                        </p>

                        <p className="mt-1 text-[6px] uppercase tracking-[0.13em] text-slate-600">
                          {
                            selectedNode.category
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-7">
                    <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Role in canvas
                    </p>

                    <p className="mt-2.5 text-[9px] leading-5 text-slate-300/65">
                      {
                        selectedNode.description ||
                        "This card contributes a distinct role to the implementation ecosystem."
                      }
                    </p>
                  </div>

                  <div className="mt-7">
                    <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Connections
                    </p>

                    <div className="mt-3 space-y-2">
                      {state.edges
                        .filter(
                          (edge) =>
                            edge.from ===
                              selectedNode.id ||
                            edge.to ===
                              selectedNode.id
                        )
                        .map(
                          (edge) => {
                            const otherId =
                              edge.from ===
                              selectedNode.id
                                ? edge.to
                                : edge.from;

                            const other =
                              state.nodes.find(
                                (node) =>
                                  node.id ===
                                  otherId
                              );

                            if (!other) {
                              return null;
                            }

                            return (
                              <button
                                key={
                                  edge.id
                                }
                                type="button"
                                data-interactive
                                onClick={() => {
                                  setSelectedEdgeId(
                                    edge.id
                                  );

                                  setSelectedNodeId(
                                    null
                                  );
                                }}
                                className="w-full rounded-xl border border-white/[0.055] bg-white/[0.018] p-3 text-left transition hover:border-white/[0.12]"
                              >
                                <div className="flex items-center justify-between">
                                  <p className="text-[8px] text-slate-200">
                                    {
                                      other.label
                                    }
                                  </p>

                                  <span className="text-[8px] text-violet-300">
                                    {
                                      edge.confidence
                                    }
                                    %
                                  </span>
                                </div>

                                <p className="mt-1 text-[6px] uppercase tracking-[0.1em] text-slate-600">
                                  {
                                    edge.relationship
                                  }
                                </p>

                                <p className="mt-2 text-[7px] leading-4 text-slate-600">
                                  {
                                    edge.role
                                  }
                                </p>
                              </button>
                            );
                          }
                        )}
                    </div>
                  </div>
                </>
              )}

              {/* ==================================================
                  EDGE
              ================================================== */}

              {selectedEdge && (
                <>
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.018] p-4">
                    <p className="text-[7px] uppercase tracking-[0.15em] text-violet-300/60">
                      Connection confidence
                    </p>

                    <div className="mt-3 flex items-end gap-2">
                      <span className="text-4xl font-light text-white">
                        {
                          selectedEdge.confidence
                        }
                      </span>

                      <span className="pb-1 text-[8px] text-slate-600">
                        %
                      </span>
                    </div>

                    <div className="mt-4 h-1 rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-violet-400"
                        style={{
                          width: `${selectedEdge.confidence}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-7">
                    <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Role of this connection
                    </p>

                    <p className="mt-2.5 text-[9px] leading-5 text-slate-300/65">
                      {
                        selectedEdge.role
                      }
                    </p>
                  </div>

                  <div className="mt-7">
                    <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                      Evidence supporting relationship
                    </p>

                    <div className="mt-3 space-y-2">
                      {selectedEdge.evidence.map(
                        (
                          evidence,
                          index
                        ) => (
                          <div
                            key={`${evidence.title}-${index}`}
                            className="rounded-xl border border-white/[0.055] bg-white/[0.018] p-3.5"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-[8px] font-medium text-slate-200">
                                {
                                  evidence.title
                                }
                              </p>

                              <span className="shrink-0 rounded-full bg-violet-400/10 px-2 py-1 text-[5px] uppercase tracking-[0.1em] text-violet-300">
                                {
                                  evidence.strength
                                }
                              </span>
                            </div>

                            <p className="mt-1 text-[6px] uppercase tracking-[0.1em] text-slate-700">
                              {
                                evidence.source
                              }
                            </p>

                            <p className="mt-3 text-[7px] leading-5 text-slate-500">
                              {
                                evidence.supports
                              }
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>
      )}

      {!inspectorOpen && (
        <button
          type="button"
          data-control
          onClick={() =>
            setInspectorOpen(true)
          }
          className="absolute right-4 top-[84px] z-[140] rounded-xl border border-white/[0.07] bg-[#0b0c12]/95 px-3 py-2.5 text-[7px] uppercase tracking-[0.14em] text-slate-400 shadow-2xl backdrop-blur-xl"
        >
          Intelligence
        </button>
      )}

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <div className="absolute bottom-4 left-1/2 z-40 hidden -translate-x-1/2 rounded-full border border-white/[0.055] bg-black/40 px-4 py-2.5 text-[7px] uppercase tracking-[0.16em] text-slate-700 backdrop-blur-xl sm:block">
        Drag canvas · Click anything to inspect
      </div>
    </div>
  );
}
// ============================================================
// MAIN SCENARIO LAB
// ============================================================

function ScenarioLabSection() {
  const [scenarioScreen, setScenarioScreen] =
    useState(0);

  const [scenarioState, setScenarioState] =
    useState<ScenarioLabState>(
      createInitialScenarioState()
    );

  const [question, setQuestion] =
    useState(
      scenarioState.question
    );

  const nextScenarioScreen = () => {
    setScenarioScreen(
      (current) =>
        (current + 1) % 3
    );
  };

  const enterScenario = () => {
    const cleanQuestion =
      question.trim() ||
      "What if we explore a new implementation pathway?";

    setScenarioState(
      (current) => ({
        ...current,
        question:
          cleanQuestion,
      })
    );

    setScenarioScreen(1);
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[18%] top-[8%] h-[420px] w-[420px] rounded-full bg-violet-500/[0.025] blur-[130px]" />

        <div className="absolute bottom-[10%] right-[8%] h-[360px] w-[360px] rounded-full bg-fuchsia-500/[0.018] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* ====================================================
            HEADING
        ==================================================== */}

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-gradient-to-r from-transparent via-violet-400/60 to-fuchsia-400/20" />

            <p className="text-[10px] uppercase tracking-[0.24em] text-violet-300/80">
              Scenario Lab
            </p>

            <span className="h-px w-7 bg-gradient-to-r from-fuchsia-400/20 via-violet-400/60 to-transparent" />
          </div>

          <h2
            className="text-[2.45rem] font-normal leading-[1.04] tracking-[-0.05em] text-white sm:text-5xl lg:text-[4.1rem]"
            style={{
              fontFamily:
                "'Fraunces', Georgia, serif",
            }}
          >
            Ask better questions,
            <br />

            <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
              see what changes.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-300/60 sm:text-[15px]">
            Turn a hypothesis into a living implementation
            pathway. Explore opportunities, expose friction,
            and trace the evidence behind every connection.
          </p>
        </div>

        {/* ====================================================
            PRODUCT FRAME
        ==================================================== */}

        <div className="mt-14 sm:mt-16">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-8 rounded-[40px] bg-violet-500/[0.018] blur-3xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#07080d] shadow-[0_45px_140px_rgba(0,0,0,0.58)]">
              {/* TOP APPLICATION BAR */}

              <div className="relative z-[300] flex h-[54px] items-center justify-between border-b border-white/[0.06] bg-[#0a0b11] px-5 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-400/20 to-fuchsia-400/10">
                    <span className="text-[12px] text-violet-200">
                      ✦
                    </span>
                  </div>

                  <div>
                    <p className="text-[9px] font-medium tracking-[0.1em] text-slate-200">
                      EPIPHONIX
                    </p>

                    <p className="hidden text-[6px] uppercase tracking-[0.16em] text-slate-600 sm:block">
                      Mapping the Galaxy of Real-World Impact
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 sm:flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />

                    <span className="text-[7px] uppercase tracking-[0.14em] text-slate-500">
                      Intelligence active
                    </span>
                  </div>

                  <div className="h-6 w-6 rounded-full border border-white/[0.08] bg-white/[0.035]" />
                </div>
              </div>

              {/* ==================================================
                  RESPONSIVE APPLICATION VIEWPORT
              ================================================== */}

              <div className="relative h-[min(760px,calc(100vh-120px))] min-h-[600px] overflow-hidden sm:h-[680px]">
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    scenarioScreen === 0
                      ? "translate-x-0 opacity-100"
                      : "pointer-events-none translate-x-4 opacity-0"
                  }`}
                >
                  <ScenarioLabQuestionScreen
                    question={question}
                    onQuestionChange={
                      setQuestion
                    }
                    onEnter={
                      enterScenario
                    }
                  />
                </div>

                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    scenarioScreen === 1
                      ? "translate-x-0 opacity-100"
                      : "pointer-events-none translate-x-4 opacity-0"
                  }`}
                >
                  <ScenarioLabBuilderScreen
                    state={
                      scenarioState
                    }
                    setState={
                      setScenarioState
                    }
                  />
                </div>

                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    scenarioScreen === 2
                      ? "translate-x-0 opacity-100"
                      : "pointer-events-none translate-x-4 opacity-0"
                  }`}
                >
                  <ScenarioLabPathwayScreen
                    state={
                      scenarioState
                    }
                    onBackToBuilder={() =>
                      setScenarioScreen(
                        1
                      )
                    }
                  />
                </div>

                {/* ==================================================
                    NAVIGATION
                ================================================== */}

                <div className="pointer-events-none absolute bottom-4 left-1/2 z-[280] -translate-x-1/2">
                  <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/[0.08] bg-[#090a10]/90 p-1.5 shadow-2xl backdrop-blur-2xl">
                    {[0, 1, 2].map(
                      (index) => (
                        <button
                          key={
                            index
                          }
                          type="button"
                          aria-label={`Show Scenario Lab screen ${
                            index +
                            1
                          }`}
                          onClick={() =>
                            setScenarioScreen(
                              index
                            )
                          }
                          className={`flex h-7 w-7 items-center justify-center rounded-full transition-all ${
                            scenarioScreen ===
                            index
                              ? "bg-white/[0.1]"
                              : "hover:bg-white/[0.05]"
                          }`}
                        >
                          <span
                            className={`rounded-full ${
                              scenarioScreen ===
                              index
                                ? "h-2 w-2 bg-violet-300 shadow-[0_0_12px_rgba(196,181,253,0.8)]"
                                : "h-1.5 w-1.5 bg-white/20"
                            }`}
                          />
                        </button>
                      )
                    )}

                    <div className="mx-1 h-4 w-px bg-white/[0.08]" />

                    <button
                      type="button"
                      aria-label="Next Scenario Lab screen"
                      onClick={
                        nextScenarioScreen
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.055] text-slate-300 transition hover:bg-white/[0.1] hover:text-white"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP LABEL */}

            <div className="mt-5 flex items-center justify-center gap-3">
              <span className="text-[8px] uppercase tracking-[0.18em] text-slate-600">
                {scenarioScreen ===
                0
                  ? "01 · Ask"
                  : scenarioScreen ===
                    1
                  ? "02 · Explore"
                  : "03 · Understand"}
              </span>

              <span className="h-px w-8 bg-white/[0.08]" />

              <span className="hidden text-[8px] uppercase tracking-[0.18em] text-slate-600 sm:inline">
                {scenarioScreen ===
                0
                  ? "Begin with a hypothesis"
                  : scenarioScreen ===
                    1
                  ? "Build the ecosystem"
                  : "Trace evidence → implementation"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// END
// ============================================================
type Opportunity = {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  country: string;
  match: number;
  tags: string[];
  icon: "leaf" | "research" | "industry" | "policy";
  highlights: string[];
  reason: string;
};

type OpportunityIconProps = {
  type: Opportunity["icon"];
  size?: number;
};

const OPPORTUNITY_DATA: Opportunity[] = [
  {
    id: 1,
    title: "Environmental NGOs",
    category: "Non-profit",
    description:
      "Environmental organizations working on plastic pollution, marine conservation and waste management.",
    location: "Dhaka, Bangladesh",
    country: "Bangladesh",
    match: 98,
    tags: ["Plastic pollution", "Conservation", "Partnerships"],
    icon: "leaf",
    highlights: [
      "Potential field research partnerships",
      "Access to local environmental networks",
      "Opportunities for pilot projects",
    ],
    reason:
      "Your solution's focus on plastic pollution aligns with organizations working on conservation, waste reduction and environmental restoration.",
  },
  {
    id: 2,
    title: "Research Institutions",
    category: "Research",
    description:
      "Universities and research centers supporting validation, scientific collaboration and technology development.",
    location: "Global network",
    country: "United States",
    match: 94,
    tags: ["Research", "Validation", "Universities"],
    icon: "research",
    highlights: [
      "Scientific validation opportunities",
      "Potential access to research expertise",
      "Collaborative pilot studies",
    ],
    reason:
      "Research institutions could help evaluate your solution, strengthen its evidence base and identify opportunities for further development.",
  },
  {
    id: 3,
    title: "Plastic Manufacturers",
    category: "Industry",
    description:
      "Manufacturers exploring material innovation, circular production and sustainable plastic alternatives.",
    location: "Singapore",
    country: "Singapore",
    match: 91,
    tags: ["Materials", "Manufacturing", "Circularity"],
    icon: "industry",
    highlights: [
      "Material testing opportunities",
      "Industry feedback on feasibility",
      "Potential implementation partners",
    ],
    reason:
      "Manufacturers can provide practical insight into material availability, production constraints and potential routes to adoption.",
  },
  {
    id: 4,
    title: "Government & Policymakers",
    category: "Government",
    description:
      "Public institutions working on environmental regulation, waste management policy and sustainability initiatives.",
    location: "Paris, France",
    country: "France",
    match: 88,
    tags: ["Policy", "Regulation", "Public impact"],
    icon: "policy",
    highlights: [
      "Policy and regulatory insights",
      "Connections to public initiatives",
      "Potential routes to broader adoption",
    ],
    reason:
      "Public-sector stakeholders could help clarify regulatory requirements and identify how your solution fits existing environmental initiatives.",
  },
  {
    id: 5,
    title: "Circular Economy Labs",
    category: "Research",
    description:
      "Innovation labs developing new approaches to circular materials, recycling and resource recovery.",
    location: "Amsterdam, Netherlands",
    country: "Netherlands",
    match: 87,
    tags: ["Circular economy", "Innovation", "Materials"],
    icon: "research",
    highlights: [
      "Access to circularity expertise",
      "Potential technology pilots",
      "Cross-sector innovation programs",
    ],
    reason:
      "Circular economy labs provide an environment for testing whether your solution can move beyond research toward measurable implementation.",
  },
  {
    id: 6,
    title: "Sustainable Materials Startups",
    category: "Industry",
    description:
      "Early-stage companies developing alternatives to conventional plastics and next-generation materials.",
    location: "Seoul, South Korea",
    country: "South Korea",
    match: 84,
    tags: ["Startups", "Materials", "Innovation"],
    icon: "industry",
    highlights: [
      "Potential technology partnerships",
      "Access to emerging material ecosystems",
      "Startup collaboration opportunities",
    ],
    reason:
      "Material-focused startups could become early adopters or technical partners for translating your research into deployable solutions.",
  },
  {
    id: 7,
    title: "Ocean Conservation Networks",
    category: "Non-profit",
    description:
      "International networks focused on marine debris, ocean health and ecosystem restoration.",
    location: "Sydney, Australia",
    country: "Australia",
    match: 82,
    tags: ["Marine", "Ocean health", "Fieldwork"],
    icon: "leaf",
    highlights: [
      "Marine field validation",
      "Environmental monitoring networks",
      "Potential demonstration sites",
    ],
    reason:
      "Ocean-focused organizations can provide real-world environments for testing plastic monitoring and intervention approaches.",
  },
  {
    id: 8,
    title: "Materials Science Universities",
    category: "Research",
    description:
      "Academic groups studying polymers, advanced materials, degradation and sustainable manufacturing.",
    location: "Cambridge, United Kingdom",
    country: "United Kingdom",
    match: 81,
    tags: ["Polymers", "Materials science", "Research"],
    icon: "research",
    highlights: [
      "Polymer research collaboration",
      "Specialized laboratory expertise",
      "Potential joint publications",
    ],
    reason:
      "Materials science researchers could strengthen the scientific foundation behind your solution and help validate technical assumptions.",
  },
  {
    id: 9,
    title: "Waste Innovation Programs",
    category: "Government",
    description:
      "Public programs supporting waste reduction, recycling infrastructure and environmental technology adoption.",
    location: "Tokyo, Japan",
    country: "Japan",
    match: 79,
    tags: ["Waste", "Infrastructure", "Innovation"],
    icon: "policy",
    highlights: [
      "Public infrastructure insights",
      "Potential pilot programs",
      "Government innovation pathways",
    ],
    reason:
      "Waste innovation programs can help identify where new technologies could integrate with existing collection and recycling systems.",
  },
  {
    id: 10,
    title: "Climate Technology Investors",
    category: "Industry",
    description:
      "Investment groups supporting climate, circular economy and environmental technology ventures.",
    location: "San Francisco, United States",
    country: "United States",
    match: 76,
    tags: ["Climate tech", "Investment", "Scale"],
    icon: "industry",
    highlights: [
      "Potential funding pathways",
      "Climate technology networks",
      "Scale-up expertise",
    ],
    reason:
      "Climate-focused investors may provide insight into commercialization pathways, market readiness and scaling requirements.",
  },
  {
    id: 11,
    title: "Plastic Policy Institutes",
    category: "Government",
    description:
      "Policy organizations studying plastic regulation, extended producer responsibility and circular economy frameworks.",
    location: "Berlin, Germany",
    country: "Germany",
    match: 74,
    tags: ["Policy", "EPR", "Circularity"],
    icon: "policy",
    highlights: [
      "Regulatory research",
      "Policy ecosystem access",
      "Circular economy expertise",
    ],
    reason:
      "Policy institutes can help map regulatory environments and understand how emerging solutions interact with plastic policy frameworks.",
  },
  {
    id: 12,
    title: "Environmental Technology Labs",
    category: "Research",
    description:
      "Applied research groups developing sensing, monitoring and environmental intelligence technologies.",
    location: "Toronto, Canada",
    country: "Canada",
    match: 72,
    tags: ["Sensors", "Monitoring", "AI"],
    icon: "research",
    highlights: [
      "Sensor technology collaboration",
      "Environmental data expertise",
      "Applied AI research",
    ],
    reason:
      "Environmental technology labs could complement the intelligence layer with sensing, monitoring and data-analysis capabilities.",
  },
];

function OpportunityIcon({
  type,
  size = 20,
}: OpportunityIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (type) {
    case "leaf":
      return (
        <svg {...common}>
          <path d="M20 4C11 4 5 7 5 14a6 6 0 0 0 6 6c7 0 9-8 9-16Z" />
          <path d="M3 21c4-6 8-9 14-13" />
        </svg>
      );

    case "research":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 4.5 4.5" />
          <path d="M8 10.5h5M10.5 8v5" />
        </svg>
      );

    case "industry":
      return (
        <svg {...common}>
          <path d="M3 21V9l6 4V9l6 4V5h5v16Z" />
          <path d="M7 17h1M12 17h1M17 17h1M17 9h1" />
        </svg>
      );

    case "policy":
      return (
        <svg {...common}>
          <path d="M3 9h18L12 3 3 9Z" />
          <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18M2 18h20" />
        </svg>
      );
  }
}

type OpportunityFilterProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function OpportunityFilter({
  label,
  value,
  options,
  onChange,
}: OpportunityFilterProps) {
  const id = `opportunity-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-1.5 block text-[9px] font-medium uppercase tracking-[0.12em] text-slate-500"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            onChange(event.target.value)
          }
          className="h-9 w-full appearance-none rounded-lg border border-white/[0.08] bg-[#0b1020] px-3 pr-8 text-[10px] text-slate-200 outline-none transition-all hover:border-white/[0.14] focus:border-blue-400/50"
        >
          {options.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="m7 10 5 5 5-5" />
        </svg>
      </div>
    </div>
  );
}

function OpportunityFinderSection() {
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("All opportunities");
  const [country, setCountry] = useState<string>("All countries");
  const [sortBy, setSortBy] = useState<string>("Best match");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);

  const filteredOpportunities = OPPORTUNITY_DATA.filter(
    (item: Opportunity) => {
      const searchableText = [
        item.title,
        item.category,
        item.description,
        item.location,
        item.country,
        ...item.tags,
      ]
        .join(" ")
        .toLowerCase();

      const normalizedQuery = query.trim().toLowerCase();

      const matchesQuery =
        normalizedQuery.length === 0 ||
        searchableText.includes(normalizedQuery);

      const matchesCategory =
        category === "All opportunities" ||
        item.category === category;

      const matchesCountry =
        country === "All countries" ||
        item.country === country;

      const matchesSaved =
        !showSavedOnly || savedIds.includes(item.id);

      return (
        matchesQuery &&
        matchesCategory &&
        matchesCountry &&
        matchesSaved
      );
    }
  );

  const sortedOpportunities = [...filteredOpportunities].sort(
    (a: Opportunity, b: Opportunity) => {
      if (sortBy === "Best match") {
        return b.match - a.match;
      }

      if (sortBy === "Name A–Z") {
        return a.title.localeCompare(b.title);
      }

      return b.id - a.id;
    }
  );

  const selectedOpportunity =
    OPPORTUNITY_DATA.find((item) => item.id === selectedId) ?? null;

  const toggleSaved = (id: number): void => {
    setSavedIds((previous: number[]) =>
      previous.includes(id)
        ? previous.filter((savedId: number) => savedId !== id)
        : [...previous, id]
    );
  };

  const resetFilters = (): void => {
    setQuery("");
    setCategory("All opportunities");
    setCountry("All countries");
    setSortBy("Best match");
    setShowSavedOnly(false);
    setSelectedId(null);
  };

  return (
    <section
      id="opportunity-finder"
      className="relative isolate overflow-hidden border-t border-white/[0.06] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
      style={{
        background:
          "radial-gradient(ellipse at 78% 45%, rgba(37,74,180,0.12), transparent 45%), #040712",
      }}
    >
      {/* BACKGROUND ATMOSPHERE */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute -right-28 top-0 h-[440px] w-[440px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(91,75,255,0.13), transparent 70%)",
          }}
        />

        <div
          className="absolute -bottom-48 left-1/3 h-[350px] w-[600px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, rgba(30,64,175,0.10), transparent 70%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(147,167,255,0.7) 0.7px, transparent 0.7px)",
            backgroundSize: "32px 32px",
            maskImage:
              "linear-gradient(to right, transparent, black 55%, transparent)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.78fr_1.6fr] lg:gap-14">
        {/* LEFT INTRO */}

        <div className="max-w-lg">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-7 bg-gradient-to-r from-blue-400 to-transparent" />

            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-blue-300/80">
              Opportunity Finder
            </p>
          </div>

          <h2
            className="max-w-md text-[2.35rem] font-normal leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.4rem]"
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
            }}
          >
            Discover the opportunities that move your solution{" "}
            <span className="bg-gradient-to-r from-blue-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              forward.
            </span>
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-7 text-slate-300/65 sm:text-[15px]">
            Find relevant stakeholders, markets and partnerships based on
            your solution, research and ecosystem context.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-1.5">
              <span className="h-5 w-5 rounded-full border border-[#040712] bg-blue-400/30" />
              <span className="h-5 w-5 rounded-full border border-[#040712] bg-violet-400/30" />
              <span className="h-5 w-5 rounded-full border border-[#040712] bg-fuchsia-400/30" />

              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#040712] bg-white/[0.08] text-[7px] text-slate-400">
                +
              </span>
            </div>

            <p className="text-[10px] text-slate-500">
              Ecosystem intelligence across 12 opportunities
            </p>
          </div>
        </div>

        {/* PRODUCT WINDOW */}

        <div
          className="relative min-w-0 rounded-[18px] p-px"
          style={{
            background:
              "linear-gradient(140deg, rgba(96,165,250,0.65), rgba(139,92,246,0.25) 42%, rgba(255,255,255,0.07) 75%, rgba(96,165,250,0.35))",
            boxShadow:
              "0 35px 120px rgba(0,0,0,0.48), 0 0 80px rgba(64,80,255,0.05)",
          }}
        >
          <div className="overflow-hidden rounded-[17px] bg-[#080c19]">
            {/* APP HEADER */}

            <header className="flex items-center justify-between gap-3 border-b border-white/[0.07] bg-[#090d1c]/95 px-4 py-3.5 sm:px-5">
              <div className="flex min-w-0 items-center gap-2.5">
                <img
                  src={scenarioLogoImg}
                  alt="EpiphoniX"
                  className="h-7 w-7 shrink-0 object-contain"
                />

                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-wide text-white/90">
                    EpiphoniX
                  </p>

                  <p className="mt-0.5 text-[8px] text-slate-500">
                    Opportunity intelligence
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span className="hidden rounded-full border border-blue-400/15 bg-blue-400/[0.06] px-2.5 py-1.5 text-[9px] text-blue-200/80 sm:inline-flex">
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.7)]" />
                  Explorer
                </span>

                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-300/20 bg-violet-400/10 text-[10px] font-semibold text-violet-200">
                  JD
                </div>
              </div>
            </header>

            {/* SCROLLABLE PRODUCT AREA */}

            <div className="relative">
              <div
                className="h-[650px] overflow-y-auto overscroll-contain scroll-smooth"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor:
                    "rgba(255,255,255,0.10) transparent",
                }}
              >
                <div className="p-4 sm:p-5">
                  {/* TITLE */}

                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="mb-1.5 text-[8px] uppercase tracking-[0.18em] text-slate-500">
                        Discover
                      </p>

                      <h3 className="text-base font-medium tracking-tight text-white sm:text-lg">
                        Opportunities for your solution
                      </h3>

                      <p className="mt-1 text-[10px] leading-5 text-slate-400">
                        Explore potential partners across your ecosystem.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setShowSavedOnly(
                          (value: boolean) => !value
                        )
                      }
                      aria-pressed={showSavedOnly}
                      className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-2 text-[9px] transition-all ${
                        showSavedOnly
                          ? "border-blue-400/30 bg-blue-400/10 text-blue-200"
                          : "border-white/[0.09] bg-white/[0.025] text-slate-400 hover:border-blue-400/25 hover:bg-white/[0.045] hover:text-white"
                      }`}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill={
                          showSavedOnly
                            ? "currentColor"
                            : "none"
                        }
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4Z" />
                      </svg>

                      Saved

                      <span className="text-[8px] opacity-70">
                        {savedIds.length}
                      </span>
                    </button>
                  </div>

                  {/* SEARCH */}

                  <div className="mb-3 flex items-center gap-2.5 rounded-xl border border-white/[0.09] bg-[#050916] px-3.5 transition-all focus-within:border-blue-400/40">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="shrink-0 text-slate-500"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-4-4" />
                    </svg>

                    <input
                      value={query}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => setQuery(event.target.value)}
                      aria-label="Search opportunities"
                      placeholder="Search organizations, expertise, materials..."
                      className="h-10 min-w-0 flex-1 bg-transparent text-[10px] text-white outline-none placeholder:text-slate-600"
                    />

                    {query.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        className="text-lg leading-none text-slate-500 hover:text-white"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {/* FILTERS */}

                  <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <OpportunityFilter
                      label="Category"
                      value={category}
                      onChange={setCategory}
                      options={[
                        "All opportunities",
                        "Non-profit",
                        "Research",
                        "Industry",
                        "Government",
                      ]}
                    />

                    <OpportunityFilter
                      label="Country"
                      value={country}
                      onChange={setCountry}
                      options={[
                        "All countries",
                        "Bangladesh",
                        "United States",
                        "United Kingdom",
                        "France",
                        "Germany",
                        "Canada",
                        "Australia",
                        "Japan",
                        "South Korea",
                        "India",
                        "Indonesia",
                        "Singapore",
                        "Netherlands",
                        "Sweden",
                        "Denmark",
                        "Switzerland",
                        "United Arab Emirates",
                        "Brazil",
                        "Mexico",
                        "China",
                        "Kenya",
                        "New Zealand",
                      ]}
                    />

                    <OpportunityFilter
                      label="Sort by"
                      value={sortBy}
                      onChange={setSortBy}
                      options={[
                        "Best match",
                        "Name A–Z",
                        "Recently added",
                      ]}
                    />
                  </div>

                  {/* RESULT SUMMARY */}

                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-300">✦</span>

                      <h4 className="text-[11px] font-medium text-white/85">
                        Suggested opportunities
                      </h4>

                      <span className="rounded-md border border-white/[0.07] bg-white/[0.035] px-1.5 py-0.5 text-[8px] text-slate-400">
                        {sortedOpportunities.length}
                      </span>
                    </div>

                    <span className="text-[8px] text-slate-600">
                      Ranked by ecosystem relevance
                    </span>
                  </div>

                  {/* OPPORTUNITY CARDS */}

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {sortedOpportunities.map(
                      (opportunity: Opportunity) => {
                        const isSaved = savedIds.includes(
                          opportunity.id
                        );

                        const isSelected =
                          selectedId === opportunity.id;

                        return (
                          <article
                            key={opportunity.id}
                            className={`group relative flex min-w-0 flex-col rounded-xl border p-3.5 transition-all duration-300 ease-out sm:p-4 ${
                              isSelected
                                ? "border-blue-400/40 bg-blue-400/[0.055] shadow-[0_18px_45px_rgba(37,99,235,0.13)]"
                                : "border-white/[0.075] bg-white/[0.018] hover:-translate-y-1.5 hover:border-blue-400/30 hover:bg-white/[0.035] hover:shadow-[0_18px_45px_rgba(0,0,0,0.30),0_0_30px_rgba(59,130,246,0.07)]"
                            }`}
                          >
                            {/* Hover highlight */}

                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute left-5 right-5 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                              style={{
                                background:
                                  "linear-gradient(90deg, transparent, rgba(96,165,250,0.55), transparent)",
                              }}
                            />

                            <div className="mb-3 flex items-start justify-between gap-2">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/[0.13] bg-gradient-to-br from-blue-400/[0.13] to-violet-400/[0.06] text-blue-200 transition-transform duration-300 group-hover:scale-105">
                                <OpportunityIcon
                                  type={opportunity.icon}
                                />
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="rounded-full border border-emerald-400/[0.14] bg-emerald-400/[0.055] px-2 py-1 text-[8px] font-medium text-emerald-300">
                                  {opportunity.match}% match
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleSaved(
                                      opportunity.id
                                    )
                                  }
                                  aria-label={
                                    isSaved
                                      ? `Remove ${opportunity.title} from saved`
                                      : `Save ${opportunity.title}`
                                  }
                                  aria-pressed={isSaved}
                                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all ${
                                    isSaved
                                      ? "border-blue-400/30 bg-blue-400/10 text-blue-200"
                                      : "border-white/[0.07] text-slate-500 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                                  }`}
                                >
                                  <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill={
                                      isSaved
                                        ? "currentColor"
                                        : "none"
                                    }
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                  >
                                    <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4Z" />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.12em] text-slate-500">
                              {opportunity.category}
                            </p>

                            <h5 className="text-sm font-medium leading-5 text-white/90">
                              {opportunity.title}
                            </h5>

                            <p className="mt-2 line-clamp-2 text-[9px] leading-[1.65] text-slate-400">
                              {opportunity.description}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {opportunity.tags
                                .slice(0, 3)
                                .map((tag: string) => (
                                  <span
                                    key={tag}
                                    className="rounded-md border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[8px] text-slate-400"
                                  >
                                    {tag}
                                  </span>
                                ))}
                            </div>

                            <div className="mt-3 flex items-center gap-1.5 text-[8px] text-slate-500">
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                              >
                                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                                <circle cx="12" cy="10" r="2.5" />
                              </svg>

                              <span className="truncate">
                                {opportunity.location}
                              </span>
                            </div>

                            <div className="mt-3 flex gap-2 border-t border-white/[0.06] pt-3">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedId(
                                    isSelected
                                      ? null
                                      : opportunity.id
                                  )
                                }
                                aria-expanded={isSelected}
                                className={`flex min-h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 text-[9px] font-medium transition-all ${
                                  isSelected
                                    ? "border-blue-400/25 bg-blue-400/[0.08] text-blue-200"
                                    : "border-white/[0.09] bg-white/[0.02] text-slate-300 hover:border-blue-400/30 hover:bg-blue-400/[0.035] hover:text-white"
                                }`}
                              >
                                {isSelected
                                  ? "Hide details"
                                  : "Explore opportunity"}

                                <span aria-hidden="true">
                                  {isSelected ? "↑" : "↗"}
                                </span>
                              </button>
                            </div>
                          </article>
                        );
                      }
                    )}
                  </div>

                  {/* EMPTY STATE */}

                  {sortedOpportunities.length === 0 && (
                    <div className="rounded-xl border border-dashed border-white/10 px-4 py-10 text-center">
                      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-slate-400">
                        <OpportunityIcon
                          type="research"
                          size={18}
                        />
                      </div>

                      <p className="text-sm text-white/80">
                        No opportunities found
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        Try another search or adjust your filters.
                      </p>

                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-4 rounded-lg border border-blue-400/20 px-3 py-2 text-xs text-blue-200 hover:bg-blue-400/[0.06]"
                      >
                        Reset filters
                      </button>
                    </div>
                  )}

                  {/* SELECTED DETAILS */}

                  {selectedOpportunity && (
                    <div
                      className="mt-4 overflow-hidden rounded-xl border border-blue-400/20 bg-gradient-to-br from-blue-400/[0.055] to-violet-400/[0.035] shadow-[0_20px_50px_rgba(0,0,0,0.20)]"
                      aria-live="polite"
                    >
                      <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] p-4">
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-400/[0.08] text-blue-200">
                            <OpportunityIcon
                              type={selectedOpportunity.icon}
                              size={18}
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[8px] uppercase tracking-[0.15em] text-blue-300/70">
                              Opportunity overview
                            </p>

                            <h5 className="mt-1 text-sm font-medium text-white">
                              {selectedOpportunity.title}
                            </h5>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedId(null)}
                          aria-label="Close opportunity details"
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-slate-400 hover:bg-white/[0.04] hover:text-white"
                        >
                          ×
                        </button>
                      </div>

                      <div className="p-4">
                        <p className="text-xs leading-6 text-slate-300/80">
                          {selectedOpportunity.reason}
                        </p>

                        <p className="mb-3 mt-5 text-[9px] font-medium uppercase tracking-[0.13em] text-slate-400">
                          Potential collaboration pathways
                        </p>

                        <div className="space-y-3">
                          {selectedOpportunity.highlights.map(
                            (
                              highlight: string,
                              index: number
                            ) => (
                              <div
                                key={highlight}
                                className="flex items-start gap-2.5"
                              >
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-400/15 bg-blue-400/[0.07] text-[8px] text-blue-200">
                                  {index + 1}
                                </span>

                                <p className="pt-0.5 text-[10px] leading-5 text-slate-300/80">
                                  {highlight}
                                </p>
                              </div>
                            )
                          )}
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                          <div>
                            <p className="text-[8px] text-slate-500">
                              Illustrative relevance score
                            </p>

                            <p className="mt-1 text-lg font-medium text-blue-200">
                              {selectedOpportunity.match}%
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              toggleSaved(
                                selectedOpportunity.id
                              )
                            }
                            className="rounded-lg border border-blue-400/25 bg-blue-400/[0.06] px-3.5 py-2.5 text-[9px] font-medium text-blue-200 transition-all hover:-translate-y-0.5 hover:bg-blue-400/[0.12]"
                          >
                            {savedIds.includes(
                              selectedOpportunity.id
                            )
                              ? "Remove from saved"
                              : "Save opportunity"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FOOTER */}

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] pt-4">
                    <p className="text-[8px] leading-5 text-slate-500">
                      {savedIds.length} saved{" "}
                      {savedIds.length === 1
                        ? "opportunity"
                        : "opportunities"}
                    </p>

                    <button
                      type="button"
                      onClick={resetFilters}
                      className="text-[9px] text-blue-300/80 transition-colors hover:text-blue-200"
                    >
                      Reset discovery ↗
                    </button>
                  </div>

                  <div className="h-8" />
                </div>
              </div>

              {/* BOTTOM FADE */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#080c19] to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
type Collaborator = {
  id: number;
  name: string;
  role: string;
  location: string;
  country: string;
  expertise: string[];
  organization: string;
  match: number;
  avatar: string;
};

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: FilterSelectProps) {
  const id = `collaboration-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-9 w-full appearance-none rounded-lg border border-white/[0.08] bg-[#090d19] px-3 pr-8 text-[10px] text-slate-300 outline-none transition-all duration-200 hover:border-white/[0.14] focus:border-violet-400/40 focus:ring-1 focus:ring-violet-400/[0.08]"
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-[#090d19] text-slate-200"
            >
              {option}
            </option>
          ))}
        </select>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-600"
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m7 10 5 5 5-5" />
        </svg>
      </div>
    </div>
  );
}

function CollaborationSection() {
  const [query, setQuery] = useState("");
  const [expertise, setExpertise] = useState("Any expertise");
  const [country, setCountry] = useState("Any country");
  const [organization, setOrganization] = useState("Any organization");
  const [sentRequests, setSentRequests] = useState<number[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const collaborators: Collaborator[] = [
    {
      id: 1,
      name: "Dr. Elena Martinez",
      role: "Environmental Scientist",
      location: "Boston, Massachusetts",
      country: "United States",
      expertise: ["Research", "Microplastics", "Ocean"],
      organization: "Research",
      match: 97,
      avatar:
        "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "James Carter",
      role: "Sustainable Materials Engineer",
      location: "London, England",
      country: "United Kingdom",
      expertise: ["Materials", "Innovation", "Recycling"],
      organization: "Industry",
      match: 94,
      avatar:
        "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Aisha Rahman",
      role: "Environmental Policy Advisor",
      location: "Dhaka, Bangladesh",
      country: "Bangladesh",
      expertise: ["Policy", "Sustainability", "Climate"],
      organization: "Government",
      match: 93,
      avatar:
        "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 4,
      name: "Luca Bianchi",
      role: "Circular Economy Founder",
      location: "Milan, Italy",
      country: "Italy",
      expertise: ["Startups", "Circularity", "CleanTech"],
      organization: "Startup",
      match: 91,
      avatar:
        "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      id: 5,
      name: "Sophie Laurent",
      role: "Marine Pollution Researcher",
      location: "Paris, France",
      country: "France",
      expertise: ["Marine Science", "Microplastics", "Research"],
      organization: "Research",
      match: 90,
      avatar:
        "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      id: 6,
      name: "Kenji Nakamura",
      role: "Polymer Innovation Lead",
      location: "Tokyo, Japan",
      country: "Japan",
      expertise: ["Polymers", "Materials", "Innovation"],
      organization: "Industry",
      match: 89,
      avatar:
        "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      id: 7,
      name: "Priya Sharma",
      role: "Circular Economy Strategist",
      location: "Bengaluru, India",
      country: "India",
      expertise: ["Circularity", "Strategy", "Recycling"],
      organization: "Industry",
      match: 88,
      avatar:
        "https://randomuser.me/api/portraits/women/49.jpg",
    },
    {
      id: 8,
      name: "Daniel Okafor",
      role: "Climate Innovation Director",
      location: "Nairobi, Kenya",
      country: "Kenya",
      expertise: ["Climate", "Innovation", "Policy"],
      organization: "Government",
      match: 87,
      avatar:
        "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
      id: 9,
      name: "Sofia Andersen",
      role: "Sustainable Systems Researcher",
      location: "Copenhagen, Denmark",
      country: "Denmark",
      expertise: ["Systems", "Sustainability", "Research"],
      organization: "Research",
      match: 86,
      avatar:
        "https://randomuser.me/api/portraits/women/26.jpg",
    },
    {
      id: 10,
      name: "Min-Jae Park",
      role: "Advanced Materials Scientist",
      location: "Seoul, South Korea",
      country: "South Korea",
      expertise: ["Materials", "Polymers", "Research"],
      organization: "Research",
      match: 85,
      avatar:
        "https://randomuser.me/api/portraits/men/81.jpg",
    },
    {
      id: 11,
      name: "Amelia Thompson",
      role: "Impact Investment Partner",
      location: "Toronto, Canada",
      country: "Canada",
      expertise: ["Investment", "Impact", "Startups"],
      organization: "Startup",
      match: 83,
      avatar:
        "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      id: 12,
      name: "Nadia Hassan",
      role: "Sustainability Program Lead",
      location: "Dubai, UAE",
      country: "United Arab Emirates",
      expertise: ["Sustainability", "Policy", "Impact"],
      organization: "Government",
      match: 81,
      avatar:
        "https://randomuser.me/api/portraits/women/55.jpg",
    },
  ];

  const filteredCollaborators = collaborators.filter((person) => {
    const searchText = [
      person.name,
      person.role,
      person.location,
      person.country,
      person.organization,
      ...person.expertise,
    ]
      .join(" ")
      .toLowerCase();

    const normalizedQuery = query.trim().toLowerCase();

    const matchesQuery =
      normalizedQuery.length === 0 ||
      searchText.includes(normalizedQuery);

    const matchesExpertise =
      expertise === "Any expertise" ||
      person.expertise.includes(expertise);

    const matchesCountry =
      country === "Any country" ||
      person.country === country;

    const matchesOrganization =
      organization === "Any organization" ||
      person.organization === organization;

    return (
      matchesQuery &&
      matchesExpertise &&
      matchesCountry &&
      matchesOrganization
    );
  });

  const sendRequest = (id: number) => {
    setSentRequests((previous) =>
      previous.includes(id) ? previous : [...previous, id]
    );
  };

  const resetFilters = () => {
    setQuery("");
    setExpertise("Any expertise");
    setCountry("Any country");
    setOrganization("Any organization");
  };

  const selectedPerson =
    collaborators.find((person) => person.id === selectedId) ?? null;

  return (
    <section
      id="collaboration"
      className="relative isolate overflow-hidden border-t border-white/[0.06] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
      style={{
        background:
          "radial-gradient(ellipse at 78% 40%, rgba(92,54,220,0.13), transparent 42%), radial-gradient(ellipse at 15% 80%, rgba(45,80,180,0.07), transparent 38%), #050610",
      }}
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(107,66,255,0.11), transparent 68%)",
          }}
        />

        <div
          className="absolute -bottom-48 left-[25%] h-[400px] w-[650px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse, rgba(76,29,149,0.1), transparent 70%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(167,139,250,0.7) 0.7px, transparent 0.7px)",
            backgroundSize: "36px 36px",
            maskImage:
              "linear-gradient(to right, transparent, black 40%, transparent)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.7fr_1.55fr] lg:gap-16">
        {/* LEFT: INTRODUCTION */}
        <div className="max-w-lg">
          <div className="mb-6 flex items-center gap-3">
            <span
              className="h-px w-7"
              style={{
                background:
                  "linear-gradient(to right, #a78bfa, transparent)",
              }}
            />

            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-violet-300/80">
              Collaboration
            </p>
          </div>

          <h2
            className="max-w-md text-[2.35rem] font-normal leading-[1.08] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.55rem]"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Connect with the right people,{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
              for greater impact.
            </span>
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-7 text-slate-300/65 sm:text-[15px]">
            Discover researchers, innovators, policymakers and partners whose
            expertise aligns with your work.
          </p>
        </div>

        {/* RIGHT: PRODUCT */}
        <div className="relative min-w-0">
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-[2rem] bg-violet-500/[0.035] blur-3xl"
          />

          <div
            className="relative rounded-[1.35rem] p-px"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.72), rgba(59,130,246,0.32) 42%, rgba(255,255,255,0.07) 75%, rgba(139,92,246,0.28))",
              boxShadow: "0 30px 100px rgba(0,0,0,0.46)",
            }}
          >
            <div className="overflow-hidden rounded-[1.3rem] bg-[#070a15]">
              {/* APP HEADER */}
              <div className="flex h-12 items-center justify-between border-b border-white/[0.06] bg-[#080c18]/95 px-4 sm:px-5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-violet-400/15 bg-violet-400/[0.07]">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-violet-300"
                    >
                      <circle cx="9" cy="8" r="3.5" />
                      <circle cx="17" cy="10" r="2.5" />
                      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
                      <path d="M15 16.5a5 5 0 0 1 6.5 3.5" />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-medium text-slate-200">
                      Collaboration
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/10 bg-emerald-400/[0.045] px-2 py-1 text-[8px] text-emerald-300/70 sm:flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                    MATCHING ACTIVE
                  </span>

                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.025]">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                  </div>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4 sm:p-5">
                {/* SEARCH */}
                <div className="relative">
                  <svg
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>

                  <input
                    id="collaboration-search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search people, expertise or organizations..."
                    className="h-10 w-full rounded-lg border border-white/[0.08] bg-[#090d19] pl-10 pr-10 text-[10px] text-slate-300 outline-none placeholder:text-slate-700 transition-all duration-200 focus:border-violet-400/35 focus:ring-1 focus:ring-violet-400/[0.07]"
                  />

                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 transition-colors hover:text-slate-300"
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* FILTERS */}
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <FilterSelect
                    label="Expertise"
                    value={expertise}
                    onChange={setExpertise}
                    options={[
                      "Any expertise",
                      "Research",
                      "Microplastics",
                      "Ocean",
                      "Materials",
                      "Innovation",
                      "Recycling",
                      "Policy",
                      "Sustainability",
                      "Climate",
                      "Circularity",
                      "Investment",
                      "Impact",
                    ]}
                  />

                  <FilterSelect
                    label="Country"
                    value={country}
                    onChange={setCountry}
                    options={[
                      "Any country",
                      "Bangladesh",
                      "United States",
                      "United Kingdom",
                      "Italy",
                      "France",
                      "Japan",
                      "India",
                      "Kenya",
                      "Denmark",
                      "South Korea",
                      "Canada",
                      "United Arab Emirates",
                    ]}
                  />

                  <FilterSelect
                    label="Organization"
                    value={organization}
                    onChange={setOrganization}
                    options={[
                      "Any organization",
                      "Research",
                      "Industry",
                      "Government",
                      "Startup",
                    ]}
                  />
                </div>

                {/* RESULT HEADER */}
                <div className="mt-5 flex items-end justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-violet-300">
                        ✦
                      </span>

                      <h3 className="text-[11px] font-medium text-slate-200">
                        Suggested collaborators
                      </h3>

                      <span className="rounded-md border border-white/[0.06] bg-white/[0.025] px-1.5 py-0.5 text-[8px] text-slate-600">
                        {filteredCollaborators.length}
                      </span>
                    </div>

                    <p className="mt-1 text-[8px] text-slate-700">
                      Ranked by relevance to your project
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-[8px] text-slate-600 transition-colors hover:text-violet-300"
                  >
                    Clear
                  </button>
                </div>

                {/* SCROLLABLE PEOPLE */}
                <div
                  className="mt-3 h-[430px] overflow-y-auto pr-1"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor:
                      "rgba(148,163,184,0.18) transparent",
                  }}
                >
                  {filteredCollaborators.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {filteredCollaborators.map((person) => {
                        const requested = sentRequests.includes(person.id);
                        const selected = selectedId === person.id;

                        return (
                          <article
                            key={person.id}
                            className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ease-out ${
                              selected
                                ? "border-violet-400/30 bg-violet-400/[0.045] shadow-[0_15px_40px_rgba(76,29,149,0.12)]"
                                : "border-white/[0.065] bg-white/[0.018] hover:-translate-y-1 hover:border-violet-400/25 hover:bg-violet-400/[0.025] hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
                            }`}
                          >
                            {/* CARD GLOW */}
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-violet-500/[0.07] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                setSelectedId(
                                  selected ? null : person.id
                                )
                              }
                              className="block w-full text-left"
                            >
                              <div className="p-3.5">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex min-w-0 items-center gap-3">
                                    <div className="relative shrink-0">
                                      <img
                                        src={person.avatar}
                                        alt={person.name}
                                        className="h-10 w-10 rounded-full border border-white/[0.1] object-cover ring-1 ring-black/20 transition-transform duration-300 group-hover:scale-[1.04]"
                                        loading="lazy"
                                      />

                                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0b0e19] bg-emerald-400" />
                                    </div>

                                    <div className="min-w-0">
                                      <h4 className="truncate text-[11px] font-medium text-slate-200">
                                        {person.name}
                                      </h4>

                                      <p className="mt-0.5 truncate text-[8px] text-slate-600">
                                        {person.role}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="shrink-0 text-right">
                                    <div className="text-[11px] font-semibold text-violet-300/90">
                                      {person.match}%
                                    </div>

                                    <div className="text-[7px] uppercase tracking-[0.12em] text-slate-700">
                                      match
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-3 flex items-center gap-1.5">
                                  <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="shrink-0 text-slate-700"
                                  >
                                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                                    <circle
                                      cx="12"
                                      cy="10"
                                      r="2.5"
                                    />
                                  </svg>

                                  <span className="truncate text-[8px] text-slate-600">
                                    {person.location}
                                  </span>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-1">
                                  {person.expertise
                                    .slice(0, 3)
                                    .map((tag) => (
                                      <span
                                        key={tag}
                                        className="rounded-md border border-white/[0.055] bg-white/[0.025] px-1.5 py-1 text-[7px] text-slate-500 transition-colors group-hover:border-violet-400/[0.12] group-hover:text-violet-200/60"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                </div>

                                <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-3">
                                  <span className="text-[7px] uppercase tracking-[0.13em] text-slate-700">
                                    {person.organization}
                                  </span>

                                  <span className="text-[8px] text-slate-700 transition-colors group-hover:text-violet-300/70">
                                    View profile →
                                  </span>
                                </div>
                              </div>
                            </button>

                            {/* EXPANDED PROFILE */}
                            {selected && (
                              <div className="border-t border-violet-400/[0.12] bg-violet-400/[0.025] px-3.5 pb-3.5 pt-3">
                                <div className="flex items-center justify-between gap-3">
                                  <div>
                                    <p className="text-[8px] uppercase tracking-[0.15em] text-slate-600">
                                      Compatibility
                                    </p>

                                    <div className="mt-1.5 h-1 w-28 overflow-hidden rounded-full bg-white/[0.06]">
                                      <div
                                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-400"
                                        style={{
                                          width: `${person.match}%`,
                                        }}
                                      />
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    disabled={requested}
                                    onClick={() =>
                                      sendRequest(person.id)
                                    }
                                    className={`rounded-lg border px-3 py-2 text-[8px] font-medium transition-all ${
                                      requested
                                        ? "border-emerald-400/15 bg-emerald-400/[0.05] text-emerald-300/70"
                                        : "border-violet-400/20 bg-violet-500/[0.07] text-violet-200 hover:border-violet-400/40 hover:bg-violet-500/[0.12]"
                                    }`}
                                  >
                                    {requested
                                      ? "Request sent ✓"
                                      : "Connect →"}
                                  </button>
                                </div>
                              </div>
                            )}
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.08] bg-white/[0.012] text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-slate-600">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="7" />
                          <path d="m20 20-4-4" />
                        </svg>
                      </div>

                      <p className="mt-3 text-[10px] text-slate-500">
                        No collaborators match these filters.
                      </p>

                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-2 text-[8px] text-violet-300/70 hover:text-violet-200"
                      >
                        Reset search
                      </button>
                    </div>
                  )}

                  {/* SCROLL INDICATOR */}
                  {filteredCollaborators.length > 4 && (
                    <div className="pointer-events-none sticky bottom-0 mt-[-48px] flex h-16 items-end justify-center bg-gradient-to-t from-[#070a15] via-[#070a15]/75 to-transparent pb-1">
                      <div className="flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-[#090d19]/80 px-2.5 py-1 backdrop-blur-md">
                        <span className="text-[7px] uppercase tracking-[0.12em] text-slate-600">
                          Scroll to discover
                        </span>

                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-violet-400/60"
                        >
                          <path d="M12 5v14M6 13l6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* BOTTOM STATUS */}
                <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-3">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />

                    <span className="text-[8px] text-slate-600">
                      {filteredCollaborators.length} connections discovered
                    </span>
                  </div>

                  {selectedPerson ? (
                    <span className="max-w-[170px] truncate text-[8px] text-violet-300/60">
                      Exploring {selectedPerson.name}
                    </span>
                  ) : (
                    <span className="text-[8px] text-slate-700">
                      Powered by your project context
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* FLOATING MATCH SIGNAL */}
          <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-white/[0.08] bg-[#080c18]/90 px-3 py-2.5 shadow-2xl backdrop-blur-xl sm:block">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-400/[0.07] text-violet-300">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v18M3 12h18" />
                  <circle cx="12" cy="12" r="7" />
                </svg>
              </div>

              <div>
                <div className="text-[8px] font-medium text-slate-300">
                  Context-aware matching
                </div>

                <div className="mt-0.5 text-[7px] text-slate-600">
                  Continuously discovering
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <Navbar scrolled={scrolled} />

      <HeroSection />

      <img
        src={dividerImg}
        alt=""
        aria-hidden="true"
        style={{
          display: "block",
          width: "100%",
          marginTop: "-2px",
          marginBottom: "-2px",
        }}
      />

      <FeaturesSection />

      <ScenarioLabSection />

      <OpportunityFinderSection />
      <CollaborationSection />
    </div>
  );
}
