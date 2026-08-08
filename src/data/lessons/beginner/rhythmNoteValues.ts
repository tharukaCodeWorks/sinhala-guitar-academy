import type { Lesson } from '../types'

/**
 * Lesson 3 of the beginner method course: rhythm and note values. Follows
 * pitch reading (lesson 2) before combining pitch and rhythm into the
 * five-finger patterns of lesson 4, matching the standard method-book
 * order of introducing "what note" before "how long."
 */
export const rhythmNoteValues: Lesson = {
  id: 'rhythm-note-values',
  title: 'Rhythm & Note Values',
  tier: 'beginner',
  order: 3,
  summary:
    'Whole, half, quarter, and eighth notes as fractions of a beat, and how to count them in the two most common beginner time signatures, 4/4 and 3/4.',
  sections: [
    {
      heading: 'Note Values as Fractions of a Whole Note',
      body: 'A whole note (an open, unfilled notehead with no stem) is the longest common note value and, by definition, is held for the count of "4" in the time signatures you will meet first. A half note (an open notehead with a stem) is worth half of that, or 2 counts. A quarter note (a filled-in notehead with a stem) is worth 1 count. An eighth note (a filled-in notehead with a stem and a flag, or joined to neighbors by a beam) is worth half a count. Each value is exactly half the one before it — whole to half to quarter to eighth — which is the whole system in one sentence.',
    },
    {
      heading: 'Counting in 4/4 Time',
      body: 'A time signature is the two stacked numbers at the start of a piece. In 4/4 ("common time"), the top 4 says there are 4 beats in every measure, and the bottom 4 says a quarter note gets one of those beats. Count steadily "1, 2, 3, 4" and clap or tap a quarter note on every number. A half note gets two full counts (e.g. it lands on "1" and is still ringing through "2"), a whole note fills the entire measure by itself, and a pair of eighth notes fits into a single count, usually counted "1-and, 2-and, 3-and, 4-and."',
    },
    {
      heading: 'Counting in 3/4 Time',
      body: '3/4 time has 3 beats per measure, each still worth a quarter note, giving the familiar "1, 2, 3, 1, 2, 3" waltz feel instead of 4/4\'s four-square feel. A half note followed by a quarter note is a very common pattern in 3/4 (count "1, 2" held through the half note, then "3" for the quarter), and a dotted half note — a half note with a small dot after it, adding half the note\'s own value — fills an entire 3/4 measure by itself, the 3/4 equivalent of a whole note filling a 4/4 measure.',
    },
    {
      heading: 'Rests: Silence Has a Value Too',
      body: 'Every note value has a matching rest symbol of exactly the same length — a whole rest, half rest, quarter rest, and eighth rest — and rests are counted with the same steady pulse as notes, just without playing. A common beginner mistake is to rush through a rest instead of letting the full count pass silently; practicing counting out loud through rests, not just through played notes, builds a much steadier internal pulse.',
    },
    {
      heading: 'Practice: Clap Before You Play',
      body: "Before playing a new rhythm on the keyboard, clap it first while counting out loud in the piece's time signature. Once the clapped rhythm feels steady and even (no rushing through quarter notes or clipping half notes short), transfer the same counting to the keyboard. This separates the rhythm problem from the note-finding problem so you are never trying to solve both at once.",
    },
  ],
}
