import { createActor } from "@/backend";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  DEFAULT_SYNTHESIS_SETTINGS,
  formatTimestamp,
  getCloneStatusKind,
} from "@/types/voices";
import type {
  ProjectId,
  SynthesisRecordView,
  SynthesisSettings,
  VoiceProjectView,
} from "@/types/voices";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ChevronDown,
  Clock,
  Download,
  Loader2,
  Mic,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

// ── Helpers ──────────────────────────────────────────────────────────────────

function SliderRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <Label className="font-display text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </Label>
        <span className="font-mono text-xs text-accent">
          {Math.round(value * 100)}
        </span>
      </div>
      <Slider
        min={0}
        max={100}
        step={1}
        value={[Math.round(value * 100)]}
        onValueChange={([v]) => onChange(v / 100)}
        className="h-1.5"
      />
    </div>
  );
}

// ── Voice selector ────────────────────────────────────────────────────────────

function VoiceSelector({
  voices,
  selected,
  onSelect,
}: {
  voices: VoiceProjectView[];
  selected: ProjectId | null;
  onSelect: (id: ProjectId) => void;
}) {
  return (
    <div className="relative">
      <select
        value={selected !== null ? String(selected) : ""}
        onChange={(e) => {
          const v = voices.find((vx) => String(vx.id) === e.target.value);
          if (v) onSelect(v.id);
        }}
        className={cn(
          "w-full appearance-none px-3 py-2 pr-8 rounded-md border text-sm",
          "bg-secondary border-border text-foreground font-body",
          "hover:border-accent/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-smooth cursor-pointer",
        )}
        data-ocid="voice-selector-trigger"
        aria-label="Select a voice"
      >
        {selected === null && (
          <option value="" disabled>
            Select a voice…
          </option>
        )}
        {voices.map((v) => (
          <option key={String(v.id)} value={String(v.id)}>
            {v.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}

// ── History row ────────────────────────────────────────────────────────────────

function HistoryRow({ record }: { record: SynthesisRecordView }) {
  const audioUrl = record.audioBlob.getDirectURL();

  return (
    <div
      className="bg-card border border-border rounded-md p-4 space-y-3"
      data-ocid="history-row"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-foreground leading-relaxed line-clamp-2 min-w-0 flex-1">
          {record.text}
        </p>
        <div className="flex items-center gap-1.5 shrink-0 text-xs text-muted-foreground font-mono">
          <Clock className="w-3 h-3" />
          {formatTimestamp(record.createdAt)}
        </div>
      </div>
      <AudioPlayer
        src={audioUrl}
        filename={`synthesis-${String(record.id)}.mp3`}
        compact
      />
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Tts() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const [selectedVoiceId, setSelectedVoiceId] = useState<ProjectId | null>(
    null,
  );
  const [text, setText] = useState("");
  const [settings, setSettings] = useState<SynthesisSettings>(
    DEFAULT_SYNTHESIS_SETTINGS,
  );
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(
    null,
  );
  const [generatedFilename, setGeneratedFilename] =
    useState<string>("speech.mp3");
  const [error, setError] = useState<string | null>(null);

  // ── Queries ──

  const { data: allVoices = [], isLoading: voicesLoading } = useQuery<
    VoiceProjectView[]
  >({
    queryKey: ["voices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listVoiceProjects();
    },
    enabled: !!actor && !isFetching,
  });

  const readyVoices = allVoices.filter(
    (v) => getCloneStatusKind(v.status) === "ready",
  );

  // Auto-select first ready voice
  useEffect(() => {
    if (readyVoices.length > 0 && selectedVoiceId === null) {
      setSelectedVoiceId(readyVoices[0].id);
    }
  }, [readyVoices, selectedVoiceId]);

  const { data: history = [], isLoading: historyLoading } = useQuery<
    SynthesisRecordView[]
  >({
    queryKey: ["synthesis", String(selectedVoiceId)],
    queryFn: async () => {
      if (!actor || selectedVoiceId === null) return [];
      return actor.listSynthesisRecords(selectedVoiceId);
    },
    enabled: !!actor && !isFetching && selectedVoiceId !== null,
  });

  // ── Mutation ──

  const synthesize = useMutation({
    mutationFn: async () => {
      if (!actor || selectedVoiceId === null)
        throw new Error("No voice selected");
      const result = await actor.synthesizeSpeech({
        text,
        settings,
        projectId: selectedVoiceId,
      });
      return result;
    },
    onSuccess: (record) => {
      setGeneratedAudioUrl(record.audioBlob.getDirectURL());
      setGeneratedFilename(`synthesis-${String(record.id)}.mp3`);
      setError(null);
      queryClient.invalidateQueries({
        queryKey: ["synthesis", String(selectedVoiceId)],
      });
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Synthesis failed";
      setError(msg);
    },
  });

  const charCount = text.length;
  const charMax = 5000;
  const canGenerate =
    selectedVoiceId !== null &&
    charCount >= 10 &&
    charCount <= charMax &&
    !synthesize.isPending;

  // ── Download handler ──

  const handleDownload = () => {
    if (!generatedAudioUrl) return;
    const a = document.createElement("a");
    a.href = generatedAudioUrl;
    a.download = generatedFilename;
    a.click();
  };

  // ── Empty state (no ready voices) ──

  if (!voicesLoading && readyVoices.length === 0) {
    return (
      <div
        className="max-w-screen-xl mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-[60vh] gap-6"
        data-ocid="tts-empty-state"
      >
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-accent/40 flex items-center justify-center">
          <Mic className="w-7 h-7 text-accent/60" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="font-display text-xl uppercase tracking-widest text-foreground">
            No Ready Voices
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            You need at least one cloned voice before generating speech. Create
            a voice clone first.
          </p>
        </div>
        <Button asChild className="font-display uppercase tracking-widest">
          <Link to="/clone/new" data-ocid="tts-create-clone-link">
            Create Your First Clone
          </Link>
        </Button>
      </div>
    );
  }

  // ── Main layout ──

  return (
    <div
      className="max-w-screen-xl mx-auto px-4 py-6 space-y-6"
      data-ocid="tts-page"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="font-display text-xl uppercase tracking-widest text-foreground">
          Text-to-Speech
        </h1>
        <Badge
          variant="outline"
          className="font-display text-xs uppercase tracking-widest border-accent/40 text-accent"
        >
          Synthesis
        </Badge>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Left column: text input + settings ── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Text input card */}
          <div className="bg-card border border-border rounded-md p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-xs uppercase tracking-widest text-muted-foreground">
                Input Text
              </span>
              <span
                className={cn(
                  "font-mono text-xs",
                  charCount > charMax
                    ? "text-destructive"
                    : charCount > charMax * 0.8
                      ? "text-yellow-500"
                      : "text-muted-foreground",
                )}
                data-ocid="char-counter"
              >
                {charCount.toLocaleString()} / {charMax.toLocaleString()}
              </span>
            </div>

            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter the text you want to synthesize into speech…"
              className="min-h-[200px] resize-none bg-secondary border-border font-body text-sm leading-relaxed focus-visible:ring-accent"
              maxLength={charMax}
              data-ocid="tts-text-input"
            />

            {charCount > 0 && charCount < 10 && (
              <p className="text-xs text-muted-foreground">
                Minimum 10 characters required
              </p>
            )}
          </div>

          {/* Settings card */}
          <div className="bg-card border border-border rounded-md p-5 space-y-5">
            <span className="font-display text-xs uppercase tracking-widest text-muted-foreground block">
              Voice Settings
            </span>

            <SliderRow
              label="Stability"
              value={settings.stability}
              onChange={(v) => setSettings((s) => ({ ...s, stability: v }))}
            />
            <SliderRow
              label="Style"
              value={settings.style}
              onChange={(v) => setSettings((s) => ({ ...s, style: v }))}
            />
            <SliderRow
              label="Similarity Boost"
              value={settings.similarityBoost}
              onChange={(v) =>
                setSettings((s) => ({ ...s, similarityBoost: v }))
              }
            />
          </div>
        </div>

        {/* ── Right column: voice selector + generate + player ── */}
        <div className="space-y-4">
          {/* Voice selector */}
          <div className="bg-card border border-border rounded-md p-5 space-y-4">
            <span className="font-display text-xs uppercase tracking-widest text-muted-foreground block">
              Voice
            </span>

            {voicesLoading ? (
              <Skeleton className="h-9 w-full" />
            ) : (
              <VoiceSelector
                voices={readyVoices}
                selected={selectedVoiceId}
                onSelect={(id) => {
                  setSelectedVoiceId(id);
                  setGeneratedAudioUrl(null);
                  setError(null);
                }}
              />
            )}
          </div>

          {/* Generate button */}
          <Button
            className="w-full h-12 font-display text-sm uppercase tracking-widest bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-40"
            disabled={!canGenerate}
            onClick={() => {
              setError(null);
              synthesize.mutate();
            }}
            data-ocid="generate-btn"
          >
            {synthesize.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Synthesizing…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Speech
              </>
            )}
          </Button>

          {/* Error */}
          {error && (
            <div
              className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/40 rounded-md"
              data-ocid="tts-error"
            >
              <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-xs text-destructive leading-relaxed">
                {error}
              </p>
            </div>
          )}

          {/* Generated audio player */}
          {generatedAudioUrl && (
            <div className="bg-card border border-border rounded-md p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs uppercase tracking-widest text-muted-foreground">
                  Generated Audio
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 font-display text-xs uppercase tracking-wide border-accent/40 text-accent hover:bg-accent/10"
                  onClick={handleDownload}
                  data-ocid="download-mp3-btn"
                >
                  <Download className="w-3 h-3 mr-1" />
                  MP3
                </Button>
              </div>
              <AudioPlayer
                src={generatedAudioUrl}
                filename={generatedFilename}
                data-ocid="generated-audio-player"
              />
            </div>
          )}
        </div>
      </div>

      {/* ── History section ── */}
      {selectedVoiceId !== null && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 border-t border-border pt-5">
            <h2 className="font-display text-sm uppercase tracking-widest text-foreground">
              Synthesis History
            </h2>
            {history.length > 0 && (
              <Badge
                variant="outline"
                className="font-mono text-xs border-border text-muted-foreground"
              >
                {history.length}
              </Badge>
            )}
          </div>

          {historyLoading ? (
            <div className="space-y-3">
              {["a", "b", "c"].map((k) => (
                <Skeleton key={k} className="h-28 w-full" />
              ))}
            </div>
          ) : history.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-10 gap-3 bg-card border border-dashed border-border rounded-md"
              data-ocid="history-empty"
            >
              <Clock className="w-8 h-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No synthesis records yet for this voice.
              </p>
            </div>
          ) : (
            <div className="space-y-3" data-ocid="history-list">
              {[...history]
                .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
                .map((record) => (
                  <HistoryRow key={String(record.id)} record={record} />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
