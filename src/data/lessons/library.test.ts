import { describe, expect, it } from 'vitest'
import { getChordById } from '../keyboardChords'
import { getSongById } from '../keyboardSongs'
import {
  getLessonById,
  lessonLibrary,
  listLessonsByTier,
  nextLessonInTier,
  previousLessonInTier,
} from './index'

describe('lessonLibrary coverage', () => {
  it('has exactly 6 beginner lessons authored so far', () => {
    expect(listLessonsByTier('beginner').length).toBe(6)
  })

  it('has exactly 5 intermediate lessons authored so far', () => {
    expect(listLessonsByTier('intermediate').length).toBe(5)
  })

  it('every lesson id is unique', () => {
    const ids = lessonLibrary.map((lesson) => lesson.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every lesson has a title and summary', () => {
    for (const lesson of lessonLibrary) {
      expect(lesson.title.trim().length).toBeGreaterThan(0)
      expect(lesson.summary.trim().length).toBeGreaterThan(0)
    }
  })

  it('every lesson has a valid tier', () => {
    for (const lesson of lessonLibrary) {
      expect(['beginner', 'intermediate', 'advanced']).toContain(lesson.tier)
    }
  })

  it('every lesson has 3-6 sections, each with a non-empty heading and body', () => {
    for (const lesson of lessonLibrary) {
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
    const tiers = new Set(lessonLibrary.map((lesson) => lesson.tier))
    for (const tier of tiers) {
      const orders = listLessonsByTier(tier).map((lesson) => lesson.order)
      const expected = Array.from({ length: orders.length }, (_, i) => i + 1)
      expect(
        [...orders].sort((a, b) => a - b),
        `tier "${tier}" orders ${JSON.stringify(orders)} are not a contiguous 1..N sequence`,
      ).toEqual(expected)
    }
  })

  it('the beginner tier is ordered posture -> note reading -> rhythm -> five-finger -> triads -> putting it together', () => {
    expect(listLessonsByTier('beginner').map((lesson) => lesson.id)).toEqual([
      'posture-hand-position',
      'note-reading-grand-staff',
      'rhythm-note-values',
      'five-finger-patterns',
      'basic-triads-i-iv-v',
      'putting-it-together',
    ])
  })

  it('the intermediate tier is ordered scale technique -> chord inversions -> expanding rhythm -> reading beyond the staff/dynamics -> lead sheets', () => {
    expect(
      listLessonsByTier('intermediate').map((lesson) => lesson.id),
    ).toEqual([
      'scale-technique-thumb-under-fingering',
      'chord-inversions',
      'expanding-rhythm',
      'reading-beyond-staff-dynamics',
      'lead-sheets-chord-symbols',
    ])
  })
})

describe('referential integrity against the keyboard chord library', () => {
  it('every keyboardChordId referenced by any lesson section resolves to a real chord', () => {
    for (const lesson of lessonLibrary) {
      for (const section of lesson.sections) {
        if (!section.keyboardChordId) continue
        const chord = getChordById(section.keyboardChordId)
        expect(
          chord,
          `${lesson.id} ("${section.heading}") references unknown keyboard chord id "${section.keyboardChordId}"`,
        ).toBeDefined()
      }
    }
  })

  it('at least one beginner lesson embeds a keyboardChordId reference', () => {
    const referencingLessons = listLessonsByTier('beginner').filter((lesson) =>
      lesson.sections.some((section) => section.keyboardChordId),
    )
    expect(referencingLessons.length).toBeGreaterThan(0)
  })

  it('at least one intermediate lesson embeds a keyboardChordId reference', () => {
    const referencingLessons = listLessonsByTier('intermediate').filter(
      (lesson) => lesson.sections.some((section) => section.keyboardChordId),
    )
    expect(referencingLessons.length).toBeGreaterThan(0)
  })
})

describe('referential integrity against the keyboard song catalog', () => {
  it('every songId referenced by a lesson resolves to a real song', () => {
    for (const lesson of lessonLibrary) {
      if (!lesson.songId) continue
      expect(
        getSongById(lesson.songId),
        `${lesson.id} references unknown song id "${lesson.songId}"`,
      ).toBeDefined()
    }
  })

  it('the "Putting It Together" lesson references the song tagged for that lesson role', () => {
    const lesson = getLessonById('putting-it-together')
    expect(lesson?.songId).toBe('surangani')
    const song = getSongById(lesson!.songId!)
    expect(song?.lessonRoles).toContain('putting-it-together')
  })

  it('the "Playing From Lead Sheets & Chord Symbols" lesson references the song tagged for that lesson role', () => {
    const lesson = getLessonById('lead-sheets-chord-symbols')
    expect(lesson?.songId).toBe('manike-mage-hithe')
    const song = getSongById(lesson!.songId!)
    expect(song?.lessonRoles).toContain('lead-sheet-chords')
  })
})

describe('accessors', () => {
  it('getLessonById finds a known lesson', () => {
    expect(getLessonById('posture-hand-position')?.title).toBe(
      'Posture, Hand Position & Keyboard Geography',
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

  it('nextLessonInTier walks forward through the full intermediate sequence', () => {
    const ids = listLessonsByTier('intermediate').map((lesson) => lesson.id)
    for (let i = 0; i < ids.length - 1; i++) {
      expect(nextLessonInTier(ids[i])?.id).toBe(ids[i + 1])
    }
    expect(nextLessonInTier(ids[ids.length - 1])).toBeUndefined()
  })

  it('previousLessonInTier walks backward through the full intermediate sequence', () => {
    const ids = listLessonsByTier('intermediate').map((lesson) => lesson.id)
    for (let i = 1; i < ids.length; i++) {
      expect(previousLessonInTier(ids[i])?.id).toBe(ids[i - 1])
    }
    expect(previousLessonInTier(ids[0])).toBeUndefined()
  })

  it('the beginner and intermediate tiers do not bleed into each other via next/previous', () => {
    expect(nextLessonInTier('putting-it-together')).toBeUndefined()
    expect(
      previousLessonInTier('scale-technique-thumb-under-fingering'),
    ).toBeUndefined()
  })

  it('nextLessonInTier and previousLessonInTier return undefined for an unknown id', () => {
    expect(nextLessonInTier('not-a-real-lesson')).toBeUndefined()
    expect(previousLessonInTier('not-a-real-lesson')).toBeUndefined()
  })
})
