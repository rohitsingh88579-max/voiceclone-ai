import { c as createLucideIcon } from "./index-idpaSJ1R.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode);
function getCloneStatusKind(status) {
  return status.__kind__;
}
function getCloneStatusLabel(status) {
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
function formatTimestamp(ts) {
  const ms = Number(ts) / 1e6;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
const DEFAULT_SYNTHESIS_SETTINGS = {
  stability: 0.5,
  similarityBoost: 0.75,
  style: 0
};
export {
  ChevronDown as C,
  DEFAULT_SYNTHESIS_SETTINGS as D,
  getCloneStatusLabel as a,
  formatTimestamp as f,
  getCloneStatusKind as g
};
