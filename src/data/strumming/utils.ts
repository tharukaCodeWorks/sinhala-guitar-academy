import type { StrumStep, StrumStepType } from './types'

/** Lowest sane tempo the tempo control allows. */
export const MIN_TEMPO_BPM = 40
/** Highest sane tempo the tempo control allows. */
export const MAX_TEMPO_BPM = 220

/** Duration, in seconds, of a single 8th-note step at the given quarter-note tempo. */
export function stepDurationSeconds(tempoBpm: number): number {
  const quarterNoteSeconds = 60 / tempoBpm
  return quarterNoteSeconds / 2
}

/** Total time, in seconds, to play through one full loop of a pattern's steps once. */
export function patternDurationSeconds(
  steps: StrumStep[],
  tempoBpm: number,
): number {
  return steps.length * stepDurationSeconds(tempoBpm)
}

/** Clamps a tempo value to the player's supported BPM range. */
export function clampTempoBpm(tempoBpm: number): number {
  return Math.min(MAX_TEMPO_BPM, Math.max(MIN_TEMPO_BPM, tempoBpm))
}

/** Short glyph used to render a step's direction/type in the visual player. */
export function stepGlyph(type: StrumStepType): string {
  switch (type) {
    case 'down':
      return '↓'
    case 'up':
      return '↑'
    case 'mute':
      return '✕'
    case 'rest':
      return '·'
  }
}

/** Human-readable label for a step type, used for accessible text. */
export function stepLabel(type: StrumStepType): string {
  switch (type) {
    case 'down':
      return 'Downstroke'
    case 'up':
      return 'Upstroke'
    case 'mute':
      return 'Mute'
    case 'rest':
      return 'Rest'
  }
}
