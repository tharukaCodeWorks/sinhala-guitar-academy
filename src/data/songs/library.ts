import { channaMereya } from './channaMereya'
import { dannoBudunge } from './dannoBudunge'
import { kabira } from './kabira'
import { maBalaKale } from './maBalaKale'
import { malataBambarekuSe } from './malataBambarekuSe'
import { manikeMageHithe } from './manikeMageHithe'
import { nilwanMuhudeTheere } from './nilwanMuhudeTheere'
import { nuraWasanthe } from './nuraWasanthe'
import { oluPipila } from './oluPipila'
import { piyabanaSina } from './piyabanaSina'
import { sandaRe } from './sandaRe'
import { saragaye } from './saragaye'
import { sarungale } from './sarungale'
import { sihinaDeshayaki } from './sihinaDeshayaki'
import { suduAraliya } from './suduAraliya'
import { suduNelumaKo } from './suduNelumaKo'
import { teraBanJaunga } from './teraBanJaunga'
import { tujheDekhaTo } from './tujheDekhaTo'
import { tumHiHo } from './tumHiHo'
import { vihangaKodewwenAwidin } from './vihangaKodewwenAwidin'
import type { Song } from './types'

/**
 * The song catalog: real, well-known Sinhala and Hindi (popular in Sri
 * Lanka) songs spanning traditional classics to contemporary pop, curated
 * to favor simple, commonly-used open-chord progressions at the beginner
 * tier and introduce barre chords gradually at the intermediate tier.
 *
 * First batch (10): Sinhala songs from traditional classics to
 * contemporary pop. Second batch (10, added later): 5 more Sinhala
 * all-time favorites plus 5 popular Hindi/Bollywood songs widely loved in
 * Sri Lanka.
 *
 * This is the canonical, ordered list other data/features should treat as
 * the source of truth — prefer the accessors in `index.ts` over reading
 * this array directly.
 */
export const songLibrary: Song[] = [
  // First batch
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
  // Second batch — more Sinhala classics + popular Hindi songs
  sarungale,
  sihinaDeshayaki,
  piyabanaSina,
  maBalaKale,
  suduAraliya,
  tujheDekhaTo,
  kabira,
  teraBanJaunga,
  tumHiHo,
  channaMereya,
]
