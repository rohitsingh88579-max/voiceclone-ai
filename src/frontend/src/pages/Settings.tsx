import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useBackend } from "@/hooks/useBackend";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Key,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function maskApiKey(key: string): string {
  if (!key || key.length <= 4) return "••••";
  return `••••••••••••••••${key.slice(-4)}`;
}

export default function Settings() {
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();
  const [newKey, setNewKey] = useState("");
  const [showInput, setShowInput] = useState(false);

  const { data: currentKey, isLoading } = useQuery<string | null>({
    queryKey: ["userApiKey"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getUserApiKey();
      // Motoko ?Text returns [] for null, [value] for Some
      if (Array.isArray(result) && result.length > 0)
        return result[0] as string;
      return null;
    },
    enabled: !!actor && !isFetching,
  });

  useEffect(() => {
    if (!currentKey) setShowInput(true);
  }, [currentKey]);

  const saveMutation = useMutation({
    mutationFn: async (key: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.setUserApiKey(key);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userApiKey"] });
      toast.success("API key saved successfully", {
        description: "Your ElevenLabs API key has been stored securely.",
      });
      setNewKey("");
      setShowInput(false);
    },
    onError: () => {
      toast.error("Failed to save API key", {
        description: "Please try again.",
      });
    },
  });

  const handleSave = () => {
    const trimmed = newKey.trim();
    if (!trimmed) {
      toast.error("Please enter a valid API key");
      return;
    }
    saveMutation.mutate(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
  };

  return (
    <div className="max-w-screen-md mx-auto px-4 py-10 space-y-8">
      {/* Page header */}
      <div>
        <h1 className="font-display text-xl font-medium text-foreground uppercase tracking-wider mb-1">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your account preferences and integrations.
        </p>
      </div>

      {/* Info banner */}
      <div className="rounded-lg border border-accent/30 bg-accent/5 p-4 flex gap-3">
        <Shield className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-sm font-display text-accent uppercase tracking-wide">
            ElevenLabs Integration
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            An ElevenLabs API key is required for voice cloning and
            text-to-speech synthesis. Your key is stored securely and only used
            to make requests on your behalf.
          </p>
          <a
            href="https://elevenlabs.io/app/subscription"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors mt-1"
          >
            Get your API key at elevenlabs.io
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* API Key card */}
      <div className="rounded-lg border border-border bg-card p-6 space-y-5">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-primary" />
          <h2 className="font-display text-sm uppercase tracking-wider text-foreground">
            ElevenLabs API Key
          </h2>
        </div>

        {isLoading || isFetching ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-9 w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Current key status */}
            {currentKey && !showInput && (
              <div className="flex items-center justify-between rounded-md border border-border bg-secondary px-3 py-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="font-mono text-xs text-muted-foreground tracking-widest truncate">
                    {maskApiKey(currentKey)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInput(true)}
                  data-ocid="settings-change-key"
                  className="h-6 px-2 text-xs font-display uppercase tracking-wide text-muted-foreground hover:text-foreground shrink-0 ml-2"
                >
                  Change
                </Button>
              </div>
            )}

            {/* No key yet */}
            {!currentKey && !showInput && (
              <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2.5">
                <AlertCircle className="w-3.5 h-3.5 text-destructive shrink-0" />
                <span className="text-xs text-muted-foreground">
                  No API key configured — voice features are unavailable.
                </span>
              </div>
            )}

            {/* Input form */}
            {showInput && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="api-key-input"
                    className="font-display text-xs uppercase tracking-wide text-muted-foreground"
                  >
                    {currentKey ? "Enter New API Key" : "Enter API Key"}
                  </Label>
                  <Input
                    id="api-key-input"
                    type="password"
                    placeholder="sk_..."
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    data-ocid="settings-api-key-input"
                    className="font-mono text-sm bg-input border-input focus:ring-accent"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your key is stored encrypted and never exposed in the UI.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={saveMutation.isPending || !newKey.trim()}
                    data-ocid="settings-save-key"
                    className="font-display text-xs uppercase tracking-wide h-8 px-4"
                  >
                    {saveMutation.isPending ? "Saving…" : "Save Key"}
                  </Button>
                  {currentKey && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setShowInput(false);
                        setNewKey("");
                      }}
                      data-ocid="settings-cancel-key"
                      className="h-8 px-3 font-display text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Usage note */}
      <p className="text-xs text-muted-foreground text-center">
        API keys are stored per-user and never shared across accounts.
      </p>
    </div>
  );
}
