import type { Lesson } from '../types'

/**
 * Lesson 4 of the beginner method course: five-finger patterns and hand
 * independence. Combines the pitch reading (lesson 2) and rhythm (lesson
 * 3) skills into actual playing for the first time, and is the direct
 * prerequisite for the chord work in lesson 5 — the C-position five-finger
 * pattern this lesson establishes is the same hand shape lesson 5's C
 * major triad is built from.
 */
export const fiveFingerPatterns: Lesson = {
  id: 'five-finger-patterns',
  title: 'Five-Finger Patterns & Hand Independence',
  tier: 'beginner',
  order: 4,
  summary:
    'The C-position five-finger pattern, playing it hands separately then together, and the first hand-independence exercises that get both hands moving without copying each other.',
  sections: [
    {
      heading: 'The C Five-Finger Pattern',
      body: 'Place your right-hand thumb (finger 1) on Middle C, with fingers 2, 3, 4, and 5 resting naturally on D, E, F, and G — the next four white keys going up. This is "C position": one finger per key, no stretching, no shifting. Play the five notes ascending, C-D-E-F-G, one per finger in order, then descending back down G-F-E-D-C. Keep the rounded hand shape from lesson 1 the whole time; do not let the wrist collapse as the outer fingers (4 and 5) reach across.',
    },
    {
      heading: 'The Left Hand in C Position',
      body: 'The left hand mirrors this an octave below: pinky (finger 5) on the low C, fingers 4, 3, 2, and 1 covering D, E, F, and G up to the thumb landing on the G just below Middle C. Practice the left hand alone the same way — ascending G-F-E-D-C from finger 5 down to finger 1 is the natural direction to think of it, since the thumb is nearest Middle C. Left-hand fingering is genuinely different muscle memory from the right hand and deserves its own separate practice before combining.',
    },
    {
      heading: 'Hands Separately Before Hands Together',
      body: 'Every method book insists on this order for a reason: play a five-finger exercise with the right hand alone until it is smooth and even, then the left hand alone until it is equally smooth, and only then attempt both hands together. Trying to combine two unfamiliar hand shapes at once usually just doubles the mistakes instead of building coordination — separate practice first is what makes the combined version actually work.',
    },
    {
      heading: 'A First Hands-Independence Exercise',
      body: 'A simple, classic independence exercise: right hand plays the ascending five-finger pattern C-D-E-F-G in quarter notes while the left hand holds a single low C as a whole note underneath, sustained through the entire right-hand phrase. This is deliberately asymmetric — one hand moving, one hand still — so you experience two different things happening at once without yet needing true rhythmic independence between the hands.',
    },
    {
      heading: 'Building Toward True Independence',
      body: 'Once the held-note exercise feels comfortable, try both hands playing the five-finger pattern together in contrary motion: right hand ascends C-D-E-F-G while the left hand simultaneously descends its own C-B-A-G-F (starting from the C below Middle C and moving down). Because the hands move in opposite directions, it is far easier to feel each hand as its own independent line than when both hands move in the same direction — this is the standard bridge exercise method books use before parallel-motion hands-together playing.',
    },
  ],
}
