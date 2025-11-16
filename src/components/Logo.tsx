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
      {/* Logomark - four-armed gradient mark at +45° */}
      <div className={cn("relative", sizeClasses[size])}>
        <svg
          viewBox="0 0 32 32"
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
          </defs>
          {/* Four-armed mark */}
          <circle cx="16" cy="16" r="3" fill="url(#logo-gradient)" />
          <rect x="14" y="4" width="4" height="8" rx="2" fill="url(#logo-gradient)" />
          <rect x="14" y="20" width="4" height="8" rx="2" fill="url(#logo-gradient)" />
          <rect x="4" y="14" width="8" height="4" ry="2" fill="url(#logo-gradient)" />
          <rect x="20" y="14" width="8" height="4" ry="2" fill="url(#logo-gradient)" />
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
