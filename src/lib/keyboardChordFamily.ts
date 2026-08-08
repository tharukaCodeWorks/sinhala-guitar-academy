/**
 * "Family chords" (a.k.a. diatonic chords) for the keyboard chord library:
 * the 7 chords built on each degree of a major or natural-minor scale, and
 * a handful of common chord progressions expressed generically in
 * scale-degree terms so they can be resolved against any key.
 *
 * Pure logic only — no rendering. Every resolved chord comes from the
 * seeded keyboard chord library (`data/keyboardChords`) via its accessors,
 * never fabricated here.
 *
 * Closely mirrors the guitar-side `lib/chordFamily.ts` (same
 * `ChordFamily`/`FamilyDegree`/`ProgressionTemplate`/`ResolvedProgression`
 * shapes and the same scale-interval/degree-quality tables), but resolves
 * against `data/keyboardChords` instead of the guitar library. Deliberately
 * duplicated rather than shared: this repo's convention is flat,
 * independent per-domain modules over a shared/generalized instrument
 * abstraction (see `src/README.md`), and the progression templates here are
 * generic music theory, not guitar- or keyboard-specific.
 *
 * Unlike the guitar library (which has no seeded diminished shapes, so its
 * vii°/ii° degree never resolves), the keyboard chord library seeds a
 * diminished voicing for every one of the 12 chromatic roots — so every
 * diatonic degree, including the diminished one, resolves to a real chord
 * for every key. `FamilyDegree.chord` is still typed as possibly
 * `undefined` (matching the guitar shape and staying defensive against any
 * future gap in the seed data), but in practice it's always defined here.
 */
import { findChordsByRoot } from '../data/keyboardChords'
import type { KeyboardChord, NoteName } from '../data/keyboardChords/types'

/** The two diatonic scale types this module builds families for. */
export type ScaleType = 'major' | 'minor'

/** The triad quality built on a given scale degree. */
export type DegreeQuality = 'major' | 'minor' | 'diminished'

/** One degree of a diatonic chord family, e.g. "ii" in the key of C major. */
export interface FamilyDegree {
  /** 1-indexed scale degree (1-7). */
  degree: number
  /** Roman-numeral label for this degree in this scale/quality, e.g. `'I'`, `'ii'`, `'vii°'`. */
  romanNumeral: string
  /** The note this degree's chord is built on. */
  root: NoteName
  quality: DegreeQuality
  /**
   * The resolved chord from the keyboard chord library, looked up by root +
   * quality via `findChordsByRoot`. `undefined` only if the library has no
   * voicing for this root/quality — doesn't happen for any degree of any
   * key given the current seed data (every root has a diminished voicing),
   * but kept optional to stay defensive and to mirror the guitar shape.
   */
  chord: KeyboardChord | undefined
}

/** The 7 diatonic chords belonging to a given key (root + major/minor). */
export interface ChordFamily {
  root: NoteName
  scaleType: ScaleType
  /** Exactly 7 entries, `degrees[0]` is the tonic (degree 1). */
  degrees: FamilyDegree[]
}

/** The 12 chromatic pitch classes, sharps spelling — matches `NoteName`. */
const CHROMATIC: NoteName[] = [
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

/** Semitone offset of each scale degree from the tonic, major scale. */
const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11]

/** Semitone offset of each scale degree from the tonic, natural minor scale. */
const NATURAL_MINOR_SCALE_INTERVALS = [0, 2, 3, 5, 7, 8, 10]

/** Triad quality built on each degree of a major scale: I ii iii IV V vi vii°. */
const MAJOR_DEGREE_QUALITIES: DegreeQuality[] = [
  'major',
  'minor',
  'minor',
  'major',
  'major',
  'minor',
  'diminished',
]

/** Triad quality built on each degree of a natural minor scale: i ii° III iv v VI VII. */
const MINOR_DEGREE_QUALITIES: DegreeQuality[] = [
  'minor',
  'diminished',
  'major',
  'minor',
  'minor',
  'major',
  'major',
]

const UPPER_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
const LOWER_NUMERALS = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii']

/** The note a given number of semitones above `root`, wrapping chromatically. */
function noteAt(root: NoteName, semitoneOffset: number): NoteName {
  const rootIndex = CHROMATIC.indexOf(root)
  return CHROMATIC[(rootIndex + semitoneOffset) % 12]
}

/** Roman-numeral label for a 0-indexed degree, cased and marked by quality. */
function romanNumeralFor(degreeIndex: number, quality: DegreeQuality): string {
  const base =
    quality === 'major'
      ? UPPER_NUMERALS[degreeIndex]
      : LOWER_NUMERALS[degreeIndex]
  return quality === 'diminished' ? `${base}°` : base
}

/**
 * Resolves a degree's root + quality to a real `KeyboardChord` from the
 * library. Unlike the guitar version, diminished degrees do resolve here —
 * the keyboard library seeds a diminished voicing for every root.
 */
function resolveDegreeChord(
  root: NoteName,
  quality: DegreeQuality,
): KeyboardChord | undefined {
  return findChordsByRoot(root).find((chord) => chord.quality === quality)
}

