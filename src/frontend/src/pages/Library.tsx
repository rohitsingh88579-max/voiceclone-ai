import { AudioPlayer } from "@/components/AudioPlayer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBackend } from "@/hooks/useBackend";
import {
  type CloneStatusKind,
  type ProjectId,
  type SynthesisRecordView,
  type VoiceProjectView,
  formatTimestamp,
  getCloneStatusKind,
  getCloneStatusLabel,
} from "@/types/voices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  CheckCheck,
  ChevronDown,
  ChevronUp,
  ClipboardCopy,
  Mic,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ── Status badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<CloneStatusKind, string> = {
  pending:
    "bg-yellow-500/15 text-yellow-400 border-yellow-500/30 font-mono uppercase text-[10px] tracking-widest",
  processing:
    "bg-blue-500/15 text-blue-400 border-blue-500/30 font-mono uppercase text-[10px] tracking-widest",
  ready:
    "bg-green-500/15 text-green-400 border-green-500/30 font-mono uppercase text-[10px] tracking-widest",
  failed:
    "bg-red-500/15 text-red-400 border-red-500/30 font-mono uppercase text-[10px] tracking-widest",
};

function StatusBadge({ status }: { status: VoiceProjectView["status"] }) {
  const kind = getCloneStatusKind(status);
  return (
    <Badge
      variant="outline"
      className={STATUS_STYLES[kind]}
      data-ocid={`status-badge-${kind}`}
    >
      {getCloneStatusLabel(status)}
    </Badge>
  );
}

// ── Synthesis history row ─────────────────────────────────────────────────────

function SynthesisRow({ record }: { record: SynthesisRecordView }) {
  const audioUrl = record.audioBlob.getDirectURL();
  return (
    <div
      className="border border-border/50 rounded bg-secondary/40 p-3 space-y-2"
      data-ocid="synthesis-row"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-foreground leading-snug line-clamp-2 flex-1">
          "{record.text}"
        </p>
        <span className="text-xs text-muted-foreground font-mono shrink-0">
          {formatTimestamp(record.createdAt)}
        </span>
      </div>
      <AudioPlayer
        src={audioUrl}
        compact
        filename={`synthesis-${record.id}.webm`}
      />
    </div>
  );
}

// ── Synthesis history panel ───────────────────────────────────────────────────

