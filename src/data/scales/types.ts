/**
 * Data model for piano scales and their standard classical fingering
 * (right-hand and left-hand, thumb = 1 ... pinky = 5). This module is pure
 * data-shape definitions — no rendering, no app state.
 *
 * Deliberately kept separate from `data/keyboardChords/*` (the chord/
 * voicing model): a scale isn't a chord voicing (it's a strictly ordered,
 * single-note-at-a-time sequence, not a set of simultaneously-pressed
 * keys), so it gets its own small model here rather than being shoehorned
 * into `ChordVariant`. The one exception is `NoteName`, which is genuinely
 * instrument-agnostic (the 12 chromatic pitch classes), so it's re-exported
 * from the guitar module instead of being redefined here — matching the
 * convention already used by `data/keyboardChords/types.ts`.
 */

export type { NoteName } from '../chords/types'
import type { NoteName } from '../chords/types'

/** The two scale types this module seeds fingering for. */
export type ScaleType = 'major' | 'natural-minor'

/** Standard piano fingering numbers: thumb = 1 ... pinky = 5. */
export type FingerNumber = 1 | 2 | 3 | 4 | 5

/**
 * A single scale: its 7 ascending scale-degree notes, plus the standard
 * classical (RCM/ABRSM-style) right-hand and left-hand fingering for
 * playing it as a one-octave scale — 8 fingers each, covering the 7
 * scale-degree notes plus the repeated tonic an octave up.
 *
 * `rightHandFingering[i]`/`leftHandFingering[i]` for `i` in `0..6` is the
 * finger used for `notes[i]`; index `7` (the 8th entry) is the finger used
 * for the repeated tonic that closes out the octave.
 */
export interface Scale {
  root: NoteName
  type: ScaleType
  /** The 7 scale-degree notes, ascending from the root. */
  notes: NoteName[]
  /**
   * Right-hand fingering ascending the octave: 8 entries, one per note in
   * `notes` (indices 0-6) plus the repeated tonic that closes the octave
   * (index 7).
   */
  rightHandFingering: FingerNumber[]
  /** Left-hand fingering ascending the octave, same shape as `rightHandFingering`. */
  leftHandFingering: FingerNumber[]
}
