export type { Lesson, LessonSection, LessonTier } from './types'
export { guitarLessonLibrary } from './library'

import { guitarLessonLibrary } from './library'
import type { Lesson, LessonTier } from './types'

/** All lessons in a given tier, ordered by their `order` field ascending. */
export function listLessonsByTier(tier: LessonTier): Lesson[] {
  return guitarLessonLibrary
    .filter((lesson) => lesson.tier === tier)
    .sort((a, b) => a.order - b.order)
}

/** Look up a single lesson by its stable id (e.g. `'guitar-anatomy-posture-reading'`). */
export function getLessonById(id: string): Lesson | undefined {
  return guitarLessonLibrary.find((lesson) => lesson.id === id)
}

/**
 * The lesson immediately after `currentId` within its own tier (by
 * `order`), or `undefined` if `currentId` is unknown or is the last lesson
 * in its tier — for a lesson detail page's "Next" navigation.
 */
export function nextLessonInTier(currentId: string): Lesson | undefined {
  const current = getLessonById(currentId)
  if (!current) return undefined
  return guitarLessonLibrary.find(
    (lesson) =>
      lesson.tier === current.tier && lesson.order === current.order + 1,
  )
}

/**
 * The lesson immediately before `currentId` within its own tier (by
 * `order`), or `undefined` if `currentId` is unknown or is the first lesson
 * in its tier — for a lesson detail page's "Previous" navigation.
 */
export function previousLessonInTier(currentId: string): Lesson | undefined {
  const current = getLessonById(currentId)
  if (!current) return undefined
  return guitarLessonLibrary.find(
    (lesson) =>
      lesson.tier === current.tier && lesson.order === current.order - 1,
  )
}
