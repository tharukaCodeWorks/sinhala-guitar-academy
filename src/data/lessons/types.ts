/**
 * Data model for the keyboard beginner method course — a sequential,
 * pedagogy-grounded lesson curriculum, analogous in role to the guitar
 * song catalog (`src/data/songs`) as the differentiator content for the
 * keyboard track. This module is pure data-shape definitions, same spirit
 * as `keyboardChords/types.ts` and `keyboardSongs/types.ts`: no rendering,
 * no app state.
 *
 * Grounded in the common progression shared by established beginner piano
 * methods (Faber Piano Adventures, Alfred's Basic Piano Library, RCM/ABRSM
 * early grades): posture/hand position -> keyboard geography -> note
 * reading -> rhythm -> five-finger patterns/hand independence -> basic
 * chords -> simple full pieces.
 */

/** Course tier a lesson belongs to. Only `'beginner'` is authored so far. */
export type LessonTier = 'beginner' | 'intermediate' | 'advanced'

/**
 * One section of teaching content within a lesson — the unit a lesson
 * detail page (a later task) would render as a block, optionally
 * illustrated with a `KeyboardDiagram` of a referenced chord.
 */
export interface LessonSection {
  /** Section heading, e.g. `'Finding Middle C'`. */
  heading: string
  /**
   * Teaching text, plain prose. Markdown-lite formatting (e.g. `**bold**`)
   * is fine to use here — the rendering task is written to support it —
   * but this field is not required to use any.
   */
  body: string
  /**
   * Optional reference into `src/data/keyboardChords` by `KeyboardChord.id`
   * (e.g. `'c-major'`), so a lesson detail page can embed a `KeyboardDiagram`
   * of a specific chord/voicing inline with this section's text.
   */
  keyboardChordId?: string
}

/** A single lesson in the keyboard method course. */
export interface Lesson {
  /** Stable identifier, unique within the catalog (e.g. `'posture-hand-position'`). */
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
   * Optional reference into `src/data/keyboardSongs` by `Song.id`, for a
   * lesson that culminates in (or otherwise centers on) a specific real
   * song — e.g. the "Putting It Together" lesson, which uses whichever
   * song is tagged `lessonRoles: ['putting-it-together']` in the keyboard
   * song catalog, rather than an invented practice piece. Lets a lesson
   * detail page (a later task) link straight to that song's page.
   */
  songId?: string
}
