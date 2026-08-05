import type { Song } from './types'

/**
 * Clarence Wijewardena pioneered the electric-guitar-driven Sinhala pop/
 * baila sound of the 1970s-80s. This catchy calypso-derived groove is
 * characteristic of that style.
 */
export const malataBambarekuSe: Song = {
  id: 'malata-bambareku-se',
  title: 'Malata Bambareku Se',
  artist: 'Clarence Wijewardena',
  key: 'C',
  difficulty: 'intermediate',
  chordProgression: [
    { name: 'Verse', chordIds: ['c-major', 'a-minor', 'f-major', 'g-major'] },
    {
      name: 'Chorus',
      chordIds: ['f-major', 'g-major', 'e-minor', 'a-minor'],
    },
  ],
  strummingPatternId: 'baila-calypso',
  notes:
    'A classic baila-influenced Clarence Wijewardena groove — the calypso-derived strum pattern is the style-defining part here. F is the barre chord that puts this at intermediate rather than beginner.',
}
