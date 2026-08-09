import { Fragment } from 'react'
import { Link, useParams } from 'react-router-dom'
import ChordDiagram from '../components/ChordDiagram'
import { getChordById } from '../data/chords'
import {
  getLessonById,
  nextLessonInTier,
  previousLessonInTier,
} from '../data/guitarLessons'
import { getSongById } from '../data/songs'
import type {
  Lesson,
  LessonSection,
  LessonTier,
} from '../data/guitarLessons/types'

const TIER_LABELS: Record<LessonTier, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

/**
 * Lesson Detail page: one guitar lesson's full teaching content, section by
 * section, with a `ChordDiagram` embedded wherever a section references a
 * chord, plus Previous/Next navigation within the lesson's tier (via the
 * `nextLessonInTier`/`previousLessonInTier` accessors). Structurally
 * mirrors `SongDetailPage` — same not-found pattern, same header/back-link
 * layout — adapted for sequential lesson content instead of a single song's
 * play-along data. Separate from (but structurally similar to) the
 * keyboard track's `LessonDetailPage`.
 */
function GuitarLessonDetailPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const lesson = lessonId ? getLessonById(lessonId) : undefined

  if (!lesson) {
    return <LessonNotFound lessonId={lessonId} />
  }

  return <LessonDetail lesson={lesson} />
}

interface LessonNotFoundProps {
  lessonId: string | undefined
}

function LessonNotFound({ lessonId }: LessonNotFoundProps) {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        Lesson not found
      </h1>
      <p className="max-w-xl text-base text-gray-600 dark:text-gray-400">
        {lessonId
          ? `There's no lesson with id "${lessonId}" in the curriculum.`
          : "There's no lesson matching this page."}
      </p>
      <Link
        to="/lessons"
        className="mt-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
      >
        Back to Lessons
      </Link>
    </section>
  )
}

interface LessonDetailProps {
  lesson: Lesson
}

function LessonDetail({ lesson }: LessonDetailProps) {
  const previousLesson = previousLessonInTier(lesson.id)
  const nextLesson = nextLessonInTier(lesson.id)
  const song = lesson.songId ? getSongById(lesson.songId) : undefined

  return (
    <section className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <Link
        to="/lessons"
        className="mb-6 inline-block text-sm text-indigo-600 hover:underline dark:text-indigo-400"
      >
        ← Back to Lessons
      </Link>

      {/* Header */}
      <div className="mb-8">
        <span className="inline-block rounded-full border border-indigo-300 bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
          {TIER_LABELS[lesson.tier]} · Lesson {lesson.order}
        </span>
        <h1 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">
          {lesson.title}
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {lesson.summary}
        </p>
      </div>

      {/* Practice piece, if this lesson culminates in a real song */}
      {song && (
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-500/30 dark:bg-indigo-500/10">
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-indigo-700 uppercase dark:text-indigo-300">
              Practice piece
            </h2>
            <p className="mt-1 text-base font-semibold text-gray-900 dark:text-gray-100">
              {song.title}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {song.artist}
            </p>
          </div>
          <Link
            to={`/songs/${song.id}`}
            className="shrink-0 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Open Song Detail
          </Link>
        </div>
      )}

      {/* Sections */}
      <div className="flex flex-col gap-10">
        {lesson.sections.map((section, index) => (
          <LessonSectionBlock
            key={`${section.heading}-${index}`}
            section={section}
          />
        ))}
      </div>

      {/* Previous/Next navigation within this tier */}
      <nav
        aria-label="Lesson navigation"
        className="mt-12 flex items-center justify-between gap-4 border-t border-gray-200 pt-6 dark:border-gray-800"
      >
        {previousLesson ? (
          <Link
            to={`/lessons/${previousLesson.id}`}
            className="flex flex-col rounded-lg border border-gray-200 px-4 py-2 text-sm transition-colors hover:border-indigo-400 hover:bg-indigo-50 dark:border-gray-800 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10"
          >
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ← Previous
            </span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {previousLesson.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {nextLesson ? (
          <Link
            to={`/lessons/${nextLesson.id}`}
            className="flex flex-col items-end rounded-lg border border-gray-200 px-4 py-2 text-right text-sm transition-colors hover:border-indigo-400 hover:bg-indigo-50 dark:border-gray-800 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10"
          >
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Next →
            </span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {nextLesson.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </section>
  )
}

interface LessonSectionBlockProps {
  section: LessonSection
}

function LessonSectionBlock({ section }: LessonSectionBlockProps) {
  const chord = section.chordId ? getChordById(section.chordId) : undefined

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
        {section.heading}
      </h2>
      <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
        <FormattedText text={section.body} />
      </p>
      {chord && (
        <div className="mt-4">
          <ChordDiagram
            variant={chord.variants[0]}
            name={chord.name}
            size="md"
          />
        </div>
      )}
    </div>
  )
}

/**
 * Renders lesson body text, supporting `**bold**` markdown-lite spans (per
 * the `LessonSection.body` doc comment, which allows but doesn't require
 * this formatting) — anything else is passed through as plain text.
 */
function FormattedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter((part) => part.length > 0)
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index}>{part.slice(2, -2)}</strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  )
}

export default GuitarLessonDetailPage
