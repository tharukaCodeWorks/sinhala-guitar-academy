import type { Lesson } from '../types'

/**
 * Lesson 5 of the beginner method course: the remaining "campfire" open
 * chords — D, G, C, and A — completing the standard beginner open-chord
 * set alongside Em, E, and Am from lesson 3, per both Hal Leonard Book 1
 * and JustinGuitar's course.
 */
export const campfireChords: Lesson = {
  id: 'campfire-chords-d-g-c-a',
  title: 'Expanding Your Chord Vocabulary: D, G, C, A',
  tier: 'beginner',
  order: 5,
  summary:
    'Add D, G, C, and A to the Em/E/Am shapes from lesson 3, completing the full standard "campfire" set of open chords used in the vast majority of beginner songs.',
  sections: [
    {
      heading: 'D Major',
      body: 'Place your 1st finger on the 3rd string, 2nd fret, your 2nd finger on the 1st string, 2nd fret, and your 3rd finger on the 2nd string, 3rd fret — the three fingers form a small triangle. Do not play the low E string; start your strum from the open D string (4th string). This is the first chord in the course where you both skip a string and use three fingers at once, so expect it to take more reps than earlier shapes.',
      chordId: 'd-major',
    },
    {
      heading: 'G Major',
      body: 'Place your 2nd finger on the 6th string (low E), 3rd fret, your 1st finger on the 5th string, 2nd fret, and your 3rd finger on the 1st string (high e), 3rd fret. The 4th, 3rd, and 2nd strings all ring open. All six strings are played. A common alternate fingering swaps the 2nd and 3rd fingers to the 5th and 6th strings respectively, which some players find makes the change into C easier — try both and see which feels more natural.',
      chordId: 'g-major',
    },
    {
      heading: 'C Major',
      body: 'Place your 3rd finger on the 5th string, 3rd fret, your 2nd finger on the 4th string, 2nd fret, and your 1st finger on the 2nd string, 1st fret. Do not play the low E string; the open D, G, and high e strings all ring along with your fretted notes. Start your strum from the open A string. C is often considered one of the trickier open chords for beginners because of the stretch between the 1st and 3rd fingers — go slowly.',
      chordId: 'c-major',
    },
    {
      heading: 'A Major',
      body: 'Place your 1st, 2nd, and 3rd fingers all on the 2nd fret, across the 4th, 3rd, and 2nd strings respectively (three fingers squeezed onto one fret, side by side). Do not play the low E string; start your strum from the open A string, and let the high e string ring open. Because three fingers share one fret here, many players find angling the fingertips slightly or rolling the fingers helps avoid accidentally muting a neighboring string.',
      chordId: 'a-major',
    },
    {
      heading: 'Common Transitions in This Set',
      body: 'G to C to D is one of the most common chord movements in beginner songs, and is worth drilling as its own sequence rather than only in random pairs. Notice that C and D share almost no common finger positions, which makes that particular change one of the hardest in this set — practice it slowly with the "prepare and move together" technique from lesson 4 before trying it at full speed. As with lesson 3’s chords, use the Fingering Practice page (`/fingering-practice`) to drill transitions between any two of these new shapes, or between a new shape and one from lesson 3.',
    },
  ],
}
