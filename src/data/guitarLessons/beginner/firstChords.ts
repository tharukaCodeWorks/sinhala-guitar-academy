import type { Lesson } from '../types'

/**
 * Lesson 3 of the beginner method course: the first three open chords —
 * Em, E, and Am — chosen in this order because they use the fewest
 * fingers and the simplest shapes, the universal starting point shared by
 * Hal Leonard Book 1 and JustinGuitar's course alike, before harder
 * shapes are introduced.
 */
export const firstChords: Lesson = {
  id: 'first-chords-em-e-am',
  title: 'Your First Chords: Em, E, Am',
  tier: 'beginner',
  order: 3,
  summary:
    'Play your first three open chords — E minor, E major, and A minor — starting with the simplest, fewest-finger shapes before anything harder.',
  sections: [
    {
      heading: 'Why Start Here',
      body: 'E minor, E major, and A minor are the traditional first chords in nearly every beginner guitar method because they use only two fingers each (E minor needs just two, E major and A minor need two or three) and none of them require muting or skipping strings — every string rings as part of the chord. Getting these three solid first builds the basic fretting-hand strength and finger-placement accuracy that every later, harder chord depends on.',
    },
    {
      heading: 'E Minor (Em)',
      body: 'Place your 2nd finger on the 5th string, 2nd fret, and your 3rd finger on the 4th string, 2nd fret. Every other string — including both E strings and the open G and B strings — rings open. Strum all six strings. Em is usually taught first of the three because it is the single easiest full chord shape on the guitar: two fingers, both on adjacent strings and the same fret.',
      chordId: 'e-minor',
    },
    {
      heading: 'E Major (E)',
      body: 'Starting from the Em shape you just learned, add your 1st finger on the 3rd string, 1st fret — that is the only change. Keep your 2nd finger on the 5th string/2nd fret and 3rd finger on the 4th string/2nd fret exactly as before. Strum all six strings again. Teaching E right after Em, as one small addition to a shape you already know, is a deliberate sequencing trick this lesson (and most beginner methods) uses to make the second chord feel easy rather than like starting over.',
      chordId: 'e-major',
    },
    {
      heading: 'A Minor (Am)',
      body: 'Place your 1st finger on the 2nd string, 1st fret, your 2nd finger on the 4th string, 2nd fret, and your 3rd finger on the 3rd string, 2nd fret. The low E string is not played (mute it or simply strum starting from the open A string), and the high e string rings open. Am introduces your first "do not play this string" chord — practice starting your strum from the 5th string (open A) rather than the 6th.',
      chordId: 'a-minor',
    },
    {
      heading: 'Practice: One Chord at a Time',
      body: 'For each chord, place your fingers, then strum slowly and listen for buzzing or muted strings — a buzz usually means a finger isn’t pressing quite hard enough or is too close to the fret; a dead/muted string usually means a neighboring finger is accidentally touching it. Lift your hand completely off the strings, then reform the same shape from scratch, and strum again. Repeat this ten times per chord. The goal at this stage is accuracy of the shape, not speed — switching quickly between chords is what lesson 4 builds on top of this.',
    },
  ],
}
