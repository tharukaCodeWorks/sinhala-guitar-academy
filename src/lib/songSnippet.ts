/**
 * Builds a copy-pasteable `Song`-shaped TypeScript snippet from what the
 * Strum Builder tool has assembled (parsed sections + resolved chord ids +
 * a chosen strumming pattern). This is a *starting point* for hand-editing
 * into a real `src/data/songs/*.ts` file, not a fully automatic song
 * import — fields the tool can't reliably infer from a chord sheet alone
 * (key, difficulty, capo) are left as clearly-marked placeholders.
 */
import type { StrummingPattern } from '../data/strumming/types'

export interface SongSnippetSection {
  name: string
  /** Resolved chord ids only — unresolved tokens can't go in `Song.chordProgression`. */
  chordIds: string[]
}

export interface SongSnippetInput {
  title: string
  artist: string
  sections: SongSnippetSection[]
  /** Set when the user picked a fixture pattern. Mutually exclusive with `inlinePattern`. */
  strummingPatternId?: string
  /** Set when the user built a custom pattern instead of picking a fixture. */
  inlinePattern?: StrummingPattern
}

/** Kebab-cases a title into a `Song.id`-shaped slug, e.g. `"Tera Ban Jaunga"` -> `"tera-ban-jaunga"`. */
export function slugifyTitle(title: string): string {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug || 'untitled-song'
}

function indent(text: string, level: number): string {
  const prefix = '  '.repeat(level)
  return text
    .split('\n')
    .map((line) => (line ? prefix + line : line))
    .join('\n')
}

function jsonLiteral(value: unknown): string {
  return JSON.stringify(value)
}

function formatSection(section: SongSnippetSection): string {
  return `{ name: ${jsonLiteral(section.name)}, chordIds: ${jsonLiteral(section.chordIds)} }`
}

function formatInlinePattern(pattern: StrummingPattern): string {
  const steps = pattern.steps
    .map(
      (step) =>
        `{ type: ${jsonLiteral(step.type)}${step.accent ? ', accent: true' : ''} }`,
    )
    .join(',\n')
  return [
    '{',
    `  id: ${jsonLiteral(pattern.id)},`,
    `  title: ${jsonLiteral(pattern.title)},`,
    `  tempoBpm: ${pattern.tempoBpm},`,
    '  steps: [',
    indent(steps, 2),
    '  ],',
    '}',
  ].join('\n')
}

/**
 * Renders the assembled draft as a `Song`-shaped object literal, ready to
 * paste into a new `src/data/songs/*.ts` file (alongside an `import type
 * { Song } from './types'` and adding it to `library.ts`).
 */
export function buildSongSnippet(input: SongSnippetInput): string {
  const id = slugifyTitle(input.title)
  const lines: string[] = []

  lines.push('{')
  lines.push(`  id: ${jsonLiteral(id)},`)
  lines.push(`  title: ${jsonLiteral(input.title || 'Untitled')},`)
  lines.push(`  artist: ${jsonLiteral(input.artist || 'Unknown')},`)
  lines.push("  key: 'C', // TODO: set the song's real key")
  lines.push(
    "  difficulty: 'beginner', // TODO: verify against the chords used",
  )
  lines.push(
    '  // capoFret: 0, // TODO: set if the chords below are played with a capo',
  )

  lines.push('  chordProgression: [')
  lines.push(
    indent(
      input.sections.map((section) => formatSection(section) + ',').join('\n'),
      2,
    ),
  )
  lines.push('  ],')

  if (input.inlinePattern) {
    lines.push(
      '  strummingPattern: ' +
        indent(formatInlinePattern(input.inlinePattern), 1).trim() +
        ',',
    )
  } else if (input.strummingPatternId) {
    lines.push(
      `  strummingPatternId: ${jsonLiteral(input.strummingPatternId)},`,
    )
  } else {
    lines.push(
      "  strummingPatternId: '', // TODO: pick a pattern in the Strum Builder tool first",
    )
  }

  lines.push('}')
  return lines.join('\n')
}
