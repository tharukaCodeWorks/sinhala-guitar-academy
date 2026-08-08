import type { Song } from './types'

/**
 * One of the earliest and most enduring Sinhala stage-drama songs (lyrics
 * by John de Silva, melody by Pundit Visvanath Lauji, from the early
 * 1900s), later popularized in recordings by Sunil Santha. Same
 * verified I-V-vi-iii / iii-I-V-ii progression as the guitar arrangement
 * (`src/data/songs/dannoBudunge.ts`) — the harmony is an objective fact
 * about the song, independent of instrument — realized here as keyboard
 * root-position triads instead of guitar open-chord shapes.
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
  suggestedRightHandPosition: {
    startingNote: 'C',
    octaveDescription: 'Middle C octave.',
    note: 'Thumb on middle C, fingers 1-5 covering C-D-E-F-G.',
  },
  suggestedLeftHandPosition: {
    startingNote: 'C',
    octaveDescription: 'One octave below middle C.',
    note: 'Pinky on the low C, thumb reaching up to G — root-position block chords.',
  },
  notes:
    'A simplified all-root-position teaching arrangement, mirroring the guitar catalog’s all-open-chord simplification of the same song. Good first "old classic" alongside the contemporary songs in this catalog.',
}
