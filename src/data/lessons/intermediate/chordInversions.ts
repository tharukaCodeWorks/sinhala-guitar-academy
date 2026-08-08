import type { Lesson } from '../types'

/**
 * Lesson 2 of the intermediate method course: chord inversions. Builds
 * directly on the beginner tier's block-chord I-IV-V work, and its real-
 * world example is drawn from "Manike Mage Hithe" — the song tagged
 * `lessonRoles: ['lead-sheet-chords']` in the keyboard song catalog
 * (`src/data/keyboardSongs/manikeMageHithe.ts`), whose own arrangement note
 * already calls for F and C to be played in 1st inversion for smoother
 * voice leading out of Am, exactly the technique this lesson teaches.
 */
export const chordInversions: Lesson = {
  id: 'chord-inversions',
  title: 'Chord Inversions',
  tier: 'intermediate',
  order: 2,
  summary:
    'Root position vs. 1st and 2nd inversion, why inversions exist, and how choosing the right inversion smooths out the voice leading between chord changes — illustrated with a real inversion choice from "Manike Mage Hithe."',
  sections: [
    {
      heading: 'What an Inversion Is',
      body: "Every chord you played in the beginner tier was in **root position** — the chord's root note as the lowest-sounding note, with the 3rd and 5th stacked above it (e.g. C major as C-E-G, root on the bottom). An **inversion** keeps the exact same three notes but reorders which one is lowest: **1st inversion** puts the 3rd in the bass (E-G-C for C major), and **2nd inversion** puts the 5th in the bass (G-C-E for C major). Nothing about the chord's identity changes — it is still a C major triad — only which chord tone sits on the bottom.",
    },
    {
      heading: 'Why Inversions Exist: Voice Leading',
      body: 'The reason inversions matter is **voice leading** — how smoothly the notes of one chord move to the notes of the next. Playing every chord in root position often forces the hand to leap a large distance between chords even when the two chords share notes in common. Choosing an inversion that keeps a shared or nearby note close to where it already was lets the hand move only a small distance, sometimes just one key, between chord changes — the progression sounds more connected and is also physically easier to play smoothly.',
    },
    {
      heading: 'A Real Example: F and C in 1st Inversion',
      body: '"Manike Mage Hithe" is arranged here in A minor with the chorus progression Am-F-C-G. Played entirely in root position, the hand would jump considerably between Am and F, and again between F and C. The arrangement\'s own performance note instead calls for **F and C to be played in 1st inversion** (written F/A and C/E, meaning "F chord with A in the bass" and "C chord with E in the bass") — because A is already a note of the Am chord you just played, and E is a note both the F and C chords share, keeping the bass note close or identical between changes instead of leaping.',
      keyboardChordId: 'f-major',
    },
    {
      heading: 'Building 1st and 2nd Inversion by Ear',
      body: 'To build any triad\'s 1st inversion from its root position, take the bottom (root) note and move it up an octave so it becomes the top note — C-E-G becomes E-G-C. To build the 2nd inversion from there, repeat the same move on the new bottom note (E) — E-G-C becomes G-C-E. Practice this on C major first (C-E-G, then E-G-C, then G-C-E), then try it on F major (F-A-C, then A-C-F, then C-F-A) — the same F chord referenced in the "Manike Mage Hithe" example above, now in its 1st-inversion voicing A-C-F.',
      keyboardChordId: 'c-major',
    },
    {
      heading: 'Choosing an Inversion, Not Just Root Position, by Default',
      body: 'Once inversions are part of your vocabulary, the beginner-tier habit of always reaching for root position stops being the automatic choice. When you meet a new chord progression, briefly check each chord change against the one before it: does root position force a big jump? If a shared or neighboring tone is available in an inversion instead, that is usually the smoother, more professional-sounding choice — exactly the judgment call the "Manike Mage Hithe" arrangement already made for you on the F and C chords.',
    },
    {
      heading: 'Practice: Am-F-C-G With and Without Inversions',
      body: "Play the Am-F-C-G chorus progression twice: first entirely in root position, then again using the arrangement's suggested voicing — Am in root position, F in 1st inversion (A-C-F), C in 1st inversion (E-G-C), and G in root position. Listen closely to the difference in how connected the second version sounds compared to the first, and notice how much less the hand has to move.",
    },
  ],
}
