import type { Song } from './types'

/**
 * A gentle evergreen ballad from veteran Sri Lankan vocalist Desmond De
 * Silva. Same verified progression as the guitar arrangement
 * (`src/data/songs/nilwanMuhudeTheere.ts`).
 */
export const nilwanMuhudeTheere: Song = {
  id: 'nilwan-muhude-theere',
  title: 'Nilwan Muhude Theere',
  artist: 'Desmond De Silva',
  key: 'G',
  difficulty: 'beginner',
  chordProgression: [
    { name: 'Verse', chordIds: ['g-major', 'e-minor', 'c-major', 'd-major'] },
    {
      name: 'Chorus',
      chordIds: ['a-minor', 'd-major', 'g-major', 'e-minor'],
    },
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
  notes:
    'An all-root-position ballad in G, a good pairing with Olu Pipila and Danno Budunge for a slow-song practice set.',
}
