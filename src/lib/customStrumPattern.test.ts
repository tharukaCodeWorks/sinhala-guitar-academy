import { describe, expect, it } from 'vitest'
import {
  buildCustomPattern,
  createDefaultCustomSteps,
  createRestSteps,
  CUSTOM_PATTERN_ID,
  cycleStepAt,
  DEFAULT_CUSTOM_TITLE,
  nextStepType,
  resizeSteps,
} from './customStrumPattern'

describe('nextStepType', () => {
  it('cycles down -> up -> mute -> rest -> down', () => {
    expect(nextStepType('down')).toBe('up')
    expect(nextStepType('up')).toBe('mute')
    expect(nextStepType('mute')).toBe('rest')
    expect(nextStepType('rest')).toBe('down')
  })
})

describe('createDefaultCustomSteps', () => {
  it('alternates down/up for the requested count', () => {
    const steps = createDefaultCustomSteps(4)
    expect(steps.map((step) => step.type)).toEqual(['down', 'up', 'down', 'up'])
  })

  it('returns the requested number of steps', () => {
    expect(createDefaultCustomSteps(16)).toHaveLength(16)
  })
})

describe('createRestSteps', () => {
  it('returns all-rest steps of the requested count', () => {
    const steps = createRestSteps(5)
    expect(steps).toHaveLength(5)
    expect(steps.every((step) => step.type === 'rest')).toBe(true)
  })
})

describe('resizeSteps', () => {
  it('truncates when shrinking', () => {
    const steps = createDefaultCustomSteps(8)
    expect(resizeSteps(steps, 4)).toEqual(steps.slice(0, 4))
  })

  it('pads with rests when growing, preserving existing steps', () => {
    const steps = createDefaultCustomSteps(4)
    const resized = resizeSteps(steps, 8)
    expect(resized).toHaveLength(8)
    expect(resized.slice(0, 4)).toEqual(steps)
    expect(resized.slice(4).every((step) => step.type === 'rest')).toBe(true)
  })

  it('is a no-op when the count is unchanged', () => {
    const steps = createDefaultCustomSteps(8)
    expect(resizeSteps(steps, 8)).toEqual(steps)
  })
})

describe('cycleStepAt', () => {
  it('advances only the targeted step, leaving the rest untouched', () => {
    const steps = createRestSteps(3)
    const next = cycleStepAt(steps, 1)
    expect(next[0].type).toBe('rest')
    expect(next[1].type).toBe('down')
    expect(next[2].type).toBe('rest')
  })

  it('does not mutate the input array', () => {
    const steps = createRestSteps(2)
    cycleStepAt(steps, 0)
    expect(steps[0].type).toBe('rest')
  })
})

describe('buildCustomPattern', () => {
  it('uses the given title when non-empty', () => {
    const pattern = buildCustomPattern(createRestSteps(4), 'My Groove')
    expect(pattern.title).toBe('My Groove')
    expect(pattern.id).toBe(CUSTOM_PATTERN_ID)
    expect(pattern.steps).toHaveLength(4)
  })

  it('falls back to a default title for blank/whitespace-only input', () => {
    expect(buildCustomPattern(createRestSteps(2), '   ').title).toBe(
      DEFAULT_CUSTOM_TITLE,
    )
    expect(buildCustomPattern(createRestSteps(2), '').title).toBe(
      DEFAULT_CUSTOM_TITLE,
    )
  })

  it('trims surrounding whitespace from a real title', () => {
    expect(
      buildCustomPattern(createRestSteps(2), '  Reggae Chop  ').title,
    ).toBe('Reggae Chop')
  })
})
