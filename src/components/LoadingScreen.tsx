import { useEffect, useState } from "react";
import { Logo } from "./Logo";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<'logo' | 'complete'>('logo');

  useEffect(() => {
    // Logo pulse phase
    const logoTimer = setTimeout(() => {
      setPhase('complete');
      onComplete();
    }, 1200);

    return () => clearTimeout(logoTimer);
  }, [onComplete]);

  if (phase === 'complete') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-logo-pulse">
          <Logo showWordmark={false} size="lg" />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">
          Indexing your tools…
        </p>
      </div>
    </div>
  );
};
