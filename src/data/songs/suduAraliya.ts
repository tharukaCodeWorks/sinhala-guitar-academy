import type { Song } from './types'

/** A well-loved Amaradeva song about the white frangipani flower. */
export const suduAraliya: Song = {
  id: 'sudu-araliya',
  title: 'Sudu Araliya',
  artist: 'W.D. Amaradeva',
  key: 'D',
  difficulty: 'intermediate',
  chordProgression: [
    { name: 'Verse', chordIds: ['d-major', 'b-minor', 'g-major', 'a-major'] },
    {
      name: 'Chorus',
      chordIds: ['b-minor', 'g-major', 'd-major', 'a-major'],
    },
  ],
  strummingPatternId: 'ballad-downstrokes',
  notes:
    'Adds Bm to the D-G-A trio for a fuller sound — the one barre chord that puts this at intermediate. Simplified teaching arrangement.',
}
