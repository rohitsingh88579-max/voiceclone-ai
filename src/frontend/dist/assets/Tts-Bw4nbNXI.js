import { c as createLucideIcon, u as useQueryClient, r as reactExports, j as jsxRuntimeExports, M as Mic, B as Button, L as Link, a as cn, S as Skeleton } from "./index-idpaSJ1R.js";
import { a as useActor, u as useQuery, c as createActor } from "./backend-B83LWtGE.js";
import { B as Badge, D as Download, A as AudioPlayer, b as Slider } from "./badge-Dw-GdO7m.js";
import { C as CircleAlert, L as Label } from "./label-BMj-scmd.js";
import { T as Textarea } from "./textarea-BJvbeEb4.js";
import { D as DEFAULT_SYNTHESIS_SETTINGS, g as getCloneStatusKind, C as ChevronDown, f as formatTimestamp } from "./voices-BjQMfpJv.js";
import { u as useMutation } from "./useMutation-CmxFvUsc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function SliderRow({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "font-display text-xs uppercase tracking-widest text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-accent", children: Math.round(value * 100) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Slider,
      {
        min: 0,
        max: 100,
        step: 1,
        value: [Math.round(value * 100)],
        onValueChange: ([v]) => onChange(v / 100),
        className: "h-1.5"
      }
    )
  ] });
}
function VoiceSelector({
  voices,
  selected,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "select",
      {
        value: selected !== null ? String(selected) : "",
        onChange: (e) => {
          const v = voices.find((vx) => String(vx.id) === e.target.value);
          if (v) onSelect(v.id);
        },
        className: cn(
          "w-full appearance-none px-3 py-2 pr-8 rounded-md border text-sm",
          "bg-secondary border-border text-foreground font-body",
          "hover:border-accent/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring transition-smooth cursor-pointer"
        ),
        "data-ocid": "voice-selector-trigger",
        "aria-label": "Select a voice",
        children: [
          selected === null && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Select a voice…" }),
          voices.map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: String(v.id), children: v.name }, String(v.id)))
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" })
  ] });
}
function HistoryRow({ record }) {
  const audioUrl = record.audioBlob.getDirectURL();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-md p-4 space-y-3",
      "data-ocid": "history-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed line-clamp-2 min-w-0 flex-1", children: record.text }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0 text-xs text-muted-foreground font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            formatTimestamp(record.createdAt)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AudioPlayer,
          {
            src: audioUrl,
            filename: `synthesis-${String(record.id)}.mp3`,
            compact: true
          }
        )
      ]
    }
  );
}
function Tts() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const [selectedVoiceId, setSelectedVoiceId] = reactExports.useState(
    null
  );
  const [text, setText] = reactExports.useState("");
  const [settings, setSettings] = reactExports.useState(
    DEFAULT_SYNTHESIS_SETTINGS
  );
  const [generatedAudioUrl, setGeneratedAudioUrl] = reactExports.useState(
    null
  );
  const [generatedFilename, setGeneratedFilename] = reactExports.useState("speech.mp3");
  const [error, setError] = reactExports.useState(null);
  const { data: allVoices = [], isLoading: voicesLoading } = useQuery({
    queryKey: ["voices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listVoiceProjects();
    },
    enabled: !!actor && !isFetching
  });
  const readyVoices = allVoices.filter(
    (v) => getCloneStatusKind(v.status) === "ready"
  );
  reactExports.useEffect(() => {
    if (readyVoices.length > 0 && selectedVoiceId === null) {
      setSelectedVoiceId(readyVoices[0].id);
    }
  }, [readyVoices, selectedVoiceId]);
  const { data: history = [], isLoading: historyLoading } = useQuery({
    queryKey: ["synthesis", String(selectedVoiceId)],
    queryFn: async () => {
      if (!actor || selectedVoiceId === null) return [];
      return actor.listSynthesisRecords(selectedVoiceId);
    },
    enabled: !!actor && !isFetching && selectedVoiceId !== null
  });
  const synthesize = useMutation({
    mutationFn: async () => {
      if (!actor || selectedVoiceId === null)
        throw new Error("No voice selected");
      const result = await actor.synthesizeSpeech({
        text,
        settings,
        projectId: selectedVoiceId
      });
      return result;
    },
    onSuccess: (record) => {
      setGeneratedAudioUrl(record.audioBlob.getDirectURL());
      setGeneratedFilename(`synthesis-${String(record.id)}.mp3`);
      setError(null);
      queryClient.invalidateQueries({
        queryKey: ["synthesis", String(selectedVoiceId)]
      });
    },
    onError: (err) => {
      const msg = err instanceof Error ? err.message : "Synthesis failed";
      setError(msg);
    }
  });
  const charCount = text.length;
  const charMax = 5e3;
  const canGenerate = selectedVoiceId !== null && charCount >= 10 && charCount <= charMax && !synthesize.isPending;
  const handleDownload = () => {
    if (!generatedAudioUrl) return;
    const a = document.createElement("a");
    a.href = generatedAudioUrl;
    a.download = generatedFilename;
    a.click();
  };
  if (!voicesLoading && readyVoices.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-screen-xl mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-[60vh] gap-6",
        "data-ocid": "tts-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full border-2 border-dashed border-accent/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-7 h-7 text-accent/60" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl uppercase tracking-widest text-foreground", children: "No Ready Voices" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "You need at least one cloned voice before generating speech. Create a voice clone first." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "font-display uppercase tracking-widest", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/clone/new", "data-ocid": "tts-create-clone-link", children: "Create Your First Clone" }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-screen-xl mx-auto px-4 py-6 space-y-6",
      "data-ocid": "tts-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl uppercase tracking-widest text-foreground", children: "Text-to-Speech" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "font-display text-xs uppercase tracking-widest border-accent/40 text-accent",
              children: "Synthesis"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-md p-5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs uppercase tracking-widest text-muted-foreground", children: "Input Text" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: cn(
                      "font-mono text-xs",
                      charCount > charMax ? "text-destructive" : charCount > charMax * 0.8 ? "text-yellow-500" : "text-muted-foreground"
                    ),
                    "data-ocid": "char-counter",
                    children: [
                      charCount.toLocaleString(),
                      " / ",
                      charMax.toLocaleString()
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  value: text,
                  onChange: (e) => setText(e.target.value),
                  placeholder: "Enter the text you want to synthesize into speech…",
                  className: "min-h-[200px] resize-none bg-secondary border-border font-body text-sm leading-relaxed focus-visible:ring-accent",
                  maxLength: charMax,
                  "data-ocid": "tts-text-input"
                }
              ),
              charCount > 0 && charCount < 10 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Minimum 10 characters required" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-md p-5 space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs uppercase tracking-widest text-muted-foreground block", children: "Voice Settings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SliderRow,
                {
                  label: "Stability",
                  value: settings.stability,
                  onChange: (v) => setSettings((s) => ({ ...s, stability: v }))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SliderRow,
                {
                  label: "Style",
                  value: settings.style,
                  onChange: (v) => setSettings((s) => ({ ...s, style: v }))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SliderRow,
                {
                  label: "Similarity Boost",
                  value: settings.similarityBoost,
                  onChange: (v) => setSettings((s) => ({ ...s, similarityBoost: v }))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-md p-5 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs uppercase tracking-widest text-muted-foreground block", children: "Voice" }),
              voicesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                VoiceSelector,
                {
                  voices: readyVoices,
                  selected: selectedVoiceId,
                  onSelect: (id) => {
                    setSelectedVoiceId(id);
                    setGeneratedAudioUrl(null);
                    setError(null);
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full h-12 font-display text-sm uppercase tracking-widest bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-40",
                disabled: !canGenerate,
                onClick: () => {
                  setError(null);
                  synthesize.mutate();
                },
                "data-ocid": "generate-btn",
                children: synthesize.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Synthesizing…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 mr-2" }),
                  "Generate Speech"
                ] })
              }
            ),
            error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/40 rounded-md",
                "data-ocid": "tts-error",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-destructive shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive leading-relaxed", children: error })
                ]
              }
            ),
            generatedAudioUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-md p-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs uppercase tracking-widest text-muted-foreground", children: "Generated Audio" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "h-7 px-2 font-display text-xs uppercase tracking-wide border-accent/40 text-accent hover:bg-accent/10",
                    onClick: handleDownload,
                    "data-ocid": "download-mp3-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3 mr-1" }),
                      "MP3"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                AudioPlayer,
                {
                  src: generatedAudioUrl,
                  filename: generatedFilename,
                  "data-ocid": "generated-audio-player"
                }
              )
            ] })
          ] })
        ] }),
        selectedVoiceId !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-t border-border pt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm uppercase tracking-widest text-foreground", children: "Synthesis History" }),
            history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "font-mono text-xs border-border text-muted-foreground",
                children: history.length
              }
            )
          ] }),
          historyLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full" }, k)) }) : history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-10 gap-3 bg-card border border-dashed border-border rounded-md",
              "data-ocid": "history-empty",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-8 h-8 text-muted-foreground/40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No synthesis records yet for this voice." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "history-list", children: [...history].sort((a, b) => Number(b.createdAt) - Number(a.createdAt)).map((record) => /* @__PURE__ */ jsxRuntimeExports.jsx(HistoryRow, { record }, String(record.id))) })
        ] })
      ]
    }
  );
}
export {
  Tts as default
};
