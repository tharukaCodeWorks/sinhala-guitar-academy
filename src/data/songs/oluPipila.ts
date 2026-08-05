import type { Song } from './types'

const N = null

/**
 * Recorded by Sunil Santha in 1946 — the first song recorded at Radio
 * Ceylon and a landmark in defining a distinctly Sinhala (rather than
 * Indian-influenced) style of song.
 */
export const oluPipila: Song = {
  id: 'olu-pipila',
  title: 'Olu Pipila (Wila Lela Denawa)',
  artist: 'Sunil Santha',
  key: 'G',
  difficulty: 'beginner',
  chordProgression: [
    { name: 'Verse', chordIds: ['g-major', 'e-minor', 'c-major', 'd-major'] },
    { name: 'Chorus', chordIds: ['c-major', 'd-major', 'g-major', 'e-minor'] },
  ],
  strummingPatternId: 'ballad-downstrokes',
  tab: {
    title: 'Intro Fingerpicking (G arpeggio)',
    description:
      'An original gentle fingerpicked arpeggio through the G shape for the intro — a teaching arrangement, not a note-for-note transcription of the recording.',
    tempoBpm: 66,
    timeSignature: { beatsPerMeasure: 4, beatUnit: 4 },
    measures: [
      {
        positions: [
          { frets: [3, N, N, N, N, N] },
          { frets: [N, 2, N, N, N, N] },
          { frets: [N, N, 0, N, N, N] },
          { frets: [N, N, N, 0, N, N] },
          { frets: [N, N, N, N, 0, N] },
          { frets: [N, N, N, N, N, 3] },
          { frets: [N, N, N, N, 0, N] },
          { frets: [N, N, N, 0, N, N] },
        ],
      },
    ],
  },
  notes:
    'A landmark 1946 recording; taught here with a gentle fingerpicked open-chord intro instead of a strummed one.',
}
