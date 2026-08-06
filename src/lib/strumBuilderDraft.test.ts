import { beforeEach, describe, expect, it } from 'vitest'
import { clearDraft, loadDraft, saveDraft } from './strumBuilderDraft'

/** See `fingeringPractice.test.ts` for why this stand-in is needed under vitest's `node` environment. */
class MemoryStorage {
  private store = new Map<string, string>()

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value)
  }

  removeItem(key: string): void {
    this.store.delete(key)
  }

  clear(): void {
    this.store.clear()
  }
}

beforeEach(() => {
  Object.defineProperty(globalThis, 'localStorage', {
    value: new MemoryStorage(),
    configurable: true,
    writable: true,
  })
})

describe('strumBuilderDraft', () => {
  it('returns undefined when nothing has been saved', () => {
    expect(loadDraft()).toBeUndefined()
  })

  it('round-trips a saved draft', () => {
    const draft = {
      title: 'Kabira',
      artist: 'Tochi Raina',
      chordSheetText: 'A G',
    }
    saveDraft(draft)
    expect(loadDraft()).toEqual(draft)
  })

  it('overwrites the previous draft on save', () => {
    saveDraft({ title: 'One', artist: '', chordSheetText: '' })
    saveDraft({ title: 'Two', artist: '', chordSheetText: '' })
    expect(loadDraft()?.title).toBe('Two')
  })

  it('clears the draft', () => {
    saveDraft({ title: 'Kabira', artist: '', chordSheetText: 'A G' })
    clearDraft()
    expect(loadDraft()).toBeUndefined()
  })

  it('fails soft on corrupt JSON', () => {
    localStorage.setItem('sga.strumBuilder.draft.v1', '{not json')
    expect(loadDraft()).toBeUndefined()
  })

  it('fails soft on a validly-parsed but wrong-shaped value', () => {
    localStorage.setItem(
      'sga.strumBuilder.draft.v1',
      JSON.stringify({ foo: 'bar' }),
    )
    expect(loadDraft()).toBeUndefined()
  })
})