/**
 * Builds the 7-chord diatonic family for a key: the root note plus whether
 * it's major or (natural) minor. Each degree is resolved to an actual
 * `KeyboardChord` from the library where one is seeded.
 */
export function buildChordFamily(
  root: NoteName,
  scaleType: ScaleType,
): ChordFamily {
  const intervals =
    scaleType === 'major'
      ? MAJOR_SCALE_INTERVALS
      : NATURAL_MINOR_SCALE_INTERVALS
  const qualities =
    scaleType === 'major' ? MAJOR_DEGREE_QUALITIES : MINOR_DEGREE_QUALITIES

  const degrees: FamilyDegree[] = intervals.map((interval, index) => {
    const degreeRoot = noteAt(root, interval)
    const quality = qualities[index]
    return {
      degree: index + 1,
      romanNumeral: romanNumeralFor(index, quality),
      root: degreeRoot,
      quality,
      chord: resolveDegreeChord(degreeRoot, quality),
    }
  })

  return { root, scaleType, degrees }
}

/**
 * A common chord progression expressed generically as a sequence of scale
 * degrees (1-7), so it can be resolved against any `ChordFamily` of the
 * matching scale type.
 */
export interface ProgressionTemplate {
  /** Stable id, unique within its scale type. */
  id: string
  /** Short human name, e.g. `'I – IV – V'` (generic, not tied to a key). */
  name: string
  /** One-line description of where this progression is commonly used. */
  description: string
  /** Scale degrees (1-7), in play order. */
  degrees: number[]
}

const MAJOR_PROGRESSIONS: ProgressionTemplate[] = [
  {
    id: 'I-IV-V',
    name: 'I – IV – V',
    description:
      'The three-chord trick behind countless folk, blues and rock songs.',
    degrees: [1, 4, 5],
  },
  {
    id: 'I-V-vi-IV',
    name: 'I – V – vi – IV',
    description:
      'The "four chords" progression heard in a huge share of pop music.',
    degrees: [1, 5, 6, 4],
  },
  {
    id: 'ii-V-I',
    name: 'ii – V – I',
    description: 'The classic jazz turnaround/cadence.',
    degrees: [2, 5, 1],
  },
  {
    id: 'vi-IV-I-V',
    name: 'vi – IV – I – V',
    description:
      'A minor-feeling start to the same four-chord family as I–V–vi–IV.',
    degrees: [6, 4, 1, 5],
  },
  {
    id: 'I-vi-IV-V',
    name: 'I – vi – IV – V',
    description:
      'The "50s progression" behind many doo-wop and early rock songs.',
    degrees: [1, 6, 4, 5],
  },
]

const MINOR_PROGRESSIONS: ProgressionTemplate[] = [
  {
    id: 'i-iv-v',
    name: 'i – iv – v',
    description: 'The natural-minor equivalent of the three-chord trick.',
    degrees: [1, 4, 5],
  },
  {
    id: 'i-VI-VII',
    name: 'i – VI – VII',
    description: 'A common minor-key rock/pop progression with a rising feel.',
    degrees: [1, 6, 7],
  },
  {
    id: 'i-iv-VII',
    name: 'i – iv – VII',
    description: 'A darker cousin of i–iv–v that avoids the minor v chord.',
    degrees: [1, 4, 7],
  },
  {
    id: 'i-VII-VI',
    name: 'i – VII – VI',
    description: 'A descending progression common in rock and metal.',
    degrees: [1, 7, 6],
  },
  {
    id: 'iv-v-i',
    name: 'iv – v – i',
    description: 'A minor cadence resolving back to the tonic.',
    degrees: [4, 5, 1],
  },
]

/** The common progressions available for a scale type, in generic scale-degree terms. */
export function progressionsFor(scaleType: ScaleType): ProgressionTemplate[] {
  return scaleType === 'major' ? MAJOR_PROGRESSIONS : MINOR_PROGRESSIONS
}

/** One step of a progression, resolved to an actual chord in a specific key. */
export interface ResolvedProgressionStep {
  degree: number
  romanNumeral: string
  /** The resolved chord's display name (e.g. `'F'`, `'Am'`), or `undefined` if unresolved. */
  chordName: string | undefined
  chord: KeyboardChord | undefined
}

/** A `ProgressionTemplate` resolved against a specific `ChordFamily`. */
export interface ResolvedProgression {
  id: string
  name: string
  description: string
  steps: ResolvedProgressionStep[]
}

/** Resolves a single progression template's scale degrees against a family. */
export function resolveProgression(
  family: ChordFamily,
  template: ProgressionTemplate,
): ResolvedProgression {
  const steps: ResolvedProgressionStep[] = template.degrees.map(
    (degreeNumber) => {
      const familyDegree = family.degrees[degreeNumber - 1]
      return {
        degree: degreeNumber,
        romanNumeral: familyDegree.romanNumeral,
        chordName: familyDegree.chord?.name,
        chord: familyDegree.chord,
      }
    },
  )

  return {
    id: template.id,
    name: template.name,
    description: template.description,
    steps,
  }
}

/** Resolves every common progression for a family's scale type against that family. */
export function resolveProgressionsForFamily(
  family: ChordFamily,
): ResolvedProgression[] {
  return progressionsFor(family.scaleType).map((template) =>
    resolveProgression(family, template),
  )
}
