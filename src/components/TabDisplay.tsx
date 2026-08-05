import { useMemo } from 'react'
import type { Tab } from '../data/tabs/types'
import { STANDARD_TUNING } from '../data/tabs/types'
import { flattenTabPositions } from '../data/tabs/utils'

export interface TabDisplayProps {
  tab: Tab
  /**
   * Global index (across every measure, in order) of the position that
   * should be highlighted as the current playback cursor. Driving this
   * value over time is the caller's responsibility — this component only
   * renders the highlight.
   */
  currentPositionIndex?: number
  className?: string
}

/** Width (in characters) of a single position's fret column, e.g. 2 for a fret like "12". */
function positionColumnWidth(frets: readonly (number | null)[]): number {
  const maxDigits = frets.reduce<number>((max, fret) => {
    if (fret == null) return max
    return Math.max(max, String(fret).length)
  }, 1)
  return maxDigits
}

/** Renders a single string's fret value at a position, padded with dashes to the column width. */
function fretCellText(fret: number | null, width: number): string {
  if (fret == null) return '-'.repeat(width)
  return String(fret).padStart(width, '-')
}

/**
 * Renders a `Tab` as classic 6-line ASCII-tab-style notation: one
 * horizontal line per string, fret numbers placed along it, with measure
 * separators. Scrolls horizontally for longer tabs. Strings are drawn top
 * (highest-pitched) to bottom (lowest-pitched), the conventional tab
 * layout.
 */
function TabDisplay({
  tab,
  currentPositionIndex,
  className = '',
}: TabDisplayProps) {
  const tuning = tab.tuning ?? STANDARD_TUNING
  const flattened = useMemo(() => flattenTabPositions(tab), [tab])

  // Display rows top-to-bottom are highest string to lowest string, i.e.
  // the reverse of the low-to-high `frets` index order used in the data model.
  const displayStringIndices = [5, 4, 3, 2, 1, 0] as const

  const hasAnnotations = flattened.some((entry) => entry.position.annotation)

  return (
    <div className={className}>
      {(tab.title || tab.tempoBpm || tab.timeSignature) && (
        <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {tab.title && (
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {tab.title}
            </h3>
          )}
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {tab.tempoBpm ? `${tab.tempoBpm} BPM` : null}
            {tab.tempoBpm && tab.timeSignature ? ' · ' : null}
            {tab.timeSignature
              ? `${tab.timeSignature.beatsPerMeasure}/${tab.timeSignature.beatUnit}`
              : null}
          </span>
        </div>
      )}
      {tab.description && (
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
          {tab.description}
        </p>
      )}

      <div
        className="overflow-x-auto rounded-lg border border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
        role="img"
        aria-label={`Guitar tab notation for ${tab.title}`}
      >
        <table className="border-separate border-spacing-0 font-mono text-sm leading-none whitespace-pre">
          <tbody>
            {displayStringIndices.map((stringIndex) => (
              <tr key={stringIndex}>
                <td className="sticky left-0 z-10 bg-gray-50 py-1 pr-2 pl-3 text-right text-gray-500 select-none dark:bg-gray-900 dark:text-gray-400">
                  {tuning[stringIndex]}
                </td>
                <td className="text-gray-400 dark:text-gray-600">|</td>
                {flattened.map((entry) => {
                  const width = positionColumnWidth(entry.position.frets)
                  const isCurrent = entry.globalIndex === currentPositionIndex
                  return (
                    <td
                      key={entry.globalIndex}
                      className={`py-1 text-center align-middle text-gray-900 dark:text-gray-100 ${
                        isCurrent
                          ? 'bg-amber-300/70 font-semibold dark:bg-amber-400/40'
                          : ''
                      } ${entry.isLastInMeasure ? 'border-r border-gray-400 dark:border-gray-600' : ''}`}
                    >
                      {fretCellText(entry.position.frets[stringIndex], width)}
                    </td>
                  )
                })}
                <td className="text-gray-400 dark:text-gray-600">|</td>
              </tr>
            ))}
            {hasAnnotations && (
              <tr>
                <td className="sticky left-0 z-10 bg-gray-50 dark:bg-gray-900" />
                <td />
                {flattened.map((entry) => (
                  <td
                    key={entry.globalIndex}
                    className="pt-0.5 text-center text-[10px] text-gray-500 select-none dark:text-gray-400"
                  >
                    {entry.position.annotation ?? ''}
                  </td>
                ))}
                <td />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TabDisplay
