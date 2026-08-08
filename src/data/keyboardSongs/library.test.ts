import { describe, expect, it } from 'vitest'
import { getChordById } from '../keyboardChords'
import {
  findSongsByArtist,
  findSongsByChordId,
  findSongsByLessonRole,
  getSongById,
  getSongChords,
  listArtists,
  listSongChordIds,
  listSongs,
  listSongsByDifficulty,
  songLibrary,
} from './index'

describe('songLibrary coverage', () => {
  it('has 6-8 songs', () => {
    expect(songLibrary.length).toBeGreaterThanOrEqual(6)
    expect(songLibrary.length).toBeLessThanOrEqual(8)
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

  it('has at least 3 beginner and at least 2 intermediate songs', () => {
    expect(listSongsByDifficulty('beginner').length).toBeGreaterThanOrEqual(3)
    expect(listSongsByDifficulty('intermediate').length).toBeGreaterThanOrEqual(
      2,
    )
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

  it('every song has both a suggested right- and left-hand position', () => {
    for (const song of songLibrary) {
      expect(song.suggestedRightHandPosition).toBeDefined()
      expect(
        song.suggestedRightHandPosition.startingNote.length,
      ).toBeGreaterThan(0)
      expect(song.suggestedLeftHandPosition).toBeDefined()
      expect(
        song.suggestedLeftHandPosition.startingNote.length,
      ).toBeGreaterThan(0)
    }
  })
})

describe('referential integrity against the keyboard chord library', () => {
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

  it('every beginner song only uses chords with a beginner-difficulty variant', () => {
    // Regression guard for the class of bug SGA-TASK-11's guitar review
    // caught: a song tagged difficulty: 'beginner' referencing a chord
    // whose only variant(s) are 'intermediate'/'advanced'.
    for (const song of songLibrary) {
      if (song.difficulty !== 'beginner') continue
      for (const section of song.chordProgression) {
        for (const chordId of section.chordIds) {
          const chord = getChordById(chordId)
          const hasBeginnerVariant = chord?.variants.some(
            (variant) => variant.difficulty === 'beginner',
          )
          expect(
            hasBeginnerVariant,
            `${song.id} is difficulty="beginner" but references chord "${chordId}", which has no beginner-difficulty variant (variants: ${chord?.variants
              .map((v) => `${v.id}=${v.difficulty}`)
              .join(', ')})`,
          ).toBe(true)
        }
      }
    }
  })
})

describe('optional melody excerpts', () => {
  it('every melody excerpt has a title and at least one note', () => {
    for (const song of songLibrary) {
      if (!song.melodyExcerpt) continue
      expect(song.melodyExcerpt.title.trim().length).toBeGreaterThan(0)
      expect(song.melodyExcerpt.notes.length).toBeGreaterThan(0)
    }
  })

  it('every melody note has a valid finger number (1-5)', () => {
    for (const song of songLibrary) {
      if (!song.melodyExcerpt) continue
      for (const note of song.melodyExcerpt.notes) {
        expect([1, 2, 3, 4, 5]).toContain(note.finger)
      }
    }
  })
})

describe('lesson roles', () => {
  it('has exactly one song flagged for the Putting It Together lesson, and it is beginner with an I-IV-V-only progression', () => {
    const songs = findSongsByLessonRole('putting-it-together')
    expect(songs.length).toBe(1)
    const [song] = songs
    expect(song.difficulty).toBe('beginner')
    const chordIds = new Set(listSongChordIds(song))
    // I-IV-V in the song's key: tonic, subdominant, dominant majors only.
    expect(chordIds.size).toBeLessThanOrEqual(3)
    for (const chordId of chordIds) {
      expect(chordId.endsWith('-major')).toBe(true)
    }
  })

  it('has at least one song flagged for the Lead Sheets & Chord Symbols lesson', () => {
    const songs = findSongsByLessonRole('lead-sheet-chords')
    expect(songs.length).toBeGreaterThanOrEqual(1)
  })
})

describe('accessors', () => {
  it('listSongs returns the full library', () => {
    expect(listSongs()).toEqual(songLibrary)
  })

  it('getSongById finds a known song', () => {
    expect(getSongById('manike-mage-hithe')?.title).toBe('Manike Mage Hithe')
  })

  it('getSongById returns undefined for an unknown id', () => {
    expect(getSongById('not-a-real-song')).toBeUndefined()
  })

  it('listSongsByDifficulty only returns songs of that difficulty', () => {
    for (const song of listSongsByDifficulty('intermediate')) {
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

  it('findSongsByChordId returns every song that references the chord', () => {
    const results = findSongsByChordId('c-major')
    expect(results.length).toBeGreaterThan(0)
    for (const song of results) {
      expect(listSongChordIds(song)).toContain('c-major')
    }
    for (const song of songLibrary) {
      if (!results.includes(song)) {
        expect(listSongChordIds(song)).not.toContain('c-major')
      }
    }
  })

  it('findSongsByChordId returns an empty array for a chord no song uses', () => {
    expect(findSongsByChordId('not-a-real-chord-id')).toEqual([])
  })
})
