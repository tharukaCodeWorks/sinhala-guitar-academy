import type { Lesson } from '../types'

/**
 * Lesson 5 of the beginner method course: basic triads and the I-IV-V
 * chords. Builds directly on the C-position hand shape from lesson 4 (the
 * C major triad uses the same three right-hand fingers already trained
 * there) and sets up lesson 6, which puts these exact three chords to work
 * in a real song.
 */
export const basicTriadsIivV: Lesson = {
  id: 'basic-triads-i-iv-v',
  title: 'Basic Triads & the I-IV-V Chords',
  tier: 'beginner',
  order: 5,
  summary:
    'How a major triad is built, the I-IV-V chords (C, F, and G) in the key of C, and the difference between block chords and broken chords.',
  sections: [
    {
      heading: 'Building a Major Triad',
      body: 'A triad is a three-note chord built by stacking two intervals of a third: the root, then a note a third above it, then another note a third above that. A major triad specifically stacks a major third (4 half-steps) below a minor third (3 half-steps) — for example C, E, and G: C to E is a major third, E to G is a minor third. Play all three fingers (thumb, middle finger, pinky — fingers 1, 3, 5) down together and you have a C major chord.',
    },
    {
      heading: 'Roman Numerals: I, IV, and V',
      body: 'Roman numerals label chords by which scale degree of the current key their root sits on, not by a fixed letter name — this is what lets the same "I-IV-V" pattern be transposed to any key. In the key of C major, the C major chord (built on the 1st scale degree) is the I chord, the F major chord (built on the 4th degree) is the IV chord, and the G major chord (built on the 5th degree) is the V chord. These three triads are the harmonic backbone of an enormous number of simple songs, because between them they contain every note of the C major scale.',
    },
    {
      heading: 'The C, F, and G Triads in C Position',
      body: "From the C five-finger position you already know, C major is fingers 1-3-5 on C-E-G, no shift needed. F major is built the same way one scale step higher, F-A-C, most comfortably played with fingers 1-3-5 shifted up so the thumb sits on F. G major is F-A-C's neighbor again, G-B-D, thumb on G. Practice moving cleanly between all three — C to F to G to C — since that exact I-IV-V-I motion is the single most common chord progression a beginner will meet.",
      keyboardChordId: 'c-major',
    },
    {
      heading: 'Block Chords vs. Broken Chords',
      body: 'A block chord plays all the notes of the triad simultaneously, as a single solid sound — this is what you have been practicing above. A broken chord (also called an arpeggio when played in strict order) instead plays the same notes one at a time, usually low to high, which gives a lighter, flowing left-hand accompaniment instead of a heavy simultaneous thump. Both are built from the exact same three notes; only the timing differs. Left-hand accompaniments in simple pieces very often use broken chords precisely because they are gentler under a melody than block chords would be.',
    },
    {
      heading: 'A Real Example: I-IV-V in Another Key',
      body: 'The same I-IV-V relationship you are practicing here in C (C-F-G) reappears, transposed, in real songs — including the Sinhala baila classic "Surangani," which is built from nothing but I, IV, and V in the key of G (G-C-D). Once your ear and hand recognize the *shape* of an I-IV-V progression in one key, you can recognize and play it in any key; lesson 6 puts exactly this to work.',
      keyboardChordId: 'g-major',
    },
    {
      heading: 'Practice: I-IV-V-I in Block and Broken Form',
      body: "Play C-F-G-C as block chords, one chord per measure in 4/4 time, until the hand shifts feel smooth. Then play the identical progression as broken chords — each triad's three notes played low-to-high as quarter notes filling the measure instead of struck together. Compare how different the same three chords sound depending only on whether the notes arrive together or one after another.",
      keyboardChordId: 'f-major',
    },
  ],
}
