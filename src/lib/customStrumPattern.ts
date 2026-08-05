/**
 * Pure logic backing the "build your own pattern" step editor on the
 * Strumming Practice page. Kept framework-free (no React) so the resizing /
 * cycling / pattern-assembly logic is unit-testable on its own.
 *
 * The editor lets a learner toggle each 8th-note step through
 * down -> up -> mute -> rest (and back to down), pick how many steps the bar
 * has, and give it a title, then plugs the result into the same
 * `StrummingPlayer` used for the fixture library.
 */
import type {
  StrumStep,
  StrumStepType,
  StrummingPattern,
} from '../data/strumming/types'

/** Stable id used for the pattern assembled from the step editor. */
export const CUSTOM_PATTERN_ID = 'custom-pattern'

/** Step counts offered by the editor: half a bar, one bar, or two bars of 8th notes. */
export const CUSTOM_STEP_COUNT_OPTIONS = [4, 8, 16] as const
export type CustomStepCount = (typeof CUSTOM_STEP_COUNT_OPTIONS)[number]

/** Default step count: one bar of straight 8th notes, matching the fixtures. */
export const DEFAULT_CUSTOM_STEP_COUNT: CustomStepCount = 8

/** Default tempo the custom pattern starts at before the player's own tempo control is touched. */
export const DEFAULT_CUSTOM_TEMPO_BPM = 90

/** Fallback title shown when the user hasn't typed one of their own. */
export const DEFAULT_CUSTOM_TITLE = 'Custom Pattern'

/**
 * Cycle order a click steps through: down -> up -> mute -> rest -> down...
 * Starting a fresh bar from "rest" would be a silent, less inviting default,
 * so new steps are seeded as alternating down/up instead (see
 * `createDefaultCustomSteps`).
 */
const CYCLE_ORDER: StrumStepType[] = ['down', 'up', 'mute', 'rest']

/** Returns the next step type in the editor's toggle cycle. */
export function nextStepType(current: StrumStepType): StrumStepType {
  const index = CYCLE_ORDER.indexOf(current)
  return CYCLE_ORDER[(index + 1) % CYCLE_ORDER.length]
}

/**
 * A friendly starting point for a fresh custom pattern: straight alternating
 * down/up strums, the same shape as the "Steady Eighths" fixture, truncated
 * or repeated to fit `count` steps.
 */
export function createDefaultCustomSteps(count: number): StrumStep[] {
  return Array.from({ length: count }, (_, index) => ({
    type: index % 2 === 0 ? 'down' : 'up',
  }))
}

/** All steps silenced — a blank slate to build a pattern up from scratch. */
export function createRestSteps(count: number): StrumStep[] {
  return Array.from({ length: count }, () => ({ type: 'rest' }))
}

/**
 * Resizes a steps array to `count`, preserving existing step choices where
 * possible: truncates if shrinking, pads with rests if growing.
 */
export function resizeSteps(steps: StrumStep[], count: number): StrumStep[] {
  if (count <= steps.length) return steps.slice(0, count)
  return [...steps, ...createRestSteps(count - steps.length)]
}

/** Returns a copy of `steps` with the step at `index` advanced to its next type. */
export function cycleStepAt(steps: StrumStep[], index: number): StrumStep[] {
  return steps.map((step, stepIndex) =>
    stepIndex === index ? { ...step, type: nextStepType(step.type) } : step,
  )
}

/**
 * Assembles the editor's current draft (steps + title) into a
 * `StrummingPattern` the `StrummingPlayer` can render/play directly.
 */
export function buildCustomPattern(
  steps: StrumStep[],
  title: string,
): StrummingPattern {
  return {
    id: CUSTOM_PATTERN_ID,
    title: title.trim() || DEFAULT_CUSTOM_TITLE,
    description: 'Your own pattern — tap a step to change it.',
    tempoBpm: DEFAULT_CUSTOM_TEMPO_BPM,
    steps,
  }
}
