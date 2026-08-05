import type { Song } from './types'

/** A gentle evergreen ballad from veteran Sri Lankan vocalist Desmond De Silva. */
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
  strummingPatternId: 'ballad-downstrokes',
  notes:
    'An all-open-chord ballad in G major, another good pairing with Olu Pipila for a slow-song practice set.',
}
