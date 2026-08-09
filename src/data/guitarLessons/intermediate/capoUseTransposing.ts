import type { Lesson } from '../types'

/**
 * Lesson 5 of the intermediate method course: capo use and transposing —
 * the standard pairing with barre chords in both Hal Leonard Guitar Method
 * Book 2 and JustinGuitar's Grade 2-3 course, since a capo is the main
 * real-world tool guitarists reach for to avoid playing awkward barre
 * shapes throughout a whole song. Explicitly points at this app's Capo
 * Tool (`/capo-tool`) as the practice/reference tool for this lesson.
 */
export const capoUseTransposing: Lesson = {
  id: 'capo-use-transposing',
  title: 'Capo Use & Transposing',
  tier: 'intermediate',
  order: 5,
  summary:
    "Learn why and how guitarists use a capo — matching a singer's key, swapping a barre-heavy song for easier open shapes, and getting a brighter tonal color — using the Capo Tool to see shapes and sounding chords side by side.",
  sections: [
    {
      heading: 'What a Capo Actually Does',
      body: 'A capo clamps across all six strings at a chosen fret, acting like a moveable "nut" that raises the pitch of every open string by however many frets it sits at, without changing which shape you physically finger. Play the exact same C major shape you already know with a capo on the 2nd fret, and what actually sounds is a D chord — the shape in your hand never changes, only what comes out of the guitar does. This is the key idea behind everything else in this lesson.',
    },
    {
      heading: "Matching a Singer's Key",
      body: "Singers do not always sit comfortably in whatever key a song's chords were originally written in, and a capo is the standard fix: rather than relearning a whole new set of chord shapes in a harder key, you keep playing the familiar shapes you already know and move the capo up or down until the sounding pitch matches the singer's comfortable range. This is one of the most common reasons capos show up on stage and in recordings — it is a practical vocal tool as much as a guitar one.",
    },
    {
      heading: 'Trading Barre Chords for Easier Open Shapes',
      body: '"Manike Mage Hithe" is a real example already in this app\'s song catalog: its actual key is C# minor, which would otherwise demand barre chords all the way through, but it is taught with a capo on the 4th fret instead, using the open Am-F-G-Em shapes (still needing just the one F barre chord from lesson 4) while the song still sounds correctly in C#. This is exactly the trade a capo makes possible — swapping a run of unfamiliar or physically demanding barre shapes for shapes you already have solid, at the cost of nothing but moving the capo.',
      chordId: 'f-major',
    },
    {
      heading: 'Tonal Color',
      body: "Beyond convenience, a capo also changes the guitar's tone: open strings ring brighter and more resonant than fretted ones, so the same chord progression played higher up the neck with a capo (using more open strings) often sounds noticeably chimier and lighter than the identical progression played as barre chords lower down — a deliberate arrangement choice many recordings make, not just a beginner shortcut.",
    },
    {
      heading: 'Practicing with the Capo Tool',
      body: 'The Capo Tool page (`/capo-tool`) answers exactly the two questions this lesson raises: build a progression from shapes you already know, move the capo slider, and see the shape you are fingering side by side with the chord that actually sounds at that fret — or work backwards from a chord you want to sound and see which capo position gets you there on a familiar shape. Spend time there experimenting with different capo frets on chords from earlier lessons before moving on to a full song in the next lesson.',
    },
  ],
}
