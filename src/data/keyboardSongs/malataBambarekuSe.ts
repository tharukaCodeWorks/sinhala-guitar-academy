import type { Song } from './types'

/**
 * Clarence Wijewardena pioneered the electric-guitar-driven Sinhala pop/
 * baila sound of the 1970s-80s. This catchy calypso-derived groove is
 * characteristic of that style. Same verified progression as the guitar
 * arrangement (`src/data/songs/malataBambarekuSe.ts`).
 *
 * Catalogued intermediate: every chord here has a beginner-tier
 * root-position keyboard voicing (F isn't a barre-chord penalty the way it
 * is on guitar), but the calypso/baila groove's syncopated left-hand
 * off-beat comping pattern needs real hand independence, which is the
 * genuinely keyboard-specific reason this stays intermediate rather than
 * beginner.
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
  suggestedRightHandPosition: {
    startingNote: 'C',
    octaveDescription: 'Middle C octave.',
    note: 'Thumb on middle C, fingers 1-5 covering C-D-E-F-G, played as syncopated off-beat chord stabs.',
  },
  suggestedLeftHandPosition: {
    startingNote: 'C',
    octaveDescription: 'One octave below middle C.',
    note: 'Pinky on the low C — root-position chords, with a bouncing calypso-style off-beat pattern.',
  },
  melodyExcerpt: {
    title: 'Verse Groove Motif',
    description:
      'An original simplified two-bar right-hand comping motif capturing the calypso-derived off-beat feel — not a transcription of the recording.',
    notes: [
      { note: 'C', octaveOffset: 0, finger: 1 },
      { note: 'E', octaveOffset: 0, finger: 2 },
      { note: 'G', octaveOffset: 0, finger: 3 },
      { note: 'E', octaveOffset: 0, finger: 2 },
    ],
  },
  notes:
    'A classic baila-influenced Clarence Wijewardena groove — the calypso-derived off-beat rhythm (not the chords themselves) is what makes this an intermediate piece on keyboard.',
}
