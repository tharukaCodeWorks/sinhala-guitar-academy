import type { StrummingPattern } from './types'

/**
 * Example strumming-pattern fixtures used to exercise `StrummingPlayer`
 * while there is no real song content wired up yet (song content arrives
 * with the song catalog). These are generic, widely-taught patterns, not
 * transcriptions of any specific copyrighted song.
 */

/** The classic "Down, Down, Up, Up, Down, Up" pattern taught in most beginner lessons. */
export const popFolkPattern: StrummingPattern = {
  id: 'pop-folk-ddu-udu',
  title: 'Pop-Folk (D-D-U-U-D-U)',
  description:
    'The most common strumming pattern in pop and folk songs — down, down, up, up, down, up — played across the "1 & 2 & 3 & 4 &" of a 4/4 bar with two rests.',
  tempoBpm: 96,
  steps: [
    { type: 'down' }, // 1
    { type: 'rest' }, // &
    { type: 'down' }, // 2
    { type: 'up' }, // &
    { type: 'rest' }, // 3
    { type: 'up' }, // &
    { type: 'down' }, // 4
    { type: 'up' }, // &
  ],
}

/** A straightforward down-up alternation on every 8th note. */
export const steadyEighthsPattern: StrummingPattern = {
  id: 'steady-eighths',
  title: 'Steady Eighths',
  description:
    'A straightforward down-up alternation on every 8th note — good for building a steady strumming hand before adding rests and mutes.',
  tempoBpm: 84,
  steps: [
    { type: 'down' },
    { type: 'up' },
    { type: 'down' },
    { type: 'up' },
    { type: 'down' },
    { type: 'up' },
    { type: 'down' },
    { type: 'up' },
  ],
}

/** A percussive groove alternating strums with muted chucks. */
export const percussiveMutePattern: StrummingPattern = {
  id: 'percussive-mute-groove',
  title: 'Percussive Mute Groove',
  description:
    'Alternates down/up strums with muted chucks for a percussive groove, common in reggae- and funk-influenced pop strumming.',
  tempoBpm: 100,
  steps: [
    { type: 'down', accent: true },
    { type: 'mute' },
    { type: 'up' },
    { type: 'mute' },
    { type: 'down' },
    { type: 'mute' },
    { type: 'up', accent: true },
    { type: 'mute' },
  ],
}

/**
 * The syncopated "and-of-2, and-of-4" push common to Sri Lankan baila and
 * calypso-influenced pop — the off-beat accents are what give the style its
 * characteristic bounce.
 */
export const bailaCalypsoPattern: StrummingPattern = {
  id: 'baila-calypso',
  title: 'Baila Calypso',
  description:
    'A syncopated calypso-derived groove used in baila and upbeat Sinhala pop — down strums land on the beat with accented off-beat upstrokes pushing the rhythm forward.',
  tempoBpm: 116,
  steps: [
    { type: 'down', accent: true }, // 1
    { type: 'rest' }, // &
    { type: 'up' }, // 2
    { type: 'up', accent: true }, // &
    { type: 'down' }, // 3
    { type: 'rest' }, // &
    { type: 'up' }, // 4
    { type: 'up', accent: true }, // &
  ],
}

/** A slow, sparse all-downstroke pattern suited to ballads and traditional folk songs. */
export const balladDownstrokesPattern: StrummingPattern = {
  id: 'ballad-downstrokes',
  title: 'Ballad Downstrokes',
  description:
    'Slow, deliberate downstrokes on every quarter note with rests in between — lets a chord ring out, well suited to slow ballads and traditional folk songs.',
  tempoBpm: 66,
  steps: [
    { type: 'down' }, // 1
    { type: 'rest' }, // &
    { type: 'rest' }, // 2
    { type: 'rest' }, // &
    { type: 'down' }, // 3
    { type: 'rest' }, // &
    { type: 'rest' }, // 4
    { type: 'rest' }, // &
  ],
}

export const strummingPatternFixtures: StrummingPattern[] = [
  popFolkPattern,
  steadyEighthsPattern,
  percussiveMutePattern,
  bailaCalypsoPattern,
  balladDownstrokesPattern,
]
