import type { Tab } from './types'

/**
 * Example tab fixtures used to exercise `TabDisplay` while there is no real
 * song content wired up yet (song content arrives with the song catalog).
 * These are original practice riffs, not transcriptions of any copyrighted
 * song.
 */

const N = null

/** A simple two-measure open-position warm-up riff on the low strings. */
export const openPositionRiffTab: Tab = {
  title: 'Open Position Warm-Up',
  description:
    'A simple two-measure riff for practicing single-note picking in open position.',
  tempoBpm: 90,
  timeSignature: { beatsPerMeasure: 4, beatUnit: 4 },
  measures: [
    {
      positions: [
        { frets: [0, N, N, N, N, N] },
        { frets: [2, N, N, N, N, N] },
        { frets: [3, N, N, N, N, N] },
        { frets: [N, 0, N, N, N, N] },
      ],
    },
    {
      positions: [
        { frets: [N, 2, N, N, N, N] },
        { frets: [N, 3, N, N, N, N] },
        { frets: [N, N, 0, N, N, N] },
        { frets: [N, N, 2, N, N, N] },
      ],
    },
  ],
}

/** A short melody line up on the higher frets with a hammer-on and a slide, spanning two measures. */
export const higherPositionMelodyTab: Tab = {
  title: 'Higher Position Melody Line',
  description:
    'A short single-string melody demonstrating a hammer-on and a slide.',
  tempoBpm: 76,
  timeSignature: { beatsPerMeasure: 4, beatUnit: 4 },
  measures: [
    {
      positions: [
        { frets: [N, N, N, N, N, 5] },
        { frets: [N, N, N, N, N, 7], annotation: 'h' },
        { frets: [N, N, N, N, 5, N] },
        { frets: [N, N, N, N, 7, N] },
      ],
    },
    {
      positions: [
        { frets: [N, N, N, N, N, 8] },
        { frets: [N, N, N, N, N, 10], annotation: '/' },
        { frets: [N, N, N, N, N, 8] },
        { frets: [N, N, N, N, N, 5] },
      ],
    },
  ],
}

export const tabFixtures: Tab[] = [openPositionRiffTab, higherPositionMelodyTab]
