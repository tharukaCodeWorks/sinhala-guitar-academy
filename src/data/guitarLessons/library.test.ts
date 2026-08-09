import { describe, expect, it } from 'vitest'
import { getChordById } from '../chords'
import { getSongById } from '../songs'
import {
  getLessonById,
  guitarLessonLibrary,
  listLessonsByTier,
  nextLessonInTier,
  previousLessonInTier,
} from './index'

describe('guitarLessonLibrary coverage', () => {
  it('has exactly 6 beginner lessons authored so far', () => {
    expect(listLessonsByTier('beginner').length).toBe(6)
  })

  it('every lesson id is unique', () => {
    const ids = guitarLessonLibrary.map((lesson) => lesson.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every lesson has a title and summary', () => {
    for (const lesson of guitarLessonLibrary) {
      expect(lesson.title.trim().length).toBeGreaterThan(0)
      expect(lesson.summary.trim().length).toBeGreaterThan(0)
    }
  })

  it('every lesson has a valid tier', () => {
    for (const lesson of guitarLessonLibrary) {
      expect(['beginner', 'intermediate', 'advanced']).toContain(lesson.tier)
    }
  })

  it('every lesson has 3-6 sections, each with a non-empty heading and body', () => {
    for (const lesson of guitarLessonLibrary) {
      expect(lesson.sections.length).toBeGreaterThanOrEqual(3)
      expect(lesson.sections.length).toBeLessThanOrEqual(6)
      for (const section of lesson.sections) {
        expect(section.heading.trim().length).toBeGreaterThan(0)
        expect(section.body.trim().length).toBeGreaterThan(0)
      }
    }
  })
})

describe('order sequencing per tier', () => {
  it('every tier with lessons forms a contiguous 1..N order sequence with no duplicates', () => {
    const tiers = new Set(guitarLessonLibrary.map((lesson) => lesson.tier))
    for (const tier of tiers) {
      const orders = listLessonsByTier(tier).map((lesson) => lesson.order)
      const expected = Array.from({ length: orders.length }, (_, i) => i + 1)
      expect(
        [...orders].sort((a, b) => a - b),
        `tier "${tier}" orders ${JSON.stringify(orders)} are not a contiguous 1..N sequence`,
      ).toEqual(expected)
    }
  })

  it('the beginner tier is ordered anatomy/reading -> tuning -> first chords -> strumming/changes -> campfire chords -> putting it together', () => {
    expect(listLessonsByTier('beginner').map((lesson) => lesson.id)).toEqual([
      'guitar-anatomy-posture-reading',
      'tuning-open-strings',
      'first-chords-em-e-am',
      'basic-strumming-chord-changes',
      'campfire-chords-d-g-c-a',
      'putting-it-together',
    ])
  })
})

describe('referential integrity against the guitar chord library', () => {
  it('every chordId referenced by any lesson section resolves to a real chord', () => {
    for (const lesson of guitarLessonLibrary) {
      for (const section of lesson.sections) {
        if (!section.chordId) continue
        const chord = getChordById(section.chordId)
        expect(
          chord,
          `${lesson.id} ("${section.heading}") references unknown chord id "${section.chordId}"`,
        ).toBeDefined()
      }
    }
  })

  it('each of the first-chords lesson (Em, E, Am) sections references the expected chord', () => {
    const lesson = getLessonById('first-chords-em-e-am')
    const chordIds = lesson?.sections
      .map((section) => section.chordId)
      .filter((id): id is string => Boolean(id))
    expect(chordIds).toEqual(['e-minor', 'e-major', 'a-minor'])
  })

  it('each of the campfire-chords lesson (D, G, C, A) sections references the expected chord', () => {
    const lesson = getLessonById('campfire-chords-d-g-c-a')
    const chordIds = lesson?.sections
      .map((section) => section.chordId)
      .filter((id): id is string => Boolean(id))
    expect(chordIds).toEqual(['d-major', 'g-major', 'c-major', 'a-major'])
  })

  it('at least one beginner lesson embeds a chordId reference', () => {
    const referencingLessons = listLessonsByTier('beginner').filter((lesson) =>
      lesson.sections.some((section) => section.chordId),
    )
    expect(referencingLessons.length).toBeGreaterThan(0)
  })
})

describe('referential integrity against the guitar song catalog', () => {
  it('every songId referenced by a lesson resolves to a real song', () => {
    for (const lesson of guitarLessonLibrary) {
      if (!lesson.songId) continue
      expect(
        getSongById(lesson.songId),
        `${lesson.id} references unknown song id "${lesson.songId}"`,
      ).toBeDefined()
    }
  })

  it('the "Putting It Together" lesson references a real beginner-difficulty song', () => {
    const lesson = getLessonById('putting-it-together')
    expect(lesson?.songId).toBe('sarungale')
    const song = getSongById(lesson!.songId!)
    expect(song).toBeDefined()
    expect(song?.difficulty).toBe('beginner')
  })

  it('the "Putting It Together" song only uses chords already taught by lesson 6 (Em, E, Am, D, G, C, A)', () => {
    const lesson = getLessonById('putting-it-together')
    const song = getSongById(lesson!.songId!)
    const taughtChordIds = new Set(
      guitarLessonLibrary
        .filter((l) => l.tier === 'beginner' && l.order <= 6)
        .flatMap((l) => l.sections.map((section) => section.chordId))
        .filter((id): id is string => Boolean(id)),
    )
    const songChordIds = new Set(
      song!.chordProgression.flatMap((section) => section.chordIds),
    )
    for (const chordId of songChordIds) {
      expect(
        taughtChordIds.has(chordId),
        `song "${song!.id}" uses chord "${chordId}" which was not taught by any beginner lesson`,
      ).toBe(true)
    }
  })
})

describe('accessors', () => {
  it('getLessonById finds a known lesson', () => {
    expect(getLessonById('guitar-anatomy-posture-reading')?.title).toBe(
      'Guitar Anatomy, Posture & Reading Chord Diagrams/TAB',
    )
  })

  it('getLessonById returns undefined for an unknown id', () => {
    expect(getLessonById('not-a-real-lesson')).toBeUndefined()
  })

  it('listLessonsByTier only returns lessons of that tier, sorted by order', () => {
    const lessons = listLessonsByTier('beginner')
    for (const lesson of lessons) {
      expect(lesson.tier).toBe('beginner')
    }
    const orders = lessons.map((lesson) => lesson.order)
    expect(orders).toEqual([...orders].sort((a, b) => a - b))
  })

  it('listLessonsByTier returns an empty array for a tier with no authored lessons', () => {
    expect(listLessonsByTier('intermediate')).toEqual([])
    expect(listLessonsByTier('advanced')).toEqual([])
  })

  it('nextLessonInTier walks forward through the full beginner sequence', () => {
    const ids = listLessonsByTier('beginner').map((lesson) => lesson.id)
    for (let i = 0; i < ids.length - 1; i++) {
      expect(nextLessonInTier(ids[i])?.id).toBe(ids[i + 1])
    }
    expect(nextLessonInTier(ids[ids.length - 1])).toBeUndefined()
  })

  it('previousLessonInTier walks backward through the full beginner sequence', () => {
    const ids = listLessonsByTier('beginner').map((lesson) => lesson.id)
    for (let i = 1; i < ids.length; i++) {
      expect(previousLessonInTier(ids[i])?.id).toBe(ids[i - 1])
    }
    expect(previousLessonInTier(ids[0])).toBeUndefined()
  })

  it('nextLessonInTier and previousLessonInTier return undefined for an unknown id', () => {
    expect(nextLessonInTier('not-a-real-lesson')).toBeUndefined()
    expect(previousLessonInTier('not-a-real-lesson')).toBeUndefined()
  })
})
