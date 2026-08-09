import { anatomyPostureReading } from './beginner/anatomyPostureReading'
import { campfireChords } from './beginner/campfireChords'
import { firstChords } from './beginner/firstChords'
import { puttingItTogether } from './beginner/puttingItTogether'
import { strummingChordChanges } from './beginner/strummingChordChanges'
import { tuningOpenStrings } from './beginner/tuningOpenStrings'
import { adding7thChords } from './intermediate/adding7thChords'
import { capoUseTransposing } from './intermediate/capoUseTransposing'
import { fingerpickingFundamentals } from './intermediate/fingerpickingFundamentals'
import { introductionToBarreChords } from './intermediate/introductionToBarreChords'
import { puttingItTogetherIntermediate } from './intermediate/puttingItTogetherIntermediate'
import { strummingRhythmicVariety } from './intermediate/strummingRhythmicVariety'
import type { Lesson } from './types'

/**
 * The guitar lesson catalog: a sequential, pedagogy-grounded beginner
 * method course, grounded in the common progression shared by the Hal
 * Leonard Guitar Method Book 1 and JustinGuitar's Beginner Course (Grades
 * 1-3) — anatomy/posture/reading chord diagrams & TAB, tuning/open
 * strings, first simple open chords, basic strumming & clean chord
 * changes, the full "campfire" open-chord set, and a first real song.
 *
 * Beginner tier (6 lessons) and intermediate tier (6 lessons) authored so
 * far; the advanced tier is added by a later task in this feature.
 *
 * The intermediate tier continues the progression: extended/7th chords ->
 * rhythmic strumming variety -> fingerpicking -> barre chords ->
 * capo/transposition -> a fuller real song, per Hal Leonard Guitar Method
 * Book 2 and JustinGuitar's Grade 2-3 course.
 *
 * This is the canonical, ordered list other data/features should treat as
 * the source of truth — prefer the accessors in `index.ts` over reading
 * this array directly.
 */
export const guitarLessonLibrary: Lesson[] = [
  anatomyPostureReading,
  tuningOpenStrings,
  firstChords,
  strummingChordChanges,
  campfireChords,
  puttingItTogether,
  adding7thChords,
  strummingRhythmicVariety,
  fingerpickingFundamentals,
  introductionToBarreChords,
  capoUseTransposing,
  puttingItTogetherIntermediate,
]
