import type { Song } from './types'

/**
 * A classic Sinhala baila number, long associated with calypso-style baila
 * performers (recorded/covered by many artists, including Charles
 * Antony). Baila is characteristically built on just three chords, and
 * this one is commonly taught with exactly I-IV-V in G — G, C, D and
 * nothing else — which makes it the catalog's pick for the "Putting It
 * Together" lesson (SGA-TASK-16): a real song a beginner can play start to
 * finish from a five-finger G position after learning only three chords.
 */
export const surangani: Song = {
  id: 'surangani',
  title: 'Surangani',
  artist: 'Traditional Sinhala baila',
  key: 'G',
  difficulty: 'beginner',
  chordProgression: [
    { name: 'Verse', chordIds: ['g-major', 'c-major', 'g-major', 'd-major'] },
    {
      name: 'Chorus',
      chordIds: ['g-major', 'c-major', 'd-major', 'g-major'],
    },
  ],
  suggestedRightHandPosition: {
    startingNote: 'G',
    octaveDescription: 'The G just above middle C.',
    note: 'Thumb on that G, fingers 1-5 covering G-A-B-C-D.',
  },
  suggestedLeftHandPosition: {
    startingNote: 'G',
    octaveDescription: 'One octave below middle C.',
    note: 'Pinky on the low G — simple I-IV-V block chords, no inversions needed.',
  },
  lessonRoles: ['putting-it-together'],
  notes:
    'A pure I-IV-V (G-C-D) baila classic — deliberately kept to the three chords a beginner meets first, with no vi or ii chord, so it can be the "everything you\'ve learned so far, in one real song" piece.',
}
