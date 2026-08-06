import type { Song } from './types'

/**
 * The iconic 1990s Bollywood romantic theme from Dilwale Dulhania Le
 * Jayenge — hugely popular in Sri Lanka too. A favorite first Hindi song
 * for guitar beginners.
 */
export const tujheDekhaTo: Song = {
  id: 'tujhe-dekha-to',
  title: 'Tujhe Dekha To',
  artist: 'Lata Mangeshkar & Kumar Sanu (Dilwale Dulhania Le Jayenge)',
  key: 'G',
  difficulty: 'beginner',
  chordProgression: [
    { name: 'Verse', chordIds: ['g-major', 'c-major', 'g-major', 'd-major'] },
    {
      name: 'Chorus',
      chordIds: ['e-minor', 'c-major', 'g-major', 'd-major'],
    },
  ],
  strummingPatternId: 'bollywood-ballad-dux',
  notes:
    'Simplified to an all-open-chord arrangement — the D-U-X-U ballad strum pattern matches how this romantic theme is commonly taught.',
}