function SynthesisHistory({ projectId }: { projectId: ProjectId }) {
  const { actor, isFetching } = useBackend();

  const { data: records, isLoading } = useQuery<SynthesisRecordView[]>({
    queryKey: ["synthesis", projectId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSynthesisRecords(projectId);
    },
    enabled: !!actor && !isFetching,
  });

  if (isLoading) {
    return (
      <div className="mt-3 space-y-2">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!records || records.length === 0) {
    return (
      <div
        className="mt-3 flex items-center justify-center py-6 border border-dashed border-border/40 rounded text-muted-foreground text-xs font-mono uppercase tracking-widest"
        data-ocid="synthesis-empty"
      >
        No synthesis records yet
      </div>
    );
  }

  return (
    <div className="mt-3 space-y-2 max-h-80 overflow-y-auto pr-1">
      {records.map((r) => (
        <SynthesisRow key={r.id.toString()} record={r} />
      ))}
    </div>
  );
}

// ── Voice card ────────────────────────────────────────────────────────────────

function VoiceCard({
  project,
  onDelete,
}: {
  project: VoiceProjectView;
  onDelete: (id: ProjectId) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const kind = getCloneStatusKind(project.status);
  const isReady = kind === "ready";

  const handleCopyVoiceId = async () => {
    if (!project.elevenLabsVoiceId) return;
    await navigator.clipboard.writeText(project.elevenLabsVoiceId);
    setCopied(true);
    toast.success("Voice ID copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete voice clone "${project.name}"? This cannot be undone.`,
    );
    if (confirmed) onDelete(project.id);
  };

  return (
    <Card
      className="bg-card border border-border/60 hover:border-accent/40 transition-colors duration-200 overflow-hidden"
      data-ocid="voice-card"
    >
      {/* Accent bar on left for ready status */}
      <div
        className={`h-0.5 w-full ${isReady ? "bg-gradient-to-r from-accent to-cyan-400" : "bg-border/30"}`}
      />

      <div className="p-4 space-y-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-sm uppercase tracking-wider text-foreground truncate">
              {project.name}
            </h3>
            {project.description && (
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                {project.description}
              </p>
            )}
          </div>
          <StatusBadge status={project.status} />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-mono">
          <span>Created {formatTimestamp(project.createdAt)}</span>
          {project.lastUsedAt && (
            <>
              <span className="text-border">|</span>
              <span>Used {formatTimestamp(project.lastUsedAt)}</span>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {isReady && project.elevenLabsVoiceId && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent border border-border/40 hover:border-accent/40"
              onClick={handleCopyVoiceId}
              data-ocid="copy-voice-id"
              aria-label="Copy ElevenLabs voice ID"
            >
              {copied ? (
                <CheckCheck className="w-3 h-3 mr-1 text-green-400" />
              ) : (
                <ClipboardCopy className="w-3 h-3 mr-1" />
              )}
              {copied ? "Copied" : "Copy ID"}
            </Button>
          )}

          {isReady && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent border border-border/40 hover:border-accent/40 ml-auto"
              onClick={() => setExpanded((v) => !v)}
              data-ocid="toggle-history"
              aria-expanded={expanded}
              aria-label={expanded ? "Collapse history" : "Expand history"}
            >
              {expanded ? (
                <ChevronUp className="w-3 h-3 mr-1" />
              ) : (
                <ChevronDown className="w-3 h-3 mr-1" />
              )}
              History
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 border border-border/40 hover:border-red-500/30 ml-auto"
            onClick={handleDelete}
            data-ocid="delete-voice"
            aria-label={`Delete ${project.name}`}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>

        {/* Synthesis history (expanded) */}
        {expanded && isReady && <SynthesisHistory projectId={project.id} />}
      </div>
    </Card>
  );
}

// ── Skeleton grid ─────────────────────────────────────────────────────────────

function LibrarySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-card border border-border/60 rounded-lg overflow-hidden"
        >
          <Skeleton className="h-0.5 w-full" />
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-24" />
            <div className="flex gap-2">
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-7 w-7 ml-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 text-center"
      data-ocid="library-empty"
    >
      <div className="w-16 h-16 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
        <Mic className="w-7 h-7 text-accent" />
      </div>
      <h2 className="font-display text-lg uppercase tracking-widest text-foreground mb-2">
        No Voice Clones Yet
      </h2>
      <p className="text-sm text-muted-foreground max-w-xs mb-6">
        Record or upload audio samples to create your first AI voice clone.
      </p>
      <Button
        asChild
        className="font-display uppercase tracking-widest text-xs h-9 px-6 bg-accent text-accent-foreground hover:bg-accent/90"
        data-ocid="create-first-clone-cta"
      >
        <Link to="/clone/new">Create First Clone</Link>
      </Button>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Library() {
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useQuery<VoiceProjectView[]>({
    queryKey: ["voiceProjects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listVoiceProjects();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 15_000,
  });

  const handleDelete = async (id: ProjectId) => {
    if (!actor) return;
    try {
      await actor.deleteVoiceProject(id);
      await queryClient.invalidateQueries({ queryKey: ["voiceProjects"] });
      toast.success("Voice clone deleted");
    } catch {
      toast.error("Failed to delete voice clone");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl uppercase tracking-widest text-foreground">
            Voice Library
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your AI voice clones and synthesis history
          </p>
        </div>

        {!isLoading && projects && projects.length > 0 && (
          <Button
            asChild
            className="font-display uppercase tracking-widest text-xs h-9 px-5 bg-accent text-accent-foreground hover:bg-accent/90"
            data-ocid="new-clone-btn"
          >
            <Link to="/clone/new">+ New Clone</Link>
          </Button>
        )}
      </div>

      {/* Stats bar */}
      {!isLoading && projects && projects.length > 0 && (
        <div className="flex items-center gap-6 mb-6 px-4 py-3 bg-card border border-border/40 rounded-md text-xs font-mono text-muted-foreground">
          <span>
            <span className="text-foreground font-semibold">
              {projects.length}
            </span>{" "}
            total
          </span>
          <span>
            <span className="text-green-400 font-semibold">
              {
                projects.filter((p) => getCloneStatusKind(p.status) === "ready")
                  .length
              }
            </span>{" "}
            ready
          </span>
          <span>
            <span className="text-blue-400 font-semibold">
              {
                projects.filter(
                  (p) => getCloneStatusKind(p.status) === "processing",
                ).length
              }
            </span>{" "}
            processing
          </span>
          <span>
            <span className="text-yellow-400 font-semibold">
              {
                projects.filter(
                  (p) => getCloneStatusKind(p.status) === "pending",
                ).length
              }
            </span>{" "}
            pending
          </span>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <LibrarySkeleton />
      ) : !projects || projects.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          data-ocid="voice-grid"
        >
          {projects.map((project) => (
            <VoiceCard
              key={project.id.toString()}
              project={project}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
