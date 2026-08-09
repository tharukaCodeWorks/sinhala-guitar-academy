import type { Lesson } from '../types'

/**
 * Lesson 4 of the intermediate method course: barre chords, using F major
 * as the entry point — the standard next step after fingerpicking in both
 * Hal Leonard Guitar Method Book 2 and JustinGuitar's Grade 2-3 course.
 * References the generated barre-chord data in `src/data/chords/barreShapes.ts`
 * (`chordId: 'f-major'`), which builds F as the classic E-shape barre at
 * the 1st fret.
 */
export const introductionToBarreChords: Lesson = {
  id: 'introduction-to-barre-chords',
  title: 'Introduction to Barre Chords',
  tier: 'intermediate',
  order: 4,
  summary:
    'Learn F major as your first barre chord and the moveable E-shape concept behind it, plus the thumb position and hand-strength work every barre chord depends on.',
  sections: [
    {
      heading: 'Why Barre Chords Matter',
      body: 'Every chord you have learned so far relies on at least one open string, which only works for the handful of roots that happen to have a comfortable open-position shape. A barre chord uses one finger (almost always the 1st, index finger) pressed flat across some or all of the strings at once, like a moveable "capo" made of your own finger, which frees the shape from any particular open string and lets you slide the exact same hand shape up and down the neck to play any root. This is what unlocks the full set of major and minor chords rather than just the handful with friendly open shapes.',
    },
    {
      heading: 'The F Major Barre Chord',
      body: 'Lay your 1st finger flat across all six strings at the 1st fret — this is the barre. Then add your 2nd finger on the 3rd string (G), 2nd fret, your 3rd finger on the 5th string (A), 3rd fret, and your 4th finger (pinky) on the 4th string (D), 3rd fret. Strum all six strings; the barre finger itself is doing the work on the low E, B, and high e strings, while the other three fingers stack on top of it. F is usually the very first barre chord players learn because, unlike most barre shapes, it sits right at the 1st fret where the strings are easiest to press down.',
      chordId: 'f-major',
    },
    {
      heading: 'The E-Shape: Your First Moveable Shape',
      body: 'Look closely and you will notice the F major barre chord is literally the open E major shape from the beginner tier, just shifted up one fret and with your index finger barring where the nut and open strings used to be. This is called the "E-shape," and it works for any major chord: barre at the fret matching your target root (2nd fret for F#, 3rd for G, and so on) and keep the same finger pattern on top. There is a second common moveable shape, the "A-shape" (built from open A major, root on the 5th string with the low E string muted), used for chords like B — you will meet barre chords built from both shapes as you explore the rest of the chord library.',
    },
    {
      heading: 'Thumb Position and Hand Strength',
      body: 'Keep your fretting-hand thumb roughly behind the middle of the neck, pointing up toward the ceiling, rather than hooking over the top — this gives your index finger the leverage to press evenly across all six strings instead of relying on brute finger strength alone. Barre chords are physically demanding at first and it is completely normal for your hand to tire quickly; short, frequent practice sessions build the specific strength and finger-shape needed far more effectively than one long session that leaves your hand sore.',
    },
    {
      heading: 'Checking for a Clean Barre',
      body: 'Play through the strings of the F major shape one at a time, slowly, and listen for any that buzz or go dead — a buzzing string usually means the barre finger has a small gap under it (often right where a finger joint sits), and a dead string usually means a neighboring finger is leaning over and touching a string it should not. Adjust the angle or position of your index finger slightly and retest, one string at a time, rather than restrumming the whole chord and guessing which string was the problem.',
    },
  ],
}
