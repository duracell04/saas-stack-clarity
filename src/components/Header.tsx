import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isDemo = location.pathname === '/demo';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isDemo) {
    return (
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">← Back to site</Button>
            </Link>
            <a href="mailto:contact@hyperlink.tools">
              <Button variant="outline" size="sm">Contact</Button>
            </a>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled && "border-b border-border bg-background/80 backdrop-blur-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('product')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Product
          </button>
          <button
            onClick={() => scrollToSection('use-cases')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Use cases
          </button>
          <button
            onClick={() => scrollToSection('toolboxes')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Toolboxes
          </button>
          <Link to="/demo">
            <Button size="sm" className="bg-gradient-to-r from-brand-yellow to-brand-orange text-primary-foreground hover:opacity-90">
              View mock report
            </Button>
          </Link>
        </nav>

        <Link to="/demo" className="md:hidden">
          <Button size="sm" className="bg-gradient-to-r from-brand-yellow to-brand-orange text-primary-foreground">
            Demo
          </Button>
        </Link>
      </div>
    </header>
  );
};
