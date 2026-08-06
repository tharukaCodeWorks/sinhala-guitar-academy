/**
 * Pure parsing logic for the Strum Builder tool: turns a chord sheet pasted
 * from a site like chordslankalk.com (or similar "chords on their own line
 * above the lyrics, with `[Section]` headers" sites) into a structured list
 * of sections and the chords used in each.
 *
 * Deliberately does not retain lyric text anywhere in its output — only
 * section names and chord tokens are kept, matching this app's existing
 * "chords/tabs only, no lyrics" policy (see `src/data/songs/types.ts`).
 *
 * Framework-free (no React) so it's directly unit-testable.
 */
import { findChordByName } from '../data/chords'
import type { Chord } from '../data/chords/types'

export interface ParsedChordSection {
  /** Section name, either from a `[Header]`/`Header:` line or auto-numbered if none was present. */
  name: string
  /** Chord tokens exactly as typed, in first-use order within this section (deduplicated). */
  chordTokens: string[]
}

export interface ParsedChordSheet {
  sections: ParsedChordSection[]
  /** Every distinct chord token across the whole sheet, in first-use order. */
  distinctChordTokens: string[]
}

/** Maps flat spellings to this app's canonical sharp-only spelling (see `NoteName`). */
const FLAT_TO_SHARP: Record<string, string> = {
  Db: 'C#',
  Eb: 'D#',
  Gb: 'F#',
  Ab: 'G#',
  Bb: 'A#',
  Cb: 'B',
  Fb: 'E',
}

const CHORD_TOKEN_RE =
  /^[A-G](#|b)?(m|min|maj7|maj|m7|7|sus2|sus4|dim|aug|add9|6|9)?(\/[A-G](#|b)?)?$/

/** Whether a single whitespace-delimited token looks like a chord symbol (e.g. `C#m`, `G7`, `D/F#`). */
export function isChordToken(token: string): boolean {
  return CHORD_TOKEN_RE.test(token)
}

/** Whether an entire trimmed line consists only of chord tokens (the "chords on their own line" layout). */
export function isChordLine(line: string): boolean {
  const tokens = line.split(/\s+/).filter(Boolean)
  return tokens.length > 0 && tokens.every(isChordToken)
}

/** Whether a line is a pure divider (e.g. `---------------------------`), to be skipped. */
export function isSeparatorLine(line: string): boolean {
  return /^[-=_*]{3,}$/.test(line)
}

/**
 * Extracts a section name from a `[Section]` or `Section:` header line, or
 * returns `undefined` if the line isn't a header. The colon form is
 * intentionally restricted to short lines so ordinary sentences ending in
 * a colon aren't misread as section headers.
 */
export function matchSectionHeader(line: string): string | undefined {
  const bracketMatch = line.match(/^\[([^[\]]{1,40})\]$/)
  if (bracketMatch) return bracketMatch[1].trim()

  const colonMatch = line.match(/^([A-Za-z][A-Za-z0-9 ]{0,30}):$/)
  if (colonMatch) return colonMatch[1].trim()

  return undefined
}

/**
 * Normalizes a raw chord token to this app's chord-name spelling so it can
 * be looked up via `findChordByName`: drops a slash-bass suffix (e.g.
 * `G/B` -> `G`, since the chord library doesn't model slash chords), maps
 * flats to their sharp equivalent, and normalizes minor/major suffix
 * spelling (`Amin` -> `Am`, `Cmaj` -> `C`).
 */
export function normalizeChordToken(rawToken: string): string {
  const withoutBass = rawToken.split('/')[0]
  const match = withoutBass.match(/^([A-G]b|[A-G]#|[A-G])(.*)$/)
  if (!match) return withoutBass

  const [, root, rest] = match
  const normalizedRoot = FLAT_TO_SHARP[root] ?? root
  const normalizedRest = rest.replace(/^min$/i, 'm').replace(/^maj$/i, '')
  return normalizedRoot + normalizedRest
}

/** Resolves a raw chord token against the chord library, or `undefined` if it's not a chord this app knows a shape for. */
export function resolveChordToken(rawToken: string): Chord | undefined {
  return findChordByName(normalizeChordToken(rawToken))
}

/**
 * Parses a pasted chord sheet into sections + the chords used in each.
 *
 * Expects the common "chords on their own line, directly above the lyric
 * line they apply to" layout, with sections optionally marked by a
 * `[Section]` or `Section:` line — this matches chordslankalk.com and many
 * similar Sinhala/Hindi chord sites. Lyric line *text* is read only to be
 * skipped; it's never stored or returned.
 */
export function parseChordSheet(rawText: string): ParsedChordSheet {
  const sections: ParsedChordSection[] = []
  let currentSection: ParsedChordSection | null = null
  let pendingHeaderName: string | null = null
  let autoSectionCount = 0

  function ensureCurrentSection(): ParsedChordSection {
    if (pendingHeaderName) {
      const section: ParsedChordSection = {
        name: pendingHeaderName,
        chordTokens: [],
      }
      sections.push(section)
      currentSection = section
      pendingHeaderName = null
      return section
    }
    if (currentSection) return currentSection

    autoSectionCount += 1
    const section: ParsedChordSection = {
      name: `Section ${autoSectionCount}`,
      chordTokens: [],
    }
    sections.push(section)
    currentSection = section
    return section
  }

  for (const rawLine of rawText.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || isSeparatorLine(line)) continue

    const header = matchSectionHeader(line)
    if (header) {
      pendingHeaderName = header
      continue
    }

    if (isChordLine(line)) {
      const section = ensureCurrentSection()
      for (const token of line.split(/\s+/).filter(Boolean)) {
        if (!section.chordTokens.includes(token)) {
          section.chordTokens.push(token)
        }
      }
    }
    // Anything else is a lyric line — read only to be skipped, never stored.
  }

  const distinctChordTokens: string[] = []
  for (const section of sections) {
    for (const token of section.chordTokens) {
      if (!distinctChordTokens.includes(token)) {
        distinctChordTokens.push(token)
      }
    }
  }

  return { sections, distinctChordTokens }
}
