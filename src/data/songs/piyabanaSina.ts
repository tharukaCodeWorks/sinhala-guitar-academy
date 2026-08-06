import type { Song } from './types'

/** A romantic classic from Milton Mallawarachchi, simplified to open chords. */
export const piyabanaSina: Song = {
  id: 'piyabana-sina',
  title: 'Piyabana Sina',
  artist: 'Milton Mallawarachchi',
  key: 'C',
  difficulty: 'beginner',
  chordProgression: [
    { name: 'Verse', chordIds: ['c-major', 'a-minor', 'e-minor', 'g-major'] },
    {
      name: 'Chorus',
      chordIds: ['a-minor', 'e-minor', 'c-major', 'g-major'],
    },
  ],
  strummingPatternId: 'ballad-downstrokes',
  notes:
    'A simplified open-chord arrangement of this romantic classic — slow, deliberate downstrokes let each chord ring out.',
}
