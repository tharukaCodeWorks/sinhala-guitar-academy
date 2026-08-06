import { describe, expect, it } from 'vitest'
import { buildSongSnippet, slugifyTitle } from './songSnippet'

describe('slugifyTitle', () => {
  it('kebab-cases a title', () => {
    expect(slugifyTitle('Tera Ban Jaunga')).toBe('tera-ban-jaunga')
  })

  it('strips punctuation and collapses whitespace', () => {
    expect(slugifyTitle('Sudu Araliya!  (Live)')).toBe('sudu-araliya-live')
  })

  it('falls back to a placeholder for an empty title', () => {
    expect(slugifyTitle('   ')).toBe('untitled-song')
  })
})

describe('buildSongSnippet', () => {
  const baseInput = {
    title: 'Kabira',
    artist: 'Tochi Raina',
    sections: [
      { name: 'Verse', chordIds: ['g-major', 'd-major'] },
      { name: 'Chorus', chordIds: ['c-major', 'g-major'] },
    ],
  }

  it('includes the title, artist, and slugified id', () => {
    const snippet = buildSongSnippet(baseInput)
    expect(snippet).toContain('id: "kabira"')
    expect(snippet).toContain('title: "Kabira"')
    expect(snippet).toContain('artist: "Tochi Raina"')
  })

  it('renders every section with its chord ids', () => {
    const snippet = buildSongSnippet(baseInput)
    expect(snippet).toContain(
      '{ name: "Verse", chordIds: ["g-major","d-major"] }',
    )
    expect(snippet).toContain(
      '{ name: "Chorus", chordIds: ["c-major","g-major"] }',
    )
  })

  it('references a fixture pattern id when one is given', () => {
    const snippet = buildSongSnippet({
      ...baseInput,
      strummingPatternId: 'pop-folk-ddu-udu',
    })
    expect(snippet).toContain('strummingPatternId: "pop-folk-ddu-udu"')
  })

  it('inlines a custom pattern when one is given instead', () => {
    const snippet = buildSongSnippet({
      ...baseInput,
      inlinePattern: {
        id: 'custom-pattern',
        title: 'My Pattern',
        tempoBpm: 100,
        steps: [{ type: 'down', accent: true }, { type: 'up' }],
      },
    })
    expect(snippet).toContain('strummingPattern:')
    expect(snippet).toContain('tempoBpm: 100')
    expect(snippet).toContain('{ type: "down", accent: true }')
    expect(snippet).not.toContain('strummingPatternId')
  })

  it('leaves a TODO placeholder when no pattern was chosen', () => {
    const snippet = buildSongSnippet(baseInput)
    expect(snippet).toContain('TODO: pick a pattern')
  })
})
