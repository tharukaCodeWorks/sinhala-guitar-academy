import type { Lesson } from '../types'

/**
 * Lesson 6 (final lesson) of the beginner method course: putting it all
 * together in a real song. Uses "Sarungale" — a real `difficulty:
 * 'beginner'` entry in the guitar song catalog (`src/data/songs`) whose
 * chord progression uses only G, Em, C, and D (see
 * `src/data/songs/sarungale.ts`), i.e. exactly the seven open chords
 * taught across lessons 3 and 5 and nothing outside that set, so this
 * lesson references it by `songId` rather than inventing a practice
 * piece.
 */
export const puttingItTogether: Lesson = {
  id: 'putting-it-together',
  title: 'Putting It Together: Your First Song',
  tier: 'beginner',
  order: 6,
  summary:
    'Combine everything from lessons 1-5 — chord shapes, steady downstroke strumming, and clean chord changes — to play "Sarungale" straight through, a real Sinhala classic built entirely from chords you already know.',
  songId: 'sarungale',
  sections: [
    {
      heading: 'Why This Song',
      body: '"Sarungale," one of H.R. Jothipala’s most enduring hits, is arranged here using nothing but G, E minor, C, and D — every single chord you already practiced in lessons 3 and 5, and no others. That makes it an ideal first full song: there is nothing new to learn chord-wise, only the challenge of stringing familiar shapes together in time, which is exactly the skill this whole beginner tier has been building toward.',
    },
    {
      heading: 'The Chord Progression',
      body: 'The verse moves G - Em - C - D, and the chorus moves C - G - D - Em — the same four chords reordered. Play through each section slowly at first, one chord per bar, using the "prepare and move together" technique from lesson 4 for every change, especially the C-to-D change in the verse, which (as noted in lesson 5) shares almost no common finger positions between the two shapes.',
      chordId: 'g-major',
    },
    {
      heading: 'The Strumming Pattern',
      body: 'This arrangement uses a pop-folk down-down-up-up-down-up pattern across each bar (counted "1 (rest) 2-and (rest) 3-and 4-and"), a step up from the plain steady downstrokes you practiced in lesson 4. If the up-strokes feel awkward at first, simplify back to four steady downstrokes per bar — the same pattern from lesson 4 — until the chord changes themselves feel secure, then reintroduce the up-strokes once that’s solid.',
      chordId: 'e-minor',
    },
    {
      heading: 'Practicing Verse and Chorus Separately',
      body: 'Loop just the verse progression (G - Em - C - D) on its own until every change is clean at a slow, steady tempo, then do the same with the chorus (C - G - D - Em) in isolation before trying to link them. Isolating each section this way, rather than always starting from the top, means you spend your practice time on whichever specific change is still shaky instead of re-practicing the parts you have already mastered.',
      chordId: 'c-major',
    },
    {
      heading: 'Playing It Straight Through',
      body: 'Once verse and chorus both feel secure on their own, play the full song straight through — verse, then chorus, repeated — at a tempo slow enough that you make zero missed changes rather than a faster tempo with mistakes. This is the same principle from lesson 4’s slow, deliberate reps, now applied to a complete, real piece of music rather than an isolated drill. Reaching the end of a real song cleanly, even slowly, is the milestone this entire beginner tier has been building toward.',
      chordId: 'd-major',
    },
  ],
}
