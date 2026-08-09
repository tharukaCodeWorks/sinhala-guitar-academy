import type { Lesson } from '../types'

/**
 * Lesson 1 of the beginner method course: the guitar's parts, how to hold
 * it, and how to read the two notation systems every later lesson leans
 * on — chord diagrams and TAB. This is the standard opening lesson in both
 * the Hal Leonard Guitar Method Book 1 and JustinGuitar's Beginner Course.
 */
export const anatomyPostureReading: Lesson = {
  id: 'guitar-anatomy-posture-reading',
  title: 'Guitar Anatomy, Posture & Reading Chord Diagrams/TAB',
  tier: 'beginner',
  order: 1,
  summary:
    'Learn the parts of the guitar, how to sit or stand while playing, which hand does what, and how to read a chord diagram and a TAB staff — the notational literacy every later lesson assumes.',
  sections: [
    {
      heading: 'Parts of the Guitar',
      body: 'The headstock, at the top, holds the tuning pegs (machine heads) that tighten or loosen each string to change its pitch. Just below it, the nut is a thin grooved strip that spaces the strings and marks the start of playable string length. The long neck is topped with the fretboard, divided into frets — the thin metal strips (or the gaps between them, depending on how a player says it) that you press a string against to change its pitch. Where the neck meets the body is the point most chord shapes near the nut are played close to. On an acoustic, the body has a sound hole that projects the string vibration acoustically; on an electric, pickups under the strings do that job instead, feeding an amplifier. The bridge, near the bottom of the body, anchors the other end of the strings.',
    },
    {
      heading: 'Sitting and Standing Position',
      body: "Sitting: rest the guitar's waist on your right leg (for a right-handed player) or use a footstool under your left foot to angle the neck up slightly, keeping the neck roughly parallel to the floor rather than pointing down at the ground. Sit up straight without hunching over the strings to see your fretting hand — bring the guitar to you, not your head down to it. Standing: a strap holds the guitar at a similar height and angle to your seated position; resist the urge to let it hang low, which twists your fretting wrist awkwardly. Either way, the guitar should feel stable and balanced without you needing to hug it tightly with your strumming arm.",
    },
    {
      heading: 'Fretting Hand vs. Strumming Hand',
      body: 'Your fretting hand (left hand for a right-handed player) presses strings down just behind a fret — not on top of it, which buzzes, and not too far back in the middle of the fret space, which takes more pressure than necessary. Fingertips (not flat pads) press straight down, with your thumb resting roughly behind the neck for leverage, not wrapped over the top. Your strumming/picking hand (right hand) does the rhythmic work — striking the strings with a pick or fingers near the sound hole (acoustic) or over the pickups (electric). These two hands have completely independent jobs and every technique from here forward builds one or the other, or their coordination.',
    },
    {
      heading: 'Reading a Chord Diagram',
      body: "A chord diagram is a small grid: six vertical lines represent the six strings (low E on the left, high e on the right), and horizontal lines represent frets, with the thickest line at the top being the nut (open position). A filled dot on a string/fret intersection means press that string at that fret; an 'O' above a string means play it open (unfretted); an 'X' above a string means don't play that string at all. Numbers inside or below the dots often show which finger to use (1 = index, 2 = middle, 3 = ring, 4 = pinky). This is exactly the diagram format the `ChordDiagram` component in this app renders, and every `chordId` referenced in later lessons points to one of these.",
    },
    {
      heading: 'Reading TAB (Tablature)',
      body: 'TAB is six horizontal lines, same string-to-line mapping as a chord diagram but drawn as a staff read left to right over time, conventionally with the high e string on top and low E on the bottom. A number written on a line tells you which fret to play on that string at that point in time; a `0` means play that string open. Numbers stacked vertically at the same horizontal position are played together, as a chord strike; numbers spread out left to right are played one after another, as a melody line or riff. Small letters near a number (h for hammer-on, p for pull-off, b for bend, / or \\ for slides) mark a playing technique — you will meet these later, but recognizing the basic fret-number layout now is what lets you follow any tab, including the `TabDisplay` component used elsewhere in this app.',
    },
  ],
}
