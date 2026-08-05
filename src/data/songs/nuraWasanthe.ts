import type { Song } from './types'

/**
 * A popular contemporary romantic Sinhala song. Simplified to a Dm-based
 * teaching progression — the recording also uses a Gm-Bb passage, left out
 * here since neither is in the chord library yet.
 */
export const nuraWasanthe: Song = {
  id: 'nura-wasanthe',
  title: 'Nura Wasanthe',
  artist: 'Nadeemal Perera feat. Pasan Liyanage',
  key: 'D',
  difficulty: 'intermediate',
  chordProgression: [
    { name: 'Verse', chordIds: ['d-minor', 'c-major', 'f-major', 'c-7th'] },
    { name: 'Chorus', chordIds: ['a-minor', 'g-major', 'f-major', 'c-major'] },
  ],
  strummingPatternId: 'pop-folk-ddu-udu',
  notes:
    'Simplified to a Dm-based teaching progression — the recording also uses a Gm-Bb passage, left out here since neither is in the chord library yet.',
}
