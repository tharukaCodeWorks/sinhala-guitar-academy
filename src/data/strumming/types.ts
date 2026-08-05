/**
 * Strumming-pattern data model.
 *
 * A pattern is an ordered sequence of "steps", one per 8th-note subdivision
 * of a single bar — so a bar of common 4/4 time is 8 steps, one for each of
 * "1 & 2 & 3 & 4 &". Playing a pattern means looping this sequence at the
 * given tempo. Each step is one of:
 *  - 'down' : a downstroke strum
 *  - 'up'   : an upstroke strum
 *  - 'mute' : a muted/percussive strum (palm-muted chunk, no ringing chord)
 *  - 'rest' : silence — the strumming hand keeps moving but doesn't strike
 *             the strings
 */
export type StrumStepType = 'down' | 'up' | 'mute' | 'rest'

export interface StrumStep {
  type: StrumStepType
  /**
   * Marks this step as accented/emphasized (played louder/harder). Optional,
   * defaults to `false`.
   */
  accent?: boolean
}

export interface StrummingPattern {
  /** Stable identifier, e.g. used as a React `key` when listing patterns. */
  id: string
  title: string
  /** Optional short description shown above the player. */
  description?: string
  /** Ordered 8th-note steps making up one bar of the pattern; loops when played. */
  steps: StrumStep[]
  /**
   * Default tempo in quarter-note beats per minute. The player's tempo
   * control initializes from this value but can be adjusted by the user.
   */
  tempoBpm: number
}
