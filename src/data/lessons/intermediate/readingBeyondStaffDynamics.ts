import type { Lesson } from '../types'

/**
 * Lesson 4 of the intermediate method course: extending note reading past
 * the grand staff's own lines and spaces via ledger lines, and introducing
 * dynamics/articulation markings — the expressive vocabulary that turns
 * "correct notes" into actual musical playing, standard territory for
 * Faber/Alfred's Level 2-3 and RCM early grades alike.
 */
export const readingBeyondStaffDynamics: Lesson = {
  id: 'reading-beyond-staff-dynamics',
  title: 'Reading Beyond the Staff & Dynamics',
  tier: 'intermediate',
  order: 4,
  summary:
    'Reading ledger-line notes above and below the grand staff, the core dynamic markings (p, mf, f), and the two most basic articulations, legato and staccato.',
  sections: [
    {
      heading: 'Ledger Lines: Extending the Staff',
      body: 'The grand staff only has 11 lines total (5 treble, 5 bass, plus the shared Middle C line between them) — but the piano has 88 keys, far more notes than the staff alone can show. **Ledger lines** are short extra lines drawn only through a single note, above or below the staff, extending it exactly as far as needed for that one note. You already read one ledger-line note in the beginner tier without naming it as such: Middle C itself, on its own short ledger line between the two staves.',
    },
    {
      heading: 'Counting Ledger Lines Above the Treble Staff',
      body: "Above the treble staff, the notes continue the same line-space alternation the staff itself uses, just extended: the first ledger line above the staff is A (a third above the staff's top line, F), the space above that is B, the second ledger line is C, and so on. Rather than counting every ledger line from scratch each time, use the nearest staff guide-letter as your anchor (the treble staff's top line is F) and count up by step from there — the same guide-letter strategy from the beginner tier's note-reading lesson, just extended past the staff's edge.",
    },
    {
      heading: 'Counting Ledger Lines Below the Bass Staff',
      body: "Below the bass staff works the same way, anchored from the staff's bottom line (G): the space just below is F, the first ledger line below is E, the space below that is D, and the second ledger line below is C — but don't mistake that C for Middle C. It is a full two octaves lower, a low C well down in the piano's bass range (C2). Middle C, as you already know from the beginner tier, sits on its own short ledger line just above the bass staff, not below it. Low bass-clef ledger-line notes like this second-ledger-line C are common in left-hand accompaniment patterns that reach well below a five-finger position's usual range.",
    },
    {
      heading: 'Dynamics: p, mf, and f',
      body: "Dynamic markings tell you how loud or soft to play, printed below the staff at the point they take effect. The three most common you will meet first: **p** (piano) means soft, **f** (forte) means loud, and **mf** (mezzo-forte) means moderately loud, sitting between the two. These are Italian abbreviations, standard across virtually all printed music regardless of the composer's own language — learning even just these three unlocks a large fraction of the dynamic markings in beginner-to-intermediate repertoire.",
    },
    {
      heading: 'Articulation: Legato and Staccato',
      body: "Articulation markings tell you how a note connects to the next one, independent of loudness. **Legato** — often shown as a curved line (a slur) drawn over a group of notes — means smoothly connected, each note flowing into the next with no gap or separation, achieved by not lifting a finger until the next key is already being pressed. **Staccato** — a small dot printed directly above or below a notehead — means short and detached, the opposite of legato: lift off the key quickly after playing it, leaving a clear gap of silence before the next note, roughly half the note's written value.",
    },
    {
      heading: 'Practice: The Same Phrase, Legato and Staccato',
      body: 'Take a simple five-note phrase you already know well, such as the C five-finger pattern from the beginner tier, and play it two ways: first fully legato, holding each key until the very instant the next one is struck, then fully staccato, releasing each key quickly and leaving audible space between notes. Playing the identical notes both ways makes the difference in feel and sound unmistakable, and builds the finger control (holding vs. releasing on cue) that real articulation markings will ask you for in actual pieces.',
    },
  ],
}
