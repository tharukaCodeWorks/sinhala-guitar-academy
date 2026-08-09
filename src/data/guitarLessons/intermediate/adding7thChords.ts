import type { Lesson } from '../types'

/**
 * Lesson 1 of the intermediate method course: the six open-position
 * dominant 7th chords — E7, A7, D7, G7, C7, and B7 — the first step in the
 * common beginner-to-intermediate progression shared by Hal Leonard Guitar
 * Method Book 2 and JustinGuitar's Grade 2-3 course. Every shape here is a
 * one- or two-finger tweak on a major chord already taught in the beginner
 * tier, so the emphasis is on the small physical change plus the new
 * harmonic color, not new hand shapes from scratch.
 */
export const adding7thChords: Lesson = {
  id: 'adding-7th-chords',
  title: 'Adding 7th Chords: E7, A7, D7, G7, C7, B7',
  tier: 'intermediate',
  order: 1,
  summary:
    'Learn the six open-position dominant 7th chords — E7, A7, D7, G7, C7, and B7 — each a small, familiar tweak on a major shape you already know, adding the tension and pull heard constantly in real songs.',
  sections: [
    {
      heading: 'What Makes a Chord a "7th"?',
      body: 'A dominant 7th chord (what people usually just call a "7th" — E7, A7, and so on) adds one extra note, a flattened 7th degree, on top of an ordinary major triad. That extra note creates tension that wants to resolve, which is why 7th chords are so often used as a stepping stone back to their plain major or minor counterpart, or to the chord a fourth above — E7 pulling toward A or Am, A7 toward D, D7 toward G, G7 toward C, C7 toward F, and B7 toward E or Em. You will hear this exact "tension, then release" motion everywhere once you start listening for it.',
    },
    {
      heading: 'E7',
      body: 'Starting from the E major shape you already know, simply lift your 3rd finger off the 4th string (D) so it rings open — that is the only change. Your 2nd finger stays on the 5th string (A), 2nd fret, and your 1st finger stays on the 3rd string (G), 1st fret, exactly as in E major. Strum all six strings. Because it is a one-finger change away from a shape you already have solid, E7 is the easiest of the six to pick up.',
      chordId: 'e-7th',
    },
    {
      heading: 'A7',
      body: 'Starting from the A major shape, lift your middle finger off the 3rd string (G) so it rings open. Keep your 1st finger on the 4th string (D), 2nd fret, right where it is, and shift your finger on the 2nd string (B) to your 2nd finger — same 2nd fret as in A major, just one finger over now that the middle finger has freed up the G string. Do not play the low E string; start your strum from the open A string. Like E7, this is a small, one-string change away from a shape you already know well.',
      chordId: 'a-7th',
    },
    {
      heading: 'D7',
      body: 'Place your 3rd finger on the 3rd string (G), 2nd fret, your 1st finger on the 2nd string (B), 1st fret, and your 2nd finger on the 1st string (e), 2nd fret. Do not play the low E or A strings; start your strum from the open D string. If D major is already solid for you, notice the note on the B string simply drops from the 3rd fret down to the 1st fret — everything else keeps the same fret positions, just with the fingers assigned differently.',
      chordId: 'd-7th',
    },
    {
      heading: 'G7',
      body: 'Starting from the G major shape, move the note on the 1st string (high e) down from the 3rd fret to the 1st fret, fingering it with your 1st finger instead of your pinky. Your 3rd finger stays on the 6th string (low E), 3rd fret, and your 2nd finger stays on the 5th string (A), 2nd fret, exactly as in G major — every string still rings, none are muted. This is a good one to compare directly against G major, back and forth, until the small difference feels automatic.',
      chordId: 'g-7th',
    },
    {
      heading: 'C7 and B7',
      body: 'C7 is one small addition to the C major shape you already know: keep your 3rd finger on the 5th string (A), 3rd fret, your 2nd finger on the 4th string (D), 2nd fret, and your 1st finger on the 2nd string (B), 1st fret, then add your 4th finger (pinky) on the 3rd string (G), 3rd fret — a note that was ringing open in plain C major. Do not play the low E string; the high e string still rings open. B7 follows a similar idea one string group over: mute the low E string, then fret the 5th string (A) at the 2nd fret, the 4th string (D) at the 1st fret, the 3rd string (G) at the 2nd fret, and the 1st string (e) at the 2nd fret, leaving the 2nd string (B) ringing open in the middle of the shape — that open string sitting inside an otherwise fully-fretted chord is what makes B7 feel unusual the first few times.',
      chordId: 'c-7th',
    },
  ],
}
