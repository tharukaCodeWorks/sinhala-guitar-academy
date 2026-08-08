/**
 * Pure logic for turning a `Scale` (`data/scales`) into the shapes the
 * keyboard-diagram rendering layer already understands, and into a plain
 * ascending note+finger list for a non-visual fallback.
 *
 * Deliberately reuses `ChordVariant`/`KeyPress` from `data/keyboardChords`
 * rather than inventing a parallel "scale diagram" shape: a scale played
 * hands-separately is just a specific, orderly sequence of single-key
 * presses, which is already exactly what `KeyPress[]` represents, and
 * `components/KeyboardDiagram.tsx` already knows how to render one. No
 * rendering here — that stays in the component.
 */
import type { ChordVariant, KeyPress } from '../data/keyboardChords/types'
import type { FingerNumber, NoteName, Scale } from '../data/scales/types'

/** Which hand's fingering to resolve — `Scale` seeds both. */
export type Hand = 'right' | 'left'

/** The 12 chromatic pitch classes, sharps spelling — matches `NoteName`. */
const CHROMATIC: NoteName[] = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
]

/** One ascending step of a scale: the note and the finger that plays it. */
export interface ScaleStep {
  note: NoteName
  finger: FingerNumber
}

/**
 * The scale's 8 ascending steps for one hand — its 7 scale-degree notes
 * plus the repeated tonic that closes the octave, each paired with the
 * finger from `scale.rightHandFingering`/`leftHandFingering`.
 */
export function scaleSteps(scale: Scale, hand: Hand): ScaleStep[] {
  const fingering =
    hand === 'right' ? scale.rightHandFingering : scale.leftHandFingering
  const notes = [...scale.notes, scale.notes[0]]
  return notes.map((note, index) => ({ note, finger: fingering[index] }))
}

/**
 * The scale's 8 ascending steps as `KeyPress`es, each placed in the octave
 * it actually falls in relative to the root (`octaveOffset: 0`) — the
 * octave increments every time a step's pitch class doesn't come after the
 * previous step's, i.e. every time the ascending line wraps back around
 * past B to C. This is what makes the sequence render as a genuinely
 * ascending line on `KeyboardDiagram` instead of collapsing every note
 * into one octave.
 */
export function scaleKeyPresses(scale: Scale, hand: Hand): KeyPress[] {
  const steps = scaleSteps(scale, hand)
  let octaveOffset = 0
  return steps.map((step, index) => {
    if (index > 0) {
      const prevIndex = CHROMATIC.indexOf(steps[index - 1].note)
      const currentIndex = CHROMATIC.indexOf(step.note)
      if (currentIndex <= prevIndex) {
        octaveOffset += 1
      }
    }
    return { note: step.note, octaveOffset, finger: step.finger }
  })
}

/**
 * The scale's ascending line for one hand, packaged as a `ChordVariant` so
 * it can be handed straight to `KeyboardDiagram` — the diagram component
 * only cares about `keys`, so the other `ChordVariant` fields are filled
 * with reasonable, mostly-cosmetic defaults rather than left to duplicate
 * the type with an alternative shape.
 */
export function scaleToKeyboardVariant(scale: Scale, hand: Hand): ChordVariant {
  return {
    id: `${scale.root}-${scale.type}-${hand}`,
    label: hand === 'right' ? 'Right hand' : 'Left hand',
    inversion: 'root',
    keys: scaleKeyPresses(scale, hand),
    difficulty: 'intermediate',
  }
}
