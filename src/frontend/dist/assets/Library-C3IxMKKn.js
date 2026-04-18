import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, u as useQueryClient, B as Button, L as Link, S as Skeleton, M as Mic, r as reactExports } from "./index-idpaSJ1R.js";
import { B as Badge, A as AudioPlayer } from "./badge-Dw-GdO7m.js";
import { u as useBackend, a as ue } from "./index-fJNqdUIi.js";
import { g as getCloneStatusKind, f as formatTimestamp, C as ChevronDown, a as getCloneStatusLabel } from "./voices-BjQMfpJv.js";
import { u as useQuery } from "./backend-B83LWtGE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M18 6 7 17l-5-5", key: "116fxf" }],
  ["path", { d: "m22 10-7.5 7.5L13 16", key: "ke71qq" }]
];
const CheckCheck = createLucideIcon("check-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2", key: "4jdomd" }],
  ["path", { d: "M16 4h2a2 2 0 0 1 2 2v4", key: "3hqy98" }],
  ["path", { d: "M21 14H11", key: "1bme5i" }],
  ["path", { d: "m15 10-4 4 4 4", key: "5dvupr" }]
];
const ClipboardCopy = createLucideIcon("clipboard-copy", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
const STATUS_STYLES = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30 font-mono uppercase text-[10px] tracking-widest",
  processing: "bg-blue-500/15 text-blue-400 border-blue-500/30 font-mono uppercase text-[10px] tracking-widest",
  ready: "bg-green-500/15 text-green-400 border-green-500/30 font-mono uppercase text-[10px] tracking-widest",
  failed: "bg-red-500/15 text-red-400 border-red-500/30 font-mono uppercase text-[10px] tracking-widest"
};
function StatusBadge({ status }) {
  const kind = getCloneStatusKind(status);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: STATUS_STYLES[kind],
      "data-ocid": `status-badge-${kind}`,
      children: getCloneStatusLabel(status)
    }
  );
}
function SynthesisRow({ record }) {
  const audioUrl = record.audioBlob.getDirectURL();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border/50 rounded bg-secondary/40 p-3 space-y-2",
      "data-ocid": "synthesis-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground leading-snug line-clamp-2 flex-1", children: [
            '"',
            record.text,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono shrink-0", children: formatTimestamp(record.createdAt) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AudioPlayer,
          {
            src: audioUrl,
            compact: true,
            filename: `synthesis-${record.id}.webm`
          }
        )
      ]
    }
  );
}
function SynthesisHistory({ projectId }) {
  const { actor, isFetching } = useBackend();
  const { data: records, isLoading } = useQuery({
    queryKey: ["synthesis", projectId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSynthesisRecords(projectId);
    },
    enabled: !!actor && !isFetching
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" })
    ] });
  }
  if (!records || records.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "mt-3 flex items-center justify-center py-6 border border-dashed border-border/40 rounded text-muted-foreground text-xs font-mono uppercase tracking-widest",
        "data-ocid": "synthesis-empty",
        children: "No synthesis records yet"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-2 max-h-80 overflow-y-auto pr-1", children: records.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SynthesisRow, { record: r }, r.id.toString())) });
}
function VoiceCard({
  project,
  onDelete
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const [copied, setCopied] = reactExports.useState(false);
  const kind = getCloneStatusKind(project.status);
  const isReady = kind === "ready";
  const handleCopyVoiceId = async () => {
    if (!project.elevenLabsVoiceId) return;
    await navigator.clipboard.writeText(project.elevenLabsVoiceId);
    setCopied(true);
    ue.success("Voice ID copied to clipboard");
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete voice clone "${project.name}"? This cannot be undone.`
    );
    if (confirmed) onDelete(project.id);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "bg-card border border-border/60 hover:border-accent/40 transition-colors duration-200 overflow-hidden",
      "data-ocid": "voice-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-0.5 w-full ${isReady ? "bg-gradient-to-r from-accent to-cyan-400" : "bg-border/30"}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm uppercase tracking-wider text-foreground truncate", children: project.name }),
              project.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-2", children: project.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: project.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[11px] text-muted-foreground font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Created ",
              formatTimestamp(project.createdAt)
            ] }),
            project.lastUsedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "|" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Used ",
                formatTimestamp(project.lastUsedAt)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            isReady && project.elevenLabsVoiceId && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent border border-border/40 hover:border-accent/40",
                onClick: handleCopyVoiceId,
                "data-ocid": "copy-voice-id",
                "aria-label": "Copy ElevenLabs voice ID",
                children: [
                  copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCheck, { className: "w-3 h-3 mr-1 text-green-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCopy, { className: "w-3 h-3 mr-1" }),
                  copied ? "Copied" : "Copy ID"
                ]
              }
            ),
            isReady && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 px-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent border border-border/40 hover:border-accent/40 ml-auto",
                onClick: () => setExpanded((v) => !v),
                "data-ocid": "toggle-history",
                "aria-expanded": expanded,
                "aria-label": expanded ? "Collapse history" : "Expand history",
                children: [
                  expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3 mr-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 mr-1" }),
                  "History"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "h-7 px-2 text-muted-foreground hover:text-red-400 hover:bg-red-500/10 border border-border/40 hover:border-red-500/30 ml-auto",
                onClick: handleDelete,
                "data-ocid": "delete-voice",
                "aria-label": `Delete ${project.name}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
              }
            )
          ] }),
          expanded && isReady && /* @__PURE__ */ jsxRuntimeExports.jsx(SynthesisHistory, { projectId: project.id })
        ] })
      ]
    }
  );
}
function LibrarySkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border/60 rounded-lg overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-0.5 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-7 ml-auto" })
          ] })
        ] })
      ]
    },
    i
  )) });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-24 text-center",
      "data-ocid": "library-empty",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-7 h-7 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg uppercase tracking-widest text-foreground mb-2", children: "No Voice Clones Yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mb-6", children: "Record or upload audio samples to create your first AI voice clone." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            className: "font-display uppercase tracking-widest text-xs h-9 px-6 bg-accent text-accent-foreground hover:bg-accent/90",
            "data-ocid": "create-first-clone-cta",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/clone/new", children: "Create First Clone" })
          }
        )
      ]
    }
  );
}
function Library() {
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();
  const { data: projects, isLoading } = useQuery({
    queryKey: ["voiceProjects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listVoiceProjects();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 15e3
  });
  const handleDelete = async (id) => {
    if (!actor) return;
    try {
      await actor.deleteVoiceProject(id);
      await queryClient.invalidateQueries({ queryKey: ["voiceProjects"] });
      ue.success("Voice clone deleted");
    } catch {
      ue.error("Failed to delete voice clone");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl uppercase tracking-widest text-foreground", children: "Voice Library" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage your AI voice clones and synthesis history" })
      ] }),
      !isLoading && projects && projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          className: "font-display uppercase tracking-widest text-xs h-9 px-5 bg-accent text-accent-foreground hover:bg-accent/90",
          "data-ocid": "new-clone-btn",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/clone/new", children: "+ New Clone" })
        }
      )
    ] }),
    !isLoading && projects && projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 mb-6 px-4 py-3 bg-card border border-border/40 rounded-md text-xs font-mono text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: projects.length }),
        " ",
        "total"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400 font-semibold", children: projects.filter((p) => getCloneStatusKind(p.status) === "ready").length }),
        " ",
        "ready"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-400 font-semibold", children: projects.filter(
          (p) => getCloneStatusKind(p.status) === "processing"
        ).length }),
        " ",
        "processing"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-yellow-400 font-semibold", children: projects.filter(
          (p) => getCloneStatusKind(p.status) === "pending"
        ).length }),
        " ",
        "pending"
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LibrarySkeleton, {}) : !projects || projects.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
        "data-ocid": "voice-grid",
        children: projects.map((project) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          VoiceCard,
          {
            project,
            onDelete: handleDelete
          },
          project.id.toString()
        ))
      }
    )
  ] });
}
export {
  Library as default
};
