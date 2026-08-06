import type { Song } from './types'

/**
 * One of H.R. Jothipala's most enduring hits — still a staple of Sinhala
 * pop covers today. Simplified to an all-open-chord teaching arrangement.
 */
export const sarungale: Song = {
  id: 'sarungale',
  title: 'Sarungale',
  artist: 'H.R. Jothipala',
  key: 'G',
  difficulty: 'beginner',
  chordProgression: [
    { name: 'Verse', chordIds: ['g-major', 'e-minor', 'c-major', 'd-major'] },
    {
      name: 'Chorus',
      chordIds: ['c-major', 'g-major', 'd-major', 'e-minor'],
    },
  ],
  strummingPatternId: 'pop-folk-ddu-udu',
  notes:
    'A simplified, entirely open-chord arrangement of a classic Jothipala hit — good practice for the G-Em-C-D "four chord" shape family.',
}
