import type { Song } from './types'

/**
 * The 2021 viral cover that became one of the most-streamed Sri Lankan
 * songs internationally. Recorded in C# minor, but — unlike the guitar
 * arrangement, which uses a capo to keep the familiar Am-F-C-G shapes
 * while sounding in C# minor — a keyboard has no capo equivalent, so this
 * arrangement is simply transposed down to A minor, keeping the same
 * chord-symbol progression (vi-IV-I-V relative to C major, i.e. Am-F-C-G)
 * a beginner-to-intermediate player can read straight off a lead sheet.
 * Same verified progression as the guitar arrangement
 * (`src/data/songs/manikeMageHithe.ts`).
 *
 * Catalogued intermediate: although every chord here has a beginner-tier
 * root-position voicing on keyboard (no barre-chord penalty the way F is
 * on guitar), the recording's tempo and syncopated left-hand pattern call
 * for real hand independence, and the smoothest-sounding voicing needs the
 * F and C chords played in 1st inversion (an intermediate-difficulty
 * voicing) so the top note stays close between chord changes instead of
 * jumping around.
 */
export const manikeMageHithe: Song = {
  id: 'manike-mage-hithe',
  title: 'Manike Mage Hithe',
  artist: 'Yohani, Satheeshan & Chamath Sangeeth',
  key: 'A',
  difficulty: 'intermediate',
  chordProgression: [
    { name: 'Verse', chordIds: ['a-minor', 'f-major', 'g-major', 'e-minor'] },
    {
      name: 'Chorus',
      chordIds: ['a-minor', 'f-major', 'c-major', 'g-major'],
      note: 'Play F and C in 1st inversion (F/A, C/E) for smoother voice leading out of Am.',
    },
  ],
  suggestedRightHandPosition: {
    startingNote: 'A',
    octaveDescription: 'The A above middle C.',
    note: 'Thumb on that A, fingers 1-5 covering A-B-C-D-E.',
  },
  suggestedLeftHandPosition: {
    startingNote: 'A',
    octaveDescription: 'One octave below middle C.',
    note: 'Pinky on the low A; shift to 1st-inversion voicings on F and C as noted above.',
  },
  melodyExcerpt: {
    title: 'Opening Hook (Am arpeggio)',
    description:
      'An original simplified arpeggio through the Am chord for the intro hook — a teaching arrangement, not a note-for-note transcription of the recording.',
    notes: [
      { note: 'A', octaveOffset: 0, finger: 1 },
      { note: 'C', octaveOffset: 0, finger: 2 },
      { note: 'E', octaveOffset: 0, finger: 3 },
      { note: 'A', octaveOffset: 1, finger: 5 },
      { note: 'E', octaveOffset: 0, finger: 3 },
      { note: 'C', octaveOffset: 0, finger: 2 },
    ],
  },
  lessonRoles: ['lead-sheet-chords'],
  notes:
    'Transposed to A minor (no capo equivalent on keyboard) so the shapes match a simple Am-F-C-G lead sheet — picked as the "Playing From Lead Sheets & Chord Symbols" lesson\'s example song because the chord-symbol sheet for this song is widely published and easy to read.',
}
