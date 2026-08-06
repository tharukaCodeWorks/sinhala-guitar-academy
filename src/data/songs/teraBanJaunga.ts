import type { Song } from './types'

/** A widely covered modern Hindi romantic hit, simplified to open chords. */
export const teraBanJaunga: Song = {
  id: 'tera-ban-jaunga',
  title: 'Tera Ban Jaunga',
  artist: 'Akhil Sachdeva & Tulsi Kumar (Kabir Singh)',
  key: 'C',
  difficulty: 'beginner',
  chordProgression: [
    { name: 'Verse', chordIds: ['c-major', 'g-major', 'a-minor', 'e-minor'] },
    {
      name: 'Chorus',
      chordIds: ['a-minor', 'e-minor', 'c-major', 'g-major'],
    },
  ],
  strummingPatternId: 'filmi-verse-groove',
  notes:
    "Simplified to an all-open-chord arrangement — the sparse filmi verse groove suits the song's gentle, verse-driven feel.",
}
