import { useCallback, useEffect, useMemo, useState } from 'react'
import ChordDiagram from '../components/ChordDiagram'
import PatternSourcePicker from '../components/PatternSourcePicker'
import StrummingPlayer from '../components/StrummingPlayer'
import {
  parseChordSheet,
  resolveChordToken,
  type ParsedChordSection,
} from '../lib/chordSheetParser'
import { buildSongSnippet } from '../lib/songSnippet'
import {
  clearDraft,
  loadDraft,
  saveDraft,
  type StrumBuilderDraft,
} from '../lib/strumBuilderDraft'
import type { Chord } from '../data/chords/types'
import { strummingPatternFixtures } from '../data/strumming/fixtures'
import type { StrummingPattern } from '../data/strumming/types'

const CUSTOM_PATTERN_ID = 'custom-pattern'

const PLACEHOLDER_SHEET = `[Chorus]
---------------------------
A              G
la la la la la la
               A
la la la la la

[Verse 1]
---------------------------
A              C#m
la la la la la la
Bm     E        A
la la la la la`

/**
 * Strum Builder: paste a chord sheet copied from a site like
 * chordslankalk.com (chords on their own line above the lyrics, with
 * `[Section]` headers) and this pulls out the song's structure and chords,
 * shows their diagrams, and lets you pick or build a matching strumming
 * pattern using the same picker as the Strumming Practice page. Only
 * chord/section data is read — pasted lyric text is never stored or shown
 * back, matching the rest of this app's chords/tabs-only policy.
 */
