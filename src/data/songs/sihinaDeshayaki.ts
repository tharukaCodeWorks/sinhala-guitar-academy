import type { Song } from './types'

/**
 * Clarence Wijewardena & the Gypsies helped define the modern Sinhala
 * pop/baila-fusion sound, and this is one of their best-loved songs —
 * paired here with the 6/8 baila shuffle strumming pattern to match.
 */
export const sihinaDeshayaki: Song = {
  id: 'sihina-deshayaki',
  title: 'Sihina Deshayaki',
  artist: 'Clarence Wijewardena & the Gypsies',
  key: 'G',
  difficulty: 'beginner',
  chordProgression: [
    { name: 'Verse', chordIds: ['g-major', 'd-major', 'e-minor', 'c-major'] },
    {
      name: 'Chorus',
      chordIds: ['e-minor', 'c-major', 'g-major', 'd-major'],
    },
  ],
  strummingPatternId: 'baila-six-eight',
  notes:
    'A simplified, all-open-chord arrangement of a classic from the pioneers of Sinhala baila-pop fusion — the 6/8 baila shuffle suits its bouncy feel well.',
}
