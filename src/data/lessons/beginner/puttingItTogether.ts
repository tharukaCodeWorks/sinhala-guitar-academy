import type { Lesson } from '../types'

/**
 * Lesson 6 (final lesson) of the beginner method course: putting it all
 * together in a real piece. Uses "Surangani" — the song tagged
 * `lessonRoles: ['putting-it-together']` in the keyboard song catalog
 * (`src/data/keyboardSongs`) specifically because its chord progression is
 * a pure I-IV-V (G-C-D) with no chord outside what lesson 5 already
 * taught, and its melody sits comfortably in a five-finger hand position —
 * see `src/data/keyboardSongs/surangani.ts` for the full arrangement (hand
 * positions, chord progression by section) this lesson references rather
 * than duplicates.
 */
export const puttingItTogether: Lesson = {
  id: 'putting-it-together',
  title: 'Putting It Together',
  tier: 'beginner',
  order: 6,
  summary:
    'Combine everything from lessons 1-5 — hand position, note and rhythm reading, the five-finger pattern, and the I-IV-V chords — to play "Surangani," a real Sinhala baila classic built from nothing but G, C, and D.',
  songId: 'surangani',
  sections: [
    {
      heading: 'Why This Song',
      body: '"Surangani" is a classic Sinhala baila number, and baila is characteristically built on just three chords — here, a pure I-IV-V in the key of G: G, C, and D, and nothing else. That makes it an ideal first full piece: every chord in it is one you already practiced (in the key of C) in lesson 5, just transposed up a step to G, and its melody sits comfortably under a five-finger hand position, exactly like the exercises from lesson 4.',
    },
    {
      heading: 'Setting Up the Hand Position',
      body: "Start your right hand in a G five-finger position: thumb on the G just above Middle C, fingers 2 through 5 covering A, B, C, and D. Start your left hand an octave below, pinky on the low G. This is the identical shape you built in lesson 4's C position, simply shifted up one white key so the thumb lands on G instead of C — the fingering feels the same, only the starting note has moved.",
    },
    {
      heading: 'The Chord Progression',
      body: 'The verse moves G - C - G - D, and the chorus moves G - C - D - G — in both cases nothing but the I (G), IV (C), and V (D) chords from lesson 5, just transposed a step higher than the C-F-G you practiced there. Play the left hand as simple root-position block chords first, one chord per change, keeping the pinky anchored near that low G so each chord is a short, comfortable reach rather than a jump.',
      keyboardChordId: 'g-major',
    },
    {
      heading: 'Left-Hand Accompaniment: Block Chords First, Then Broken',
      body: "Begin by playing the verse and chorus progressions as plain block chords in the left hand, one chord held per measure, while you get comfortable with the G-C-D changes. Once that feels solid, try switching to broken chords for the same progression — each chord's three notes played low-to-high instead of struck together — exactly the block-vs-broken contrast you practiced in lesson 5, now used to give the accompaniment a lighter, more idiomatic baila feel.",
      keyboardChordId: 'c-major',
    },
    {
      heading: 'Bringing In the Right Hand',
      body: 'With the left-hand chords secure, add the right hand playing a simple melody within the G five-finger position (G-A-B-C-D), moving mostly by step and landing on chord tones of whichever chord the left hand is holding at that moment — a G, B, or D on a G chord; a C, E, or G on a C chord; a D, F#, or A on a D chord. Practice hands separately first, exactly as in lesson 4, before combining them.',
      keyboardChordId: 'd-major',
    },
    {
      heading: 'Putting It All Together',
      body: 'Once both hands are individually comfortable, play the full verse and chorus with hands together, counting steadily as you learned in lesson 3, reading each chord change as you learned in lesson 2, all from the five-finger hand position you set up at the start. This is the same skill stack every lesson in this course has been building toward — one real, complete Sinhala song, played start to finish with nothing beyond what you have already learned.',
    },
  ],
}
