import { c as createLucideIcon, u as useQueryClient, r as reactExports, j as jsxRuntimeExports, h as Shield, S as Skeleton, B as Button } from "./index-idpaSJ1R.js";
import { C as CircleCheck, I as Input } from "./input-C9BHRbDw.js";
import { C as CircleAlert, L as Label } from "./label-BMj-scmd.js";
import { u as useBackend, a as ue } from "./index-fJNqdUIi.js";
import { u as useQuery } from "./backend-B83LWtGE.js";
import { u as useMutation } from "./useMutation-CmxFvUsc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
];
const Key = createLucideIcon("key", __iconNode);
function maskApiKey(key) {
  if (!key || key.length <= 4) return "••••";
  return `••••••••••••••••${key.slice(-4)}`;
}
function Settings() {
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();
  const [newKey, setNewKey] = reactExports.useState("");
  const [showInput, setShowInput] = reactExports.useState(false);
  const { data: currentKey, isLoading } = useQuery({
    queryKey: ["userApiKey"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getUserApiKey();
      if (Array.isArray(result) && result.length > 0)
        return result[0];
      return null;
    },
    enabled: !!actor && !isFetching
  });
  reactExports.useEffect(() => {
    if (!currentKey) setShowInput(true);
  }, [currentKey]);
  const saveMutation = useMutation({
    mutationFn: async (key) => {
      if (!actor) throw new Error("Not connected");
      await actor.setUserApiKey(key);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userApiKey"] });
      ue.success("API key saved successfully", {
        description: "Your ElevenLabs API key has been stored securely."
      });
      setNewKey("");
      setShowInput(false);
    },
    onError: () => {
      ue.error("Failed to save API key", {
        description: "Please try again."
      });
    }
  });
  const handleSave = () => {
    const trimmed = newKey.trim();
    if (!trimmed) {
      ue.error("Please enter a valid API key");
      return;
    }
    saveMutation.mutate(trimmed);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-screen-md mx-auto px-4 py-10 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-medium text-foreground uppercase tracking-wider mb-1", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage your account preferences and integrations." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-accent/30 bg-accent/5 p-4 flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-accent shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display text-accent uppercase tracking-wide", children: "ElevenLabs Integration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "An ElevenLabs API key is required for voice cloning and text-to-speech synthesis. Your key is stored securely and only used to make requests on your behalf." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "https://elevenlabs.io/app/subscription",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors mt-1",
            children: [
              "Get your API key at elevenlabs.io",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-6 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm uppercase tracking-wider text-foreground", children: "ElevenLabs API Key" })
      ] }),
      isLoading || isFetching ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-full" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        currentKey && !showInput && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-md border border-border bg-secondary px-3 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-accent shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground tracking-widest truncate", children: maskApiKey(currentKey) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setShowInput(true),
              "data-ocid": "settings-change-key",
              className: "h-6 px-2 text-xs font-display uppercase tracking-wide text-muted-foreground hover:text-foreground shrink-0 ml-2",
              children: "Change"
            }
          )
        ] }),
        !currentKey && !showInput && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 text-destructive shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "No API key configured — voice features are unavailable." })
        ] }),
        showInput && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: "api-key-input",
                className: "font-display text-xs uppercase tracking-wide text-muted-foreground",
                children: currentKey ? "Enter New API Key" : "Enter API Key"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "api-key-input",
                type: "password",
                placeholder: "sk_...",
                value: newKey,
                onChange: (e) => setNewKey(e.target.value),
                onKeyDown: handleKeyDown,
                autoFocus: true,
                "data-ocid": "settings-api-key-input",
                className: "font-mono text-sm bg-input border-input focus:ring-accent"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your key is stored encrypted and never exposed in the UI." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleSave,
                disabled: saveMutation.isPending || !newKey.trim(),
                "data-ocid": "settings-save-key",
                className: "font-display text-xs uppercase tracking-wide h-8 px-4",
                children: saveMutation.isPending ? "Saving…" : "Save Key"
              }
            ),
            currentKey && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  setShowInput(false);
                  setNewKey("");
                },
                "data-ocid": "settings-cancel-key",
                className: "h-8 px-3 font-display text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground",
                children: "Cancel"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "API keys are stored per-user and never shared across accounts." })
  ] });
}
export {
  Settings as default
};
