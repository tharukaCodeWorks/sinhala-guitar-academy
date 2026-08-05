/**
 * Pure capo-transposition logic: no rendering, no app state.
 *
 * A capo clamps across every string at a given fret, which shifts the pitch
 * of whatever open-position shape you play up by that many semitones
 * without changing which shape you physically finger. This module answers
 * the two questions guitarists actually ask:
 *
 * - "I play a C shape with a capo on fret 2 — what chord am I sounding?"
 *   ({@link transposeChordWithCapo} / {@link transposeProgressionWithCapo})
 * - "I want to sound a D chord but only know a C shape — where do I put the
 *   capo?" ({@link suggestCapoOptions})
 */
import type { Chord, ChordQuality, NoteName } from '../data/chords/types'

/** The 12 chromatic note names in pitch-class order, matching `NoteName`. */
const NOTE_ORDER: NoteName[] = [
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

/** Lowest fret a capo can sensibly be placed at for this tool. */
export const MIN_CAPO_FRET = 0

/**
 * Highest fret a capo can sensibly be placed at for this tool — beyond this
 * the guitar's remaining playable neck gets impractically short.
 */
export const MAX_CAPO_FRET = 7

/** Display suffix appended to a root note to form a chord's name, by quality. */
const QUALITY_SUFFIX: Record<ChordQuality, string> = {
  major: '',
  minor: 'm',
  '7th': '7',
  maj7: 'maj7',
  min7: 'm7',
  sus2: 'sus2',
  sus4: 'sus4',
}

/** Builds a display name (e.g. `'D'`, `'F#m'`, `'Bb7'` → `'A#7'`) for a root + quality. */
export function chordDisplayName(
  root: NoteName,
  quality: ChordQuality,
): string {
  return `${root}${QUALITY_SUFFIX[quality]}`
}

function assertValidCapoFret(capoFret: number): void {
  if (
    !Number.isInteger(capoFret) ||
    capoFret < MIN_CAPO_FRET ||
    capoFret > MAX_CAPO_FRET
  ) {
    throw new RangeError(
      `capoFret must be an integer between ${MIN_CAPO_FRET} and ${MAX_CAPO_FRET}, got ${capoFret}`,
    )
  }
}

/**
 * Shifts a note name up by `semitones` (wrapping around the 12-note
 * chromatic scale). Negative values move down.
 */
export function transposeNote(note: NoteName, semitones: number): NoteName {
  const index = NOTE_ORDER.indexOf(note)
  const shifted = (((index + semitones) % 12) + 12) % 12
  return NOTE_ORDER[shifted]
}

/**
 * The result of playing one chord shape with a capo on: the shape itself
 * (unchanged — a capo never changes what you finger) alongside what it
 * actually sounds like once the capo shifts every string's pitch up.
 */
export interface CapoTransposition {
  /** The chord shape as fretted — identical to the input, capo doesn't change it. */
  shapeChord: Chord
  /** The capo fret this transposition was computed for. */
  capoFret: number
  /** The pitch-class that actually sounds for the shape's root, capo included. */
  soundingRoot: NoteName
  /** The chord quality that sounds — always the same as the shape's quality. */
  soundingQuality: ChordQuality
  /** Full display name of the sounding chord, e.g. `'D'`, `'F#m'`. */
  soundingName: string
}

/**
 * Given the open-position (or any) shape for `chord` and a `capoFret`
 * (0-7), returns the shape unchanged plus the chord that actually sounds.
 * `capoFret` of `0` means no capo: the shape plays as its own name.
 */
export function transposeChordWithCapo(
  chord: Chord,
  capoFret: number,
): CapoTransposition {
  assertValidCapoFret(capoFret)
  const soundingRoot = transposeNote(chord.root, capoFret)
  return {
    shapeChord: chord,
    capoFret,
    soundingRoot,
    soundingQuality: chord.quality,
    soundingName: chordDisplayName(soundingRoot, chord.quality),
  }
}

/**
 * Same as {@link transposeChordWithCapo}, applied to every chord in a
 * progression (shapes stay in their given order).
 */
export function transposeProgressionWithCapo(
  chords: Chord[],
  capoFret: number,
): CapoTransposition[] {
  return chords.map((chord) => transposeChordWithCapo(chord, capoFret))
}

/**
 * One way to sound a target chord: fret `shapeChord`'s shape with a capo on
 * `capoFret`.
 */
export interface CapoSuggestion {
  shapeChord: Chord
  capoFret: number
}

/**
 * Inverse of {@link transposeChordWithCapo}: given a target sounding root +
 * quality and the shapes the player already knows (`knownShapes`, e.g. a
 * subset of the chord library), returns every `(shape, capoFret)` pair
 * within `maxCapoFret` that produces that target — cheapest (lowest) capo
 * fret first.
 *
 * A capo only shifts pitch, it can't change a shape's quality, so shapes
 * whose `quality` doesn't match `targetQuality` are never suggested (e.g.
 * you can't capo a C major shape into a D minor).
 */
export function suggestCapoOptions(
  targetRoot: NoteName,
  targetQuality: ChordQuality,
  knownShapes: Chord[],
  maxCapoFret: number = MAX_CAPO_FRET,
): CapoSuggestion[] {
  assertValidCapoFret(maxCapoFret)
  const targetIndex = NOTE_ORDER.indexOf(targetRoot)

  const suggestions: CapoSuggestion[] = []
  for (const shapeChord of knownShapes) {
    if (shapeChord.quality !== targetQuality) continue
    const shapeIndex = NOTE_ORDER.indexOf(shapeChord.root)
    const capoFret = (targetIndex - shapeIndex + 12) % 12
    if (capoFret >= MIN_CAPO_FRET && capoFret <= maxCapoFret) {
      suggestions.push({ shapeChord, capoFret })
    }
  }

  return suggestions.sort((a, b) => a.capoFret - b.capoFret)
}
