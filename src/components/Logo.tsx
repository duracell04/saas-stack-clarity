import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className, showWordmark = true, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Logomark - precise geometric four-armed circuit mark */}
      <div className={cn("relative", sizeClasses[size])}>
        <svg
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto"
          style={{ transform: 'rotate(45deg)' }}
        >
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--brand-yellow))" />
              <stop offset="100%" stopColor="hsl(var(--brand-orange))" />
            </linearGradient>
            
            {/* Define one arm as a reusable group */}
            <g id="arm">
              {/* L-shaped trace */}
              <path
                d="M312 372 V256 H432"
                strokeWidth="44"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="url(#logo-gradient)"
                fill="none"
              />
              {/* Ring at tip */}
              <circle
                cx="470"
                cy="256"
                r="26"
                strokeWidth="20"
                fill="none"
                stroke="url(#logo-gradient)"
              />
              {/* Chip rectangle in elbow */}
              <rect
                x="344"
                y="284"
                width="56"
                height="24"
                rx="12"
                fill="url(#logo-gradient)"
              />
            </g>
          </defs>
          
          {/* Place 4 arms rotated around center (256, 256) */}
          <use href="#arm" transform="rotate(0 256 256)" />
          <use href="#arm" transform="rotate(90 256 256)" />
          <use href="#arm" transform="rotate(180 256 256)" />
          <use href="#arm" transform="rotate(270 256 256)" />
        </svg>
      </div>
      
      {/* Wordmark */}
      {showWordmark && (
        <span className="text-lg font-extrabold tracking-wide">
          <span className="text-foreground">Hyper</span>
          <span className="gradient-text">link</span>
        </span>
      )}
    </div>
  );
};
