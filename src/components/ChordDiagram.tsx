import { useMemo } from 'react'
import type { ChordVariant } from '../data/chords/types'
import {
  barredStringIndices,
  CHORD_DIAGRAM_STRING_COUNT,
  findBarreSegments,
  fretRow,
  isNutPosition,
  visibleFretCount,
} from '../lib/chordDiagram'

/** Preset render sizes: small inline (e.g. a search-results grid) up to a large detail view. */
export type ChordDiagramSize = 'sm' | 'md' | 'lg'

/** Rendered pixel width at each preset size; height follows from the SVG's own aspect ratio. */
const SIZE_WIDTH_PX: Record<ChordDiagramSize, number> = {
  sm: 96,
  md: 140,
  lg: 224,
}

export interface ChordDiagramProps {
  /** The chord shape/voicing to render. */
  variant: ChordVariant
  /** Optional label drawn above the diagram, e.g. the chord's display name ('C', 'Am7'). */
  name?: string
  /** @default 'md' */
  size?: ChordDiagramSize
  /** Show the finger number inside each fretted dot. @default true */
  showFingerNumbers?: boolean
  className?: string
}

// Layout constants for the SVG's internal coordinate system (viewBox units).
// The viewBox is scaled to `size` via the `width`/`height` attributes, so
// these never need to change for different render sizes.
const RIGHT_MARGIN = 14
// Wider than RIGHT_MARGIN: leaves room for the "<N>fr" base-fret label
// (up to 2 digits) that's right-aligned just left of the first string, so
// it doesn't get clipped by the viewBox for shapes above the open position.
const LEFT_MARGIN = 26
const STRING_GAP = 20
const TOP_MARGIN = 28 // room for the open/muted string markers above the nut
const FRET_HEIGHT = 26
const BOTTOM_MARGIN = 6
const NUT_STROKE_WIDTH = 5
const FRET_STROKE_WIDTH = 1.5
const DOT_RADIUS = 8
const MARKER_RADIUS = 6

const DIAGRAM_WIDTH =
  LEFT_MARGIN + RIGHT_MARGIN + STRING_GAP * (CHORD_DIAGRAM_STRING_COUNT - 1)

function stringX(stringIndex: number): number {
  return LEFT_MARGIN + stringIndex * STRING_GAP
}

function fretY(rowIndex: number): number {
  return TOP_MARGIN + rowIndex * FRET_HEIGHT
}

/**
 * Reusable SVG chord/fretboard diagram. Renders the 6 strings low-E-first
 * (left) to high-e (right) — matching `ChordVariant.strings` order and how
 * a right-handed guitarist sees the fretboard held upright — with open/
 * muted markers above the nut, a thick nut bar for open-position shapes (a
 * thin top line plus a base-fret label otherwise), and finger-position
 * dots (merged into a rounded bar across barred strings).
 *
 * Purely presentational: give it a `ChordVariant` from the chord data
 * model and it draws that exact shape. Pick `size` for where it's used —
 * `'sm'` for inline/grid contexts, `'lg'` for a detail view.
 */
