import type { FingerNumber, NoteName, Scale, ScaleType } from './types'

/**
 * The full seeded scale library: all 12 major scales and all 12 natural
 * minor scales, one octave, with standard classical right-hand/left-hand
 * fingering.
 *
 * `notes` is generated from music theory (semitone intervals from the
 * root), the same interval-offset approach `src/lib/chordFamily.ts` and
 * `src/lib/keyboardChordFamily.ts` already use — a scale's note names are
 * fully determined by its root and type, so there's no reason to
 * hand-transcribe them (and every risk of a typo if we did).
 *
 * Fingering, by contrast, is **not** derivable from the notes alone — it's
 * a pedagogical convention (which finger crosses under the thumb, and
 * where), not a mathematical property of the scale. `MAJOR_FINGERING` and
 * `NATURAL_MINOR_FINGERING` below are hand-seeded from
 * learnmusictheory.net's "Major and Natural Minor Scales for Piano"
 * fingering chart (`01-02-07-ScalesforPiano.pdf`), read directly off the
 * rendered PDF page images (this chart's PDF text layer is not in reading
 * order, so it must be read visually, not via text extraction), and
 * cross-checked against Wikibooks' "Traditional Piano Scale Fingering"
 * table. NOTE: an earlier revision of this file briefly "corrected" 12 of
 * these values against pianoscales.org, which turned out to be a dead/
 * parked domain — an AI web-fetch tool had fabricated confident-looking
 * finger numbers against it rather than returning real content. Those 12
 * values have been reverted back to (or, for G#/Ab natural minor's left
 * hand, re-derived to fix a genuine pre-existing bug against) the values
 * actually printed in the learnmusictheory.net chart; see `library.test.ts`
 * for the exact black-tonic regression values and the PR history for the
 * full sourcing saga. See the module-level rule of thumb that this chart
 * follows: the thumb (finger 1) never lands on a black key, for either
 * hand — every entry below is checked against that rule (see
 * `library.test.ts`'s left-hand and right-hand thumb-placement checks),
 * but the rule alone under-determines the fingering, so it's a
 * cross-check, not the source.
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

/** Semitone offset of each scale degree from the tonic, major scale. */
const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11]

/** Semitone offset of each scale degree from the tonic, natural minor scale. */
const NATURAL_MINOR_SCALE_INTERVALS = [0, 2, 3, 5, 7, 8, 10]

/** The note a given number of semitones above `root`, wrapping chromatically. */
function noteAt(root: NoteName, semitoneOffset: number): NoteName {
  const rootIndex = CHROMATIC.indexOf(root)
  return CHROMATIC[(rootIndex + semitoneOffset) % 12]
}

/** The 7 ascending scale-degree notes for a root + scale type. */
function scaleNotes(root: NoteName, type: ScaleType): NoteName[] {
  const intervals =
    type === 'major' ? MAJOR_SCALE_INTERVALS : NATURAL_MINOR_SCALE_INTERVALS
  return intervals.map((interval) => noteAt(root, interval))
}

/** One key's hand-seeded fingering: 8 entries per hand (7 degrees + octave tonic). */
interface KeyFingering {
  rightHand: FingerNumber[]
  leftHand: FingerNumber[]
}

/**
 * Standard classical fingering by root, for major scales. Cross-checked
 * note-by-note against the "thumb only ever lands on a white key" rule
 * that underlies every standard piano fingering convention.
 */
const MAJOR_FINGERING: Record<NoteName, KeyFingering> = {
  C: {
    rightHand: [1, 2, 3, 1, 2, 3, 4, 5],
    leftHand: [5, 4, 3, 2, 1, 3, 2, 1],
  },
  'C#': {
    rightHand: [2, 3, 1, 2, 3, 4, 1, 2],
    leftHand: [3, 2, 1, 4, 3, 2, 1, 2],
  },
  D: {
    rightHand: [1, 2, 3, 1, 2, 3, 4, 5],
    leftHand: [5, 4, 3, 2, 1, 3, 2, 1],
  },
  'D#': {
    rightHand: [2, 1, 2, 3, 4, 1, 2, 3],
    leftHand: [3, 2, 1, 4, 3, 2, 1, 2],
  },
  E: {
    rightHand: [1, 2, 3, 1, 2, 3, 4, 5],
    leftHand: [5, 4, 3, 2, 1, 3, 2, 1],
  },
  F: {
    rightHand: [1, 2, 3, 4, 1, 2, 3, 4],
    leftHand: [5, 4, 3, 2, 1, 3, 2, 1],
  },
  'F#': {
    rightHand: [2, 3, 4, 1, 2, 3, 1, 2],
    leftHand: [4, 3, 2, 1, 3, 2, 1, 2],
  },
  G: {
    rightHand: [1, 2, 3, 1, 2, 3, 4, 5],
    leftHand: [5, 4, 3, 2, 1, 3, 2, 1],
  },
  'G#': {
    rightHand: [2, 3, 1, 2, 3, 1, 2, 3],
    leftHand: [3, 2, 1, 4, 3, 2, 1, 2],
  },
  A: {
    rightHand: [1, 2, 3, 1, 2, 3, 4, 5],
    leftHand: [5, 4, 3, 2, 1, 3, 2, 1],
  },
  'A#': {
    rightHand: [2, 1, 2, 3, 1, 2, 3, 4],
    leftHand: [3, 2, 1, 4, 3, 2, 1, 2],
  },
  B: {
    rightHand: [1, 2, 3, 1, 2, 3, 4, 5],
    leftHand: [4, 3, 2, 1, 4, 3, 2, 1],
  },
}

