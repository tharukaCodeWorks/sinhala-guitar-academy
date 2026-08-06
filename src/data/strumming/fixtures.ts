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

/**
 * A slow down-up-mute-up pattern widely taught for acoustic covers of slow
 * Hindi film ballads — the muted chucks on the off-beats give space for the
 * vocal line while keeping gentle rhythmic movement under a sustained chord.
 */
export const bollywoodBalladPattern: StrummingPattern = {
  id: 'bollywood-ballad-dux',
  title: 'Bollywood Ballad (D-U-X-U)',
  description:
    'A slow down-up-mute-up pattern common in acoustic covers of romantic Hindi film songs — muted chucks on the off-beats leave room for the vocal melody while keeping gentle rhythmic movement.',
  tempoBpm: 76,
  steps: [
    { type: 'down' }, // 1
    { type: 'up' }, // &
    { type: 'mute' }, // 2
    { type: 'up' }, // &
    { type: 'down' }, // 3
    { type: 'up' }, // &
    { type: 'mute' }, // 4
    { type: 'up' }, // &
  ],
}

/**
 * A fast, danceable 6/8 pattern (two groups of three eighth notes per bar)
 * built from the classic down-down-up shuffle that drives traditional
 * Sri Lankan baila dance rhythm — distinct from the 4/4 calypso-pop groove
 * above, this is the quicker triplet-feel style heard in up-tempo baila.
 */
export const bailaSixEightPattern: StrummingPattern = {
  id: 'baila-six-eight',
  title: 'Baila 6/8 Shuffle',
  description:
    'A fast 6/8 down-down-up shuffle (two three-count groups per bar) driving the quicker, danceable side of traditional Sri Lankan baila — distinct from the 4/4 calypso-pop groove above.',
  tempoBpm: 152,
  steps: [
    { type: 'down', accent: true }, // 1
    { type: 'down' }, // 2
    { type: 'up' }, // 3
    { type: 'down', accent: true }, // 4
    { type: 'down' }, // 5
    { type: 'up' }, // 6
  ],
}

/**
 * A rapid all-upstroke pattern used for high-energy sections of fast Hindi
 * and Sinhala dance-pop tracks, where quick, light upstrokes create a
 * driving, percussive texture without the weight of alternating downstrokes.
 */
export const dancePopUpstrokesPattern: StrummingPattern = {
  id: 'dance-pop-upstrokes',
  title: 'Dance-Pop Upstrokes',
  description:
    'Rapid, light all-upstroke strumming used in high-energy sections of fast Hindi and Sinhala dance-pop tracks — a driving, percussive texture distinct from alternating down-up patterns.',
  tempoBpm: 140,
  steps: [
    { type: 'up', accent: true },
    { type: 'up' },
    { type: 'up', accent: true },
    { type: 'up' },
    { type: 'up', accent: true },
    { type: 'up' },
    { type: 'up', accent: true },
    { type: 'up' },
  ],
}

/**
 * A sparse, mostly-rests verse pattern widely used in the quieter verse
 * sections of Hindi film songs before a fuller chorus strum takes over —
 * lets the vocal and lyrics breathe against minimal guitar movement.
 */
export const filmiVerseGroovePattern: StrummingPattern = {
  id: 'filmi-verse-groove',
  title: 'Filmi Verse Groove',
  description:
    'A sparse pattern common in the quieter verse sections of Hindi film songs, saving a fuller strum for the chorus — minimal guitar movement leaves room for the vocal line.',
  tempoBpm: 92,
  steps: [
    { type: 'down' }, // 1
    { type: 'rest' }, // &
    { type: 'rest' }, // 2
    { type: 'up' }, // &
    { type: 'rest' }, // 3
    { type: 'up' }, // &
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
  bollywoodBalladPattern,
  bailaSixEightPattern,
  dancePopUpstrokesPattern,
  filmiVerseGroovePattern,
]
