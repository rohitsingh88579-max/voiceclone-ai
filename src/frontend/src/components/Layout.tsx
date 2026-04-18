import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Library,
  LogOut,
  Mic,
  Plus,
  Settings,
  User,
  Wand2,
  Zap,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { to: "/library", label: "Voice Library", icon: Library },
  { to: "/clone/new", label: "New Clone", icon: Plus },
  { to: "/tts", label: "Text-to-Speech", icon: Wand2 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function Layout({ children }: LayoutProps) {
  const { loginStatus, login, clear } = useInternetIdentity();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const isAuthenticated = loginStatus === "success";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top navigation */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 h-14 flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 mr-2">
            <div className="w-7 h-7 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Mic className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-display text-sm font-medium tracking-wider text-foreground uppercase">
              SVL
            </span>
          </Link>

          {/* Nav links */}
          <nav
            className="flex items-center gap-1 flex-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const isActive = currentPath.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  data-ocid={`nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-display tracking-wide uppercase transition-smooth",
                    isActive
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-secondary rounded-md border border-border">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-accent" />
                  <User className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-display text-muted-foreground uppercase tracking-wide">
                    Connected
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clear}
                  data-ocid="nav-logout"
                  className="h-7 px-2 text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                onClick={login}
                data-ocid="nav-login"
                className="h-7 px-3 font-display text-xs uppercase tracking-wide"
              >
                <Zap className="w-3 h-3 mr-1" />
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background" data-ocid="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-4">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
          <span className="text-xs font-display text-muted-foreground uppercase tracking-wider">
            Synthetic Voice Lab
          </span>
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
