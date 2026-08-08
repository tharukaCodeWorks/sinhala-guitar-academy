import type { Lesson } from '../types'

/**
 * Lesson 3 of the intermediate method course: expanding rhythm beyond the
 * beginner tier's whole/half/quarter/eighth notes in simple 4/4 and 3/4
 * time. Introduces dotted notes, syncopation, and 6/8 (compound) time —
 * the standard next rhythmic vocabulary step in Faber/Alfred's Level 2-3
 * material.
 */
export const expandingRhythm: Lesson = {
  id: 'expanding-rhythm',
  title: 'Expanding Rhythm',
  tier: 'intermediate',
  order: 3,
  summary:
    "Dotted notes, syncopation (off-beat accents), and an introduction to 6/8 compound time, extending the beginner tier's rhythm vocabulary beyond simple 4/4 and 3/4.",
  sections: [
    {
      heading: 'The Dot: Adding Half the Value',
      body: "A dot placed after a notehead adds half of that note's own value to its length. A dotted half note (worth 2 counts) gains 1 more count (half of 2) for a total of 3 counts — which is exactly why a dotted half note fills a whole measure of 3/4 time by itself, as you saw in the beginner tier. A dotted quarter note (worth 1 count) gains half a count for a total of 1.5 counts, and is very commonly paired with a single eighth note to fill exactly 2 beats — dotted-quarter-plus-eighth is one of the most common rhythmic figures in real music, and is worth being able to recognize and count on sight.",
    },
    {
      heading: 'Counting the Dotted-Quarter-Plus-Eighth Figure',
      body: 'Count a dotted quarter followed by an eighth note as "1-and-2" spoken evenly, where the dotted quarter is held through "1-and" (1.5 counts) and the eighth note lands on the "2." A common beginner error is to shorten the dotted quarter or rush the following eighth to make the two feel more even than they actually are — practice clapping it slowly against a steady quarter-note pulse until the 1.5-then-0.5 proportion feels natural rather than approximate.',
    },
    {
      heading: 'Syncopation: Accenting the Off-Beat',
      body: '**Syncopation** is any rhythm that places emphasis on a beat, or part of a beat, that is not normally accented — most simply, a note that starts on an "and" (an off-beat eighth-note position) and is held through the following strong beat, so the ear expects an accent on the beat but instead hears it arrive early. A simple syncopated figure: an eighth rest on beat 1, then an eighth note on the "and" of 1 tied into beat 2. Syncopation is central to a huge amount of popular and Sri Lankan baila-influenced music, where the off-beat feel is often more prominent than the on-beat pulse.',
    },
    {
      heading: 'Practicing Syncopation Against a Steady Pulse',
      body: 'Syncopated rhythms are much easier to learn accurately with a steady reference pulse sounding underneath them — tap or count the beat with one hand (or a metronome) while clapping the syncopated rhythm with the other, rather than trying to feel the syncopation in isolation. Once the syncopated figure locks in against the steady pulse, transfer it to the keyboard the same way you did with simpler rhythms in the beginner tier: clap first, play second.',
    },
    {
      heading: 'Introducing 6/8: Compound Time',
      body: '6/8 time is a **compound meter**: the top number (6) counts eighth notes, and the bottom number (8) says an eighth note gets one count, but 6/8 is felt in **2 big beats per measure**, each big beat made of 3 eighth notes grouped together (1-2-3, 4-5-6), rather than 6 equal small beats. This grouping-of-3 feel is what makes 6/8 sound distinctly different from 3/4 even though both have "3" somewhere in their structure — 3/4 feels like 3 equal beats, 6/8 feels like 2 beats each subdivided into 3.',
    },
    {
      heading: 'Feeling the Two Big Beats in 6/8',
      body: 'Practice counting 6/8 two ways: first as six even eighth notes ("1-2-3-4-5-6"), to hear how the measure divides, then as two big beats each containing a group of three ("ONE-and-a, TWO-and-a"), which is how 6/8 is actually felt and conducted in real performance. A dotted quarter note fills exactly one of those big beats (3 eighth notes\' worth), the same way it filled 1.5 counts in simple time earlier in this lesson — the dotted quarter\'s length does not change, only what kind of beat it is now filling.',
    },
  ],
}
