import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Lock, Mic, Shield, Wand2, Zap } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

const FEATURES = [
  {
    icon: Mic,
    label: "Voice Cloning",
    desc: "Clone any voice with a few audio samples",
  },
  {
    icon: Wand2,
    label: "Text-to-Speech",
    desc: "Synthesize speech with cloned voices",
  },
  {
    icon: Shield,
    label: "Secure & Private",
    desc: "Your voices are stored on-chain, owned by you",
  },
];

export function AuthGuard({ children }: AuthGuardProps) {
  const { loginStatus, login } = useInternetIdentity();

  if (loginStatus === "success") {
    return <>{children}</>;
  }

  const isLoading = loginStatus === "logging-in";

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md" data-ocid="auth-guard">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm bg-primary/10 border border-primary/30 mb-6">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-medium tracking-tight text-foreground mb-2 uppercase">
            Synthetic Voice Lab
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed font-body">
            AI-powered voice cloning and text-to-speech synthesis. Login with
            Internet Identity to access your voice library.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-start gap-3 p-3 bg-card border border-border rounded-md"
            >
              <div className="w-8 h-8 rounded bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-accent" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-display text-foreground uppercase tracking-wide">
                  {label}
                </div>
                <div className="text-xs text-muted-foreground font-body mt-0.5">
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Login CTA */}
        <Button
          className="w-full h-11 font-display text-sm uppercase tracking-widest"
          onClick={login}
          disabled={isLoading}
          data-ocid="auth-login-btn"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
              Connecting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Login with Internet Identity
            </span>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4 font-body">
          Decentralized authentication — no passwords, no data leaks.
        </p>
      </div>
    </div>
  );
}
