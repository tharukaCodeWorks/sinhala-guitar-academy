export type { ChordProgressionSection, Song, SongDifficulty } from './types'
export { songLibrary } from './library'

import { getChordById } from '../chords'
import type { Chord } from '../chords/types'
import { strummingPatternFixtures } from '../strumming/fixtures'
import type { StrummingPattern } from '../strumming/types'
import { songLibrary } from './library'
import type { Song, SongDifficulty } from './types'

/** Look up a single song by its stable id (e.g. `'manike-mage-hithe'`). */
export function getSongById(id: string): Song | undefined {
  return songLibrary.find((song) => song.id === id)
}

/** All songs at a given difficulty tier, in library order. */
export function findSongsByDifficulty(difficulty: SongDifficulty): Song[] {
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
 * the chord library, in first-use order. Ids that don't resolve to a known
 * chord are silently skipped — use `listSongChordIds` directly (and
 * `getChordById`) if you need to detect dangling references instead.
 */
export function getSongChords(song: Song): Chord[] {
  return listSongChordIds(song)
    .map((chordId) => getChordById(chordId))
    .filter((chord): chord is Chord => chord !== undefined)
}

/**
 * Resolves a song's strumming pattern: the inline `strummingPattern` if
 * present, otherwise a lookup of `strummingPatternId` against the seeded
 * strumming-pattern fixtures. Returns `undefined` if neither is set (or the
 * id doesn't resolve).
 */
export function getSongStrummingPattern(
  song: Song,
): StrummingPattern | undefined {
  if (song.strummingPattern) return song.strummingPattern
  if (!song.strummingPatternId) return undefined
  return strummingPatternFixtures.find(
    (pattern) => pattern.id === song.strummingPatternId,
  )
}
