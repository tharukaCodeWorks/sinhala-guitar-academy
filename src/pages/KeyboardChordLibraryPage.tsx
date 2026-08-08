import { useEffect, useMemo, useState } from 'react'
import KeyboardDiagram from '../components/KeyboardDiagram'
import {
  keyboardChordLibrary,
  listQualities,
  listRoots,
} from '../data/keyboardChords'
import type {
  ChordQuality,
  KeyboardChord,
  NoteName,
} from '../data/keyboardChords/types'

const QUALITY_LABELS: Record<ChordQuality, string> = {
  major: 'Major',
  minor: 'Minor',
  '7th': '7th',
  maj7: 'Major 7th',
  min7: 'Minor 7th',
  sus2: 'Sus2',
  sus4: 'Sus4',
  diminished: 'Diminished',
}

const ALL_ROOTS_VALUE = 'all'
const ALL_QUALITIES_VALUE = 'all'

/**
 * Browsable, searchable/filterable grid of every chord in the data model
 * (`src/data/keyboardChords`), each rendered with the `KeyboardDiagram`
 * component. Clicking a chord opens a detail view of all of its seeded
 * variants/inversions. Structurally mirrors the guitar `ChordLibraryPage`.
 */
function KeyboardChordLibraryPage() {
  const [search, setSearch] = useState('')
  const [rootFilter, setRootFilter] = useState<
    NoteName | typeof ALL_ROOTS_VALUE
  >(ALL_ROOTS_VALUE)
  const [qualityFilter, setQualityFilter] = useState<
    ChordQuality | typeof ALL_QUALITIES_VALUE
  >(ALL_QUALITIES_VALUE)
  const [selectedChordId, setSelectedChordId] = useState<string | null>(null)

  const roots = useMemo(() => listRoots(), [])
  const qualities = useMemo(() => listQualities(), [])

  const filteredChords = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    return keyboardChordLibrary.filter((chord) => {
      if (rootFilter !== ALL_ROOTS_VALUE && chord.root !== rootFilter) {
        return false
      }
      if (
        qualityFilter !== ALL_QUALITIES_VALUE &&
        chord.quality !== qualityFilter
      ) {
        return false
      }
      if (
        normalizedSearch &&
        !chord.name.toLowerCase().includes(normalizedSearch)
      ) {
        return false
      }
      return true
    })
  }, [rootFilter, qualityFilter, search])

  const selectedChord: KeyboardChord | undefined = useMemo(
    () => keyboardChordLibrary.find((chord) => chord.id === selectedChordId),
    [selectedChordId],
  )

  // Close the detail view with Escape, for keyboard/mouse-free dismissal.
  useEffect(() => {
    if (!selectedChord) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setSelectedChordId(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedChord])

  const hasActiveFilters =
    search.trim() !== '' ||
    rootFilter !== ALL_ROOTS_VALUE ||
    qualityFilter !== ALL_QUALITIES_VALUE

  function clearFilters() {
    setSearch('')
    setRootFilter(ALL_ROOTS_VALUE)
    setQualityFilter(ALL_QUALITIES_VALUE)
  }

  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">
          Keyboard Chord Library
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Browse every keyboard chord voicing in the library. Click a chord to
          see all of its seeded voicings and inversions.
        </p>
      </div>

      {/* Search + filters */}
      <div className="mb-8 flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
          Search
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="e.g. C, Am, B7"
            className="w-40 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
          Root note
          <select
            value={rootFilter}
            onChange={(event) =>
              setRootFilter(
                event.target.value as NoteName | typeof ALL_ROOTS_VALUE,
              )
            }
            className="rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <option value={ALL_ROOTS_VALUE}>All roots</option>
            {roots.map((root) => (
              <option key={root} value={root}>
                {root}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
          Quality
          <select
            value={qualityFilter}
            onChange={(event) =>
              setQualityFilter(
                event.target.value as ChordQuality | typeof ALL_QUALITIES_VALUE,
              )
            }
            className="rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <option value={ALL_QUALITIES_VALUE}>All qualities</option>
            {qualities.map((quality) => (
              <option key={quality} value={quality}>
                {QUALITY_LABELS[quality]}
              </option>
            ))}
          </select>
        </label>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Clear filters
          </button>
        )}

        <span className="ml-auto self-center text-sm text-gray-500 dark:text-gray-400">
          {filteredChords.length} chord{filteredChords.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Results grid */}
      {filteredChords.length === 0 ? (
        <p className="py-16 text-center text-sm text-gray-500 dark:text-gray-400">
          No chords match your filters.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredChords.map((chord) => (
            <li key={chord.id}>
              <button
                type="button"
                onClick={() => setSelectedChordId(chord.id)}
                className="flex w-full flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:border-indigo-400 hover:bg-indigo-50 dark:border-gray-800 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10"
              >
                <KeyboardDiagram variant={chord.variants[0]} size="sm" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {chord.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {QUALITY_LABELS[chord.quality]}
                  {chord.variants.length > 1
                    ? ` · ${chord.variants.length} voicings`
                    : ''}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedChord && (
        <ChordDetailDialog
          chord={selectedChord}
          onClose={() => setSelectedChordId(null)}
        />
      )}
    </section>
  )
}

interface ChordDetailDialogProps {
  chord: KeyboardChord
  onClose: () => void
}

/** Modal overlay listing every seeded variant/voicing for a single chord. */
function ChordDetailDialog({ chord, onClose }: ChordDetailDialogProps) {
  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="keyboard-chord-detail-heading"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2
              id="keyboard-chord-detail-heading"
              className="text-xl font-semibold text-gray-900 dark:text-gray-100"
            >
              {chord.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {QUALITY_LABELS[chord.quality]} · root {chord.root}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {chord.variants.map((variant) => (
            <div key={variant.id} className="flex flex-col items-center gap-2">
              <KeyboardDiagram variant={variant} size="lg" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {variant.label}
              </span>
              <span className="text-xs text-gray-400 capitalize dark:text-gray-500">
                {variant.difficulty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default KeyboardChordLibraryPage
