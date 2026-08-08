import type { Song } from './types'

/**
 * Recorded by Sunil Santha in 1946 — the first song recorded at Radio
 * Ceylon and a landmark in defining a distinctly Sinhala (rather than
 * Indian-influenced) style of song. Same verified I-vi-IV-V progression as
 * the guitar arrangement (`src/data/songs/oluPipila.ts`).
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
  suggestedRightHandPosition: {
    startingNote: 'G',
    octaveDescription: 'The G just above middle C.',
    note: 'Thumb on that G, fingers 1-5 covering G-A-B-C-D.',
  },
  suggestedLeftHandPosition: {
    startingNote: 'G',
    octaveDescription: 'One octave below middle C.',
    note: 'Pinky on the low G — root-position block chords.',
  },
  melodyExcerpt: {
    title: 'Opening Hook (G arpeggio)',
    description:
      "An original simplified ascending arpeggio through the G major chord, echoing the gentle fingerpicked feel of the guitar arrangement's intro — a teaching arrangement, not a transcription of the recording.",
    notes: [
      { note: 'G', octaveOffset: 0, finger: 1 },
      { note: 'B', octaveOffset: 0, finger: 2 },
      { note: 'D', octaveOffset: 0, finger: 3 },
      { note: 'G', octaveOffset: 1, finger: 5 },
    ],
  },
  notes:
    'A landmark 1946 recording; taught here with simple root-position block chords under a gentle right-hand arpeggio for the intro.',
}
