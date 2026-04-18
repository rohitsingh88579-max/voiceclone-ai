import type {
  CloneStatus,
  CreateVoiceProjectArgs,
  ProjectId,
  StartCloningArgs,
  SynthesisRecordView,
  SynthesisSettings,
  SynthesizeSpeechArgs,
  Timestamp,
  VoiceProjectView,
  VoiceSample,
} from "../backend";

export type {
  VoiceProjectView,
  VoiceSample,
  SynthesisRecordView,
  SynthesisSettings,
  CloneStatus,
  ProjectId,
  CreateVoiceProjectArgs,
  StartCloningArgs,
  SynthesizeSpeechArgs,
  Timestamp,
};

export type CloneStatusKind = "pending" | "processing" | "ready" | "failed";

export function getCloneStatusKind(status: CloneStatus): CloneStatusKind {
  return status.__kind__;
}

export function getCloneStatusLabel(status: CloneStatus): string {
  switch (status.__kind__) {
    case "pending":
      return "Pending";
    case "processing":
      return "Processing";
    case "ready":
      return "Ready";
    case "failed":
      return `Failed: ${status.failed}`;
  }
}

export function formatTimestamp(ts: Timestamp): string {
  // Motoko timestamps are in nanoseconds
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const DEFAULT_SYNTHESIS_SETTINGS: SynthesisSettings = {
  stability: 0.5,
  similarityBoost: 0.75,
  style: 0.0,
};
