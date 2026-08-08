import type { Lesson } from '../types'

/**
 * Lesson 5 (final lesson) of the intermediate method course: reading from a
 * lead sheet and realizing an accompaniment from chord symbols alone. Uses
 * "Manike Mage Hithe" — the song tagged `lessonRoles: ['lead-sheet-chords']`
 * in the keyboard song catalog (`src/data/keyboardSongs/manikeMageHithe.ts`)
 * specifically because, per that file's own notes, its chord-symbol sheet
 * is widely published and easy to read — see that file for the full
 * arrangement (hand positions, chord progression, 1st-inversion voicing
 * note) this lesson references rather than duplicates. This is the same
 * chord-symbol convention (root letter + quality suffix, e.g. "Am", "F",
 * "C", "G") already used on the guitar side's song pages
 * (`src/data/songs`), so a player moving between the two tracks reads
 * exactly the same notation either way.
 */
export const leadSheetsChordSymbols: Lesson = {
  id: 'lead-sheets-chord-symbols',
  title: 'Playing From Lead Sheets & Chord Symbols',
  tier: 'intermediate',
  order: 5,
  summary:
    'How to read a lead sheet — a melody line with chord symbols written above it — and build a left-hand accompaniment from nothing but those chord symbols, using the real chord-symbol sheet for "Manike Mage Hithe."',
  songId: 'manike-mage-hithe',
  sections: [
    {
      heading: 'What a Lead Sheet Is',
      body: 'Every piece you have played so far has come fully written out, both hands, every note on the page. A **lead sheet** is different: it shows only the melody line in standard notation, with **chord symbols** (letter names like "Am," "F," "C," "G," rather than fully notated chords) printed above the staff at the point each chord change happens. The performer is expected to supply their own left-hand accompaniment from the chord symbols alone — this is exactly how most published pop and folk song sheets, including the guitar side of this app\'s song catalog, present a song.',
    },
    {
      heading: 'Reading the Chord Symbol Itself',
      body: 'A chord symbol names the chord\'s root and quality with a compact convention: a bare capital letter ("C," "F," "G") means a major triad on that root; a capital letter followed by a lowercase "m" ("Am," "Em") means a minor triad. This is the identical convention used throughout this app\'s guitar song pages, so a chord symbol you already know how to read from a guitar chord sheet needs no translation to play on keyboard — only the fingering under your hand changes, not the symbol\'s meaning.',
    },
    {
      heading: 'The Lead Sheet for "Manike Mage Hithe"',
      body: "This arrangement is transposed to A minor (keyboard has no capo to preserve familiar shapes the way the guitar arrangement does), giving a clean, widely-published chord-symbol sheet: the **verse** reads Am - F - G - Em, and the **chorus** reads Am - F - C - G — four chords total, all of which you already know from the beginner and intermediate tiers. The melody line itself sits comfortably within an A-position five-finger reach, thumb on the A above Middle C, as noted in the song's suggested right-hand position.",
      keyboardChordId: 'a-minor',
    },
    {
      heading: 'Realizing a Left-Hand Accompaniment',
      body: "With only chord symbols to go on, the simplest accompaniment is a block chord per change: play the full triad for each chord symbol, held for as long as that symbol is in effect, left hand an octave below the melody — Am, then F, then G, then Em for the verse, in root position to start. Once that is secure, apply the previous lesson's inversion technique exactly where the song's own notes call for it: F and C sound smoother in 1st inversion here (F/A and C/E) because they keep the bass note close to the chord that came before, rather than jumping to each new root.",
    },
    {
      heading: 'From Block Chords to a Broken-Chord Pattern',
      body: 'Once the block-chord version feels solid in both verse and chorus, try a broken-chord left-hand pattern instead — the same technique from the beginner tier\'s "Putting It Together" lesson, now applied to a lead sheet you built the harmony for yourself rather than one that was written out. Play each chord\'s notes low-to-high as steady eighth notes instead of struck together; this is much closer to how a keyboard accompaniment for a song like this would actually be played, and it is a pattern you can now apply to any lead sheet, not just this one.',
    },
    {
      heading: 'The Skill This Unlocks',
      body: 'Reading a lead sheet and realizing your own accompaniment from chord symbols is the single skill that opens up the largest amount of real-world repertoire — most popular songs, including the great majority of the Sinhala song catalog in this app, are published exactly this way: a melody with chords, no fully written accompaniment. Everything from this course so far — block and broken chords, inversions, hand positions, rhythm reading — comes together here as the tools you use to turn a bare chord-symbol sheet into a full performance.',
    },
  ],
}
