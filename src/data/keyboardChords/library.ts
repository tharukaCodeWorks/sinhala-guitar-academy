import type {
  ChordDifficulty,
  ChordQuality,
  ChordVariant,
  FingerNumber,
  Inversion,
  KeyboardChord,
  KeyPress,
  NoteName,
} from './types'

/**
 * The full seeded keyboard chord library: every one of the 12 chromatic
 * roots built as a major, minor, dominant 7th, major 7th, minor 7th, sus2,
 * sus4 and diminished chord — 96 chords in total, generated from music
 * theory (semitone intervals from the root) rather than hand-transcribed,
 * since a keyboard voicing is fully determined by its intervals (unlike a
 * guitar shape, which depends on which strings/frets happen to be
 * reachable).
 *
 * Major and minor chords additionally get a 1st-inversion variant (the
 * pairing most beginner keyboard method books teach first); every quality
 * gets at least a root-position variant, which is enough for every
 * diatonic scale degree — including the diminished (vii°/ii°) degree — of
 * any major or natural-minor key to resolve to a real voicing (see
 * `src/lib/chordFamily.ts`'s guitar-side note about this same gap).
 *
 * This is the canonical, ordered list other data/features should treat as
 * the source of truth — prefer the accessors in `index.ts` over reading
 * this array directly.
 */

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

/** URL/id-safe slug for each root note (`'#'` isn't a valid id character). */
const ROOT_SLUG: Record<NoteName, string> = {
  C: 'c',
  'C#': 'c-sharp',
  D: 'd',
  'D#': 'd-sharp',
  E: 'e',
  F: 'f',
  'F#': 'f-sharp',
  G: 'g',
  'G#': 'g-sharp',
  A: 'a',
  'A#': 'a-sharp',
  B: 'b',
}

/** id-safe slug for each quality. */
const QUALITY_SLUG: Record<ChordQuality, string> = {
  major: 'major',
  minor: 'minor',
  '7th': '7th',
  maj7: 'maj7',
  min7: 'min7',
  sus2: 'sus2',
  sus4: 'sus4',
  diminished: 'diminished',
}

/** Display-name suffix appended to the root note, e.g. `'C'` + `'m'` = `'Cm'`. */
const NAME_SUFFIX: Record<ChordQuality, string> = {
  major: '',
  minor: 'm',
  '7th': '7',
  maj7: 'maj7',
  min7: 'm7',
  sus2: 'sus2',
  sus4: 'sus4',
  diminished: 'dim',
}

/**
 * Semitone intervals above the root for each chord tone, in scale-degree
 * order (root, 3rd, 5th, [7th]) — the order inversions are built from, not
 * necessarily final playing order.
 */
const QUALITY_INTERVALS: Record<ChordQuality, number[]> = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  '7th': [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  min7: [0, 3, 7, 10],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  diminished: [0, 3, 6],
}

/**
 * Difficulty of the root-position voicing for each quality. Triads that
 * beginners commonly meet first (major/minor/sus2/sus4) are `'beginner'`;
 * 4-note 7th-family chords need a wider stretch (`'intermediate'`); the
 * diminished triad's tritone is the least intuitive interval for a
 * beginner ear, so it's rated `'advanced'`.
 */
const ROOT_POSITION_DIFFICULTY: Record<ChordQuality, ChordDifficulty> = {
  major: 'beginner',
  minor: 'beginner',
  '7th': 'intermediate',
  maj7: 'intermediate',
  min7: 'intermediate',
  sus2: 'beginner',
  sus4: 'beginner',
  diminished: 'advanced',
}

/** Qualities that get a seeded 1st-inversion variant, in addition to root position. */
const QUALITIES_WITH_FIRST_INVERSION: ChordQuality[] = ['major', 'minor']

/** Every quality seeded in the library, in the order chords are generated. */
const ALL_QUALITIES: ChordQuality[] = [
  'major',
  'minor',
  '7th',
  'maj7',
  'min7',
  'sus2',
  'sus4',
  'diminished',
]

