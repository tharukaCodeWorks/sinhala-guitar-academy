import { describe, expect, it } from 'vitest'
import { getChordById } from '../chords'
import { strummingPatternFixtures } from '../strumming/fixtures'
import {
  findSongsByArtist,
  findSongsByDifficulty,
  getSongById,
  getSongChords,
  getSongStrummingPattern,
  listArtists,
  listSongChordIds,
  songLibrary,
} from './index'

describe('songLibrary coverage', () => {
  it('has between 8 and 10 songs', () => {
    expect(songLibrary.length).toBeGreaterThanOrEqual(8)
    expect(songLibrary.length).toBeLessThanOrEqual(10)
  })

  it('every song id is unique', () => {
    const ids = songLibrary.map((song) => song.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every song has a title and artist', () => {
    for (const song of songLibrary) {
      expect(song.title.trim().length).toBeGreaterThan(0)
      expect(song.artist.trim().length).toBeGreaterThan(0)
    }
  })

  it('every song has a valid difficulty', () => {
    for (const song of songLibrary) {
      expect(['beginner', 'intermediate']).toContain(song.difficulty)
    }
  })

  it('includes at least one beginner and one intermediate song', () => {
    expect(findSongsByDifficulty('beginner').length).toBeGreaterThan(0)
    expect(findSongsByDifficulty('intermediate').length).toBeGreaterThan(0)
  })

  it('every song has at least one chord-progression section with chords', () => {
    for (const song of songLibrary) {
      expect(song.chordProgression.length).toBeGreaterThan(0)
      for (const section of song.chordProgression) {
        expect(section.name.trim().length).toBeGreaterThan(0)
        expect(section.chordIds.length).toBeGreaterThan(0)
      }
    }
  })

  it('every song has either a strummingPatternId or an inline strummingPattern', () => {
    for (const song of songLibrary) {
      expect(
        Boolean(song.strummingPatternId) || Boolean(song.strummingPattern),
      ).toBe(true)
    }
  })
})

describe('referential integrity against the chord library', () => {
  it('every chord id referenced by every song resolves to a real chord', () => {
    for (const song of songLibrary) {
      for (const section of song.chordProgression) {
        for (const chordId of section.chordIds) {
          const chord = getChordById(chordId)
          expect(
            chord,
            `${song.id} (${section.name}) references unknown chord id "${chordId}"`,
          ).toBeDefined()
        }
      }
    }
  })

  it('getSongChords resolves every distinct chord id used by a song', () => {
    for (const song of songLibrary) {
      const resolved = getSongChords(song)
      expect(resolved.length).toBe(listSongChordIds(song).length)
    }
  })
})

describe('referential integrity against the strumming-pattern fixtures', () => {
  it('every strummingPatternId resolves to a real fixture', () => {
    const validIds = new Set(
      strummingPatternFixtures.map((pattern) => pattern.id),
    )
    for (const song of songLibrary) {
      if (!song.strummingPatternId) continue
      expect(
        validIds.has(song.strummingPatternId),
        `${song.id} references unknown strumming pattern id "${song.strummingPatternId}"`,
      ).toBe(true)
    }
  })

  it('getSongStrummingPattern resolves a pattern for every song', () => {
    for (const song of songLibrary) {
      expect(
        getSongStrummingPattern(song),
        `${song.id} has no resolvable strumming pattern`,
      ).toBeDefined()
    }
  })
})

describe('optional tab sections', () => {
  it('every position in every song tab has exactly 6 fret entries', () => {
    for (const song of songLibrary) {
      if (!song.tab) continue
      for (const measure of song.tab.measures) {
        for (const position of measure.positions) {
          expect(position.frets).toHaveLength(6)
        }
      }
    }
  })

  it('every song tab has a title and at least one measure with positions', () => {
    for (const song of songLibrary) {
      if (!song.tab) continue
      expect(song.tab.title.trim().length).toBeGreaterThan(0)
      expect(song.tab.measures.length).toBeGreaterThan(0)
      for (const measure of song.tab.measures) {
        expect(measure.positions.length).toBeGreaterThan(0)
      }
    }
  })
})

describe('capoFret', () => {
  it('is a non-negative integer when present', () => {
    for (const song of songLibrary) {
      if (song.capoFret === undefined) continue
      expect(Number.isInteger(song.capoFret)).toBe(true)
      expect(song.capoFret).toBeGreaterThanOrEqual(0)
    }
  })
})

describe('accessors', () => {
  it('getSongById finds a known song', () => {
    expect(getSongById('manike-mage-hithe')?.title).toBe('Manike Mage Hithe')
  })

  it('getSongById returns undefined for an unknown id', () => {
    expect(getSongById('not-a-real-song')).toBeUndefined()
  })

  it('findSongsByDifficulty only returns songs of that difficulty', () => {
    for (const song of findSongsByDifficulty('intermediate')) {
      expect(song.difficulty).toBe('intermediate')
    }
  })

  it('findSongsByArtist is case-insensitive and matches the full credited artist string', () => {
    expect(findSongsByArtist('sunil santha').map((song) => song.id)).toEqual([
      'olu-pipila',
    ])
  })

  it('listArtists has no duplicates and matches the artists actually in the library', () => {
    const artists = listArtists()
    expect(new Set(artists).size).toBe(artists.length)
    for (const song of songLibrary) {
      expect(artists).toContain(song.artist)
    }
  })
})
