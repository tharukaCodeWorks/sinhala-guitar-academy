import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import KeyboardDiagram from '../components/KeyboardDiagram'
import { getSongById, getSongChords } from '../data/keyboardSongs'
import type {
  HandPosition,
  Song,
  SongDifficulty,
} from '../data/keyboardSongs/types'

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

/**
 * Song Detail page: how to actually play one song from the keyboard
 * catalog — its chord progression by section (each chord rendered with
 * `KeyboardDiagram`), suggested starting right/left-hand positions and, if
 * the song has one, a simplified melody excerpt for its signature phrase.
 * This is the page that ties together every other keyboard data model
 * (chords, hand position, repertoire) around one piece of real music, the
 * same role `SongDetailPage` plays for guitar (chords + capo + tabs +
 * strumming).
 */
function KeyboardSongDetailPage() {
  const { songId } = useParams<{ songId: string }>()
  const song = songId ? getSongById(songId) : undefined

  if (!song) {
    return <SongNotFound songId={songId} />
  }

  return <SongDetail song={song} />
}

interface SongNotFoundProps {
  songId: string | undefined
}

function SongNotFound({ songId }: SongNotFoundProps) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        Song not found
      </h1>
      <p className="max-w-xl text-base text-gray-600 dark:text-gray-400">
        {songId
          ? `There's no song with id "${songId}" in the catalog.`
          : "There's no song matching this page."}
      </p>
      <Link
        to="/keyboard/songs"
        className="mt-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
      >
        Back to Songs
      </Link>
    </section>
  )
}

interface SongDetailProps {
  song: Song
}

function SongDetail({ song }: SongDetailProps) {
  const chords = useMemo(() => getSongChords(song), [song])

  return (
    <section className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <Link
        to="/keyboard/songs"
        className="mb-6 inline-block text-sm text-indigo-600 hover:underline dark:text-indigo-400"
      >
        ← Back to Songs
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">
            {song.title}
          </h1>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${DIFFICULTY_BADGE_CLASSES[song.difficulty]}`}
          >
            {DIFFICULTY_LABELS[song.difficulty]}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {song.artist} · Key of {song.key}
        </p>
        {song.notes && (
          <p className="mt-3 rounded-lg border border-indigo-200 bg-indigo-50 p-3 text-sm text-indigo-900 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200">
            {song.notes}
          </p>
        )}
      </div>

      {/* Suggested hand positions */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <HandPositionCard
          label="Right Hand"
          position={song.suggestedRightHandPosition}
        />
        <HandPositionCard
          label="Left Hand"
          position={song.suggestedLeftHandPosition}
        />
      </div>

      {/* Chords used */}
      {chords.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Chords you'll need
          </h2>
          <ul className="flex flex-wrap gap-6">
            {chords.map((chord) => (
              <li key={chord.id}>
                <KeyboardDiagram
                  variant={chord.variants[0]}
                  name={chord.name}
                  size="md"
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chord progression by section */}
      {song.chordProgression.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Chord Progression
          </h2>
          <ul className="flex flex-col gap-4">
            {song.chordProgression.map((section, sectionIndex) => (
              <li
                key={`${section.name}-${sectionIndex}`}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
              >
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {section.name}
                  </h3>
                </div>
                <ol className="flex flex-wrap gap-2">
                  {section.chordIds.map((chordId, chordIndex) => {
                    const chord = chords.find((c) => c.id === chordId)
                    return (
                      <li
                        key={`${chordId}-${chordIndex}`}
                        className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                      >
                        {chord?.name ?? chordId}
                      </li>
                    )
                  })}
                </ol>
                {section.note && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {section.note}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Melody excerpt */}
      {song.melodyExcerpt && (
        <div className="mb-10">
          <h2 className="mb-4 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Melody Excerpt
          </h2>
          <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {song.melodyExcerpt.title}
            </h3>
            {song.melodyExcerpt.description && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {song.melodyExcerpt.description}
              </p>
            )}
            <ol className="mt-3 flex flex-wrap gap-2">
              {song.melodyExcerpt.notes.map((note, index) => (
                <li
                  key={index}
                  className="flex flex-col items-center rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 dark:border-gray-700 dark:bg-gray-800"
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {note.note}
                    {note.octaveOffset !== 0 &&
                      (note.octaveOffset > 0
                        ? `+${note.octaveOffset}`
                        : note.octaveOffset)}
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    finger {note.finger}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </section>
  )
}

interface HandPositionCardProps {
  label: string
  position: HandPosition
}

function HandPositionCard({ label, position }: HandPositionCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <h2 className="text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
        {label}
      </h2>
      <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {position.startingNote} position
      </p>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        {position.octaveDescription}
      </p>
      {position.note && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {position.note}
        </p>
      )}
    </div>
  )
}

export default KeyboardSongDetailPage
