import { createActor } from "@/backend";
import type { backendInterface } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";

/**
 * Pre-bound useActor hook for the voice lab backend.
 * Import this instead of useActor directly.
 */
export function useBackend(): {
  actor: backendInterface | null;
  isFetching: boolean;
} {
  return useActor(createActor) as {
    actor: backendInterface | null;
    isFetching: boolean;
  };
}
