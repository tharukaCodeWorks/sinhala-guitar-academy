import type { Lesson } from '../types'

/**
 * Lesson 2 of the intermediate method course: moving past the steady
 * downstrokes and simple down-down-up-up-down-up pattern from the
 * beginner tier into eighth-note alternation, syncopation, and muted
 * "chuck" strums — the standard next rhythmic step in both Hal Leonard
 * Guitar Method Book 2 and JustinGuitar's Grade 2-3 course. Explicitly
 * points practice at this app's Strumming Practice (`/strumming-practice`)
 * and Strum Builder (`/strum-builder`) pages, which are built for exactly
 * this skill.
 */
export const strummingRhythmicVariety: Lesson = {
  id: 'strumming-patterns-rhythmic-variety',
  title: 'Strumming Patterns & Rhythmic Variety',
  tier: 'intermediate',
  order: 2,
  summary:
    'Go beyond steady downstrokes into eighth-note down-up alternation, syncopated off-beat accents, and muted "chuck" strums, using the Strumming Practice and Strum Builder pages to drill each one.',
  sections: [
    {
      heading: 'Eighth-Note Down-Up Strumming',
      body: 'Instead of one strum per beat, split every beat into two: a downstroke on the beat and an upstroke on the "and" in between, so a single bar of 4/4 becomes eight even strokes — "1-and-2-and-3-and-4-and." Your strumming hand keeps moving in a continuous down-up-down-up motion the whole time, even over any beat where you do not actually strike the strings, so the up-down alternation never breaks. Practice this on a chord you already know well, like G major, until the motion feels as automatic as the plain downstrokes from the beginner tier.',
      chordId: 'g-major',
    },
    {
      heading: 'Syncopation and Off-Beat Accents',
      body: 'Syncopation means emphasizing an "and" (an off-beat) instead of, or alongside, the main numbered beats — for example, skipping the downstroke on beat 3 but keeping the upstroke on "3-and," or simply hitting an off-beat strum noticeably harder than the ones around it. This is what gives many pop, folk, and baila-influenced Sinhala arrangements their bounce and forward pull, rather than sitting squarely on the beat the whole time. Start by deliberately dropping just one strum from the steady eighth-note pattern above and see how the missing beat changes the feel.',
    },
    {
      heading: 'Muted "Chuck" Strums',
      body: 'A muted "chuck" is a percussive strum where your fretting hand relaxes just enough to stop the strings from ringing — a rhythmic thump instead of a chord — while your strumming hand keeps the same motion going. Chucks are commonly used on the off-beats between real chord strums to add a percussive drive without changing the harmony, a technique borrowed from reggae- and funk-influenced strumming. Try replacing every other upstroke in your eighth-note pattern with a muted chuck and listen for the groove it creates.',
    },
    {
      heading: 'Practicing on Strumming Practice and Strum Builder',
      body: 'The Strumming Practice page (`/strumming-practice`) plays back and lets you follow along with patterns that mix downs, ups, rests, and mutes exactly like the ones in this lesson, at a tempo you control. The Strum Builder page (`/strum-builder`) goes a step further and lets you construct and audition your own custom eighth-note pattern step by step, so you can experiment with your own syncopation and chuck placement rather than only following pre-built ones. Spend time in both before moving on — comfortable rhythmic variety here is what makes the fingerpicking and barre-chord work in the next few lessons easier to layer on top of.',
    },
  ],
}
