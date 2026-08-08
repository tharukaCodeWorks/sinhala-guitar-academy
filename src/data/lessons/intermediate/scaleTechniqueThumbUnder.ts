import type { Lesson } from '../types'

/**
 * Lesson 1 of the intermediate method course: scale technique and the
 * thumb-under fingering that lets a five-finger-position player extend
 * smoothly beyond five notes for the first time. Picks up immediately
 * where the beginner tier's "Putting It Together" lesson leaves off —
 * everything there stayed inside a single five-finger hand shape; this
 * lesson is the first departure from that shape.
 */
export const scaleTechniqueThumbUnder: Lesson = {
  id: 'scale-technique-thumb-under-fingering',
  title: 'Scale Technique: Thumb-Under Fingering',
  tier: 'intermediate',
  order: 1,
  summary:
    'How to play a full one-octave major scale using the thumb-under/finger-crossing technique, and why the standard fingering for C and G differs from keys like D-flat that sit mostly on black keys.',
  sections: [
    {
      heading: 'Beyond Five Fingers',
      body: 'Every beginner-tier exercise stayed inside a five-finger hand position — one finger per key, no shifting. A one-octave scale has 8 notes (or 7 distinct pitch classes plus the repeated octave), which is more notes than you have fingers, so at some point during the scale the hand has to shift position without a gap or a stumble in the sound. The technique that makes this shift smooth and even is called **thumb-under** fingering, and it is the single most important new right-hand skill at the intermediate level.',
    },
    {
      heading: 'The Thumb-Under Motion',
      body: 'Play a C major scale ascending with the right hand: thumb (1) on C, finger 2 on D, finger 3 on E. At that point, instead of reaching finger 4 for F, tuck the thumb underneath the palm and place it on F, while fingers 2 and 3 lift clear. Continue 2-3-4 on G-A-B, then tuck the thumb under once more for the top C. The thumb passing underneath the hand — not the whole hand jumping — is what keeps the sound perfectly even; if you can hear where the hand shifted, the tuck was too abrupt or too late.',
    },
    {
      heading: 'Descending: Finger-Crossing',
      body: 'Descending is the mirror image, called **finger-crossing** rather than thumb-under: starting on the top C with the thumb, play 1-2-3 down to A, then cross finger 4 (or 3, depending on which fingering variant you were taught) over the thumb to land on G, continue 3-2-1 down to the bottom C. Whether you tuck under or cross over, the goal is identical — the hand travels the length of the scale while sounding like one continuous, unbroken line, with no audible bump at the point where fingers change over.',
    },
    {
      heading: 'Standard C and G Major Fingering',
      body: "Right hand ascending, C major: 1-2-3, thumb-under, 1-2-3-4, thumb-under, 1 (on the octave C) — written out, fingers 1-2-3-1-2-3-4-1 on C-D-E-F-G-A-B-C. G major uses the identical fingering pattern, 1-2-3-1-2-3-4-1 on G-A-B-C-D-E-F#-G, because G major's single black key (F#) falls in exactly the same relative spot within the scale that C major's all-white-key pattern does — the thumb never needs to land on the black key. This is why C and G share one fingering: their black-key layout relative to scale degree is the same shape.",
    },
    {
      heading: 'D Major and Why Some Keys Differ',
      body: 'D major (D-E-F#-G-A-B-C#-D) still uses the same 1-2-3-1-2-3-4-1 pattern as C and G, because its two black keys (F# and C#) also happen to fall on scale degrees the thumb never touches. But this is not true of every key: scales with more black keys, or black keys that land on different scale degrees, force a different fingering specifically to keep the thumb landing on white keys wherever possible — the underlying rule beneath every standard scale fingering is **the thumb should avoid black keys when a comfortable alternative fingering exists**, because a thumb tucked under a black key has much less room to pass cleanly under the palm than a thumb on a white key does.',
    },
    {
      heading: 'Practice: Slow, Hands Separately, Listening for the Seam',
      body: 'Practice each scale hands separately at a slow, even tempo, listening specifically for the moment of the thumb-tuck or finger-cross — that is the one spot in the scale most likely to rush, drag, or accent unevenly. A useful preview: once you are comfortable with hand-crafted scale fingerings like this one, the Scale Explorer tool (at the /keyboard/scales page) lets you look up the correct fingering for any major scale interactively instead of working it out from the black-key rule by hand every time.',
    },
  ],
}
