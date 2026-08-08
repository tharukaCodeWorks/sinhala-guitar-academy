/**
 * Pure layout/geometry helpers for rendering a `ChordVariant` (keyboard
 * chord) as an SVG on-screen-piano diagram. Kept framework-free (no JSX,
 * no DOM) so the tricky bits — which notes are black vs. white keys, how
 * many octaves a voicing spans, where each pressed key sits relative to
 * the rendered keyboard — are unit-testable without a component-testing
 * setup.
 *
 * `components/KeyboardDiagram.tsx` is the only consumer; it turns these
 * plain numbers/positions into SVG elements. Mirrors the role
 * `lib/chordDiagram.ts` plays for the guitar `ChordDiagram` component.
 */
import type {
  ChordVariant,
  KeyPress,
  NoteName,
} from '../data/keyboardChords/types'

/** White keys in one octave, left to right. */
export const WHITE_KEYS_PER_OCTAVE = 7

/**
 * Minimum number of octaves a diagram draws, even for voicings whose notes
 * all share one `octaveOffset` — keeps every diagram in a grid a
 * consistent, uncramped shape (mirrors `MIN_VISIBLE_FRETS` in
 * `chordDiagram.ts`).
 */
export const KEYBOARD_DIAGRAM_MIN_OCTAVES = 1

interface KeyLayout {
  isBlack: boolean
  /**
   * For a white key: its own 0-6 index within the octave (C=0 .. B=6).
   * For a black key: the index of the white key immediately to its right,
   * i.e. the boundary it sits on (C#=1, between C=0 and D=1; A#=6, between
   * A=5 and B=6). There's deliberately no black key straddling E/F or B/C,
   * matching a real keyboard's layout.
   */
  whiteIndex: number
}

const KEY_LAYOUT: Record<NoteName, KeyLayout> = {
  C: { isBlack: false, whiteIndex: 0 },
  'C#': { isBlack: true, whiteIndex: 1 },
  D: { isBlack: false, whiteIndex: 1 },
  'D#': { isBlack: true, whiteIndex: 2 },
  E: { isBlack: false, whiteIndex: 2 },
  F: { isBlack: false, whiteIndex: 3 },
  'F#': { isBlack: true, whiteIndex: 4 },
  G: { isBlack: false, whiteIndex: 4 },
  'G#': { isBlack: true, whiteIndex: 5 },
  A: { isBlack: false, whiteIndex: 5 },
  'A#': { isBlack: true, whiteIndex: 6 },
  B: { isBlack: false, whiteIndex: 6 },
}

/** True for the 5 sharp/black-key notes (`C#`, `D#`, `F#`, `G#`, `A#`). */
export function isBlackKey(note: NoteName): boolean {
  return KEY_LAYOUT[note].isBlack
}

/**
 * Reference white-key column for a note within one octave: the key's own
 * index (0-6) if it's white, or the index of the white key boundary it
 * sits just to the left of if it's black. Used to position a key
 * horizontally without needing separate white/black coordinate systems.
 */
export function keyWhiteIndex(note: NoteName): number {
  return KEY_LAYOUT[note].whiteIndex
}

/** Lowest `octaveOffset` among a variant's pressed keys. Assumes `keys` is non-empty. */
export function lowestOctaveOffset(variant: ChordVariant): number {
  return variant.keys.reduce(
    (min, key) => Math.min(min, key.octaveOffset),
    variant.keys[0].octaveOffset,
  )
}

/** Highest `octaveOffset` among a variant's pressed keys. Assumes `keys` is non-empty. */
export function highestOctaveOffset(variant: ChordVariant): number {
  return variant.keys.reduce(
    (max, key) => Math.max(max, key.octaveOffset),
    variant.keys[0].octaveOffset,
  )
}

/**
 * Number of octaves to draw for a variant: enough to cover every pressed
 * key's `octaveOffset`, with a floor of `KEYBOARD_DIAGRAM_MIN_OCTAVES` so
 * single-octave voicings don't render a zero-width keyboard.
 */
export function visibleOctaveCount(variant: ChordVariant): number {
  const span = highestOctaveOffset(variant) - lowestOctaveOffset(variant) + 1
  return Math.max(KEYBOARD_DIAGRAM_MIN_OCTAVES, span)
}

/** A single pressed key, positioned relative to the diagram's rendered octave range. */
export interface PressedKeyPosition {
  key: KeyPress
  isBlack: boolean
  /**
   * 0-indexed octave slot within the rendered range, where 0 is the
   * lowest octave the diagram draws (i.e. `key.octaveOffset -
   * lowestOctaveOffset(variant)`).
   */
  octaveIndex: number
  /** This key's `keyWhiteIndex` — its horizontal reference column within its octave. */
  whiteIndex: number
}

/**
 * Every pressed key in a variant, positioned relative to the lowest
 * octave the diagram renders. Order matches `variant.keys` (ascending
 * pitch, per the data model's convention).
 */
export function pressedKeyPositions(
  variant: ChordVariant,
): PressedKeyPosition[] {
  const base = lowestOctaveOffset(variant)
  return variant.keys.map((key) => ({
    key,
    isBlack: isBlackKey(key.note),
    octaveIndex: key.octaveOffset - base,
    whiteIndex: keyWhiteIndex(key.note),
  }))
}
