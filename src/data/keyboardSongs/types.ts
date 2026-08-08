/**
 * Data model for the keyboard song catalog — the structured "how to play
 * it" content for real Sinhala songs arranged for piano/keyboard (chord
 * progression, suggested hand positions, optional signature-phrase melody
 * excerpt). This module is pure data-shape definitions, same spirit as
 * `keyboardChords/types.ts` and the guitar-side `songs/types.ts`: no
 * rendering, no app state, no lyrics.
 *
 * Deliberately out of scope: full lyric transcriptions and any embedded
 * audio/video. Songs here reference existing keyboard chord data
 * (`src/data/keyboardChords`) by id rather than duplicating voicings.
 *
 * Adapted from `src/data/songs/types.ts` for keyboard: guitar's
 * `capoFret`/`tab` (fretboard-specific) are replaced with
 * `suggestedRightHandPosition`/`suggestedLeftHandPosition` (a starting
 * five-finger hand position, since keyboard has no capo equivalent) and an
 * optional `melodyExcerpt` (the keyboard equivalent of guitar's optional
 * signature-riff tab).
 */

import type { FingerNumber, NoteName } from '../keyboardChords/types'

/** Coarse teaching-difficulty tier for a song. */
export type SongDifficulty = 'beginner' | 'intermediate'

/**
 * One named section of a song's chord progression — e.g. an intro, verse,
 * chorus, or bridge — as the ordered sequence of chords played through it.
 */
export interface ChordProgressionSection {
  /** Section label, e.g. `'Intro'`, `'Verse'`, `'Chorus'`, `'Bridge'`. */
  name: string
  /**
   * Ordered chord ids for this section — references into the keyboard
   * chord library (`KeyboardChord.id` from `src/data/keyboardChords`), one
   * entry per chord change, in the order they're played. A chord held for
   * more than one change (e.g. two bars) is simply repeated in this list.
   */
  chordIds: string[]
  /** Optional short teaching note for this section, e.g. a voicing choice. */
  note?: string
}

/**
 * A suggested starting hand position for a song: the standard piano-method
 * convention of anchoring one finger per adjacent white key ("five-finger
 * position") so a beginner has a concrete, repeatable starting spot on the
 * keyboard rather than having to locate every note by ear.
 */
export interface HandPosition {
  /**
   * The note under finger 1 for this hand — the thumb for the right hand,
   * the pinky for the left hand — e.g. `'C'` for a "C position".
   */
  startingNote: NoteName
  /**
   * Register/octave description relative to middle C, e.g. `'Middle C
   * octave'` or `'One octave below middle C'`, so the position is
   * unambiguous without needing sheet music.
   */
  octaveDescription: string
  /** Optional short note about the position (e.g. a reach beyond the five-finger span). */
  note?: string
}

/** One note within a short melody excerpt. */
export interface MelodyNote {
  note: NoteName
  /**
   * Octave placement relative to the excerpt's first note (`0` = same
   * octave as the first note; positive/negative shifts up/down an octave),
   * mirroring `KeyPress.octaveOffset`'s convention in the chord model.
   */
  octaveOffset: number
  /** Suggested right-hand fingering for this note. */
  finger: FingerNumber
}

/**
 * A short, simplified melody excerpt for a song's signature phrase or
 * hook — the keyboard equivalent of guitar's optional signature-riff tab.
 * An original teaching arrangement capturing the phrase's shape, not a
 * full or literal note-for-note transcription.
 */
export interface MelodyExcerpt {
  /** Short label, e.g. `'Opening Hook'` or `'Chorus Melody (first phrase)'`. */
  title: string
  /** Optional short description of the phrase. */
  description?: string
  /** Ordered notes making up the excerpt. */
  notes: MelodyNote[]
}

/**
 * Tags a song as the selected "real piece" a specific keyboard lesson
 * culminates in (SGA-TASK-16 / SGA-TASK-18), so lesson content can look up
 * its example song(s) programmatically instead of hard-coding an id.
 * - `'putting-it-together'`: the beginner "Putting It Together" lesson —
 *   needs a genuinely simple I-IV-V-only (or similarly minimal)
 *   progression, playable from a five-finger position.
 * - `'lead-sheet-chords'`: the "Playing From Lead Sheets & Chord Symbols"
 *   lesson — needs a clear, learnable chord-symbol sheet.
 */
export type LessonRole = 'putting-it-together' | 'lead-sheet-chords'

export interface Song {
  /** Stable identifier, unique within the catalog (e.g. `'danno-budunge'`). */
  id: string
  /** Song title. */
  title: string
  /** Performing/recording artist(s), as commonly credited. */
  artist: string
  /** The song's musical key (tonal center) as taught here. */
  key: NoteName
  difficulty: SongDifficulty
  /** Ordered sections making up the full chord progression (intro/verse/chorus/etc). */
  chordProgression: ChordProgressionSection[]
  /** Suggested starting right-hand five-finger position for this arrangement. */
  suggestedRightHandPosition: HandPosition
  /** Suggested starting left-hand position (typically root-position chords an octave below the right hand). */
  suggestedLeftHandPosition: HandPosition
  /**
   * Optional simplified melody excerpt for the song's signature
   * phrase/hook — see `MelodyExcerpt`.
   */
  melodyExcerpt?: MelodyExcerpt
  /** Optional lesson-culmination tag(s) — see `LessonRole`. */
  lessonRoles?: LessonRole[]
  /** Optional short teaching note about the arrangement (simplifications, transposition rationale, etc). */
  notes?: string
}
