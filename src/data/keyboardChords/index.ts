export type {
  ChordDifficulty,
  ChordQuality,
  ChordVariant,
  FingerNumber,
  Inversion,
  KeyboardChord,
  KeyPress,
  NoteName,
} from './types'
export { keyboardChordLibrary } from './library'

import { keyboardChordLibrary } from './library'
import type {
  ChordQuality,
  ChordVariant,
  KeyboardChord,
  NoteName,
} from './types'

/** Look up a single chord by its stable id (e.g. `'c-major'`, `'b-7th'`). */
export function getChordById(id: string): KeyboardChord | undefined {
  return keyboardChordLibrary.find((chord) => chord.id === id)
}

/** All chords built on a given root note, in library order. */
export function findChordsByRoot(root: NoteName): KeyboardChord[] {
  return keyboardChordLibrary.filter((chord) => chord.root === root)
}

/** All chords of a given quality (e.g. all `'minor'` chords), in library order. */
export function findChordsByQuality(quality: ChordQuality): KeyboardChord[] {
  return keyboardChordLibrary.filter((chord) => chord.quality === quality)
}

/**
 * Look up a chord by its display name, e.g. `'C'`, `'Am'`, `'B7'`.
 * Matching is case-insensitive.
 */
export function findChordByName(name: string): KeyboardChord | undefined {
  const normalized = name.trim().toLowerCase()
  return keyboardChordLibrary.find(
    (chord) => chord.name.toLowerCase() === normalized,
  )
}

/** A single variant (voicing) of a chord, by chord id + variant id. */
export function getChordVariant(
  chordId: string,
  variantId: string,
): ChordVariant | undefined {
  return getChordById(chordId)?.variants.find(
    (variant) => variant.id === variantId,
  )
}

/** The distinct roots present in the library, in a fixed chromatic order. */
export function listRoots(): NoteName[] {
  const chromaticOrder: NoteName[] = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ]
  const present = new Set(keyboardChordLibrary.map((chord) => chord.root))
  return chromaticOrder.filter((root) => present.has(root))
}

/** The distinct chord qualities present in the library. */
export function listQualities(): ChordQuality[] {
  const seen = new Set<ChordQuality>()
  const result: ChordQuality[] = []
  for (const chord of keyboardChordLibrary) {
    if (!seen.has(chord.quality)) {
      seen.add(chord.quality)
      result.push(chord.quality)
    }
  }
  return result
}
