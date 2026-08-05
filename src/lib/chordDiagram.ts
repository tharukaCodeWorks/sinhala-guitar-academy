/**
 * Pure layout/geometry helpers for rendering a `ChordVariant` as an SVG
 * fretboard diagram. Kept framework-free (no JSX, no DOM) so the tricky
 * bits — which frets to show, where a barre spans, which row a fretted
 * note lands on — are unit-testable without a component-testing setup.
 *
 * `components/ChordDiagram.tsx` is the only consumer; it turns these plain
 * numbers/segments into SVG elements.
 */
import type {
  ChordVariant,
  FingerNumber,
  StringPosition,
} from '../data/chords/types'

/** Guitar has 6 strings; every `ChordVariant.strings`/`fingering` tuple matches this. */
export const CHORD_DIAGRAM_STRING_COUNT = 6

/**
 * Minimum number of fret rows a diagram draws, even for shapes that only
 * use the first fret or two — keeps every diagram in a grid a consistent,
 * uncramped shape.
 */
export const MIN_VISIBLE_FRETS = 4

/** Highest fret actually played by a variant (0 if every string is open/muted). */
export function highestFret(variant: ChordVariant): number {
  return variant.strings.reduce<number>((max, position) => {
    return typeof position === 'number' ? Math.max(max, position) : max
  }, 0)
}

/**
 * Number of fret rows to draw for a variant: enough to cover every fretted
 * note above `baseFret`, with a floor of `MIN_VISIBLE_FRETS` so small
 * open-position shapes don't look cramped.
 */
export function visibleFretCount(variant: ChordVariant): number {
  const span = highestFret(variant) - variant.baseFret + 1
  return Math.max(MIN_VISIBLE_FRETS, span)
}

/**
 * Whether the diagram should render a thick "nut" bar at the top instead
 * of a normal fret line — true only for genuine open-position shapes
 * (`baseFret === 1`), matching the convention that the nut is the string's
 * physical top end.
 */
export function isNutPosition(variant: ChordVariant): boolean {
  return variant.baseFret === 1
}

/**
 * 0-indexed row (from the top fret line) that a fretted string position
 * falls on. Returns `null` for open/muted strings, which aren't drawn on
 * a fret row at all (they get a marker above the nut instead).
 */
export function fretRow(
  variant: ChordVariant,
  position: StringPosition,
): number | null {
  if (typeof position !== 'number') return null
  return position - variant.baseFret
}

/** A contiguous run of 2+ adjacent strings fretted at the same fret by the same finger. */
export interface BarreSegment {
  fret: number
  finger: FingerNumber
  /** 0-indexed, low E (6th string) first — matches `ChordVariant.strings` order. */
  fromStringIndex: number
  toStringIndex: number
}

/**
 * Finds barre segments: runs of 2+ adjacent strings that share both the
 * same fret and the same fretting finger. Real chord charts draw these as
 * a single rounded bar rather than one dot per string. Non-adjacent
 * strings sharing a finger (e.g. an index finger that also independently
 * covers a string separated by other fingers) are intentionally left as
 * individual dots — they aren't a visually-continuous barre.
 */
export function findBarreSegments(variant: ChordVariant): BarreSegment[] {
  const segments: BarreSegment[] = []
  let run: { fret: number; finger: FingerNumber; start: number } | null = null

  const flush = (endIndex: number) => {
    if (run && endIndex - run.start >= 1) {
      segments.push({
        fret: run.fret,
        finger: run.finger,
        fromStringIndex: run.start,
        toStringIndex: endIndex,
      })
    }
    run = null
  }

  variant.strings.forEach((position, index) => {
    const finger = variant.fingering[index]
    if (typeof position === 'number' && finger != null) {
      if (run && run.fret === position && run.finger === finger) {
        // still the same run, nothing to do yet
      } else {
        flush(index - 1)
        run = { fret: position, finger, start: index }
      }
    } else {
      flush(index - 1)
    }
  })
  flush(CHORD_DIAGRAM_STRING_COUNT - 1)

  return segments
}

/** String indices (0-indexed, low E first) that are part of some barre segment. */
export function barredStringIndices(segments: BarreSegment[]): Set<number> {
  const indices = new Set<number>()
  for (const segment of segments) {
    for (let i = segment.fromStringIndex; i <= segment.toStringIndex; i += 1) {
      indices.add(i)
    }
  }
  return indices
}
