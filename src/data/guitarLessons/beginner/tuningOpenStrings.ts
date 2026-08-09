import type { Lesson } from '../types'

/**
 * Lesson 2 of the beginner method course: standard tuning, the six open
 * strings, and why tuning accurately matters from day one — the standard
 * second lesson in both Hal Leonard Book 1 and JustinGuitar's course,
 * always placed right after notational literacy and before any chords.
 */
export const tuningOpenStrings: Lesson = {
  id: 'tuning-open-strings',
  title: 'Tuning & The Open Strings',
  tier: 'beginner',
  order: 2,
  summary:
    'Learn the six open strings in standard tuning (E-A-D-G-B-E, low to high), a simple relative-tuning method, and why playing in tune matters for training your ear from the very first lesson.',
  sections: [
    {
      heading: 'Standard Tuning, Low to High',
      body: 'A guitar in standard tuning has six strings pitched, from the thickest/lowest-sounding string to the thinnest/highest-sounding string: E (low E, 6th string), A (5th), D (4th), G (3rd), B (2nd), and E (high e, 1st string). A common way to memorize the order is the phrase "Eddie Ate Dynamite, Good Bye Eddie." Notice the low and high strings share the same letter name, E, two octaves apart — that symmetry is useful later when you start recognizing patterns on the fretboard.',
    },
    {
      heading: 'Why Each String’s Pitch Matters',
      body: 'Every chord shape and every tab in this course assumes the guitar is in standard tuning — a chord diagram’s dots tell you where to place fingers relative to strings that are already at the right pitch, not what pitch to tune to. If a string is flat or sharp, even a perfectly-fretted chord shape will sound wrong, and it becomes impossible to tell whether a mistake is your fingers or your tuning. Get in the habit of tuning before every single practice session, even a short one — this single habit does more for how quickly your ear develops than almost anything else in the first few months.',
    },
    {
      heading: 'Using an Electronic Tuner',
      body: 'The most reliable way to tune as a beginner is a clip-on electronic tuner attached to the headstock, or a tuner app using your device’s microphone. Pluck one string at a time, let it ring, and watch the display: it will show which note it hears and whether that note is flat (too low, turn the tuning peg to tighten/raise pitch) or sharp (too high, loosen slightly). Tune each of the six strings in turn, then re-check the first string once more — bringing any string up to pitch can pull the others very slightly, so a second pass is normal.',
    },
    {
      heading: 'A Simple Relative-Tuning Method',
      body: 'If you don’t have a tuner handy but trust one string is already correct (the low E, for example, checked against a piano or another instrument), you can tune the rest of the guitar relative to it: press the low E string at the 5th fret — that note is A, the same pitch the open A string (5th string) should match. Tune the open A string until it matches. Then press the A string at the 5th fret to get D, and tune the open D string to match, and so on up through G (D string, 5th fret) and B (G string, 4th fret — the one exception to the "5th fret" rule) and finally high e (B string, 5th fret).',
    },
    {
      heading: 'Training Your Ear',
      body: 'Tuning by ear, even with a tuner’s help to confirm you got it right, is itself ear training — you are learning what "in tune" sounds and feels like, and starting to notice the subtle beating/wavering sound two slightly-mismatched pitches make, which disappears once they match exactly. Beginners who skip this and only ever glance at a tuner’s display without listening tend to develop their pitch sense much more slowly. Make listening, not just watching the display, part of every tuning session.',
    },
  ],
}
