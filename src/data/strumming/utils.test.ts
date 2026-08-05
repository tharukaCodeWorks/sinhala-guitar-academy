import { describe, expect, it } from 'vitest'
import { strummingPatternFixtures } from './fixtures'
import {
  clampTempoBpm,
  MAX_TEMPO_BPM,
  MIN_TEMPO_BPM,
  patternDurationSeconds,
  stepDurationSeconds,
  stepGlyph,
  stepLabel,
} from './utils'

describe('stepDurationSeconds', () => {
  it('returns half a beat, in seconds, for the given quarter-note tempo', () => {
    // 120 BPM -> 0.5s per quarter note -> 0.25s per 8th note
    expect(stepDurationSeconds(120)).toBeCloseTo(0.25)
    // 60 BPM -> 1s per quarter note -> 0.5s per 8th note
    expect(stepDurationSeconds(60)).toBeCloseTo(0.5)
  })
})

describe('patternDurationSeconds', () => {
  it('multiplies step duration by the number of steps', () => {
    const steps = strummingPatternFixtures[0].steps
    expect(patternDurationSeconds(steps, 120)).toBeCloseTo(steps.length * 0.25)
  })
})

describe('clampTempoBpm', () => {
  it('leaves in-range tempos untouched', () => {
    expect(clampTempoBpm(100)).toBe(100)
  })

  it('clamps values below the minimum', () => {
    expect(clampTempoBpm(1)).toBe(MIN_TEMPO_BPM)
  })

  it('clamps values above the maximum', () => {
    expect(clampTempoBpm(1000)).toBe(MAX_TEMPO_BPM)
  })
})

describe('stepGlyph / stepLabel', () => {
  it('returns a distinct, non-empty glyph and label for every step type', () => {
    const types = ['down', 'up', 'mute', 'rest'] as const
    const glyphs = types.map(stepGlyph)
    const labels = types.map(stepLabel)

    expect(new Set(glyphs).size).toBe(types.length)
    expect(new Set(labels).size).toBe(types.length)
    glyphs.forEach((glyph) => expect(glyph.length).toBeGreaterThan(0))
    labels.forEach((label) => expect(label.length).toBeGreaterThan(0))
  })
})

describe('strummingPatternFixtures', () => {
  it('has at least 3 example patterns, each with steps and a positive tempo', () => {
    expect(strummingPatternFixtures.length).toBeGreaterThanOrEqual(3)
    for (const pattern of strummingPatternFixtures) {
      expect(pattern.steps.length).toBeGreaterThan(0)
      expect(pattern.tempoBpm).toBeGreaterThan(0)
      expect(pattern.id).toBeTruthy()
      expect(pattern.title).toBeTruthy()
    }
  })

  it('has unique ids across fixtures', () => {
    const ids = strummingPatternFixtures.map((pattern) => pattern.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('includes every step type across the fixtures', () => {
    const seenTypes = new Set(
      strummingPatternFixtures.flatMap((pattern) =>
        pattern.steps.map((step) => step.type),
      ),
    )
    expect(seenTypes).toEqual(new Set(['down', 'up', 'mute', 'rest']))
  })
})
