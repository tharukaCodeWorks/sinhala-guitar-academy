import type { Song } from './types'

/** A widely-loved modern Bollywood ballad, simplified to a guitar-friendly progression. */
export const channaMereya: Song = {
  id: 'channa-mereya',
  title: 'Channa Mereya',
  artist: 'Arijit Singh (Ae Dil Hai Mushkil)',
  key: 'G',
  difficulty: 'intermediate',
  chordProgression: [
    { name: 'Verse', chordIds: ['e-minor', 'c-major', 'g-major', 'd-major'] },
    {
      name: 'Chorus',
      chordIds: ['g-major', 'd-major', 'b-minor', 'e-minor'],
    },
  ],
  strummingPatternId: 'filmi-verse-groove',
  notes:
    'Adds Bm for a fuller sound on the emotional chorus swell — the one barre chord that puts this at intermediate. Simplified teaching arrangement.',
}
