import { ExternalBlob, createActor } from "@/backend";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { formatDuration, useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { cn } from "@/lib/utils";
import type { VoiceProjectView } from "@/types/voices";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Library,
  Mic,
  MicOff,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  Square,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type WizardStep = "project" | "record" | "clone";
type AudioSource = "recorded" | "uploaded" | null;

interface UploadedFile {
  file: File;
  url: string;
}

// ---------------------------------------------------------------------------
// Step indicator
// ---------------------------------------------------------------------------
const STEPS: { id: WizardStep; label: string; num: number }[] = [
  { id: "project", label: "Create Project", num: 1 },
  { id: "record", label: "Add Audio", num: 2 },
  { id: "clone", label: "Clone Voice", num: 3 },
];

function StepIndicator({
  current,
  completed,
}: {
  current: WizardStep;
  completed: WizardStep[];
}) {
  const order = STEPS.map((s) => s.id);
  const currentIdx = order.indexOf(current);

  return (
    <div className="flex items-center gap-0 mb-8" data-ocid="wizard-steps">
      {STEPS.map((step, i) => {
        const isDone = completed.includes(step.id);
        const isActive = step.id === current;
        const stepIdx = order.indexOf(step.id);
        const isPast = stepIdx < currentIdx;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "w-8 h-8 rounded-sm flex items-center justify-center border text-xs font-display font-medium transition-smooth",
                  isDone || isPast
                    ? "bg-accent border-accent text-accent-foreground"
                    : isActive
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-secondary border-border text-muted-foreground",
                )}
              >
                {isDone || isPast ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  step.num
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-display uppercase tracking-wide",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "w-16 h-px mx-2 mb-5 transition-smooth",
                  isPast || isDone ? "bg-accent" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Waveform canvas (live from AnalyserNode)
// ---------------------------------------------------------------------------
function LiveWaveform({ analyser }: { analyser: AnalyserNode | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!analyser || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const barW = (w / bufferLength) * 2.5;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barH = (dataArray[i] / 255) * h;
        const alpha = 0.4 + (dataArray[i] / 255) * 0.6;
        ctx.fillStyle = `oklch(0.6 0.24 244 / ${alpha})`;
        ctx.fillRect(x, h - barH, barW, barH);
        x += barW + 1;
      }
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [analyser]);

  // Static idle bars when no analyser
  if (!analyser) {
    const bars = [
      { id: "b0", h: 20 },
      { id: "b1", h: 35 },
      { id: "b2", h: 15 },
      { id: "b3", h: 50 },
      { id: "b4", h: 30 },
      { id: "b5", h: 45 },
      { id: "b6", h: 25 },
      { id: "b7", h: 60 },
      { id: "b8", h: 20 },
      { id: "b9", h: 40 },
      { id: "b10", h: 55 },
      { id: "b11", h: 30 },
      { id: "b12", h: 45 },
      { id: "b13", h: 20 },
      { id: "b14", h: 35 },
      { id: "b15", h: 50 },
      { id: "b16", h: 25 },
      { id: "b17", h: 60 },
      { id: "b18", h: 35 },
      { id: "b19", h: 45 },
    ];
    return (
      <div className="flex items-end gap-1 h-16 px-2">
        {bars.map(({ id, h }) => (
          <div
            key={id}
            className="flex-1 bg-border rounded-sm transition-smooth"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={64}
      className="w-full h-16 rounded-sm"
      aria-label="Live waveform visualization"
    />
  );
}

// ---------------------------------------------------------------------------
// Drag-and-drop file upload zone
// ---------------------------------------------------------------------------
function DropZone({
  onFile,
  uploaded,
  onClear,
}: {
  onFile: (file: File) => void;
  uploaded: UploadedFile | null;
  onClear: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onFile(file);
    },
    [onFile],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFile(file);
    },
    [onFile],
  );

  if (uploaded) {
    return (
      <div
        className="border border-accent/40 bg-accent/5 rounded-sm p-4 flex items-center gap-3"
        data-ocid="file-uploaded"
      >
        <div className="w-8 h-8 bg-accent/10 border border-accent/30 rounded-sm flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-display text-foreground truncate">
            {uploaded.file.name}
          </div>
          <div className="text-xs text-muted-foreground font-mono">
            {(uploaded.file.size / 1024 / 1024).toFixed(2)} MB
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="w-7 h-7 text-muted-foreground hover:text-foreground shrink-0"
          onClick={onClear}
          aria-label="Remove uploaded file"
        >
          <X className="w-3.5 h-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <button
      type="button"
      tabIndex={0}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "w-full border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-smooth select-none",
        isDragging
          ? "border-accent bg-accent/10"
          : "border-border hover:border-accent/40 hover:bg-secondary/50",
      )}
      data-ocid="drop-zone"
    >
      <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
      <p className="text-sm font-display uppercase tracking-wide text-muted-foreground">
        Drop .WAV, .MP3 or .WebM
      </p>
      <p className="text-xs text-muted-foreground mt-1">
        or{" "}
        <span className="text-accent underline underline-offset-2">
          Select File
        </span>
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="audio/wav,audio/mp3,audio/mpeg,audio/webm"
        className="hidden"
        onChange={handleChange}
        data-ocid="file-input"
        aria-label="Select audio file"
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Step 1 — Create Project
// ---------------------------------------------------------------------------
function StepProject({
  onNext,
}: {
  onNext: (project: VoiceProjectView) => void;
}) {
  const { actor, isFetching } = useActor(createActor);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const project = await actor.createVoiceProject({
        name: name.trim(),
        description: description.trim(),
      });
      onNext(project);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="step-project-form"
    >
      <div className="space-y-1.5">
        <Label
          htmlFor="voice-name"
          className="font-display text-xs uppercase tracking-widest text-muted-foreground"
        >
          Voice Name
        </Label>
        <Input
          id="voice-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Echo Prime, Studio Narrator..."
          className="font-body bg-secondary border-border focus:border-accent/60 h-10"
          required
          maxLength={60}
          data-ocid="project-name-input"
        />
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="voice-desc"
          className="font-display text-xs uppercase tracking-widest text-muted-foreground"
        >
          Description{" "}
          <span className="normal-case tracking-normal text-muted-foreground/60">
            (optional)
          </span>
        </Label>
        <Textarea
          id="voice-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the voice, intended use, or speaker characteristics..."
          className="font-body bg-secondary border-border focus:border-accent/60 resize-none h-20"
          maxLength={300}
          data-ocid="project-desc-input"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-sm text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={!name.trim() || loading || isFetching}
        className="w-full h-10 font-display text-xs uppercase tracking-widest"
        data-ocid="project-submit-btn"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
            Creating...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Create Project
            <ChevronRight className="w-4 h-4" />
          </span>
        )}
      </Button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Step 2 — Record / Upload Audio
// ---------------------------------------------------------------------------
function StepRecord({
  project,
  onNext,
}: {
  project: VoiceProjectView;
  onNext: (audioBlob: Blob, filename: string) => void;
}) {
  const recorder = useVoiceRecorder();
  const [tab, setTab] = useState<"record" | "upload">("record");
  const [uploaded, setUploaded] = useState<UploadedFile | null>(null);
  const [audioSource, setAudioSource] = useState<AudioSource>(null);

  const handleFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setUploaded({ file, url });
    setAudioSource("uploaded");
  }, []);

  const handleClearUpload = useCallback(() => {
    if (uploaded) URL.revokeObjectURL(uploaded.url);
    setUploaded(null);
    setAudioSource(null);
  }, [uploaded]);

  // When recording finishes, set source
  useEffect(() => {
    if (recorder.recordingState === "stopped" && recorder.audioBlob) {
      setAudioSource("recorded");
    }
  }, [recorder.recordingState, recorder.audioBlob]);

  const handleReset = () => {
    recorder.resetRecording();
    setAudioSource(null);
  };

  const activeBlob =
    audioSource === "recorded"
      ? recorder.audioBlob
      : audioSource === "uploaded"
        ? (uploaded?.file ?? null)
        : null;

  const activeUrl =
    audioSource === "recorded"
      ? recorder.audioUrl
      : audioSource === "uploaded"
        ? (uploaded?.url ?? null)
        : null;

  const activeFilename =
    audioSource === "uploaded" ? uploaded?.file.name : "voice-sample.webm";

  const canProceed = !!activeBlob;

  return (
    <div className="space-y-5" data-ocid="step-record">
      {/* Project badge */}
      <div className="flex items-center gap-2">
        <Badge
          variant="secondary"
          className="font-display text-xs uppercase tracking-wide border-border"
        >
          Project: {project.name}
        </Badge>
      </div>

      {/* Tab switcher */}
      <div
        className="flex border border-border rounded-sm overflow-hidden"
        data-ocid="record-tab-switcher"
      >
        {(["record", "upload"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 py-2 text-xs font-display uppercase tracking-wide transition-smooth",
              tab === t
                ? "bg-primary/10 text-primary border-r-0"
                : "bg-secondary text-muted-foreground hover:text-foreground",
            )}
            data-ocid={`tab-${t}`}
          >
            {t === "record" ? (
              <span className="flex items-center justify-center gap-1.5">
                <Mic className="w-3.5 h-3.5" />
                Record
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                Upload
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Record panel */}
      {tab === "record" && (
        <div className="space-y-4">
          {/* Waveform + timer */}
          <div className="bg-secondary border border-border rounded-sm p-4 space-y-3">
            {/* Status row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full transition-smooth",
                    recorder.recordingState === "recording"
                      ? "bg-destructive animate-pulse"
                      : recorder.recordingState === "paused"
                        ? "bg-accent"
                        : "bg-border",
                  )}
                />
                <span className="text-xs font-display uppercase tracking-widest text-muted-foreground">
                  {recorder.recordingState === "recording"
                    ? "Recording"
                    : recorder.recordingState === "paused"
                      ? "Paused"
                      : recorder.recordingState === "stopped"
                        ? "Done"
                        : "Ready"}
                </span>
              </div>
              <span
                className="font-mono text-lg text-foreground tabular-nums"
                data-ocid="recording-timer"
              >
                {formatDuration(recorder.duration)}
              </span>
            </div>

            {/* Canvas waveform */}
            <LiveWaveform analyser={recorder.analyserNode} />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {recorder.recordingState === "idle" && (
              <Button
                onClick={recorder.startRecording}
                className="flex-1 h-10 font-display text-xs uppercase tracking-widest bg-destructive/80 hover:bg-destructive border-destructive/50 text-destructive-foreground"
                data-ocid="btn-start-recording"
              >
                <Mic className="w-4 h-4 mr-1.5" />
                Start Recording
              </Button>
            )}

            {recorder.recordingState === "recording" && (
              <>
                <Button
                  variant="outline"
                  onClick={recorder.stopRecording}
                  className="flex-1 h-10 font-display text-xs uppercase tracking-widest border-border"
                  data-ocid="btn-stop-recording"
                >
                  <Square className="w-3.5 h-3.5 mr-1.5" />
                  Stop
                </Button>
                <Button
                  variant="outline"
                  onClick={recorder.pauseRecording}
                  className="h-10 w-10 border-border"
                  data-ocid="btn-pause-recording"
                  aria-label="Pause"
                >
                  <Pause className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  className="h-10 w-10 text-muted-foreground"
                  data-ocid="btn-restart-recording"
                  aria-label="Restart"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
              </>
            )}

            {recorder.recordingState === "paused" && (
              <>
                <Button
                  variant="outline"
                  onClick={recorder.resumeRecording}
                  className="flex-1 h-10 font-display text-xs uppercase tracking-widest border-accent/40 text-accent hover:bg-accent/10"
                  data-ocid="btn-resume-recording"
                >
                  <Play className="w-3.5 h-3.5 mr-1.5" />
                  Resume
                </Button>
                <Button
                  variant="outline"
                  onClick={recorder.stopRecording}
                  className="h-10 w-10 border-border"
                  data-ocid="btn-stop-paused"
                  aria-label="Stop"
                >
                  <Square className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleReset}
                  className="h-10 w-10 text-muted-foreground"
                  data-ocid="btn-restart-paused"
                  aria-label="Restart"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
              </>
            )}

            {recorder.recordingState === "stopped" && (
              <Button
                variant="ghost"
                onClick={handleReset}
                className="h-10 font-display text-xs uppercase tracking-widest text-muted-foreground"
                data-ocid="btn-re-record"
              >
                <MicOff className="w-3.5 h-3.5 mr-1.5" />
                Re-record
              </Button>
            )}
          </div>

          {recorder.error && (
            <div className="flex items-center gap-2 p-2 bg-destructive/10 border border-destructive/30 rounded-sm text-xs text-destructive">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{recorder.error}</span>
            </div>
          )}

          <p className="text-xs text-muted-foreground font-body">
            Speak naturally for at least 30 seconds. Longer samples produce
            better clones.
          </p>
        </div>
      )}

      {/* Upload panel */}
      {tab === "upload" && (
        <DropZone
          onFile={handleFile}
          uploaded={uploaded}
          onClear={handleClearUpload}
        />
      )}

      {/* Preview */}
      {activeUrl && (
        <div className="space-y-1.5">
          <span className="text-xs font-display uppercase tracking-widest text-muted-foreground">
            Preview
          </span>
          <AudioPlayer src={activeUrl} filename={activeFilename} />
        </div>
      )}

      {/* Next */}
      <Button
        disabled={!canProceed}
        onClick={() => {
          if (activeBlob && activeFilename) {
            onNext(activeBlob, activeFilename);
          }
        }}
        className="w-full h-10 font-display text-xs uppercase tracking-widest"
        data-ocid="btn-proceed-to-clone"
      >
        Proceed to Clone
        <ChevronRight className="w-4 h-4 ml-1.5" />
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 3 — Clone
// ---------------------------------------------------------------------------
type ClonePhase =
  | "idle"
  | "uploading"
  | "cloning"
  | "registering"
  | "success"
  | "error";

function StepClone({
  project,
  audioBlob,
  audioFilename,
}: {
  project: VoiceProjectView;
  audioBlob: Blob;
  audioFilename: string;
}) {
  const { actor } = useActor(createActor);
  const [phase, setPhase] = useState<ClonePhase>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const run = useCallback(async () => {
    if (!actor) return;
    setPhase("uploading");
    setProgress(5);
    setErrorMsg(null);

    try {
      // 1. Upload audio sample to object-storage via backend
      const bytes = new Uint8Array(await audioBlob.arrayBuffer());
      const externalBlob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct) => {
          setProgress(5 + Math.round(pct * 0.45)); // 5–50%
        },
      );

      const sampleId = await actor.uploadVoiceSample(
        project.id,
        audioFilename,
        externalBlob,
      );
      setProgress(55);

      // 2. Call startVoiceCloning (backend calls ElevenLabs via HTTP outcall)
      setPhase("cloning");
      const elevenLabsVoiceId = await actor.startVoiceCloning({
        sampleIds: [sampleId],
        projectId: project.id,
      });
      setProgress(85);

      // 3. Register the ElevenLabs voice_id in backend
      setPhase("registering");
      await actor.registerClonedVoice(project.id, elevenLabsVoiceId);
      setProgress(100);

      setPhase("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Voice cloning failed");
      setPhase("error");
    }
  }, [actor, audioBlob, audioFilename, project]);

  const phaseLabel: Record<ClonePhase, string> = {
    idle: "Ready to clone",
    uploading: "Uploading audio sample...",
    cloning: "Cloning voice with AI...",
    registering: "Registering voice...",
    success: "Voice cloned successfully!",
    error: "Cloning failed",
  };

  return (
    <div className="space-y-6" data-ocid="step-clone">
      {/* Project badge */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          variant="secondary"
          className="font-display text-xs uppercase tracking-wide border-border"
        >
          Project: {project.name}
        </Badge>
        <Badge
          variant="secondary"
          className="font-display text-xs border-border text-muted-foreground"
        >
          {audioFilename}
        </Badge>
      </div>

      {/* Status card */}
      <div className="bg-secondary border border-border rounded-sm p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-sm flex items-center justify-center border transition-smooth",
              phase === "success"
                ? "bg-accent/10 border-accent/40"
                : phase === "error"
                  ? "bg-destructive/10 border-destructive/30"
                  : phase !== "idle"
                    ? "bg-primary/10 border-primary/30"
                    : "bg-muted border-border",
            )}
          >
            {phase === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-accent" />
            ) : phase === "error" ? (
              <AlertCircle className="w-5 h-5 text-destructive" />
            ) : phase !== "idle" ? (
              <span className="w-4 h-4 rounded-full border-2 border-primary/40 border-t-primary animate-spin" />
            ) : (
              <Mic className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div>
            <div className="font-display text-sm text-foreground uppercase tracking-wide">
              {phaseLabel[phase]}
            </div>
            {phase !== "idle" && phase !== "success" && phase !== "error" && (
              <div className="text-xs text-muted-foreground font-mono mt-0.5">
                {progress}%
              </div>
            )}
          </div>
        </div>

        {phase !== "idle" && phase !== "error" && (
          <Progress
            value={progress}
            className="h-1.5 bg-muted"
            data-ocid="clone-progress"
          />
        )}

        {/* Phase steps */}
        <div className="space-y-1.5">
          {[
            { key: "uploading", label: "Upload audio to secure storage" },
            { key: "cloning", label: "AI voice cloning via ElevenLabs" },
            { key: "registering", label: "Register voice in your library" },
          ].map(({ key, label }) => {
            const phaseOrder = [
              "uploading",
              "cloning",
              "registering",
              "success",
            ];
            const keyIdx = phaseOrder.indexOf(key);
            const curIdx = phaseOrder.indexOf(phase);
            const done = curIdx > keyIdx || phase === "success";
            const active = phase === key;

            return (
              <div key={key} className="flex items-center gap-2 text-xs">
                <div
                  className={cn(
                    "w-4 h-4 rounded-sm flex items-center justify-center border shrink-0 transition-smooth",
                    done
                      ? "bg-accent/10 border-accent/40 text-accent"
                      : active
                        ? "border-primary/40 bg-primary/5"
                        : "border-border bg-muted",
                  )}
                >
                  {done ? (
                    <CheckCircle2 className="w-2.5 h-2.5" />
                  ) : active ? (
                    <span className="w-2 h-2 rounded-full border border-primary/60 border-t-primary animate-spin" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
                  )}
                </div>
                <span
                  className={cn(
                    done
                      ? "text-foreground"
                      : active
                        ? "text-primary"
                        : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Error */}
      {errorMsg && (
        <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-sm text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* CTA */}
      {phase === "idle" && (
        <Button
          onClick={run}
          disabled={!actor}
          className="w-full h-10 font-display text-xs uppercase tracking-widest"
          data-ocid="btn-start-cloning"
        >
          <Mic className="w-4 h-4 mr-1.5" />
          Start Voice Cloning
        </Button>
      )}

      {phase === "error" && (
        <Button
          variant="outline"
          onClick={run}
          className="w-full h-10 font-display text-xs uppercase tracking-widest border-border"
          data-ocid="btn-retry-clone"
        >
          <RefreshCw className="w-4 h-4 mr-1.5" />
          Retry
        </Button>
      )}

      {phase === "success" && (
        <div className="space-y-3">
          <div className="p-4 bg-accent/5 border border-accent/30 rounded-sm text-center">
            <CheckCircle2 className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-sm font-display uppercase tracking-wide text-foreground">
              Voice Clone Ready
            </p>
            <p className="text-xs text-muted-foreground font-body mt-1">
              "{project.name}" is now available in your Voice Library
            </p>
          </div>
          <Link to="/library" data-ocid="btn-go-to-library">
            <Button className="w-full h-10 font-display text-xs uppercase tracking-widest">
              <Library className="w-4 h-4 mr-1.5" />
              Go to Voice Library
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function NewClone() {
  const [step, setStep] = useState<WizardStep>("project");
  const [completed, setCompleted] = useState<WizardStep[]>([]);
  const [project, setProject] = useState<VoiceProjectView | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioFilename, setAudioFilename] = useState<string>("");

  const handleProjectCreated = (p: VoiceProjectView) => {
    setProject(p);
    setCompleted((c) => [...c, "project"]);
    setStep("record");
  };

  const handleAudioReady = (blob: Blob, filename: string) => {
    setAudioBlob(blob);
    setAudioFilename(filename);
    setCompleted((c) => [...c, "record"]);
    setStep("clone");
  };

  return (
    <div className="min-h-[calc(100vh-7rem)] bg-background">
      <div className="max-w-screen-sm mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-medium uppercase tracking-wider text-foreground">
            New Voice Clone
          </h1>
          <p className="text-sm text-muted-foreground font-body mt-1">
            Record or upload audio samples to create a custom AI voice clone.
          </p>
        </div>

        {/* Step indicator */}
        <StepIndicator current={step} completed={completed} />

        {/* Step panels */}
        <div
          className="bg-card border border-border rounded-sm p-6"
          data-ocid="wizard-panel"
        >
          {step === "project" && (
            <div>
              <div className="mb-6">
                <h2 className="font-display text-sm uppercase tracking-widest text-foreground mb-1">
                  01 — Create Voice Project
                </h2>
                <p className="text-xs text-muted-foreground font-body">
                  Give your voice clone a name so it can be found in your
                  library.
                </p>
              </div>
              <StepProject onNext={handleProjectCreated} />
            </div>
          )}

          {step === "record" && project && (
            <div>
              <div className="mb-6">
                <h2 className="font-display text-sm uppercase tracking-widest text-foreground mb-1">
                  02 — Add Audio Sample
                </h2>
                <p className="text-xs text-muted-foreground font-body">
                  Record from your microphone or upload an existing audio file.
                </p>
              </div>
              <StepRecord project={project} onNext={handleAudioReady} />
            </div>
          )}

          {step === "clone" && project && audioBlob && (
            <div>
              <div className="mb-6">
                <h2 className="font-display text-sm uppercase tracking-widest text-foreground mb-1">
                  03 — Clone Voice
                </h2>
                <p className="text-xs text-muted-foreground font-body">
                  Your sample will be securely uploaded and processed by our AI
                  engine.
                </p>
              </div>
              <StepClone
                project={project}
                audioBlob={audioBlob}
                audioFilename={audioFilename}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
