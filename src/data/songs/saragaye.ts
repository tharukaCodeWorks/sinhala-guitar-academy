import type { Song } from './types'

/** A popular contemporary acoustic-leaning Sinhala love song, entirely in open chords. */
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
  strummingPatternId: 'pop-folk-ddu-udu',
  notes:
    'An easy, entirely open-chord progression — a good next song right after the chord library and pop-folk strumming pattern.',
}
