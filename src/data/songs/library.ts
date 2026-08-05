import { dannoBudunge } from './dannoBudunge'
import { malataBambarekuSe } from './malataBambarekuSe'
import { manikeMageHithe } from './manikeMageHithe'
import { nilwanMuhudeTheere } from './nilwanMuhudeTheere'
import { nuraWasanthe } from './nuraWasanthe'
import { oluPipila } from './oluPipila'
import { sandaRe } from './sandaRe'
import { saragaye } from './saragaye'
import { suduNelumaKo } from './suduNelumaKo'
import { vihangaKodewwenAwidin } from './vihangaKodewwenAwidin'
import type { Song } from './types'

/**
 * The first batch of the song catalog: 10 real, well-known Sinhala songs
 * spanning traditional classics to contemporary pop, curated to favor
 * simple, commonly-used open-chord progressions at the beginner tier and
 * introduce barre chords (F, Bm, F#m, C#m) gradually at the intermediate
 * tier.
 *
 * This is the canonical, ordered list other data/features should treat as
 * the source of truth — prefer the accessors in `index.ts` over reading
 * this array directly.
 */
export const songLibrary: Song[] = [
  manikeMageHithe,
  saragaye,
  dannoBudunge,
  oluPipila,
  vihangaKodewwenAwidin,
  nilwanMuhudeTheere,
  sandaRe,
  suduNelumaKo,
  nuraWasanthe,
  malataBambarekuSe,
]
