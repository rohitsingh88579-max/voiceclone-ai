import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn, B as Button, M as Mic, L as Link, b as Library } from "./index-idpaSJ1R.js";
import { a as useActor, E as ExternalBlob, c as createActor } from "./backend-B83LWtGE.js";
import { B as Badge, S as Square, P as Pause, a as Play, A as AudioPlayer } from "./badge-Dw-GdO7m.js";
import { C as CircleCheck, I as Input } from "./input-C9BHRbDw.js";
import { P as Primitive, L as Label, C as CircleAlert } from "./label-BMj-scmd.js";
import { T as Textarea } from "./textarea-BJvbeEb4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2", key: "80xlxr" }],
  ["path", { d: "M5 10v2a7 7 0 0 0 12 5", key: "p2k8kg" }],
  ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33", key: "1gzdoj" }],
  ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12", key: "r2i35w" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
];
const MicOff = createLucideIcon("mic-off", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function useVoiceRecorder() {
  const [recordingState, setRecordingState] = reactExports.useState("idle");
  const [audioBlob, setAudioBlob] = reactExports.useState(null);
  const [audioUrl, setAudioUrl] = reactExports.useState(null);
  const [duration, setDuration] = reactExports.useState(0);
  const [analyserNode, setAnalyserNode] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const mediaRecorderRef = reactExports.useRef(null);
  const chunksRef = reactExports.useRef([]);
  const timerRef = reactExports.useRef(null);
  const audioContextRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    return () => {
      var _a;
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      (_a = audioContextRef.current) == null ? void 0 : _a.close();
    };
  }, [audioUrl]);
  const startRecording = reactExports.useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext();
      audioContextRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      setAnalyserNode(analyser);
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "audio/webm";
      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        var _a;
        const blob = new Blob(chunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        for (const t of stream.getTracks()) t.stop();
        (_a = audioContextRef.current) == null ? void 0 : _a.close();
        setAnalyserNode(null);
      };
      recorder.start(100);
      setRecordingState("recording");
      setDuration(0);
      timerRef.current = setInterval(() => {
        setDuration((d) => d + 1);
      }, 1e3);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Microphone access denied";
      setError(msg);
    }
  }, []);
  const stopRecording = reactExports.useCallback(() => {
    if (mediaRecorderRef.current && recordingState !== "idle") {
      mediaRecorderRef.current.stop();
      setRecordingState("stopped");
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [recordingState]);
  const pauseRecording = reactExports.useCallback(() => {
    if (mediaRecorderRef.current && recordingState === "recording") {
      mediaRecorderRef.current.pause();
      setRecordingState("paused");
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [recordingState]);
  const resumeRecording = reactExports.useCallback(() => {
    if (mediaRecorderRef.current && recordingState === "paused") {
      mediaRecorderRef.current.resume();
      setRecordingState("recording");
      timerRef.current = setInterval(() => {
        setDuration((d) => d + 1);
      }, 1e3);
    }
  }, [recordingState]);
  const resetRecording = reactExports.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (mediaRecorderRef.current) {
      if (recordingState === "recording" || recordingState === "paused") {
        mediaRecorderRef.current.stop();
      }
    }
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setRecordingState("idle");
    setAudioBlob(null);
    setAudioUrl(null);
    setDuration(0);
    setAnalyserNode(null);
    setError(null);
    chunksRef.current = [];
  }, [recordingState, audioUrl]);
  return {
    recordingState,
    audioBlob,
    audioUrl,
    duration,
    analyserNode,
    error,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    resetRecording
  };
}
function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
const STEPS = [
  { id: "project", label: "Create Project", num: 1 },
  { id: "record", label: "Add Audio", num: 2 },
  { id: "clone", label: "Clone Voice", num: 3 }
];
function StepIndicator({
  current,
  completed
}) {
  const order = STEPS.map((s) => s.id);
  const currentIdx = order.indexOf(current);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0 mb-8", "data-ocid": "wizard-steps", children: STEPS.map((step, i) => {
    const isDone = completed.includes(step.id);
    const isActive = step.id === current;
    const stepIdx = order.indexOf(step.id);
    const isPast = stepIdx < currentIdx;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-8 h-8 rounded-sm flex items-center justify-center border text-xs font-display font-medium transition-smooth",
              isDone || isPast ? "bg-accent border-accent text-accent-foreground" : isActive ? "bg-primary/10 border-primary text-primary" : "bg-secondary border-border text-muted-foreground"
            ),
            children: isDone || isPast ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : step.num
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "text-xs font-display uppercase tracking-wide",
              isActive ? "text-primary" : "text-muted-foreground"
            ),
            children: step.label
          }
        )
      ] }),
      i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "w-16 h-px mx-2 mb-5 transition-smooth",
            isPast || isDone ? "bg-accent" : "bg-border"
          )
        }
      )
    ] }, step.id);
  }) });
}
function LiveWaveform({ analyser }) {
  const canvasRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
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
      const barW = w / bufferLength * 2.5;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const barH = dataArray[i] / 255 * h;
        const alpha = 0.4 + dataArray[i] / 255 * 0.6;
        ctx.fillStyle = `oklch(0.6 0.24 244 / ${alpha})`;
        ctx.fillRect(x, h - barH, barW, barH);
        x += barW + 1;
      }
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [analyser]);
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
      { id: "b19", h: 45 }
    ];
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1 h-16 px-2", children: bars.map(({ id, h }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-1 bg-border rounded-sm transition-smooth",
        style: { height: `${h}%` }
      },
      id
    )) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      width: 480,
      height: 64,
      className: "w-full h-16 rounded-sm",
      "aria-label": "Live waveform visualization"
    }
  );
}
function DropZone({
  onFile,
  uploaded,
  onClear
}) {
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onFile(file);
    },
    [onFile]
  );
  const handleChange = reactExports.useCallback(
    (e) => {
      var _a;
      const file = (_a = e.target.files) == null ? void 0 : _a[0];
      if (file) onFile(file);
    },
    [onFile]
  );
  if (uploaded) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "border border-accent/40 bg-accent/5 rounded-sm p-4 flex items-center gap-3",
        "data-ocid": "file-uploaded",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-accent/10 border border-accent/30 rounded-sm flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-display text-foreground truncate", children: uploaded.file.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground font-mono", children: [
              (uploaded.file.size / 1024 / 1024).toFixed(2),
              " MB"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: "w-7 h-7 text-muted-foreground hover:text-foreground shrink-0",
              onClick: onClear,
              "aria-label": "Remove uploaded file",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      tabIndex: 0,
      onDrop: handleDrop,
      onDragOver: (e) => {
        e.preventDefault();
        setIsDragging(true);
      },
      onDragLeave: () => setIsDragging(false),
      onClick: () => {
        var _a;
        return (_a = inputRef.current) == null ? void 0 : _a.click();
      },
      className: cn(
        "w-full border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-smooth select-none",
        isDragging ? "border-accent bg-accent/10" : "border-border hover:border-accent/40 hover:bg-secondary/50"
      ),
      "data-ocid": "drop-zone",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-5 h-5 text-muted-foreground mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display uppercase tracking-wide text-muted-foreground", children: "Drop .WAV, .MP3 or .WebM" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          "or",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent underline underline-offset-2", children: "Select File" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            type: "file",
            accept: "audio/wav,audio/mp3,audio/mpeg,audio/webm",
            className: "hidden",
            onChange: handleChange,
            "data-ocid": "file-input",
            "aria-label": "Select audio file"
          }
        )
      ]
    }
  );
}
function StepProject({
  onNext
}) {
  const { actor, isFetching } = useActor(createActor);
  const [name, setName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!actor || !name.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const project = await actor.createVoiceProject({
        name: name.trim(),
        description: description.trim()
      });
      onNext(project);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-5",
      "data-ocid": "step-project-form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: "voice-name",
              className: "font-display text-xs uppercase tracking-widest text-muted-foreground",
              children: "Voice Name"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "voice-name",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "e.g. Echo Prime, Studio Narrator...",
              className: "font-body bg-secondary border-border focus:border-accent/60 h-10",
              required: true,
              maxLength: 60,
              "data-ocid": "project-name-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label,
            {
              htmlFor: "voice-desc",
              className: "font-display text-xs uppercase tracking-widest text-muted-foreground",
              children: [
                "Description",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "normal-case tracking-normal text-muted-foreground/60", children: "(optional)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "voice-desc",
              value: description,
              onChange: (e) => setDescription(e.target.value),
              placeholder: "Describe the voice, intended use, or speaker characteristics...",
              className: "font-body bg-secondary border-border focus:border-accent/60 resize-none h-20",
              maxLength: 300,
              "data-ocid": "project-desc-input"
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-sm text-sm text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: !name.trim() || loading || isFetching,
            className: "w-full h-10 font-display text-xs uppercase tracking-widest",
            "data-ocid": "project-submit-btn",
            children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" }),
              "Creating..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              "Create Project",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
            ] })
          }
        )
      ]
    }
  );
}
function StepRecord({
  project,
  onNext
}) {
  const recorder = useVoiceRecorder();
  const [tab, setTab] = reactExports.useState("record");
  const [uploaded, setUploaded] = reactExports.useState(null);
  const [audioSource, setAudioSource] = reactExports.useState(null);
  const handleFile = reactExports.useCallback((file) => {
    const url = URL.createObjectURL(file);
    setUploaded({ file, url });
    setAudioSource("uploaded");
  }, []);
  const handleClearUpload = reactExports.useCallback(() => {
    if (uploaded) URL.revokeObjectURL(uploaded.url);
    setUploaded(null);
    setAudioSource(null);
  }, [uploaded]);
  reactExports.useEffect(() => {
    if (recorder.recordingState === "stopped" && recorder.audioBlob) {
      setAudioSource("recorded");
    }
  }, [recorder.recordingState, recorder.audioBlob]);
  const handleReset = () => {
    recorder.resetRecording();
    setAudioSource(null);
  };
  const activeBlob = audioSource === "recorded" ? recorder.audioBlob : audioSource === "uploaded" ? (uploaded == null ? void 0 : uploaded.file) ?? null : null;
  const activeUrl = audioSource === "recorded" ? recorder.audioUrl : audioSource === "uploaded" ? (uploaded == null ? void 0 : uploaded.url) ?? null : null;
  const activeFilename = audioSource === "uploaded" ? uploaded == null ? void 0 : uploaded.file.name : "voice-sample.webm";
  const canProceed = !!activeBlob;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", "data-ocid": "step-record", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Badge,
      {
        variant: "secondary",
        className: "font-display text-xs uppercase tracking-wide border-border",
        children: [
          "Project: ",
          project.name
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex border border-border rounded-sm overflow-hidden",
        "data-ocid": "record-tab-switcher",
        children: ["record", "upload"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setTab(t),
            className: cn(
              "flex-1 py-2 text-xs font-display uppercase tracking-wide transition-smooth",
              tab === t ? "bg-primary/10 text-primary border-r-0" : "bg-secondary text-muted-foreground hover:text-foreground"
            ),
            "data-ocid": `tab-${t}`,
            children: t === "record" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-3.5 h-3.5" }),
              "Record"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-3.5 h-3.5" }),
              "Upload"
            ] })
          },
          t
        ))
      }
    ),
    tab === "record" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary border border-border rounded-sm p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "w-2 h-2 rounded-full transition-smooth",
                  recorder.recordingState === "recording" ? "bg-destructive animate-pulse" : recorder.recordingState === "paused" ? "bg-accent" : "bg-border"
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display uppercase tracking-widest text-muted-foreground", children: recorder.recordingState === "recording" ? "Recording" : recorder.recordingState === "paused" ? "Paused" : recorder.recordingState === "stopped" ? "Done" : "Ready" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-mono text-lg text-foreground tabular-nums",
              "data-ocid": "recording-timer",
              children: formatDuration(recorder.duration)
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LiveWaveform, { analyser: recorder.analyserNode })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        recorder.recordingState === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: recorder.startRecording,
            className: "flex-1 h-10 font-display text-xs uppercase tracking-widest bg-destructive/80 hover:bg-destructive border-destructive/50 text-destructive-foreground",
            "data-ocid": "btn-start-recording",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4 mr-1.5" }),
              "Start Recording"
            ]
          }
        ),
        recorder.recordingState === "recording" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: recorder.stopRecording,
              className: "flex-1 h-10 font-display text-xs uppercase tracking-widest border-border",
              "data-ocid": "btn-stop-recording",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-3.5 h-3.5 mr-1.5" }),
                "Stop"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: recorder.pauseRecording,
              className: "h-10 w-10 border-border",
              "data-ocid": "btn-pause-recording",
              "aria-label": "Pause",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              onClick: handleReset,
              className: "h-10 w-10 text-muted-foreground",
              "data-ocid": "btn-restart-recording",
              "aria-label": "Restart",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        recorder.recordingState === "paused" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: recorder.resumeRecording,
              className: "flex-1 h-10 font-display text-xs uppercase tracking-widest border-accent/40 text-accent hover:bg-accent/10",
              "data-ocid": "btn-resume-recording",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5 mr-1.5" }),
                "Resume"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: recorder.stopRecording,
              className: "h-10 w-10 border-border",
              "data-ocid": "btn-stop-paused",
              "aria-label": "Stop",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "w-3.5 h-3.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              onClick: handleReset,
              className: "h-10 w-10 text-muted-foreground",
              "data-ocid": "btn-restart-paused",
              "aria-label": "Restart",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        recorder.recordingState === "stopped" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            onClick: handleReset,
            className: "h-10 font-display text-xs uppercase tracking-widest text-muted-foreground",
            "data-ocid": "btn-re-record",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Re-record"
            ]
          }
        )
      ] }),
      recorder.error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-2 bg-destructive/10 border border-destructive/30 rounded-sm text-xs text-destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: recorder.error })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Speak naturally for at least 30 seconds. Longer samples produce better clones." })
    ] }),
    tab === "upload" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DropZone,
      {
        onFile: handleFile,
        uploaded,
        onClear: handleClearUpload
      }
    ),
    activeUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-display uppercase tracking-widest text-muted-foreground", children: "Preview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AudioPlayer, { src: activeUrl, filename: activeFilename })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        disabled: !canProceed,
        onClick: () => {
          if (activeBlob && activeFilename) {
            onNext(activeBlob, activeFilename);
          }
        },
        className: "w-full h-10 font-display text-xs uppercase tracking-widest",
        "data-ocid": "btn-proceed-to-clone",
        children: [
          "Proceed to Clone",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 ml-1.5" })
        ]
      }
    )
  ] });
}
function StepClone({
  project,
  audioBlob,
  audioFilename
}) {
  const { actor } = useActor(createActor);
  const [phase, setPhase] = reactExports.useState("idle");
  const [progress, setProgress] = reactExports.useState(0);
  const [errorMsg, setErrorMsg] = reactExports.useState(null);
  const run = reactExports.useCallback(async () => {
    if (!actor) return;
    setPhase("uploading");
    setProgress(5);
    setErrorMsg(null);
    try {
      const bytes = new Uint8Array(await audioBlob.arrayBuffer());
      const externalBlob = ExternalBlob.fromBytes(bytes).withUploadProgress(
        (pct) => {
          setProgress(5 + Math.round(pct * 0.45));
        }
      );
      const sampleId = await actor.uploadVoiceSample(
        project.id,
        audioFilename,
        externalBlob
      );
      setProgress(55);
      setPhase("cloning");
      const elevenLabsVoiceId = await actor.startVoiceCloning({
        sampleIds: [sampleId],
        projectId: project.id
      });
      setProgress(85);
      setPhase("registering");
      await actor.registerClonedVoice(project.id, elevenLabsVoiceId);
      setProgress(100);
      setPhase("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Voice cloning failed");
      setPhase("error");
    }
  }, [actor, audioBlob, audioFilename, project]);
  const phaseLabel = {
    idle: "Ready to clone",
    uploading: "Uploading audio sample...",
    cloning: "Cloning voice with AI...",
    registering: "Registering voice...",
    success: "Voice cloned successfully!",
    error: "Cloning failed"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "step-clone", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "secondary",
          className: "font-display text-xs uppercase tracking-wide border-border",
          children: [
            "Project: ",
            project.name
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: "secondary",
          className: "font-display text-xs border-border text-muted-foreground",
          children: audioFilename
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary border border-border rounded-sm p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-10 h-10 rounded-sm flex items-center justify-center border transition-smooth",
              phase === "success" ? "bg-accent/10 border-accent/40" : phase === "error" ? "bg-destructive/10 border-destructive/30" : phase !== "idle" ? "bg-primary/10 border-primary/30" : "bg-muted border-border"
            ),
            children: phase === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-accent" }) : phase === "error" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-destructive" }) : phase !== "idle" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-primary/40 border-t-primary animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-5 h-5 text-muted-foreground" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-sm text-foreground uppercase tracking-wide", children: phaseLabel[phase] }),
          phase !== "idle" && phase !== "success" && phase !== "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground font-mono mt-0.5", children: [
            progress,
            "%"
          ] })
        ] })
      ] }),
      phase !== "idle" && phase !== "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Progress,
        {
          value: progress,
          className: "h-1.5 bg-muted",
          "data-ocid": "clone-progress"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: [
        { key: "uploading", label: "Upload audio to secure storage" },
        { key: "cloning", label: "AI voice cloning via ElevenLabs" },
        { key: "registering", label: "Register voice in your library" }
      ].map(({ key, label }) => {
        const phaseOrder = [
          "uploading",
          "cloning",
          "registering",
          "success"
        ];
        const keyIdx = phaseOrder.indexOf(key);
        const curIdx = phaseOrder.indexOf(phase);
        const done = curIdx > keyIdx || phase === "success";
        const active = phase === key;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "w-4 h-4 rounded-sm flex items-center justify-center border shrink-0 transition-smooth",
                done ? "bg-accent/10 border-accent/40 text-accent" : active ? "border-primary/40 bg-primary/5" : "border-border bg-muted"
              ),
              children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5" }) : active ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full border border-primary/60 border-t-primary animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-border" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                done ? "text-foreground" : active ? "text-primary" : "text-muted-foreground"
              ),
              children: label
            }
          )
        ] }, key);
      }) })
    ] }),
    errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-sm text-sm text-destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: errorMsg })
    ] }),
    phase === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        onClick: run,
        disabled: !actor,
        className: "w-full h-10 font-display text-xs uppercase tracking-widest",
        "data-ocid": "btn-start-cloning",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "w-4 h-4 mr-1.5" }),
          "Start Voice Cloning"
        ]
      }
    ),
    phase === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "outline",
        onClick: run,
        className: "w-full h-10 font-display text-xs uppercase tracking-widest border-border",
        "data-ocid": "btn-retry-clone",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-1.5" }),
          "Retry"
        ]
      }
    ),
    phase === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-accent/5 border border-accent/30 rounded-sm text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-6 h-6 text-accent mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display uppercase tracking-wide text-foreground", children: "Voice Clone Ready" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-body mt-1", children: [
          '"',
          project.name,
          '" is now available in your Voice Library'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/library", "data-ocid": "btn-go-to-library", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full h-10 font-display text-xs uppercase tracking-widest", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Library, { className: "w-4 h-4 mr-1.5" }),
        "Go to Voice Library"
      ] }) })
    ] })
  ] });
}
function NewClone() {
  const [step, setStep] = reactExports.useState("project");
  const [completed, setCompleted] = reactExports.useState([]);
  const [project, setProject] = reactExports.useState(null);
  const [audioBlob, setAudioBlob] = reactExports.useState(null);
  const [audioFilename, setAudioFilename] = reactExports.useState("");
  const handleProjectCreated = (p) => {
    setProject(p);
    setCompleted((c) => [...c, "project"]);
    setStep("record");
  };
  const handleAudioReady = (blob, filename) => {
    setAudioBlob(blob);
    setAudioFilename(filename);
    setCompleted((c) => [...c, "record"]);
    setStep("clone");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-7rem)] bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-sm mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-medium uppercase tracking-wider text-foreground", children: "New Voice Clone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body mt-1", children: "Record or upload audio samples to create a custom AI voice clone." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { current: step, completed }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-sm p-6",
        "data-ocid": "wizard-panel",
        children: [
          step === "project" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm uppercase tracking-widest text-foreground mb-1", children: "01 — Create Voice Project" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Give your voice clone a name so it can be found in your library." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StepProject, { onNext: handleProjectCreated })
          ] }),
          step === "record" && project && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm uppercase tracking-widest text-foreground mb-1", children: "02 — Add Audio Sample" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Record from your microphone or upload an existing audio file." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StepRecord, { project, onNext: handleAudioReady })
          ] }),
          step === "clone" && project && audioBlob && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm uppercase tracking-widest text-foreground mb-1", children: "03 — Clone Voice" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body", children: "Your sample will be securely uploaded and processed by our AI engine." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StepClone,
              {
                project,
                audioBlob,
                audioFilename
              }
            )
          ] })
        ]
      }
    )
  ] }) });
}
export {
  NewClone as default
};
