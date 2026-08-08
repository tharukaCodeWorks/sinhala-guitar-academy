import type { Song } from './types'

/**
 * A popular contemporary acoustic-leaning Sinhala love song. Same verified
 * progression as the guitar arrangement (`src/data/songs/saragaye.ts`).
 */
export const saragaye: Song = {
  id: 'saragaye',
  title: 'Saragaye',
  artist: 'Sanuka Wickramasinghe',
  key: 'C',
  difficulty: 'beginner',
  chordProgression: [
    { name: 'Verse', chordIds: ['c-major', 'g-major', 'a-minor', 'e-minor'] },
    {
      name: 'Chorus',
      chordIds: ['d-major', 'c-major', 'g-major', 'a-minor'],
    },
  ],
  suggestedRightHandPosition: {
    startingNote: 'C',
    octaveDescription: 'Middle C octave.',
    note: 'Thumb on middle C, fingers 1-5 covering C-D-E-F-G.',
  },
  suggestedLeftHandPosition: {
    startingNote: 'C',
    octaveDescription: 'One octave below middle C.',
    note: 'Pinky on the low C — root-position block chords.',
  },
  notes:
    'An easy, entirely root-position progression — a good next song right after Danno Budunge, once C-G-Am-Em feels comfortable.',
}
