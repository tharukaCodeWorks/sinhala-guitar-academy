import type { Song } from './types'

/**
 * One of W.D. Amaradeva's most beloved songs. Taught here with a capo on
 * the 2nd fret so the E-C#m-A-B open/near-open shapes carry the melody
 * while the song still sounds in F# — see `notes` for why that one barre
 * chord (B) puts this at intermediate rather than beginner.
 */
export const maBalaKale: Song = {
  id: 'ma-bala-kale',
  title: 'Ma Bala Kale',
  artist: 'W.D. Amaradeva',
  key: 'F#',
  difficulty: 'intermediate',
  capoFret: 2,
  chordProgression: [
    {
      name: 'Verse',
      chordIds: ['e-major', 'c-sharp-minor', 'a-major', 'b-major'],
    },
    {
      name: 'Chorus',
      chordIds: ['c-sharp-minor', 'a-major', 'e-major', 'b-major'],
    },
  ],
  strummingPatternId: 'ballad-downstrokes',
  notes:
    'Capo on the 2nd fret lets you play E-C#m-A-B shapes while the song still sounds in F# — the version most tutorials teach. B is the only barre chord needed, which is why this is classed intermediate rather than beginner.',
}
