import { describe, expect, it } from 'vitest'
import {
  isChordLine,
  isChordToken,
  isSeparatorLine,
  matchSectionHeader,
  normalizeChordToken,
  parseChordSheet,
  resolveChordToken,
} from './chordSheetParser'

describe('isChordToken', () => {
  it('accepts plain majors, minors, and sevenths', () => {
    expect(isChordToken('A')).toBe(true)
    expect(isChordToken('C#m')).toBe(true)
    expect(isChordToken('G7')).toBe(true)
    expect(isChordToken('Bbmin')).toBe(true)
  })

  it('accepts a slash/bass-note chord', () => {
    expect(isChordToken('D/F#')).toBe(true)
  })

  it('rejects ordinary words', () => {
    expect(isChordToken('Sudu')).toBe(false)
    expect(isChordToken('the')).toBe(false)
    expect(isChordToken('')).toBe(false)
  })
})

describe('isChordLine', () => {
  it('is true only when every token on the line is a chord', () => {
    expect(isChordLine('A              G')).toBe(true)
    expect(isChordLine('Bm     E        A')).toBe(true)
    expect(isChordLine('Sudu araliya mala')).toBe(false)
    expect(isChordLine('A little G bit of lyric')).toBe(false)
    expect(isChordLine('   ')).toBe(false)
  })
})

describe('isSeparatorLine', () => {
  it('recognizes dashed dividers', () => {
    expect(isSeparatorLine('---------------------------')).toBe(true)
    expect(isSeparatorLine('===')).toBe(true)
  })

  it('rejects short or non-divider lines', () => {
    expect(isSeparatorLine('--')).toBe(false)
    expect(isSeparatorLine('Verse 1')).toBe(false)
  })
})

describe('matchSectionHeader', () => {
  it('matches bracketed headers', () => {
    expect(matchSectionHeader('[Chorus]')).toBe('Chorus')
    expect(matchSectionHeader('[Verse 1]')).toBe('Verse 1')
  })

  it('matches short colon-terminated headers', () => {
    expect(matchSectionHeader('Intro:')).toBe('Intro')
    expect(matchSectionHeader('Verse 2:')).toBe('Verse 2')
  })

  it('does not match ordinary lyric lines', () => {
    expect(matchSectionHeader('Sudu araliya mala')).toBeUndefined()
    expect(matchSectionHeader('A              G')).toBeUndefined()
  })
})

describe('normalizeChordToken', () => {
  it('leaves already-canonical tokens untouched', () => {
    expect(normalizeChordToken('A')).toBe('A')
    expect(normalizeChordToken('C#m')).toBe('C#m')
  })

  it('maps flats to sharps', () => {
    expect(normalizeChordToken('Bb')).toBe('A#')
    expect(normalizeChordToken('Ebm')).toBe('D#m')
  })

  it('drops a slash-bass suffix', () => {
    expect(normalizeChordToken('D/F#')).toBe('D')
    expect(normalizeChordToken('G/B')).toBe('G')
  })

  it('normalizes min/maj suffix spelling', () => {
    expect(normalizeChordToken('Amin')).toBe('Am')
    expect(normalizeChordToken('Cmaj')).toBe('C')
  })
})

describe('resolveChordToken', () => {
  it('resolves tokens that exist in the chord library', () => {
    expect(resolveChordToken('A')?.id).toBe('a-major')
    expect(resolveChordToken('C#m')?.id).toBe('c-sharp-minor')
    expect(resolveChordToken('Bb')?.id).toBe('a-sharp-major')
    expect(resolveChordToken('G7')?.id).toBe('g-7th')
  })

  it('returns undefined for qualities the library does not have', () => {
    expect(resolveChordToken('Csus4')).toBeUndefined()
    expect(resolveChordToken('Dmaj7')).toBeUndefined()
  })
})

describe('parseChordSheet', () => {
  // A synthetic sheet in the same layout as chordslankalk.com and similar
  // sites (chords on their own line above the lyric line) — generic
  // placeholder lyric text, not a real song's lyrics.
  const sampleSheet = `
[Chorus]
---------------------------
A              G
la la la la la la
               A
la la la la la
                G
la la la la la la
                A
la la la la //

[Verse 1]
---------------------------
A              C#m
la la la la la la
Bm     E        A
la la la la la
`

  it('groups chords under their section headers, ignoring lyric text', () => {
    const result = parseChordSheet(sampleSheet)
    expect(result.sections).toEqual([
      { name: 'Chorus', chordTokens: ['A', 'G'] },
      { name: 'Verse 1', chordTokens: ['A', 'C#m', 'Bm', 'E'] },
    ])
  })

  it('collects distinct chord tokens across the whole sheet in first-use order', () => {
    const result = parseChordSheet(sampleSheet)
    expect(result.distinctChordTokens).toEqual(['A', 'G', 'C#m', 'Bm', 'E'])
  })

  it('deduplicates repeated chords within a single section', () => {
    const result = parseChordSheet('[Verse]\nA G A G\nA G')
    expect(result.sections).toEqual([
      { name: 'Verse', chordTokens: ['A', 'G'] },
    ])
  })

  it('auto-numbers a section when no header precedes the chords', () => {
    const result = parseChordSheet('A G\nlyrics here')
    expect(result.sections).toEqual([
      { name: 'Section 1', chordTokens: ['A', 'G'] },
    ])
  })

  it('does not create a section for a header with no chord lines after it', () => {
    const result = parseChordSheet(
      '[Empty Header]\njust some words, no chords here',
    )
    expect(result.sections).toEqual([])
    expect(result.distinctChordTokens).toEqual([])
  })

  it('returns empty output for blank input', () => {
    expect(parseChordSheet('')).toEqual({
      sections: [],
      distinctChordTokens: [],
    })
    expect(parseChordSheet('   \n  \n')).toEqual({
      sections: [],
      distinctChordTokens: [],
    })
  })
})
