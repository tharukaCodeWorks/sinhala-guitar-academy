/**
 * Data model for the guitar beginner-to-intermediate method course — a
 * sequential, pedagogy-grounded lesson curriculum, analogous in role to the
 * guitar song catalog (`src/data/songs`) as differentiator content for the
 * guitar track. This module is pure data-shape definitions, same spirit as
 * `chords/types.ts` and `songs/types.ts`: no rendering, no app state.
 *
 * This is deliberately separate from `src/data/lessons`, which is
 * exclusively the KEYBOARD track's lesson data (referenced by
 * `/keyboard/lessons`) — despite that module's unprefixed name, it must
 * not be reused, imported from, or modified here.
 *
 * Grounded in the common progression shared by established beginner guitar
 * methods (Hal Leonard Guitar Method Book 1, JustinGuitar's Beginner
 * Course Grades 1-3): anatomy/posture/reading chord diagrams & TAB ->
 * tuning/open strings -> first simple open chords -> basic strumming/clean
 * chord changes -> the full "campfire" open-chord set -> a first real
 * song.
 */

/** Course tier a lesson belongs to. Only `'beginner'` is authored so far. */
export type LessonTier = 'beginner' | 'intermediate' | 'advanced'

/**
 * One section of teaching content within a lesson — the unit a lesson
 * detail page (a later task) would render as a block, optionally
 * illustrated with a `ChordDiagram` of a referenced chord.
 */
export interface LessonSection {
  /** Section heading, e.g. `'Finding the Open Strings'`. */
  heading: string
  /**
   * Teaching text, plain prose. Markdown-lite formatting (e.g. `**bold**`)
   * is fine to use here — the rendering task is written to support it —
   * but this field is not required to use any.
   */
  body: string
  /**
   * Optional reference into `src/data/chords` by `Chord.id` (e.g.
   * `'e-minor'`, `'c-major'`, or a barre id like `'f-major'`), so a lesson
   * detail page can embed a `ChordDiagram` of a specific chord/voicing
   * inline with this section's text.
   */
  chordId?: string
}

/** A single lesson in the guitar method course. */
export interface Lesson {
  /** Stable identifier, unique within the catalog (e.g. `'guitar-anatomy-posture-reading'`). */
  id: string
  /** Lesson title. */
  title: string
  tier: LessonTier
  /**
   * Sequence position within `tier`, 1-indexed. Every tier's lessons must
   * form a contiguous `1..N` sequence with no gaps or duplicates — this is
   * what drives `nextLessonInTier`/`previousLessonInTier` navigation.
   */
  order: number
  /** One or two sentence summary of what the lesson covers, for a lesson list/overview. */
  summary: string
  /** Ordered teaching content making up the lesson. */
  sections: LessonSection[]
  /**
   * Optional reference into `src/data/songs` by `Song.id`, for a lesson
   * that culminates in (or otherwise centers on) a specific real song —
   * e.g. the "Putting It Together" lesson, which uses a real
   * `difficulty: 'beginner'` song built from nothing but the chords
   * already taught, rather than an invented practice piece.
   */
  songId?: string
}
