import type { Tab, TabPosition } from './types'

/** A tab position with its location in the overall sequence resolved. */
export interface FlattenedTabPosition {
  /** Index into the flattened, tab-wide sequence of positions — what `currentPositionIndex` refers to. */
  globalIndex: number
  /** Index of the measure this position belongs to. */
  measureIndex: number
  /** Index of this position within its measure. */
  positionIndexInMeasure: number
  /** `true` if this is the last position in its measure (used to draw the measure separator). */
  isLastInMeasure: boolean
  position: TabPosition
}

/**
 * Flattens a tab's measures into a single ordered list of positions, each
 * annotated with its global index (what a `currentPositionIndex` prop
 * refers to) and its measure boundaries.
 */
export function flattenTabPositions(tab: Tab): FlattenedTabPosition[] {
  const flattened: FlattenedTabPosition[] = []
  let globalIndex = 0

  tab.measures.forEach((measure, measureIndex) => {
    measure.positions.forEach((position, positionIndexInMeasure) => {
      flattened.push({
        globalIndex,
        measureIndex,
        positionIndexInMeasure,
        isLastInMeasure:
          positionIndexInMeasure === measure.positions.length - 1,
        position,
      })
      globalIndex += 1
    })
  })

  return flattened
}

/** Total number of positions across every measure in a tab. */
export function countTabPositions(tab: Tab): number {
  return tab.measures.reduce(
    (total, measure) => total + measure.positions.length,
    0,
  )
}
