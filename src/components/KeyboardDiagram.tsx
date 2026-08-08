import { useMemo } from 'react'
import type { ChordVariant } from '../data/keyboardChords/types'
import {
  pressedKeyPositions,
  visibleOctaveCount,
  WHITE_KEYS_PER_OCTAVE,
} from '../lib/keyboardDiagram'

/** Preset render sizes: small inline (e.g. a search-results grid) up to a large detail view. */
export type KeyboardDiagramSize = 'sm' | 'md' | 'lg'

/** Rendered pixel width at each preset size; height follows from the SVG's own aspect ratio. */
const SIZE_WIDTH_PX: Record<KeyboardDiagramSize, number> = {
  sm: 120,
  md: 200,
  lg: 340,
}

export interface KeyboardDiagramProps {
  /** The chord shape/voicing to render. */
  variant: ChordVariant
  /** Optional label drawn above the diagram, e.g. the chord's display name ('C', 'Am7'). */
  name?: string
  /** @default 'md' */
  size?: KeyboardDiagramSize
  /** Show the finger number inside each pressed key. @default true */
  showFingerNumbers?: boolean
  className?: string
}

// Layout constants for the SVG's internal coordinate system (viewBox units).
// The viewBox is scaled to `size` via the `width`/`height` attributes, so
// these never need to change for different render sizes.
const WHITE_KEY_WIDTH = 24
const WHITE_KEY_HEIGHT = 110
const BLACK_KEY_WIDTH = 14
const BLACK_KEY_HEIGHT = 66
const KEY_STROKE_WIDTH = 1
const LABEL_RADIUS = 7

function whiteKeyX(globalWhiteIndex: number): number {
  return globalWhiteIndex * WHITE_KEY_WIDTH
}

/**
 * Reusable SVG on-screen-piano diagram. Renders 1-2+ octaves of white +
 * black keys in correct relative widths/positions, with the pressed keys
 * from a `ChordVariant` highlighted and labelled with finger numbers
 * (thumb=1 .. pinky=5).
 *
 * Purely presentational, no audio/interactivity — matching the role
 * `ChordDiagram` plays for guitar shapes. Give it a `ChordVariant` from
 * `data/keyboardChords` and it draws that exact voicing. Pick `size` for
 * where it's used — `'sm'` for inline/grid contexts, `'lg'` for a detail
 * view.
 */
function KeyboardDiagram({
  variant,
  name,
  size = 'md',
  showFingerNumbers = true,
  className = '',
}: KeyboardDiagramProps) {
  const octaveCount = useMemo(() => visibleOctaveCount(variant), [variant])
  const positions = useMemo(() => pressedKeyPositions(variant), [variant])

  const totalWhiteKeys = octaveCount * WHITE_KEYS_PER_OCTAVE
  const diagramWidth = totalWhiteKeys * WHITE_KEY_WIDTH
  const diagramHeight = WHITE_KEY_HEIGHT

  const width = SIZE_WIDTH_PX[size]
  const height = (diagramHeight / diagramWidth) * width

  const ariaLabel = name
    ? `Keyboard diagram for ${name}, ${variant.label} voicing`
    : `Keyboard diagram, ${variant.label} voicing`

  const pressedWhiteIndices = new Set(
    positions
      .filter((p) => !p.isBlack)
      .map((p) => p.octaveIndex * WHITE_KEYS_PER_OCTAVE + p.whiteIndex),
  )
  const pressedBlackIndices = new Set(
    positions
      .filter((p) => p.isBlack)
      .map((p) => p.octaveIndex * WHITE_KEYS_PER_OCTAVE + p.whiteIndex),
  )

  return (
    <figure className={`inline-flex flex-col items-center gap-1 ${className}`}>
      {name && (
        <figcaption className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {name}
        </figcaption>
      )}
      <svg
        role="img"
        aria-label={ariaLabel}
        width={width}
        height={height}
        viewBox={`0 0 ${diagramWidth} ${diagramHeight}`}
        className="text-gray-900 dark:text-gray-100"
      >
        {/* White keys, drawn first so black keys layer on top of them. */}
        {Array.from({ length: totalWhiteKeys }, (_, i) => i).map(
          (globalIndex) => {
            const isPressed = pressedWhiteIndices.has(globalIndex)
            return (
              <rect
                key={`white-${globalIndex}`}
                x={whiteKeyX(globalIndex)}
                y={0}
                width={WHITE_KEY_WIDTH}
                height={WHITE_KEY_HEIGHT}
                rx={2}
                className={
                  isPressed
                    ? 'fill-indigo-400 dark:fill-indigo-500'
                    : 'fill-white dark:fill-gray-100'
                }
                stroke="currentColor"
                strokeOpacity={0.5}
                strokeWidth={KEY_STROKE_WIDTH}
              />
            )
          },
        )}

        {/* Black keys, one per octave boundary that has one (not after E or B). */}
        {Array.from({ length: octaveCount }, (_, octaveIndex) =>
          [1, 2, 4, 5, 6].map((boundaryWhiteIndex) => {
            const globalWhiteIndex =
              octaveIndex * WHITE_KEYS_PER_OCTAVE + boundaryWhiteIndex
            const isPressed = pressedBlackIndices.has(globalWhiteIndex)
            const cx = whiteKeyX(globalWhiteIndex)
            return (
              <rect
                key={`black-${octaveIndex}-${boundaryWhiteIndex}`}
                x={cx - BLACK_KEY_WIDTH / 2}
                y={0}
                width={BLACK_KEY_WIDTH}
                height={BLACK_KEY_HEIGHT}
                rx={1.5}
                className={
                  isPressed
                    ? 'fill-indigo-600 dark:fill-indigo-400'
                    : 'fill-gray-900 dark:fill-gray-950'
                }
                stroke="currentColor"
                strokeOpacity={0.5}
                strokeWidth={KEY_STROKE_WIDTH}
              />
            )
          }),
        )}

        {/* Finger-number labels, one per pressed key. White-key labels sit
            near the bottom of the key (below the black keys visually);
            black-key labels sit near the bottom of the (shorter) black key. */}
        {showFingerNumbers &&
          positions.map((position, index) => {
            if (position.key.finger == null) return null
            const cx = position.isBlack
              ? whiteKeyX(
                  position.octaveIndex * WHITE_KEYS_PER_OCTAVE +
                    position.whiteIndex,
                )
              : whiteKeyX(
                  position.octaveIndex * WHITE_KEYS_PER_OCTAVE +
                    position.whiteIndex,
                ) +
                WHITE_KEY_WIDTH / 2
            const cy = position.isBlack
              ? BLACK_KEY_HEIGHT - LABEL_RADIUS - 6
              : WHITE_KEY_HEIGHT - LABEL_RADIUS - 6
            return (
              <g key={`label-${index}`}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={LABEL_RADIUS}
                  className={
                    position.isBlack
                      ? 'fill-indigo-200 dark:fill-indigo-100'
                      : 'fill-indigo-600 dark:fill-indigo-500'
                  }
                />
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={
                    position.isBlack
                      ? 'fill-gray-900 text-[9px] font-semibold'
                      : 'fill-white text-[9px] font-semibold'
                  }
                >
                  {position.key.finger}
                </text>
              </g>
            )
          })}
      </svg>
    </figure>
  )
}

export default KeyboardDiagram
