import React from 'react';

export default function BrandLogo({ size = "default", showTagline = false }) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* Vault Prism Emblem */}
      <div className={`relative ${isLarge ? 'w-12 h-12' : isSmall ? 'w-8 h-8' : 'w-10 h-10'} rounded-xl bg-gradient-to-br from-vault-800 via-vault-900 to-vault-950 p-[1.5px] shadow-glow-sm group-hover:shadow-glow-md transition-all duration-300`}>
        <div className="w-full h-full rounded-[10px] bg-vault-950 flex items-center justify-center relative overflow-hidden">
          {/* Subtle ambient light inside badge */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/30 via-brand-cyan/20 to-brand-violet/30 opacity-70 group-hover:opacity-100 transition-opacity" />
          
          {/* Isometric Vault & Neural Core SVG */}
          <svg
            className={`${isLarge ? 'w-7 h-7' : isSmall ? 'w-4 h-4' : 'w-5 h-5'} relative z-10`}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="vaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F2FE" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            {/* Hexagonal Vault Shell */}
            <path
              d="M16 3L28 9.5V22.5L16 29L4 22.5V9.5L16 3Z"
              stroke="url(#vaultGradient)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Inner Vault Facets */}
            <path
              d="M16 3V16M28 9.5L16 16M4 9.5L16 16"
              stroke="#00F2FE"
              strokeWidth="1.2"
              strokeOpacity="0.7"
              strokeLinecap="round"
            />
            {/* Glowing Neural Center / Spark */}
            <circle cx="16" cy="16" r="3.2" fill="url(#vaultGradient)" />
            <circle cx="16" cy="16" r="5" stroke="#00F2FE" strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.8" />
            {/* Satellite idea spark nodes */}
            <circle cx="16" cy="7" r="1.2" fill="#00F2FE" />
            <circle cx="24" cy="20" r="1.2" fill="#A855F7" />
            <circle cx="8" cy="20" r="1.2" fill="#6366F1" />
          </svg>
        </div>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-display font-extrabold tracking-tight ${isLarge ? 'text-2xl' : isSmall ? 'text-lg' : 'text-xl'} text-white`}>
            IDEA<span className="gradient-brand">VAULT</span>
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-brand-indigo/20 text-brand-cyan border border-brand-indigo/30 font-semibold tracking-wider">
            CAMPUS
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-medium text-slate-400 tracking-wide">
            Where Ideas Find Their People
          </span>
        )}
      </div>
    </div>
  );
}
