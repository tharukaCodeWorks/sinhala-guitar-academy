export type {
  ChordProgressionSection,
  HandPosition,
  LessonRole,
  MelodyExcerpt,
  MelodyNote,
  Song,
  SongDifficulty,
} from './types'
export { songLibrary } from './library'

import { getChordById } from '../keyboardChords'
import type { KeyboardChord } from '../keyboardChords/types'
import { songLibrary } from './library'
import type { LessonRole, Song, SongDifficulty } from './types'

/** Look up a single song by its stable id (e.g. `'manike-mage-hithe'`). */
export function getSongById(id: string): Song | undefined {
  return songLibrary.find((song) => song.id === id)
}

/** All songs in the catalog, in library order. */
export function listSongs(): Song[] {
  return songLibrary
}

/** All songs at a given difficulty tier, in library order. */
export function listSongsByDifficulty(difficulty: SongDifficulty): Song[] {
  return songLibrary.filter((song) => song.difficulty === difficulty)
}

/**
 * All songs credited to a given artist. Matching is case-insensitive and
 * exact against the full `artist` string (which may credit multiple
 * performers), matching how `artist` is authored in the song data files.
 */
export function findSongsByArtist(artist: string): Song[] {
  const normalized = artist.trim().toLowerCase()
  return songLibrary.filter((song) => song.artist.toLowerCase() === normalized)
}

/** The distinct artists present in the catalog, in library order. */
export function listArtists(): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const song of songLibrary) {
    if (!seen.has(song.artist)) {
      seen.add(song.artist)
      result.push(song.artist)
    }
  }
  return result
}

/** All songs tagged with a given lesson-culmination role, in library order. */
export function findSongsByLessonRole(role: LessonRole): Song[] {
  return songLibrary.filter((song) => song.lessonRoles?.includes(role))
}

/**
 * Every distinct chord id referenced anywhere in a song's chord
 * progression, in first-use order (duplicates across/within sections
 * removed).
 */
export function listSongChordIds(song: Song): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const section of song.chordProgression) {
    for (const chordId of section.chordIds) {
      if (!seen.has(chordId)) {
        seen.add(chordId)
        result.push(chordId)
      }
    }
  }
  return result
}

/**
 * Resolves every chord id referenced by a song's chord progression against
 * the keyboard chord library, in first-use order. Ids that don't resolve
 * to a known chord are silently skipped — use `listSongChordIds` directly
 * (and `getChordById`) if you need to detect dangling references instead.
 */
export function getSongChords(song: Song): KeyboardChord[] {
  return listSongChordIds(song)
    .map((chordId) => getChordById(chordId))
    .filter((chord): chord is KeyboardChord => chord !== undefined)
}

/**
 * All songs whose chord progression references a given chord id (see
 * `listSongChordIds`), in library order. Powers "heard in" callouts — e.g.
 * the Keyboard Chord Families page pointing from a family chord to real
 * songs that use it.
 */
export function findSongsByChordId(chordId: string): Song[] {
  return songLibrary.filter((song) => listSongChordIds(song).includes(chordId))
}
