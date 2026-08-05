import type { Song } from './types'

/**
 * A Pandit W. D. Amaradeva classic. The Bm and F#m barre chords here are
 * the first barre chords a learner following this catalog in order would
 * meet — good practice once the open-chord songs feel solid.
 */
export const suduNelumaKo: Song = {
  id: 'sudu-neluma-ko',
  title: 'Sudu Neluma Ko',
  artist: 'W. D. Amaradeva',
  key: 'D',
  difficulty: 'intermediate',
  chordProgression: [
    { name: 'Verse', chordIds: ['d-major', 'g-major', 'b-minor', 'e-minor'] },
    {
      name: 'Chorus',
      chordIds: ['a-major', 'g-major', 'f-sharp-minor', 'e-minor'],
    },
  ],
  strummingPatternId: 'ballad-downstrokes',
  notes:
    'The Bm and F#m are barre shapes off the open Am and Em shapes respectively — a natural next step once those open shapes are comfortable.',
}
