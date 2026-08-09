import type { ReactNode } from 'react'

/**
 * Small line-icon set used for HomePage's per-section cards (Guitar and
 * Keyboard tracks). Purely decorative SVGs drawn inline — no icon library
 * dependency, matching how ChordDiagram/KeyboardDiagram render fretboards
 * as hand-built SVG rather than pulling in raster assets.
 */
export type SectionIconName =
  | 'book'
  | 'grid'
  | 'link'
  | 'sliders'
  | 'hand'
  | 'waveform'
  | 'wrench'
  | 'note'
  | 'ladder'
  | 'bolt'
  | 'guitar'
  | 'piano'

export interface SectionIconProps {
  name: SectionIconName
  className?: string
}

const PATHS: Record<SectionIconName, ReactNode> = {
  book: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.25c-1.42-.9-3.36-1.35-5.25-1.35-.9 0-1.79.1-2.63.3a.75.75 0 0 0-.62.74v11.6a.75.75 0 0 0 .93.73c.74-.18 1.52-.27 2.32-.27 1.89 0 3.83.45 5.25 1.35m0-12.1c1.42-.9 3.36-1.35 5.25-1.35.9 0 1.79.1 2.63.3a.75.75 0 0 1 .62.74v11.6a.75.75 0 0 1-.93.73 10.9 10.9 0 0 0-2.32-.27c-1.89 0-3.83.45-5.25 1.35m0-12.1v12.1"
    />
  ),
  grid: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 5.25A.75.75 0 0 1 5.25 4.5h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5Zm0 9A.75.75 0 0 1 5.25 13.5h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5Zm9-9a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5Zm0 9a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-4.5Z"
    />
  ),
  link: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.25 9.75 7.5-2.1m-7.5 6.6 7.5 2.1M7.5 12a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm13.5-6.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm0 13.5a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
    />
  ),
  sliders: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 5.75V15m0 3.25v-1M12 5.75v6.5m0 6.75v-4M19 5.75V9m0 9.25v-6M2.75 15h4.5M9.75 12h4.5M16.75 9.5h4.5"
    />
  ),
  hand: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 11.25V6a1.25 1.25 0 1 1 2.5 0v4.5m0-.75V4.75a1.25 1.25 0 1 1 2.5 0v5.25m0-.5v-3a1.25 1.25 0 1 1 2.5 0v6.5m0-3a1.25 1.25 0 1 1 2.5 0v5.5c0 3.04-2.46 5.5-5.5 5.5h-1a5.5 5.5 0 0 1-4.6-2.48l-2.13-3.2a1.28 1.28 0 0 1 1.98-1.61l1.75 1.54"
    />
  ),
  waveform: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.75 12h2l1.5-5.5 3 11 2.5-15 2.5 15 2-9L18 12h3.25"
    />
  ),
  wrench: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.7 6.3a4 4 0 0 0-5.36 4.66l-6.2 6.2a1.5 1.5 0 0 0 2.12 2.12l6.2-6.2a4 4 0 0 0 4.66-5.36l-2.44 2.44-2.12-2.12L14.7 6.3Z"
    />
  ),
  note: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 18.5a2.25 2.25 0 1 1-.85-4.33A2.24 2.24 0 0 1 9.75 14.5V6.75l9-1.5v9.25m-9-8v8.25m9-8.25a2.25 2.25 0 1 1-2.25 2.25"
    />
  ),
  ladder: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 3v18M18 3v18M6 7.5h12M6 12h12M6 16.5h12"
    />
  ),
  bolt: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 2.75 4.5 13.5h6l-1.5 7.75 9-11.5h-6l1-7Z"
    />
  ),
  guitar: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2.75c-3.73 0-6.75 4.03-6.75 8.75 0 4.42 2.9 9.75 5.53 10.63a1.9 1.9 0 0 0 1.44 0c2.63-.88 5.53-6.21 5.53-10.63 0-4.72-3.02-8.75-6.75-8.75Z"
    />
  ),
  piano: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.5 5.25h17a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-.75.75h-17a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75Zm3.75 0v9m3.5-9v9m3.5-9v9m3.5-9v9M5.25 5.25v6h2.6m1.4-6v6h2.6m1.4-6v6h2.6m1.4-6v6h2.6"
    />
  ),
}

/** One of the fixed `SectionIconName` line icons, sized/colored via `className` (currentColor). */
function SectionIcon({ name, className = 'h-5 w-5' }: SectionIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.6}
      stroke="currentColor"
      aria-hidden="true"
      className={className}
    >
      {PATHS[name]}
    </svg>
  )
}

export default SectionIcon
