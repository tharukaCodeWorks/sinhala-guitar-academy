import type {
  Chord,
  ChordDifficulty,
  ChordVariant,
  FingerNumber,
  NoteName,
  SixStringTuple,
  StringPosition,
} from './types'

/**
 * Moveable barre shapes for every root/quality that doesn't have a
 * well-known open-position voicing (see `openShapeChords` in
 * `openShapes.ts` for those). Rather than hand-transcribing 16 more
 * chord diagrams (error-prone and hard to keep consistent), these are
 * generated from the two classic moveable "CAGED" shapes:
 *
 * - the **E-shape** barre (built from the open E / Em shape, root note on
 *   the low E string), and
 * - the **A-shape** barre (built from the open A / Am shape, root note on
 *   the A string, low E string muted).
 *
 * For each root we pick whichever of the two lands on the lower fret
 * (friendlier to play, and matches the shape guitarists conventionally use
 * for that chord — e.g. F is the E-shape at fret 1, B is the A-shape at
 * fret 2).
 */

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

/** Roots that already have a hand-transcribed open shape (see openShapes.ts). */
const MAJOR_OPEN_ROOTS: NoteName[] = ['C', 'D', 'E', 'G', 'A']
const MINOR_OPEN_ROOTS: NoteName[] = ['A', 'D', 'E']

/** Semitone distance you have to move `anchor`'s open shape to land on `root`. */
function fretDistance(root: NoteName, anchor: NoteName): number {
  const rootIndex = NOTE_ORDER.indexOf(root)
  const anchorIndex = NOTE_ORDER.indexOf(anchor)
  return (rootIndex - anchorIndex + 12) % 12
}

interface BarreTemplate {
  anchor: NoteName
  shapeName: 'E-shape' | 'A-shape'
  /** Per-string fret offset from the barre fret, or `null` if muted. */
  offsets: SixStringTuple<number | null>
  fingering: SixStringTuple<FingerNumber | null>
}

const E_SHAPE_MAJOR: BarreTemplate = {
  anchor: 'E',
  shapeName: 'E-shape',
  offsets: [0, 2, 2, 1, 0, 0],
  fingering: [1, 3, 4, 2, 1, 1],
}

const E_SHAPE_MINOR: BarreTemplate = {
  anchor: 'E',
  shapeName: 'E-shape',
  offsets: [0, 2, 2, 0, 0, 0],
  fingering: [1, 3, 4, 1, 1, 1],
}

const A_SHAPE_MAJOR: BarreTemplate = {
  anchor: 'A',
  shapeName: 'A-shape',
  offsets: [null, 0, 2, 2, 2, 0],
  fingering: [null, 1, 3, 3, 3, 1],
}

const A_SHAPE_MINOR: BarreTemplate = {
  anchor: 'A',
  shapeName: 'A-shape',
  offsets: [null, 0, 2, 2, 1, 0],
  fingering: [null, 1, 3, 4, 2, 1],
}

function ordinal(n: number): string {
  const rem100 = n % 100
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`
  switch (n % 10) {
    case 1:
      return `${n}st`
    case 2:
      return `${n}nd`
    case 3:
      return `${n}rd`
    default:
      return `${n}th`
  }
}

function difficultyForBarreFret(fret: number): ChordDifficulty {
  return fret <= 3 ? 'intermediate' : 'advanced'
}

function buildBarreVariant(
  root: NoteName,
  eTemplate: BarreTemplate,
  aTemplate: BarreTemplate,
  idPrefix: string,
): ChordVariant {
  const eFret = fretDistance(root, eTemplate.anchor)
  const aFret = fretDistance(root, aTemplate.anchor)
  const useEShape = eFret <= aFret
  const template = useEShape ? eTemplate : aTemplate
  const fret = useEShape ? eFret : aFret

  const strings = template.offsets.map((offset): StringPosition =>
    offset === null ? 'muted' : offset + fret,
  ) as SixStringTuple<StringPosition>

  return {
    id: `${idPrefix}-barre`,
    label: `Barre (${template.shapeName}, ${ordinal(fret)} fret)`,
    baseFret: fret,
    strings,
    fingering: template.fingering,
    difficulty: difficultyForBarreFret(fret),
  }
}

function buildBarreChord(root: NoteName, quality: 'major' | 'minor'): Chord {
  const slug = ROOT_SLUG[root]
  const idPrefix = `${slug}-${quality}`
  const eTemplate = quality === 'major' ? E_SHAPE_MAJOR : E_SHAPE_MINOR
  const aTemplate = quality === 'major' ? A_SHAPE_MAJOR : A_SHAPE_MINOR

  return {
    id: idPrefix,
    name: quality === 'major' ? root : `${root}m`,
    root,
    quality,
    variants: [buildBarreVariant(root, eTemplate, aTemplate, idPrefix)],
  }
}

const barreMajorChords: Chord[] = NOTE_ORDER.filter(
  (root) => !MAJOR_OPEN_ROOTS.includes(root),
).map((root) => buildBarreChord(root, 'major'))

const barreMinorChords: Chord[] = NOTE_ORDER.filter(
  (root) => !MINOR_OPEN_ROOTS.includes(root),
).map((root) => buildBarreChord(root, 'minor'))

export const barreShapeChords: Chord[] = [
  ...barreMajorChords,
  ...barreMinorChords,
]
