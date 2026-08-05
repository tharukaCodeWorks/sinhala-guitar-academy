import type { Song } from './types'

/**
 * One of the earliest and most enduring Sinhala stage-drama songs (lyrics
 * by John de Silva, melody by Pundit Visvanath Lauji, from the early
 * 1900s), later popularized in recordings by Sunil Santha. Still commonly
 * taught as a first "old classic" alongside contemporary pop.
 */
export const dannoBudunge: Song = {
  id: 'danno-budunge',
  title: 'Danno Budunge',
  artist: 'Traditional (lyrics: John de Silva; popularized by Sunil Santha)',
  key: 'C',
  difficulty: 'beginner',
  chordProgression: [
    { name: 'Verse', chordIds: ['c-major', 'g-major', 'a-minor', 'e-minor'] },
    { name: 'Chorus', chordIds: ['e-minor', 'c-major', 'g-major', 'd-major'] },
  ],
  strummingPatternId: 'ballad-downstrokes',
  notes:
    'Simplified to an all-open-chord teaching arrangement — some recordings add an F chord, left out here to keep this an easy first "classic" song.',
}
