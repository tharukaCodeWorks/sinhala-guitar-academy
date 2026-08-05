import type { Song } from './types'

const N = null

/**
 * From Bathiya & Santhush's (BnS) 2010 album "Sara Sihina" — a widely
 * covered romantic ballad, and a good first "real song" for practicing
 * barre-chord changes (C#m, F#m) in context.
 */
export const sandaRe: Song = {
  id: 'sanda-re',
  title: 'Sanda Re',
  artist: 'Bathiya & Santhush (BnS)',
  key: 'E',
  difficulty: 'intermediate',
  chordProgression: [
    { name: 'Intro', chordIds: ['e-major', 'b-7th', 'e-major'] },
    {
      name: 'Verse',
      chordIds: [
        'e-major',
        'c-sharp-minor',
        'a-major',
        'e-major',
        'b-7th',
        'e-major',
      ],
    },
    {
      name: 'Chorus',
      chordIds: ['e-major', 'f-sharp-minor', 'b-7th', 'e-major'],
    },
  ],
  strummingPatternId: 'pop-folk-ddu-udu',
  tab: {
    title: 'Intro Arpeggio (E major)',
    description:
      'An original arpeggio through the open E major shape for the intro — a teaching arrangement, not a note-for-note transcription of the recording.',
    tempoBpm: 92,
    timeSignature: { beatsPerMeasure: 4, beatUnit: 4 },
    measures: [
      {
        positions: [
          { frets: [0, N, N, N, N, N] },
          { frets: [N, 2, N, N, N, N] },
          { frets: [N, N, 2, N, N, N] },
          { frets: [N, N, N, 1, N, N] },
          { frets: [N, N, N, N, 0, N] },
          { frets: [N, N, N, N, N, 0] },
          { frets: [N, N, N, N, 0, N] },
          { frets: [N, N, N, 1, N, N] },
        ],
      },
    ],
  },
  notes:
    'C#m and F#m are barre shapes off the open Am and Em shapes respectively, so this is a good first "real song" for practicing barre-chord changes.',
}
