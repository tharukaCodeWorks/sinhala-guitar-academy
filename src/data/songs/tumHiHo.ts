import type { Song } from './types'

/**
 * One of the most popular modern Bollywood love songs, widely covered on
 * acoustic guitar. Taught here with a capo on the 1st fret so the
 * Am-G-C-F shapes carry the melody while the song still sounds in F — see
 * `notes` for why that one barre chord (F) puts this at intermediate.
 */
export const tumHiHo: Song = {
  id: 'tum-hi-ho',
  title: 'Tum Hi Ho',
  artist: 'Arijit Singh (Aashiqui 2)',
  key: 'F',
  difficulty: 'intermediate',
  capoFret: 1,
  chordProgression: [
    {
      name: 'Verse',
      chordIds: ['a-minor', 'g-major', 'c-major', 'f-major'],
    },
    {
      name: 'Chorus',
      chordIds: ['f-major', 'c-major', 'g-major', 'a-minor'],
    },
  ],
  strummingPatternId: 'bollywood-ballad-dux',
  notes:
    'Capo on the 1st fret lets you play Am-G-C-F shapes while the song still sounds in F — the version most tutorials teach. F is the only barre chord needed, which is why this is classed intermediate rather than beginner.',
}
