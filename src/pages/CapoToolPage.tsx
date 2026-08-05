import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ChordDiagram from '../components/ChordDiagram'
import { chordLibrary, getChordById } from '../data/chords'
import type { Chord } from '../data/chords/types'
import {
  MAX_CAPO_FRET,
  MIN_CAPO_FRET,
  transposeProgressionWithCapo,
} from '../lib/capo'

const DEFAULT_PROGRESSION_IDS = ['c-major', 'a-minor', 'f-major', 'g-major']

/**
 * Reads an initial capo fret from the `?capo=` query param (e.g. a deep
 * link from a song's detail page pre-filling its `capoFret`), clamped into
 * the valid range. Falls back to `2` when the param is absent, non-numeric,
 * or out of range.
 */
function initialCapoFretFromParams(searchParams: URLSearchParams): number {
  const raw = searchParams.get('capo')
  if (raw == null) return 2
  const parsed = Number(raw)
  if (!Number.isInteger(parsed)) return 2
  return Math.min(MAX_CAPO_FRET, Math.max(MIN_CAPO_FRET, parsed))
}

/**
 * Capo transposition tool: pick a chord progression (the shapes you already
 * know), pick a capo fret, and see both the shape you physically play
 * (unchanged — a capo never changes what you finger) and the chord that
 * actually sounds once the capo shifts the pitch, side by side, updating
 * live as the fret changes.
 *
 * Supports an optional `?capo=<fret>` query param to pre-fill the capo fret
 * on load (used by the Song Detail page to link straight into a song's
 * documented capo position) — read once on mount; the slider/± controls own
 * the value from then on.
 */
function CapoToolPage() {
  const [searchParams] = useSearchParams()
  const [progressionIds, setProgressionIds] = useState<string[]>(
    DEFAULT_PROGRESSION_IDS.filter((id) => getChordById(id) != null),
  )
  const [capoFret, setCapoFret] = useState(() =>
    initialCapoFretFromParams(searchParams),
  )
  const [addChordId, setAddChordId] = useState('')

  const progression = useMemo<Chord[]>(
    () =>
      progressionIds
        .map((id) => getChordById(id))
        .filter((chord): chord is Chord => chord != null),
    [progressionIds],
  )

  const transpositions = useMemo(
    () => transposeProgressionWithCapo(progression, capoFret),
    [progression, capoFret],
  )

  function addChord(id: string) {
    if (!id) return
    setProgressionIds((current) => [...current, id])
    setAddChordId('')
  }

  function removeChordAt(index: number) {
    setProgressionIds((current) => current.filter((_, i) => i !== index))
  }

  function moveChord(index: number, direction: -1 | 1) {
    setProgressionIds((current) => {
      const target = index + direction
      if (target < 0 || target >= current.length) return current
      const next = [...current]
      const [moved] = next.splice(index, 1)
      next.splice(target, 0, moved)
      return next
    })
  }

  function clearProgression() {
    setProgressionIds([])
  }

  function stepCapo(delta: number) {
    setCapoFret((current) =>
      Math.min(MAX_CAPO_FRET, Math.max(MIN_CAPO_FRET, current + delta)),
    )
  }

  return (
    <section className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">
          Capo Tool
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Build a chord progression from shapes you already know, then move the
          capo and see what actually sounds — the shape you finger never
          changes.
        </p>
      </div>

      {/* Progression builder */}
      <div className="mb-8 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-4">
          <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
            Add a chord shape
            <select
              value={addChordId}
              onChange={(event) => addChord(event.target.value)}
              className="w-48 rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <option value="">Choose a chord…</option>
              {chordLibrary.map((chord) => (
                <option key={chord.id} value={chord.id}>
                  {chord.name}
                </option>
              ))}
            </select>
          </label>

          {progression.length > 0 && (
            <button
              type="button"
              onClick={clearProgression}
              className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Clear progression
            </button>
          )}
        </div>

        {progression.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Add at least one chord shape to see its capo transposition.
          </p>
        ) : (
          <ol className="flex flex-wrap gap-2">
            {progression.map((chord, index) => (
              <li
                key={`${chord.id}-${index}`}
                className="flex items-center gap-1 rounded-full border border-gray-300 bg-gray-50 py-1 pr-1 pl-3 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <span className="font-medium">{chord.name}</span>
                <button
                  type="button"
                  onClick={() => moveChord(index, -1)}
                  disabled={index === 0}
                  aria-label={`Move ${chord.name} earlier`}
                  className="rounded px-1 text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => moveChord(index, 1)}
                  disabled={index === progression.length - 1}
                  aria-label={`Move ${chord.name} later`}
                  className="rounded px-1 text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={() => removeChordAt(index)}
                  aria-label={`Remove ${chord.name} from progression`}
                  className="rounded px-1.5 text-gray-500 hover:bg-gray-200 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-red-400"
                >
                  ✕
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Capo fret control */}
      <div className="mb-10 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
        <div className="mb-2 flex items-center justify-between">
          <label
            htmlFor="capo-fret-slider"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Capo fret
          </label>
          <span className="text-lg font-semibold text-gray-900 tabular-nums dark:text-gray-100">
            {capoFret === MIN_CAPO_FRET ? 'No capo' : `Fret ${capoFret}`}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => stepCapo(-1)}
            disabled={capoFret === MIN_CAPO_FRET}
            aria-label="Decrease capo fret"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            −
          </button>
          <input
            id="capo-fret-slider"
            type="range"
            min={MIN_CAPO_FRET}
            max={MAX_CAPO_FRET}
            step={1}
            value={capoFret}
            onChange={(event) => setCapoFret(Number(event.target.value))}
            className="flex-1 accent-indigo-600"
            aria-valuetext={
              capoFret === MIN_CAPO_FRET ? 'No capo' : `Fret ${capoFret}`
            }
          />
          <button
            type="button"
            onClick={() => stepCapo(1)}
            disabled={capoFret === MAX_CAPO_FRET}
            aria-label="Increase capo fret"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            +
          </button>
        </div>
        <div className="mt-1 flex justify-between px-11 text-xs text-gray-400 dark:text-gray-500">
          {Array.from(
            { length: MAX_CAPO_FRET - MIN_CAPO_FRET + 1 },
            (_, i) => MIN_CAPO_FRET + i,
          ).map((fret) => (
            <span key={fret}>{fret}</span>
          ))}
        </div>
      </div>

      {/* Shape (what to play) vs. sounding chord (what you hear), side by side */}
      {transpositions.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
              Shape to play
            </h2>
            <ul className="flex flex-wrap gap-6">
              {transpositions.map((transposition, index) => (
                <li
                  key={`shape-${transposition.shapeChord.id}-${index}`}
                  className="flex flex-col items-center gap-1"
                >
                  <ChordDiagram
                    variant={transposition.shapeChord.variants[0]}
                    name={transposition.shapeChord.name}
                    size="md"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
              What actually sounds
            </h2>
            <ul className="flex flex-wrap gap-6">
              {transpositions.map((transposition, index) => (
                <li
                  key={`sounding-${transposition.shapeChord.id}-${index}`}
                  className="flex min-w-[96px] flex-col items-center justify-center gap-1 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-6 text-center dark:border-indigo-500/30 dark:bg-indigo-500/10"
                >
                  <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                    {transposition.soundingName}
                  </span>
                  {transposition.capoFret > 0 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      play {transposition.shapeChord.name} shape, capo{' '}
                      {transposition.capoFret}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}

export default CapoToolPage
