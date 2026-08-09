import type { Lesson } from '../types'

/**
 * Lesson 6 (final lesson) of the intermediate method course: putting it
 * all together in a real song. Uses "Nura Wasanthe" — a real `difficulty:
 * 'intermediate'` entry in the guitar song catalog (`src/data/songs`)
 * whose verse chord progression already uses both `f-major` (the barre
 * chord from lesson 4) and `c-7th` (the 7th chord from lesson 1), directly
 * reinforcing this tier's two headline new skills (see
 * `src/data/songs/nuraWasanthe.ts`). The progression also introduces one
 * chord not taught anywhere earlier in the course — D minor — which is
 * taught inline in this lesson as a small variation on the D major shape
 * from the beginner tier, the same "teach it as a tweak on a known shape"
 * approach used throughout this course.
 */
export const puttingItTogetherIntermediate: Lesson = {
  id: 'putting-it-together-intermediate',
  title: 'Putting It Together: An Intermediate Song',
  tier: 'intermediate',
  order: 6,
  summary:
    'Combine 7th chords, a barre chord, and rhythmic strumming into a real full song — "Nura Wasanthe" — whose actual chord progression already uses F major and C7, the two headline skills of this tier.',
  songId: 'nura-wasanthe',
  sections: [
    {
      heading: 'Why This Song',
      body: '"Nura Wasanthe" is taught here with a Dm-based progression built from Dm, C, F, C7, Am, and G — a real arrangement already in this app\'s song catalog, not an invented practice piece. Two of those chords are exactly what this tier has spent five lessons building toward: F major, the barre chord from lesson 4, and C7, the dominant 7th chord from lesson 1. Reaching a real song that actually needs both of those new skills, rather than one built from beginner-tier chords alone, is the milestone this whole intermediate tier has been aiming at.',
    },
    {
      heading: 'The One New Chord: D Minor',
      body: 'D minor is the only shape in this song you have not met before, and it is a small variation on D major from the beginner tier: keep your 3rd finger on the 2nd string (B), 3rd fret, exactly as in D major, then move the note on the 1st string (e) down one fret, from the 2nd fret to the 1st fret, fingering it with your 1st finger — and let your 2nd finger take over the 3rd string (G), 2nd fret, which your 1st finger handled in D major. Do not play the low E or A strings, same as D major.',
      chordId: 'd-minor',
    },
    {
      heading: 'The Verse: Dm - C - F - C7',
      body: 'The verse moves D minor to C major to F major (your barre chord from lesson 4) to C7 (your 7th chord from lesson 1), then repeats. The F-to-C7 move is worth isolating on its own: going from a full six-string barre shape into an open shape with a specific pinky stretch is exactly the kind of change that benefits from the "prepare and move together" technique from the beginner tier — picture both hand shapes before you move, rather than sorting out the fingers one at a time after you land.',
      chordId: 'f-major',
    },
    {
      heading: 'The Chorus: Am - G - F - C',
      body: 'The chorus moves A minor to G major to F major to C major — the same F barre chord from the verse, now sitting between two open shapes instead of leading into a 7th chord, which is good practice for barring cleanly right after an open-chord change in either direction rather than only when you have time to reset your hand first.',
      chordId: 'a-minor',
    },
    {
      heading: 'Practicing Verse and Chorus Separately',
      body: 'Loop just the verse (Dm - C - F - C7) on its own at a slow, steady tempo until every change lands cleanly, especially the barre-to-open and open-to-7th transitions, then do the same with the chorus (Am - G - F - C) in isolation before linking them — the same section-by-section approach from the beginner tier\'s "Putting It Together" lesson, now applied to a progression with real barre and 7th-chord changes in it.',
      chordId: 'c-7th',
    },
    {
      heading: 'Playing It Straight Through',
      body: "Once both sections feel secure on their own, play the full song straight through with a steady eighth-note or syncopated strumming pattern from lesson 2 of this tier, at a tempo slow enough that every chord — including the barre — comes through clean rather than buzzed or muted. Getting through a real song that leans on both a barre chord and a 7th chord, cleanly, is the clearest sign yet that the individual skills from this tier's earlier lessons have actually come together.",
    },
  ],
}
