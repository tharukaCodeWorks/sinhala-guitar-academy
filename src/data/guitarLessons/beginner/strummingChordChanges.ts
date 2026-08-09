import type { Lesson } from '../types'

/**
 * Lesson 4 of the beginner method course: basic downstroke strumming and
 * the "prepare and move together" technique for changing chords cleanly —
 * always taught right after the first chord shapes are introduced, per
 * both Hal Leonard Book 1 and JustinGuitar's course, and explicitly
 * pointed at this app's Fingering Practice page as the dedicated drill
 * tool for this exact skill.
 */
export const strummingChordChanges: Lesson = {
  id: 'basic-strumming-chord-changes',
  title: 'Basic Strumming & Changing Chords Smoothly',
  tier: 'beginner',
  order: 4,
  summary:
    'Learn a relaxed downstroke strumming motion and the "prepare and move together" technique for changing between chords without a gap in the rhythm.',
  sections: [
    {
      heading: 'The Basic Downstroke',
      body: 'Strumming comes from your forearm and wrist, not your whole arm swinging from the shoulder. Rest your strumming hand loosely near the sound hole (or over the pickups on an electric), and let a relaxed downward flick of the wrist brush across all the strings in one smooth motion, top to bottom. Keep the motion small and even — a stiff, tense wrist produces a scratchy, uneven strum, while a loose one produces a smooth, even one. At this stage, practice nothing but steady downstrokes on a single chord (try Em from lesson 3) until the motion feels automatic.',
    },
    {
      heading: 'Keeping Steady Time',
      body: 'Count a steady "1, 2, 3, 4" out loud or in your head, and strum one downstroke per number, like a metronome. Consistency matters more than speed here — four evenly-spaced strums per bar, repeated over and over without speeding up or slowing down, is the foundation every strumming pattern you learn later builds on top of. If you have a metronome app, set it to a comfortable slow tempo (60-70 BPM) and lock your downstrokes to each click.',
    },
    {
      heading: 'Prepare and Move Together',
      body: 'The single biggest cause of a rhythm gap when switching chords is moving one finger at a time. Instead, treat every finger of a chord shape as a single unit that lifts off together and lands together on the new shape at the same instant — this is the "prepare and move together" technique. Before you actually need to change, mentally picture (or even briefly rehearse in the air) exactly where each finger of the next chord needs to land, so the whole hand travels as one coordinated motion rather than fingers arriving one after another.',
    },
    {
      heading: 'Slow, Deliberate Practice Reps',
      body: 'Pick two chords from lesson 3 — Em and Am are a good pair, since both use the 2nd and 3rd fingers on the same two frets, just shifted over by a string. Strum four steady beats on Em, then change to Am on beat one of the next bar, strum four beats, and change back. Go slowly enough that you can land the change cleanly every single time — it is far better to do this at a crawl with zero missed notes than fast with buzzing or muted strings. Speed comes naturally with repetition once the movement itself is clean.',
    },
    {
      heading: 'Drilling This on the Fingering Practice Page',
      body: 'This exact skill — smooth, accurate chord-to-chord transitions — is what the Fingering Practice page (`/fingering-practice`) in this app is built to drill. It lets you pick chord pairs, set a tempo, and repeat the change over and over with immediate feedback, which is far more effective than switching chords randomly on your own. Spend focused time there with the Em/E/Am shapes from lesson 3 before moving on to the expanded chord set in lesson 5.',
    },
  ],
}
