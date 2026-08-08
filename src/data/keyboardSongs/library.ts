import { dannoBudunge } from './dannoBudunge'
import { malataBambarekuSe } from './malataBambarekuSe'
import { manikeMageHithe } from './manikeMageHithe'
import { nilwanMuhudeTheere } from './nilwanMuhudeTheere'
import { oluPipila } from './oluPipila'
import { saragaye } from './saragaye'
import { surangani } from './surangani'
import type { Song } from './types'

/**
 * The keyboard song catalog: real, well-known Sinhala songs — from
 * traditional classics to contemporary pop — curated as piano/keyboard
 * arrangements. First batch (7): 5 beginner (all-root-position
 * progressions, five-finger-position friendly) and 2 intermediate (same
 * chords as their beginner-tier counterparts would use, but classed
 * intermediate for genuinely keyboard-specific reasons — syncopated
 * left-hand patterns or inversion voicings for voice leading — rather than
 * guitar-shape-copied barre-chord difficulty).
 *
 * This is the canonical, ordered list other data/features should treat as
 * the source of truth — prefer the accessors in `index.ts` over reading
 * this array directly.
 */
export const songLibrary: Song[] = [
  dannoBudunge,
  surangani,
  oluPipila,
  nilwanMuhudeTheere,
  saragaye,
  manikeMageHithe,
  malataBambarekuSe,
]
