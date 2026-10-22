import React from 'react';

export const KineticWireframes: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-visible -z-10">
      
      {/* 
        SHAPE 1: Peach/Apricot Geometric String-Circle (Center-Right behind the heading)
        Exact match to the rotating chorded circular wireframe in reference image
      */}
      <div 
        className="absolute -top-10 -right-12 sm:right-0 md:right-4 w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] opacity-40"
        style={{
          animation: 'spin-slow 60s linear infinite',
        }}
      >
        <svg 
          viewBox="0 0 300 300" 
          fill="none" 
          className="w-full h-full text-orange-300/60"
        >
          {/* Main Perimeter Circle */}
          <circle 
            cx="150" 
            cy="150" 
            r="125" 
            stroke="currentColor" 
            strokeWidth="1.2" 
            strokeOpacity="0.75"
          />

          {/* Intersecting Geometric Chords (String-geometry exact lines from image) */}
          <line x1="195" y1="28" x2="112" y2="272" stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.75" />
          <line x1="210" y1="36" x2="135" y2="274" stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.75" />
          <line x1="25" y1="135" x2="265" y2="210" stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.7" />
          <line x1="188" y1="25" x2="88" y2="242" stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.65" />
          <line x1="42" y1="105" x2="248" y2="185" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.4" />
        </svg>
      </div>

      {/* 
        SHAPE 2: Pale Mint/Teal Triangular Isometric Grid (Top-Left above heading)
        Exact match to the isometric triangular mesh in top-left of reference image
      */}
      <div className="absolute -top-16 -left-12 w-[220px] h-[220px] opacity-30 animate-float-gentle">
        <svg 
          viewBox="0 0 200 200" 
          fill="none" 
          className="w-full h-full text-teal-600/40"
        >
          {/* Triangular Outer Boundary */}
          <polygon 
            points="100,15 15,185 185,185" 
            stroke="currentColor" 
            strokeWidth="1.2" 
          />

          {/* Isometric Horizontal Grid Lines */}
          <line x1="75" y1="65" x2="125" y2="65" stroke="currentColor" strokeWidth="0.9" />
          <line x1="50" y1="115" x2="150" y2="115" stroke="currentColor" strokeWidth="0.9" />
          <line x1="25" y1="165" x2="175" y2="165" stroke="currentColor" strokeWidth="0.9" />

          {/* Diagonal Cross Hatching */}
          <line x1="100" y1="15" x2="50" y2="185" stroke="currentColor" strokeWidth="0.9" />
          <line x1="100" y1="15" x2="150" y2="185" stroke="currentColor" strokeWidth="0.9" />
          <line x1="15" y1="185" x2="125" y2="65" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.7" />
          <line x1="185" y1="185" x2="75" y2="65" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.7" />
        </svg>
      </div>

      {/* 
        SHAPE 3: Pale Mint/Teal Folded Geometric Box & Circle (Bottom-Left below subtitle)
        Exact match to the tilted folded wireframe square with tangent circle in reference image
      */}
      <div className="absolute -bottom-14 -left-10 w-[200px] h-[200px] opacity-30 animate-float-reverse">
        <svg 
          viewBox="0 0 200 200" 
          fill="none" 
          className="w-full h-full text-teal-700/40"
        >
          {/* Tilted Diamond / Outer Square Box */}
          <rect 
            x="25" 
            y="25" 
            width="140" 
            height="140" 
            rx="4" 
            transform="rotate(-15 95 95)" 
            stroke="currentColor" 
            strokeWidth="1.2" 
          />

          {/* Inner Tangent Wireframe Circle */}
          <circle 
            cx="80" 
            cy="110" 
            r="42" 
            stroke="currentColor" 
            strokeWidth="1.1" 
            strokeOpacity="0.8"
          />

          {/* Folded Origami Lines (Diagonal Isometric Joint) */}
          <polyline 
            points="28,140 75,95 160,115" 
            stroke="currentColor" 
            strokeWidth="1.1" 
          />
          <line x1="75" y1="95" x2="115" y2="35" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.7" />
        </svg>
      </div>

    </div>
  );
};
