/**
 * Data model for keyboard/piano chords and their on-screen-keyboard-diagram-
 * ready voicings. This module is pure data-shape definitions — no rendering,
 * no app state. `components/` for a keyboard diagram and the chord library
 * page are expected to import these types (and the seeded data in
 * `library.ts`) rather than redefine them.
 *
 * Deliberately kept separate from `data/chords/*` (the guitar chord model):
 * guitar's `ChordVariant` is fretboard/string-specific and not a fit for
 * keys, and this repo's convention is flat, per-domain data modules rather
 * than a shared/generalized instrument abstraction (see `src/README.md`).
 * The one exception is `NoteName`, which is genuinely instrument-agnostic
 * (the 12 chromatic pitch classes), so it's re-exported from the guitar
 * module instead of being redefined here.
 */

export type { NoteName } from '../chords/types'
import type { NoteName } from '../chords/types'

/**
 * The chord qualities seeded/supported by the library. Unlike the guitar
 * library (`data/chords`), this includes `'diminished'` so every diatonic
 * scale degree — including the vii°/ii° degree of a major or minor chord
 * family — can resolve to a real voicing (see `src/lib/chordFamily.ts`'s
 * `FamilyDegree.chord` comment for the guitar-side gap this closes).
 */
export type ChordQuality =
  'major' | 'minor' | '7th' | 'maj7' | 'min7' | 'sus2' | 'sus4' | 'diminished'

/** Standard piano fingering numbers: thumb = 1 ... pinky = 5. */
export type FingerNumber = 1 | 2 | 3 | 4 | 5

/**
 * A single played note within a chord voicing.
 * - `note` is the pitch class played.
 * - `octaveOffset` places the note relative to a fixed reference octave
 *   chosen per-chord: in the root-position variant, the root note is
 *   `octaveOffset: 0` and every other note's offset reflects how many
 *   octaves above the root it sits. Other variants (inversions) reuse that
 *   same reference octave: e.g. a 1st inversion is the root-position
 *   voicing with the root's `octaveOffset` incremented by 1 (moving the
 *   root above the other chord tones), then every entry re-sorted into
 *   ascending pitch order. The whole voicing stays octave-agnostic and can
 *   be transposed to any starting octave by adding the same constant to
 *   every entry's `octaveOffset`.
 * - `finger` is the suggested right-hand fingering for a compact ("close")
 *   voicing played with one hand, or `null` if unspecified.
 */
export interface KeyPress {
  note: NoteName
  octaveOffset: number
  finger: FingerNumber | null
}

/** Coarse difficulty rating for a specific voicing. */
export type ChordDifficulty = 'beginner' | 'intermediate' | 'advanced'

/** Which chord tone is voiced as the lowest (bass) note. */
export type Inversion = 'root' | 'first' | 'second'

/**
 * One playable voicing of a chord — e.g. root position, or an inversion
 * that puts a different chord tone in the bass.
 */
export interface ChordVariant {
  /** Stable identifier, unique within the library (e.g. `'c-major-root'`). */
  id: string
  /** Human-readable label, e.g. `'Root position'` or `'1st inversion'`. */
  label: string
  inversion: Inversion
  /**
   * The notes played, ordered from lowest to highest pitch. 3 entries for a
   * triad (major/minor/sus2/sus4/diminished), 4 for a 7th-family chord
   * (7th/maj7/min7).
   */
  keys: KeyPress[]
  difficulty: ChordDifficulty
}

/** A named chord (root + quality) and every voicing seeded for it. */
export interface KeyboardChord {
  /** Stable identifier, unique within the library (e.g. `'c-major'`). */
  id: string
  /** Display name, e.g. `'C'`, `'Am'`, `'B7'`, `'C#dim'`. */
  name: string
  root: NoteName
  quality: ChordQuality
  variants: ChordVariant[]
}
