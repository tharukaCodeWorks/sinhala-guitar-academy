/**
 * Data model for the song catalog — the structured "how to play it" content
 * for real Sinhala songs (chords, strumming pattern, optional signature
 * riff/intro tab). This module is pure data-shape definitions, same spirit
 * as `chords/types.ts`, `tabs/types.ts` and `strumming/types.ts`: no
 * rendering, no app state, no lyrics.
 *
 * Deliberately out of scope: full lyric transcriptions and any embedded
 * audio/video. Songs here reference existing chord (`src/data/chords`),
 * tab (`src/data/tabs`) and strumming-pattern (`src/data/strumming`) data
 * by id (or, for the strumming pattern, optionally inline) rather than
 * duplicating that data.
 */

import type { NoteName } from '../chords/types'
import type { Tab } from '../tabs/types'
import type { StrummingPattern } from '../strumming/types'

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
   * Ordered chord ids for this section — references into the chord
   * library (`Chord.id` from `src/data/chords`), one entry per chord
   * change, in the order they're strummed. A chord held for more than one
   * change (e.g. two bars) is simply repeated in this list.
   */
  chordIds: string[]
  /** Optional short teaching note for this section, e.g. a timing quirk. */
  note?: string
}

export interface Song {
  /** Stable identifier, unique within the catalog (e.g. `'manike-mage-hithe'`). */
  id: string
  /** Song title. */
  title: string
  /** Performing/recording artist(s), as commonly credited. */
  artist: string
  /** The song's musical key (tonal center), as played here — see `capoFret`. */
  key: NoteName
  difficulty: SongDifficulty
  /**
   * Capo fret used for the chord shapes below, if any. When set, the chord
   * shapes in `chordProgression` are the shapes fretted with the capo on —
   * the song still *sounds* in `key`.
   */
  capoFret?: number
  /** Ordered sections making up the full chord progression (intro/verse/chorus/etc). */
  chordProgression: ChordProgressionSection[]
  /**
   * Reference to a strumming pattern's `id` (from `src/data/strumming`,
   * either a seeded fixture or one added for this song). Mutually
   * exclusive in practice with `strummingPattern`, but both are accepted so
   * a song can carry either a shared reference or its own one-off pattern.
   */
  strummingPatternId?: string
  /** An inline strumming pattern, for a song whose rhythm isn't shared with anything else. */
  strummingPattern?: StrummingPattern
  /**
   * Optional tab for a signature riff/intro (e.g. an instrumental hook).
   * Uses the same `Tab` shape as `src/data/tabs` — an original teaching
   * arrangement in the spirit of the song's hook, not a literal
   * note-for-note transcription.
   */
  tab?: Tab
  /** Optional short teaching note about the arrangement (simplifications, capo rationale, etc). */
  notes?: string
}
