import type { Lesson } from '../types'

/**
 * Lesson 2 of the beginner method course: reading the grand staff. Follows
 * lesson 1 (physical orientation on the keyboard) before introducing
 * notation, matching the standard method-book order (Faber/Alfred both
 * teach hand position before staff reading).
 */
export const noteReadingGrandStaff: Lesson = {
  id: 'note-reading-grand-staff',
  title: 'Note Reading: The Grand Staff',
  tier: 'beginner',
  order: 2,
  summary:
    'How the treble and bass clef combine into the grand staff, how Middle C sits between them, and the classic guide-note tricks (FACE and Every Good Boy Does Fine) for reading quickly.',
  sections: [
    {
      heading: 'Two Staves, One Instrument',
      body: 'Piano music is written on two 5-line staves joined by a brace: the treble (or G) clef on top, usually read by the right hand, and the bass (or F) clef on the bottom, usually read by the left hand. Together they form the grand staff. The treble clef sign curls around the second line from the bottom, fixing that line as G; the bass clef\'s two dots sit above and below the second line from the top, fixing that line as F. These two "anchor lines" are how each clef gets its name.',
    },
    {
      heading: 'Middle C: The Bridge Between the Staves',
      body: 'Middle C — the note you learned to locate physically in lesson 1 — sits exactly in the gap between the two staves, on a short "ledger line" of its own. Written just below the treble staff, it is the same Middle C written just above the bass staff; both notations point to the identical key on the keyboard. This is why it is such a natural starting reference: it is the one note that visually connects what the right hand reads to what the left hand reads.',
    },
    {
      heading:
        'Guide Notes in the Treble Clef: FACE and Every Good Boy Does Fine',
      body: 'Rather than counting lines and spaces from scratch every time, beginners memorize two quick guide phrases. The four spaces of the treble staff, bottom to top, spell F-A-C-E. The five lines, bottom to top, are remembered with the phrase "Every Good Boy Does Fine" — E, G, B, D, F. Once you can recite both instantly, you can name any note on the treble staff by counting up or down a line or two from the nearest letter you already know, rather than starting from the bottom every time.',
    },
    {
      heading: 'Guide Notes in the Bass Clef',
      body: 'The bass clef has its own equivalent phrases. The four spaces, bottom to top, are remembered as "All Cows Eat Grass" — A, C, E, G. The five lines, bottom to top, are remembered with "Good Boys Do Fine Always" — G, B, D, F, A. Notice the bass clef sits a third lower overall than the treble clef, which is why its guide letters differ even though the memorization technique is identical.',
    },
    {
      heading: 'Middle C Position on the Staff',
      body: 'The most common first reading position places the right-hand thumb on Middle C and the left-hand pinky an octave below, both hands\' fingers 2 through 5 covering the next four white keys upward and downward respectively. In this "Middle C position," every note your hands touch sits within one ledger line of the staff in either direction, which is exactly why method books introduce it first — it keeps new readers close to the one note (Middle C) they already know cold.',
    },
    {
      heading: 'Practice: Naming Notes by Guide Letter',
      body: 'Take any note on the grand staff and find the nearest guide letter (a line note using Every Good Boy Does Fine or Good Boys Do Fine Always, or a space note using FACE or All Cows Eat Grass), then count up or down by step to name the note in front of you. Do this daily with a handful of notes rather than trying to memorize the full staff by rote — the guide-letter method is what professional readers still fall back on for anything outside their most familiar range.',
    },
  ],
}
