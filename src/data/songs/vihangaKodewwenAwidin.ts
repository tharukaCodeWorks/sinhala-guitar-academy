import type { Song } from './types'

/** A gentle, well-known ballad from veteran Sri Lankan vocalist Amarasiri Peiris. */
export const vihangaKodewwenAwidin: Song = {
  id: 'vihanga-kodewwen-awidin',
  title: 'Vihanga Kodewwen Awidin',
  artist: 'Amarasiri Peiris',
  key: 'D',
  difficulty: 'beginner',
  chordProgression: [
    { name: 'Verse', chordIds: ['d-major', 'a-major', 'g-major', 'e-minor'] },
    { name: 'Chorus', chordIds: ['g-major', 'a-major', 'd-major', 'a-major'] },
  ],
  strummingPatternId: 'ballad-downstrokes',
  notes:
    'An all-open-chord D-A-G-Em progression, a good early ballad to pair with Olu Pipila and Danno Budunge.',
}