function ChordDiagram({
  variant,
  name,
  size = 'md',
  showFingerNumbers = true,
  className = '',
}: ChordDiagramProps) {
  const numFrets = useMemo(() => visibleFretCount(variant), [variant])
  const nutPosition = isNutPosition(variant)
  const barreSegments = useMemo(() => findBarreSegments(variant), [variant])
  const barredIndices = useMemo(
    () => barredStringIndices(barreSegments),
    [barreSegments],
  )

  const diagramHeight = TOP_MARGIN + numFrets * FRET_HEIGHT + BOTTOM_MARGIN
  const width = SIZE_WIDTH_PX[size]
  const height = (diagramHeight / DIAGRAM_WIDTH) * width

  const ariaLabel = name
    ? `Chord diagram for ${name}, ${variant.label} shape`
    : `Chord diagram, ${variant.label} shape`

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
        viewBox={`0 0 ${DIAGRAM_WIDTH} ${diagramHeight}`}
        className="text-gray-900 dark:text-gray-100"
      >
        {/* Base-fret label for shapes that don't start at the open position. */}
        {!nutPosition && (
          <text
            x={LEFT_MARGIN - 6}
            y={fretY(0) + FRET_HEIGHT / 2}
            textAnchor="end"
            dominantBaseline="middle"
            className="fill-current text-[10px] font-medium"
          >
            {variant.baseFret}fr
          </text>
        )}

        {/* Open/muted markers above the nut, one per string. */}
        {variant.strings.map((position, stringIndex) => {
          if (position !== 'open' && position !== 'muted') return null
          const cx = stringX(stringIndex)
          const cy = TOP_MARGIN - 14
          if (position === 'open') {
            return (
              <circle
                key={`marker-${stringIndex}`}
                cx={cx}
                cy={cy}
                r={MARKER_RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              />
            )
          }
          return (
            <g
              key={`marker-${stringIndex}`}
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <line
                x1={cx - MARKER_RADIUS}
                y1={cy - MARKER_RADIUS}
                x2={cx + MARKER_RADIUS}
                y2={cy + MARKER_RADIUS}
              />
              <line
                x1={cx - MARKER_RADIUS}
                y1={cy + MARKER_RADIUS}
                x2={cx + MARKER_RADIUS}
                y2={cy - MARKER_RADIUS}
              />
            </g>
          )
        })}

        {/* Nut (open position) or top fret line (shapes higher up the neck). */}
        <line
          x1={stringX(0)}
          y1={fretY(0)}
          x2={stringX(CHORD_DIAGRAM_STRING_COUNT - 1)}
          y2={fretY(0)}
          stroke="currentColor"
          strokeWidth={nutPosition ? NUT_STROKE_WIDTH : FRET_STROKE_WIDTH}
        />

        {/* Remaining fret lines. */}
        {Array.from({ length: numFrets }, (_, i) => i + 1).map((row) => (
          <line
            key={`fret-${row}`}
            x1={stringX(0)}
            y1={fretY(row)}
            x2={stringX(CHORD_DIAGRAM_STRING_COUNT - 1)}
            y2={fretY(row)}
            stroke="currentColor"
            strokeOpacity={0.4}
            strokeWidth={FRET_STROKE_WIDTH}
          />
        ))}

        {/* Strings. */}
        {Array.from({ length: CHORD_DIAGRAM_STRING_COUNT }, (_, i) => i).map(
          (stringIndex) => (
            <line
              key={`string-${stringIndex}`}
              x1={stringX(stringIndex)}
              y1={fretY(0)}
              x2={stringX(stringIndex)}
              y2={fretY(numFrets)}
              stroke="currentColor"
              strokeOpacity={0.6}
              strokeWidth={1}
            />
          ),
        )}

        {/*
          Barre bars: a single rounded-cap line spanning the barred strings
          (the rounded ends already read as dots at each end), with one
          finger-number label at the bar's midpoint. Individual dots for
          the strings it covers are skipped below.
        */}
        {barreSegments.map((segment) => {
          const row = fretRow(variant, segment.fret)
          if (row == null) return null
          const y = fretY(row) + FRET_HEIGHT / 2
          const x1 = stringX(segment.fromStringIndex)
          const x2 = stringX(segment.toStringIndex)
          return (
            <g key={`barre-${segment.fret}-${segment.fromStringIndex}`}>
              <line
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke="currentColor"
                strokeWidth={DOT_RADIUS * 2}
                strokeLinecap="round"
              />
              {showFingerNumbers && (
                <text
                  x={(x1 + x2) / 2}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-white text-[10px] font-semibold dark:fill-gray-950"
                >
                  {segment.finger}
                </text>
              )}
            </g>
          )
        })}

        {/* Finger-position dots, one per fretted string not already covered by a barre bar. */}
        {variant.strings.map((position, stringIndex) => {
          if (barredIndices.has(stringIndex)) return null
          const row = fretRow(variant, position)
          if (row == null) return null
          const cx = stringX(stringIndex)
          const cy = fretY(row) + FRET_HEIGHT / 2
          const finger = variant.fingering[stringIndex]
          return (
            <g key={`dot-${stringIndex}`}>
              <circle cx={cx} cy={cy} r={DOT_RADIUS} fill="currentColor" />
              {showFingerNumbers && finger != null && (
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-white text-[10px] font-semibold dark:fill-gray-950"
                >
                  {finger}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </figure>
  )
}

export default ChordDiagram
