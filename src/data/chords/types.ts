/**
 * Data model for guitar chords and their fretboard-diagram-ready shapes
 * (voicings). This module is pure data-shape definitions — no rendering, no
 * app state. `components/` for a fretboard diagram and any chord-picking UI
 * are expected to import these types (and the seeded data in `library.ts`)
 * rather than redefine them.
 */

/** The 12 chromatic note names, using sharps as the canonical spelling. */
export type NoteName =
  'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'

/** The chord qualities seeded/supported by the library. */
export type ChordQuality =
  'major' | 'minor' | '7th' | 'maj7' | 'min7' | 'sus2' | 'sus4'

/**
 * The state of a single string within a chord voicing:
 * - a `number` is the fret to press (relative to the nut, i.e. the actual
 *   fret you'd put a finger on — e.g. `3` always means "3rd fret").
 * - `'open'` means the string is played un-fretted.
 * - `'muted'` means the string is not played (typically shown as an "x").
 */
export type StringPosition = number | 'muted' | 'open'

/** Which fretting finger (index=1 ... pinky=4) stops a given string. */
export type FingerNumber = 1 | 2 | 3 | 4

/**
 * Per-string finger assignment. `null` for strings that are open or muted
 * (nothing to fret). For barre shapes, the barre finger (always `1`) is
 * repeated on every string it covers, matching how fingering is normally
 * shown on a chord chart.
 */
export type Fingering = FingerNumber | null

/** Coarse difficulty rating, primarily driven by whether a barre is needed. */
export type ChordDifficulty = 'beginner' | 'intermediate' | 'advanced'

/**
 * A tuple of exactly 6 entries, ordered from the lowest-pitched string to
 * the highest-pitched string in standard tuning, i.e.:
 * `[E(6th), A(5th), D(4th), G(3rd), B(2nd), e(1st)]`.
 */
export type SixStringTuple<T> = [T, T, T, T, T, T]

/**
 * One playable fingering ("shape"/voicing) of a chord — e.g. the open-position
 * shape, or a barre shape higher up the neck.
 */
export interface ChordVariant {
  /** Stable identifier, unique within the library (e.g. `'c-major-open'`). */
  id: string
  /** Human-readable label for this shape, e.g. `'Open'` or `'Barre (1st fret)'`. */
  label: string
  /**
   * The lowest fret shown/used by this shape. `1` for open-position shapes
   * (nut + open strings included), or the barre fret for moveable shapes.
   */
  baseFret: number
  /** Per-string fret/open/muted state, low E to high e. */
  strings: SixStringTuple<StringPosition>
  /** Per-string fretting finger, low E to high e. */
  fingering: SixStringTuple<Fingering>
  difficulty: ChordDifficulty
}

/** A named chord (root + quality) and every voicing seeded for it. */
export interface Chord {
  /** Stable identifier, unique within the library (e.g. `'c-major'`). */
  id: string
  /** Display name, e.g. `'C'`, `'Am'`, `'B7'`. */
  name: string
  root: NoteName
  quality: ChordQuality
  variants: ChordVariant[]
}
