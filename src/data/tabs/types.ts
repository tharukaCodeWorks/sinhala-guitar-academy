/**
 * Guitar tab data model.
 *
 * A tab is an ordered sequence of "positions" grouped into measures. Each
 * position holds one fret value (or a rest) per string, for all six
 * strings simultaneously — this lets a position represent a single note,
 * a partial chord shape, or a full chord strum at that point in time.
 *
 * String order in `frets` is fixed as index 0 = lowest-pitched string
 * (low E in standard tuning) through index 5 = highest-pitched string
 * (high e in standard tuning) — i.e. the same order the strings are
 * numbered on the instrument from low to high, NOT the order they are
 * drawn on screen (tab notation is conventionally drawn high string on
 * top, low string on bottom — that's a rendering concern, handled by
 * `TabDisplay`, not part of the data model).
 */

/** A fret number for a string at a given position, or `null` if the string is not played. */
export type Fret = number | null

/** Fret values for all six strings at a single point in time, low string (index 0) to high string (index 5). */
export type FretRow = [Fret, Fret, Fret, Fret, Fret, Fret]

/** A single vertical "slice" of the tab across all six strings. */
export interface TabPosition {
  /** Fret per string, ordered low (index 0) to high (index 5). `null` means the string isn't played here. */
  frets: FretRow
  /** Optional playing technique/annotation shown near this position (e.g. "h", "p", "b", "/", "x"). */
  annotation?: string
}

/** A measure (bar) is simply an ordered list of positions played within it. */
export interface TabMeasure {
  positions: TabPosition[]
}

export interface TimeSignature {
  /** Beats per measure, e.g. 4 in 4/4. */
  beatsPerMeasure: number
  /** Note value that receives one beat, e.g. 4 in 4/4 (quarter note). */
  beatUnit: number
}

/** Tuning for all six strings, low (index 0) to high (index 5), e.g. `['E', 'A', 'D', 'G', 'B', 'e']`. */
export type Tuning = [string, string, string, string, string, string]

export interface Tab {
  title: string
  /** Optional short description / attribution shown above the tab. */
  description?: string
  /** Defaults to standard tuning if omitted. */
  tuning?: Tuning
  tempoBpm?: number
  timeSignature?: TimeSignature
  measures: TabMeasure[]
}

/** Standard EADGBe tuning, low string to high string. */
export const STANDARD_TUNING: Tuning = ['E', 'A', 'D', 'G', 'B', 'e']