/**
 * Suggested right-hand fingering for a compact, one-hand voicing, indexed
 * by how many notes the chord has and how many chord tones (counted from
 * the root) have been pushed up an octave for this inversion. These are a
 * standard/pedagogical convention (thumb-under-heavy triad fingerings),
 * not the only fingering a player could use.
 */
function fingeringFor(
  noteCount: number,
  invertedToneCount: number,
): FingerNumber[] {
  if (noteCount === 4) {
    // Close-position 7th-family chords: thumb, index, middle, pinky.
    return [1, 2, 3, 5]
  }
  // Close-position triads: root position and 2nd inversion both comfortably
  // take 1-3-5; 1st inversion (a 2nd + 4th stacked on top of each other)
  // is easier played 1-2-5.
  return invertedToneCount === 1 ? [1, 2, 5] : [1, 3, 5]
}

/** A chord tone before being placed in final (ascending-pitch) playing order. */
interface RawKey {
  chromaticIndex: number
  octaveOffset: number
}

/**
 * Builds one voicing: starts from the root-position stack implied by
 * `intervals` (root always at `octaveOffset: 0`), then raises the lowest
 * `invertedToneCount` scale-degree-ordered chord tones (root first, then
 * 3rd, ...) up an octave — the standard definition of a chord inversion —
 * and finally re-sorts every note into ascending playing order.
 */
function buildVariant(
  root: NoteName,
  intervals: number[],
  invertedToneCount: number,
  opts: {
    id: string
    label: string
    inversion: Inversion
    difficulty: ChordDifficulty
  },
): ChordVariant {
  const rootIndex = CHROMATIC.indexOf(root)

  const rawKeys: RawKey[] = intervals.map((interval) => {
    const absolute = rootIndex + interval
    return {
      chromaticIndex: absolute % 12,
      octaveOffset: Math.floor(absolute / 12),
    }
  })

  const inverted = rawKeys.map((key, index) =>
    index < invertedToneCount
      ? { ...key, octaveOffset: key.octaveOffset + 1 }
      : key,
  )

  const sorted = [...inverted].sort((a, b) => {
    const pitchA = a.octaveOffset * 12 + a.chromaticIndex
    const pitchB = b.octaveOffset * 12 + b.chromaticIndex
    return pitchA - pitchB
  })

  const fingers = fingeringFor(sorted.length, invertedToneCount)
  const keys: KeyPress[] = sorted.map((key, index) => ({
    note: CHROMATIC[key.chromaticIndex],
    octaveOffset: key.octaveOffset,
    finger: fingers[index] ?? null,
  }))

  return {
    id: opts.id,
    label: opts.label,
    inversion: opts.inversion,
    keys,
    difficulty: opts.difficulty,
  }
}

/** Builds every seeded variant for a given root/quality. */
function buildChord(root: NoteName, quality: ChordQuality): KeyboardChord {
  const rootSlug = ROOT_SLUG[root]
  const id = `${rootSlug}-${QUALITY_SLUG[quality]}`
  const intervals = QUALITY_INTERVALS[quality]

  const variants: ChordVariant[] = [
    buildVariant(root, intervals, 0, {
      id: `${id}-root`,
      label: 'Root position',
      inversion: 'root',
      difficulty: ROOT_POSITION_DIFFICULTY[quality],
    }),
  ]

  if (QUALITIES_WITH_FIRST_INVERSION.includes(quality)) {
    variants.push(
      buildVariant(root, intervals, 1, {
        id: `${id}-first`,
        label: '1st inversion',
        inversion: 'first',
        difficulty: 'intermediate',
      }),
    )
  }

  return {
    id,
    name: `${root}${NAME_SUFFIX[quality]}`,
    root,
    quality,
    variants,
  }
}

export const keyboardChordLibrary: KeyboardChord[] = ALL_QUALITIES.flatMap(
  (quality) => CHROMATIC.map((root) => buildChord(root, quality)),
)
