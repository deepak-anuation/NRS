/**
 * Custom SVG icons matching the exact designs in the user screenshot:
 * 1. Cloud & dot top mark
 * 2. Construction crane (Row 1)
 * 3. 3D wireframe tetrahedron / pyramid (Row 2)
 * 4. Hand holding stopwatch / timer (Row 3)
 * 5. PDF / brochure badge icon (Row 2 end)
 */

export function CloudMarkIcon({ className = "w-7 h-5" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 32 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-hidden="true"
    >
      {/* Small dot on the left */}
      <circle cx="5" cy="14" r="2.2" fill="white" />
      {/* Organic cloud / pill capsule on the right */}
      <path 
        d="M13 14C11.3431 14 10 12.6569 10 11C10 9.47563 11.134 8.21639 12.6074 8.02636C13.1118 5.70327 15.1764 4 17.6364 4C19.7891 4 21.6373 5.30561 22.3924 7.15837C22.7565 7.05476 23.1408 7 23.5385 7C25.999 7 28 8.99121 28 11.4444C28 12.8687 27.2882 14.1292 26.1963 14.8889C25.759 15.193 25.2289 15.3704 24.6538 15.3704L13 14Z" 
        fill="white" 
      />
    </svg>
  );
}

export function CraneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      {/* Tower crane mast */}
      <line x1="6" y1="22" x2="6" y2="4" />
      {/* Mast base */}
      <path d="M3 22h6" />
      {/* Tower lattice cross-bracing */}
      <line x1="6" y1="17" x2="9" y2="20" strokeWidth="1.2" />
      <line x1="6" y1="12" x2="9" y2="15" strokeWidth="1.2" />
      {/* Horizontal working jib pointing right */}
      <line x1="2" y1="5" x2="21" y2="5" />
      {/* A-frame apex tower top */}
      <polygon points="6,5 9,1 12,5" fill="none" strokeWidth="1.6" />
      {/* Stay cable to counter jib and working jib */}
      <line x1="9" y1="1" x2="2" y2="5" strokeWidth="1.4" />
      <line x1="9" y1="1" x2="18" y2="5" strokeWidth="1.4" />
      {/* Hoist line and hook */}
      <line x1="16" y1="5" x2="16" y2="13" strokeWidth="1.5" />
      <path d="M14.5 13h3l-1.5 2.5a1.5 1.5 0 0 1-2.5-1.5" strokeWidth="1.5" />
    </svg>
  );
}

export function PyramidIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 28 28" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      {/* Outer triangle base & edges of 3D tetrahedron */}
      <path d="M14 3L3 23h22L14 3Z" />
      {/* Center ridge running from top apex down to inner perspective point */}
      <path d="M14 3L14 19" />
      {/* Base perspective fold connecting left, center point, and right */}
      <path d="M3 23L14 19L25 23" />
    </svg>
  );
}

export function TimerHandIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 28 28" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      {/* Stopwatch dial in center */}
      <circle cx="16" cy="10" r="5.5" />
      {/* Stopwatch top crown button */}
      <path d="M15 2.5h2" strokeWidth="1.8" />
      <line x1="16" y1="2.5" x2="16" y2="4.5" strokeWidth="1.5" />
      {/* Stopwatch clock hands */}
      <line x1="16" y1="10" x2="16" y2="7.5" strokeWidth="1.5" />
      <line x1="16" y1="10" x2="18" y2="11" strokeWidth="1.5" />
      
      {/* Supporting open hand cupping the timer */}
      <path d="M3 19.5c2.5-1 4.5-1 7.5-.5l3.5.5c2 0 3.5-1 4.5-2.5" />
      <path d="M4 22c3-1 6-.8 9.5 0l4.5 1c2 .4 4-1 4.5-2.5l.5-1.5" />
      <path d="M2 17c1.5-.5 3-.5 5 0" />
    </svg>
  );
}

export function PdfDocIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      {/* Adobe style stylized loop ribbon */}
      <path d="M7 16c-1.5 0-2.5-.8-2.5-2.2 0-2 2-3.8 5.5-3.8 2.5 0 4.5 1 5.5 2.2 1 1.2 1.5 2.5 1.5 3.5 0 1.5-.8 2.3-2 2.3-2 0-3.5-2-5-5-1.2-2.5-2-5.5-2-7 0-.8.4-1.5 1.2-1.5.8 0 1.3.6 1.8 1.8 1 2.5 3.5 7 5 9.5" />
    </svg>
  );
}
