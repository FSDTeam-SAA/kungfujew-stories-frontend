export interface EngagementState {
  activeSeconds: number
  progress: number
}

export function articleProgress(rect: { top: number; height: number }, viewportHeight: number): number {
  if (rect.height <= 0) return 0
  return Math.min(100, Math.max(0, (viewportHeight - rect.top) / rect.height * 100))
}

export function advanceEngagement(state: EngagementState, seconds: number, active: boolean, progress: number): EngagementState {
  if (!active) return state
  return {
    activeSeconds: Math.min(86400, state.activeSeconds + Math.max(0, seconds)),
    progress: Math.max(state.progress, Math.min(100, Math.max(0, progress))),
  }
}