function StrumBuilderPage() {
  // One lazy initializer reads any saved draft once, synchronously, before
  // the first render — avoids both a redundant triple-read of localStorage
  // and the extra render (plus the react-hooks lint rule against it) that a
  // "load in a mount effect" approach would cause.
  const [initialDraft] = useState(() => loadDraft())
  const [title, setTitle] = useState(initialDraft?.title ?? '')
  const [artist, setArtist] = useState(initialDraft?.artist ?? '')
  const [chordSheetText, setChordSheetText] = useState(
    initialDraft?.chordSheetText ?? '',
  )

  // Auto-save the draft (debounced) whenever any of the fields change.
  useEffect(() => {
    const timeout = setTimeout(() => {
      const draft: StrumBuilderDraft = { title, artist, chordSheetText }
      if (title || artist || chordSheetText) {
        saveDraft(draft)
      } else {
        clearDraft()
      }
    }, 300)
    return () => clearTimeout(timeout)
  }, [title, artist, chordSheetText])

  function handleClearAll() {
    setTitle('')
    setArtist('')
    setChordSheetText('')
    clearDraft()
  }

  const parsed = useMemo(
    () => parseChordSheet(chordSheetText),
    [chordSheetText],
  )

  const resolvedByToken = useMemo(() => {
    const map = new Map<string, Chord | undefined>()
    for (const token of parsed.distinctChordTokens) {
      map.set(token, resolveChordToken(token))
    }
    return map
  }, [parsed.distinctChordTokens])

  const resolvedChords = useMemo(
    () =>
      parsed.distinctChordTokens
        .map((token) => resolvedByToken.get(token))
        .filter((chord): chord is Chord => chord !== undefined),
    [parsed.distinctChordTokens, resolvedByToken],
  )
  const unresolvedTokens = parsed.distinctChordTokens.filter(
    (token) => !resolvedByToken.get(token),
  )

  const [pattern, setPattern] = useState<StrummingPattern>(
    strummingPatternFixtures[0],
  )
  const [playerKey, setPlayerKey] = useState(strummingPatternFixtures[0].id)
  const handlePatternChange = useCallback(
    (nextPattern: StrummingPattern, nextPlayerKey: string) => {
      setPattern(nextPattern)
      setPlayerKey(nextPlayerKey)
    },
    [],
  )

  const snippet = useMemo(() => {
    const sections = parsed.sections.map((section) => ({
      name: section.name,
      chordIds: section.chordTokens
        .map((token) => resolvedByToken.get(token)?.id)
        .filter((id): id is string => id !== undefined),
    }))
    const isFixture = strummingPatternFixtures.some((f) => f.id === pattern.id)
    return buildSongSnippet({
      title,
      artist,
      sections,
      strummingPatternId: isFixture ? pattern.id : undefined,
      inlinePattern: isFixture
        ? undefined
        : { ...pattern, id: CUSTOM_PATTERN_ID },
    })
  }, [parsed.sections, resolvedByToken, title, artist, pattern])

  const [copied, setCopied] = useState(false)
  async function handleCopySnippet() {
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable/denied — the snippet is still visible to
      // select and copy manually, so this is a non-fatal no-op.
    }
  }

  const hasChords = resolvedChords.length > 0

  return (
    <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">
          Strum Builder
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Paste a chord sheet copied from a site like{' '}
          <span className="font-medium">chordslankalk.com</span> — chords on
          their own line above the lyrics, with{' '}
          <code className="rounded bg-gray-200 px-1 py-0.5 font-mono text-xs dark:bg-gray-800">
            [Section]
          </code>{' '}
          headers — and this pulls out the song's structure and chords so you
          can build a matching strumming pattern for it. Only the chords and
          section names are read; lyric text is never stored or shown here.
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
          Song title (optional)
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Sudu Araliya"
            className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
          Artist (optional)
          <input
            type="text"
            value={artist}
            onChange={(event) => setArtist(event.target.value)}
            placeholder="e.g. W.D. Amaradeva"
            className="w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
          />
        </label>
      </div>

      <label className="mb-6 flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
        <div className="flex items-center justify-between">
          <span>Chord sheet</span>
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            Clear all
          </button>
        </div>
        <textarea
          value={chordSheetText}
          onChange={(event) => setChordSheetText(event.target.value)}
          placeholder={PLACEHOLDER_SHEET}
          rows={12}
          spellCheck={false}
          className="w-full rounded border border-gray-300 bg-white px-3 py-2 font-mono text-xs leading-relaxed dark:border-gray-700 dark:bg-gray-900"
        />
      </label>

      {parsed.sections.length > 0 && (
        <div className="mb-6 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
          <h2 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
            Detected sections
          </h2>
          <ul className="flex flex-col gap-3">
            {parsed.sections.map((section, index) => (
              <SectionSummary
                key={`${section.name}-${index}`}
                section={section}
                resolvedByToken={resolvedByToken}
              />
            ))}
          </ul>
        </div>
      )}

      {parsed.distinctChordTokens.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
            Chords used
          </h2>
          {resolvedChords.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-4">
              {resolvedChords.map((chord) => (
                <div
                  key={chord.id}
                  className="flex flex-col items-center gap-1"
                >
                  <ChordDiagram variant={chord.variants[0]} size="sm" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {chord.name}
                  </span>
                </div>
              ))}
            </div>
          )}
          {unresolvedTokens.length > 0 && (
            <p className="text-sm text-amber-700 dark:text-amber-400">
              Not in our chord library yet:{' '}
              {unresolvedTokens.map((token, index) => (
                <span key={token}>
                  <code className="rounded bg-amber-100 px-1 py-0.5 font-mono text-xs dark:bg-amber-900/40">
                    {token}
                  </code>
                  {index < unresolvedTokens.length - 1 ? ', ' : ''}
                </span>
              ))}
              . These chords weren't included below — swap in something close,
              or add the shape to the chord library.
            </p>
          )}
        </div>
      )}

      {hasChords && (
        <>
          <div className="mb-6">
            <h2 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
              Pick a strumming pattern for it
            </h2>
            <PatternSourcePicker onChange={handlePatternChange} />
          </div>

          <div className="mb-6 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
            <StrummingPlayer key={playerKey} pattern={pattern} />
          </div>

          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                Export as song data
              </h2>
              <button
                type="button"
                onClick={handleCopySnippet}
                className="rounded border border-amber-500 bg-amber-500 px-3 py-1 text-xs font-medium text-white hover:bg-amber-600"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              A starting point for a new{' '}
              <code className="rounded bg-gray-200 px-1 py-0.5 font-mono text-xs dark:bg-gray-800">
                src/data/songs/*.ts
              </code>{' '}
              file — key, difficulty, and capo are left as placeholders since
              those can't be inferred from a chord sheet alone.
            </p>
            <pre className="overflow-x-auto rounded-lg border border-gray-300 bg-gray-50 p-3 font-mono text-xs dark:border-gray-700 dark:bg-gray-900">
              {snippet}
            </pre>
          </div>
        </>
      )}
    </section>
  )
}

interface SectionSummaryProps {
  section: ParsedChordSection
  resolvedByToken: Map<string, Chord | undefined>
}

function SectionSummary({ section, resolvedByToken }: SectionSummaryProps) {
  return (
    <li>
      <div className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-100">
        {section.name}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {section.chordTokens.map((token) => {
          const resolved = resolvedByToken.get(token)
          return (
            <span
              key={token}
              className={`rounded-full border px-2 py-0.5 font-mono text-xs ${
                resolved
                  ? 'border-green-300 bg-green-50 text-green-800 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300'
                  : 'border-gray-300 bg-gray-100 text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'
              }`}
            >
              {token}
            </span>
          )
        })}
      </div>
    </li>
  )
}

export default StrumBuilderPage