/**
 * Standard classical fingering by root, for natural minor scales. Several
 * keys share their major-scale counterpart's fingering (the black/white
 * key layout at the crossing points happens to match), but several others
 * — notably C#, F# and the 3-consecutive-black-key group's minor
 * counterparts — differ from their major fingering because the lowered
 * 3rd/6th/7th degrees shift which scale degrees land on black vs. white
 * keys.
 *
 * The five black-tonic keys (C#, D#, F#, G#, A#) were independently
 * re-verified note-by-note directly against the rendered
 * learnmusictheory.net PDF page (see the module doc comment above) and
 * cross-checked against Wikibooks' fingering table. G#/Ab's left hand is
 * the one exception seeded from that reading rather than copied verbatim:
 * the value originally seeded here had its thumb landing on F# (a black
 * key) — a genuine, provable error (not just a source disagreement), since
 * it broke the "thumb never on a black key" rule that every other entry in
 * this table (and `MAJOR_FINGERING`) satisfies for both hands. Its
 * replacement, [3, 2, 1, 4, 3, 1, 2, 3], is the value actually printed in
 * the learnmusictheory.net chart for G#/Ab natural minor's left hand, and
 * satisfies the thumb rule (thumb lands on B and E, both white keys).
 */
const NATURAL_MINOR_FINGERING: Record<NoteName, KeyFingering> = {
  C: {
    rightHand: [1, 2, 3, 1, 2, 3, 4, 5],
    leftHand: [5, 4, 3, 2, 1, 3, 2, 1],
  },
  'C#': {
    rightHand: [2, 3, 1, 2, 3, 1, 2, 3],
    leftHand: [3, 2, 1, 4, 3, 2, 1, 2],
  },
  D: {
    rightHand: [1, 2, 3, 1, 2, 3, 4, 5],
    leftHand: [5, 4, 3, 2, 1, 3, 2, 1],
  },
  'D#': {
    rightHand: [2, 1, 2, 3, 4, 1, 2, 3],
    leftHand: [2, 1, 4, 3, 2, 1, 3, 2],
  },
  E: {
    rightHand: [1, 2, 3, 1, 2, 3, 4, 5],
    leftHand: [5, 4, 3, 2, 1, 3, 2, 1],
  },
  F: {
    rightHand: [1, 2, 3, 4, 1, 2, 3, 4],
    leftHand: [5, 4, 3, 2, 1, 3, 2, 1],
  },
  'F#': {
    rightHand: [2, 3, 1, 2, 3, 1, 2, 3],
    leftHand: [4, 3, 2, 1, 3, 2, 1, 2],
  },
  G: {
    rightHand: [1, 2, 3, 1, 2, 3, 4, 5],
    leftHand: [5, 4, 3, 2, 1, 3, 2, 1],
  },
  'G#': {
    rightHand: [2, 3, 1, 2, 3, 1, 2, 3],
    leftHand: [3, 2, 1, 4, 3, 1, 2, 3],
  },
  A: {
    rightHand: [1, 2, 3, 1, 2, 3, 4, 5],
    leftHand: [5, 4, 3, 2, 1, 3, 2, 1],
  },
  'A#': {
    rightHand: [2, 1, 2, 3, 1, 2, 3, 4],
    leftHand: [2, 1, 3, 2, 1, 4, 3, 2],
  },
  B: {
    rightHand: [1, 2, 3, 1, 2, 3, 4, 5],
    leftHand: [4, 3, 2, 1, 4, 3, 2, 1],
  },
}

function fingeringFor(root: NoteName, type: ScaleType): KeyFingering {
  return type === 'major'
    ? MAJOR_FINGERING[root]
    : NATURAL_MINOR_FINGERING[root]
}

function buildScale(root: NoteName, type: ScaleType): Scale {
  const { rightHand, leftHand } = fingeringFor(root, type)
  return {
    root,
    type,
    notes: scaleNotes(root, type),
    rightHandFingering: rightHand,
    leftHandFingering: leftHand,
  }
}

const SCALE_TYPES: ScaleType[] = ['major', 'natural-minor']

/**
 * All 24 seeded scales (12 roots x major/natural-minor), in a fixed
 * chromatic-then-type order.
 */
export const scaleLibrary: Scale[] = CHROMATIC.flatMap((root) =>
  SCALE_TYPES.map((type) => buildScale(root, type)),
)
