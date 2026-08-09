import type { Lesson } from '../types'

/**
 * Lesson 3 of the intermediate method course: right-hand fingerpicking
 * (Travis-picking style thumb-on-bass, fingers-on-treble technique), the
 * next step after strumming variety in both Hal Leonard Guitar Method Book
 * 2 and JustinGuitar's Grade 2-3 course. Taught entirely as instructional
 * prose — a dedicated interactive fingerpicking player is explicitly out
 * of scope for this task and this feature, so practice happens by ear and
 * slow repetition against the chord shapes already in the library.
 */
export const fingerpickingFundamentals: Lesson = {
  id: 'fingerpicking-fundamentals',
  title: 'Fingerpicking Fundamentals',
  tier: 'intermediate',
  order: 3,
  summary:
    'Learn thumb-on-bass, fingers-on-treble fingerpicking (Travis-picking style) — a right-hand technique not covered anywhere else in this app — through instructional prose and slow, deliberate practice.',
  sections: [
    {
      heading: 'Naming Your Right-Hand Fingers',
      body: 'Classical and fingerstyle guitar teaching almost universally labels the picking-hand fingers with letters borrowed from Spanish: p (pulgar) for the thumb, i (indice) for the index finger, m (medio) for the middle finger, and a (anular) for the ring finger. You will see this p-i-m-a shorthand in fingerpicking tab and instruction everywhere, so it is worth learning now even though nothing else in this course has needed it yet.',
    },
    {
      heading: 'Thumb on the Bass Strings',
      body: "The core idea of Travis-picking style fingerpicking is that your thumb (p) takes sole responsibility for the bass strings — usually alternating between the chord's root string and one neighboring bass string — while your fingers handle the treble strings above it, independently of what the thumb is doing. On a C major shape, for example, your thumb alternates between the 5th string (A, the root, fretted at the 3rd fret) and the 4th string (D, fretted at the 2nd fret), landing on a different one of the two for each new beat, like a steady rocking bass line underneath the chord.",
      chordId: 'c-major',
    },
    {
      heading: 'A Basic Travis-Picking Pattern',
      body: "With the thumb's alternating bass established, add your index and middle fingers plucking the higher strings in between the bass notes — a common starting pattern is thumb, then middle finger on a treble string, thumb again (on the other bass string), then index finger on a different treble string, repeated. Try this on A minor: thumb alternates between the open 5th string (A) and the 4th string (D, 2nd fret), while your middle and index fingers pick the 3rd string (G, 2nd fret) and 2nd string (B, 1st fret) in between. Go slowly — the goal at first is keeping the thumb's beat perfectly steady while the fingers land cleanly around it, not speed.",
      chordId: 'a-minor',
    },
    {
      heading: 'Building Thumb-and-Finger Independence',
      body: 'The hardest part of fingerpicking for most players moving on from strumming is that the thumb and fingers need to move independently rather than together, unlike a strum where the whole hand acts as one unit. A reliable way to build this is to isolate the thumb pattern completely on its own first — just the alternating bass, no fingers at all — until it feels like a steady, unconscious pulse, and only then layer the finger notes on top one at a time rather than all at once.',
    },
    {
      heading: 'How to Practice This',
      body: 'There is no dedicated fingerpicking player in this app — this technique is taught here purely as instructional prose, and practice happens the traditional way: pick a chord shape from the chord library, place your fretting hand, and work the thumb-and-finger pattern slowly against it by ear, gradually speeding up only once every note rings clean. A metronome at a slow, comfortable tempo (50-60 BPM) is especially useful here, since the whole point of the technique is a rock-steady thumb underneath everything else.',
    },
  ],
}
