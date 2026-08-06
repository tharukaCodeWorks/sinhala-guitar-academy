import type { Song } from './types'

/**
 * One of the most commonly taught Bollywood acoustic songs — this
 * G-D-Em-C progression with a classic D-D-U-U-D-U strum is how most guitar
 * tutorials teach it.
 */
export const kabira: Song = {
  id: 'kabira',
  title: 'Kabira',
  artist: 'Tochi Raina & Rekha Bhardwaj (Yeh Jawaani Hai Deewani)',
  key: 'G',
  difficulty: 'beginner',
  chordProgression: [
    { name: 'Verse', chordIds: ['g-major', 'd-major', 'e-minor', 'c-major'] },
    {
      name: 'Chorus',
      chordIds: ['c-major', 'g-major', 'd-major', 'e-minor'],
    },
  ],
  strummingPatternId: 'pop-folk-ddu-udu',
  notes:
    'An entirely open-chord arrangement — one of the most popular acoustic-guitar Bollywood covers, great for practicing the G-D-Em-C shape family.',
}
