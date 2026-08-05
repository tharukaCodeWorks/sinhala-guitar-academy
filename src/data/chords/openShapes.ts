import type { Chord } from './types'

/**
 * Hand-transcribed open-position chord shapes — the roots/qualities that
 * have a well-known, beginner-friendly open voicing (i.e. at least one
 * un-fretted string): the CAGED major roots, the "Am/Dm/Em" minor roots,
 * and the common open 7th shapes.
 *
 * Every other root/quality is covered by a moveable barre shape instead —
 * see `barreShapes.ts`.
 */
export const openShapeChords: Chord[] = [
  {
    id: 'c-major',
    name: 'C',
    root: 'C',
    quality: 'major',
    variants: [
      {
        id: 'c-major-open',
        label: 'Open',
        baseFret: 1,
        strings: ['muted', 3, 2, 'open', 1, 'open'],
        fingering: [null, 3, 2, null, 1, null],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'd-major',
    name: 'D',
    root: 'D',
    quality: 'major',
    variants: [
      {
        id: 'd-major-open',
        label: 'Open',
        baseFret: 1,
        strings: ['muted', 'muted', 'open', 2, 3, 2],
        fingering: [null, null, null, 1, 3, 2],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'e-major',
    name: 'E',
    root: 'E',
    quality: 'major',
    variants: [
      {
        id: 'e-major-open',
        label: 'Open',
        baseFret: 1,
        strings: ['open', 2, 2, 1, 'open', 'open'],
        fingering: [null, 2, 3, 1, null, null],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'g-major',
    name: 'G',
    root: 'G',
    quality: 'major',
    variants: [
      {
        id: 'g-major-open',
        label: 'Open',
        baseFret: 1,
        strings: [3, 2, 'open', 'open', 'open', 3],
        fingering: [3, 2, null, null, null, 4],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'a-major',
    name: 'A',
    root: 'A',
    quality: 'major',
    variants: [
      {
        id: 'a-major-open',
        label: 'Open',
        baseFret: 1,
        strings: ['muted', 'open', 2, 2, 2, 'open'],
        fingering: [null, null, 1, 2, 3, null],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'a-minor',
    name: 'Am',
    root: 'A',
    quality: 'minor',
    variants: [
      {
        id: 'a-minor-open',
        label: 'Open',
        baseFret: 1,
        strings: ['muted', 'open', 2, 2, 1, 'open'],
        fingering: [null, null, 2, 3, 1, null],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'd-minor',
    name: 'Dm',
    root: 'D',
    quality: 'minor',
    variants: [
      {
        id: 'd-minor-open',
        label: 'Open',
        baseFret: 1,
        strings: ['muted', 'muted', 'open', 2, 3, 1],
        fingering: [null, null, null, 2, 3, 1],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'e-minor',
    name: 'Em',
    root: 'E',
    quality: 'minor',
    variants: [
      {
        id: 'e-minor-open',
        label: 'Open',
        baseFret: 1,
        strings: ['open', 2, 2, 'open', 'open', 'open'],
        fingering: [null, 2, 3, null, null, null],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'a-7th',
    name: 'A7',
    root: 'A',
    quality: '7th',
    variants: [
      {
        id: 'a-7th-open',
        label: 'Open',
        baseFret: 1,
        strings: ['muted', 'open', 2, 'open', 2, 'open'],
        fingering: [null, null, 1, null, 2, null],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'd-7th',
    name: 'D7',
    root: 'D',
    quality: '7th',
    variants: [
      {
        id: 'd-7th-open',
        label: 'Open',
        baseFret: 1,
        strings: ['muted', 'muted', 'open', 2, 1, 2],
        fingering: [null, null, null, 3, 1, 2],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'e-7th',
    name: 'E7',
    root: 'E',
    quality: '7th',
    variants: [
      {
        id: 'e-7th-open',
        label: 'Open',
        baseFret: 1,
        strings: ['open', 2, 'open', 1, 'open', 'open'],
        fingering: [null, 2, null, 1, null, null],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'g-7th',
    name: 'G7',
    root: 'G',
    quality: '7th',
    variants: [
      {
        id: 'g-7th-open',
        label: 'Open',
        baseFret: 1,
        strings: [3, 2, 'open', 'open', 'open', 1],
        fingering: [3, 2, null, null, null, 1],
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'c-7th',
    name: 'C7',
    root: 'C',
    quality: '7th',
    variants: [
      {
        id: 'c-7th-open',
        label: 'Open',
        baseFret: 1,
        strings: ['muted', 3, 2, 3, 1, 'open'],
        fingering: [null, 3, 2, 4, 1, null],
        difficulty: 'intermediate',
      },
    ],
  },
  {
    id: 'b-7th',
    name: 'B7',
    root: 'B',
    quality: '7th',
    variants: [
      {
        id: 'b-7th-open',
        label: 'Open',
        baseFret: 1,
        strings: ['muted', 2, 1, 2, 'open', 2],
        fingering: [null, 2, 1, 3, null, 4],
        difficulty: 'intermediate',
      },
    ],
  },
]
