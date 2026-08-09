import { Link } from 'react-router-dom'
import { listLessonsByTier } from '../data/guitarLessons'
import type { Lesson, LessonTier } from '../data/guitarLessons/types'

interface TierSectionConfig {
  tier: LessonTier
  label: string
  description: string
}

/**
 * Tiers rendered on the roadmap, in course order. Advanced is intentionally
 * excluded (not yet scoped for this course). Intermediate is always
 * rendered even while empty, so this page never needs a code change once
 * the intermediate lesson content (a later task in this feature) lands.
 */
const TIER_SECTIONS: TierSectionConfig[] = [
  {
    tier: 'beginner',
    label: 'Beginner',
    description:
      'Anatomy, posture and reading chord diagrams/TAB through tuning, first open chords, strumming and chord changes, the full campfire chord set — ending with a real song.',
  },
  {
    tier: 'intermediate',
    label: 'Intermediate',
    description:
      'Building on the beginner open-chord foundation with more advanced technique and repertoire.',
  },
]

/**
 * Lessons Overview page: the full guitar method course laid out as an
 * ordered roadmap, grouped by tier (Beginner first). Each lesson is a
 * numbered card linking to its detail page. Structurally mirrors the
 * guitar `SongsPage`, but grouped/numbered by tier instead of filtered by
 * difficulty, since lesson order (not difficulty) is what drives this
 * course's navigation. Separate from (but structurally similar to) the
 * keyboard track's `LessonsOverviewPage`.
 */
function GuitarLessonsOverviewPage() {
  return (
    <section className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">
          Lessons
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          A structured, sequential guitar method course — start at lesson 1 and
          work through in order.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {TIER_SECTIONS.map((section) => (
          <TierSection key={section.tier} {...section} />
        ))}
      </div>
    </section>
  )
}

function TierSection({ tier, label, description }: TierSectionConfig) {
  const lessons = listLessonsByTier(tier)

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {label}
        </h2>
        <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      {lessons.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          Coming soon.
        </p>
      ) : (
        <ol className="flex flex-col gap-3">
          {lessons.map((lesson) => (
            <LessonListItem key={lesson.id} lesson={lesson} />
          ))}
        </ol>
      )}
    </div>
  )
}

interface LessonListItemProps {
  lesson: Lesson
}

function LessonListItem({ lesson }: LessonListItemProps) {
  return (
    <li>
      <Link
        to={`/lessons/${lesson.id}`}
        className="flex items-start gap-4 rounded-lg border border-gray-200 p-4 transition-colors hover:border-indigo-400 hover:bg-indigo-50 dark:border-gray-800 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
          {lesson.order}
        </span>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {lesson.title}
          </h3>
          <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
            {lesson.summary}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default GuitarLessonsOverviewPage
