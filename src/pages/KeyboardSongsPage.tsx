import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { listSongs } from '../data/keyboardSongs'
import type { Song, SongDifficulty } from '../data/keyboardSongs/types'

const DIFFICULTY_LABELS: Record<SongDifficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
}

const DIFFICULTY_BADGE_CLASSES: Record<SongDifficulty, string> = {
  beginner:
    'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300',
  intermediate:
    'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300',
}

const ALL_DIFFICULTIES_VALUE = 'all'
const ALL_KEYS_VALUE = 'all'

/**
 * Browsable, filterable list of every song in the keyboard catalog
 * (`src/data/keyboardSongs`). Filter by difficulty and/or key; each entry
 * shows the title, artist and difficulty, and links through to that song's
 * detail page (`/keyboard/songs/:songId`) with the full chord progression,
 * suggested hand positions and melody excerpt. Structurally mirrors the
 * guitar `SongsPage`.
 */
function KeyboardSongsPage() {
  const songs = useMemo(() => listSongs(), [])

  const [difficultyFilter, setDifficultyFilter] = useState<
    SongDifficulty | typeof ALL_DIFFICULTIES_VALUE
  >(ALL_DIFFICULTIES_VALUE)
  const [keyFilter, setKeyFilter] = useState<string>(ALL_KEYS_VALUE)

  const keys = useMemo(() => {
    const seen = new Set<string>()
    const result: string[] = []
    for (const song of songs) {
      if (!seen.has(song.key)) {
        seen.add(song.key)
        result.push(song.key)
      }
    }
    return result.sort()
  }, [songs])

  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      if (
        difficultyFilter !== ALL_DIFFICULTIES_VALUE &&
        song.difficulty !== difficultyFilter
      ) {
        return false
      }
      if (keyFilter !== ALL_KEYS_VALUE && song.key !== keyFilter) {
        return false
      }
      return true
    })
  }, [songs, difficultyFilter, keyFilter])

  const hasActiveFilters =
    difficultyFilter !== ALL_DIFFICULTIES_VALUE || keyFilter !== ALL_KEYS_VALUE

  function clearFilters() {
    setDifficultyFilter(ALL_DIFFICULTIES_VALUE)
    setKeyFilter(ALL_KEYS_VALUE)
  }

  return (
    <section className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">
          Keyboard Songs
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Real Sinhala songs arranged for keyboard, with chord progressions,
          suggested hand positions and melody excerpts. Pick one to see how to
          play it.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
          Difficulty
          <select
            value={difficultyFilter}
            onChange={(event) =>
              setDifficultyFilter(
                event.target.value as
                  SongDifficulty | typeof ALL_DIFFICULTIES_VALUE,
              )
            }
            className="rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <option value={ALL_DIFFICULTIES_VALUE}>All difficulties</option>
            {(Object.keys(DIFFICULTY_LABELS) as SongDifficulty[]).map(
              (difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {DIFFICULTY_LABELS[difficulty]}
                </option>
              ),
            )}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
          Key
          <select
            value={keyFilter}
            onChange={(event) => setKeyFilter(event.target.value)}
            className="rounded border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <option value={ALL_KEYS_VALUE}>All keys</option>
            {keys.map((key) => (
              <option key={key} value={key}>
                {key}
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
          {filteredSongs.length} song{filteredSongs.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Results */}
      {filteredSongs.length === 0 ? (
        <p className="py-16 text-center text-sm text-gray-500 dark:text-gray-400">
          No songs match your filters.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {filteredSongs.map((song) => (
            <SongListItem key={song.id} song={song} />
          ))}
        </ul>
      )}
    </section>
  )
}

interface SongListItemProps {
  song: Song
}

function SongListItem({ song }: SongListItemProps) {
  return (
    <li>
      <Link
        to={`/keyboard/songs/${song.id}`}
        className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-lg border border-gray-200 p-4 transition-colors hover:border-indigo-400 hover:bg-indigo-50 dark:border-gray-800 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10"
      >
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">
            {song.title}
          </h2>
          <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
            {song.artist}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Key of {song.key}
          </span>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${DIFFICULTY_BADGE_CLASSES[song.difficulty]}`}
          >
            {DIFFICULTY_LABELS[song.difficulty]}
          </span>
        </div>
      </Link>
    </li>
  )
}

export default KeyboardSongsPage
