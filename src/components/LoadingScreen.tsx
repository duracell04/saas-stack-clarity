import { useEffect, useState } from "react";
import { Logo } from "./Logo";

interface LoadingScreenProps {
  onComplete?: () => void;
  fullScreen?: boolean;
}

export const LoadingScreen = ({ onComplete, fullScreen = true }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<'logo' | 'complete'>('logo');

  useEffect(() => {
    if (!onComplete) return;
    
    // Logo pulse phase
    const logoTimer = setTimeout(() => {
      setPhase('complete');
      onComplete();
    }, 1200);

    return () => clearTimeout(logoTimer);
  }, [onComplete]);

  if (phase === 'complete' && onComplete) return null;

  return (
    <div className={`${fullScreen ? 'fixed inset-0 z-50' : 'w-full h-full'} flex items-center justify-center bg-background`}>
      <div className="flex flex-col items-center gap-6">
        {/* Spinning ring around logo */}
        <div className="relative">
          <div className="absolute inset-0 animate-spin">
            <svg className="w-24 h-24" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#spinner-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="70 200"
              />
              <defs>
                <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--brand-yellow))" />
                  <stop offset="100%" stopColor="hsl(var(--brand-orange))" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="relative flex items-center justify-center w-24 h-24">
            <div className="animate-logo-pulse">
              <Logo showWordmark={false} size="lg" />
            </div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-muted-foreground animate-pulse">
            Indexing your tools…
          </p>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple loader for Suspense fallbacks
export const Loader = () => (
  <div className="flex items-center justify-center w-full min-h-[200px]">
    <div className="relative">
      <div className="absolute inset-0 animate-spin">
        <svg className="w-12 h-12" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#loader-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="70 200"
          />
          <defs>
            <linearGradient id="loader-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--brand-yellow))" />
              <stop offset="100%" stopColor="hsl(var(--brand-orange))" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative flex items-center justify-center w-12 h-12">
        <Logo showWordmark={false} size="sm" />
      </div>
    </div>
  </div>
);
