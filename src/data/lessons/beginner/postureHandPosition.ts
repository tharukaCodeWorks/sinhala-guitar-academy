import type { Lesson } from '../types'

/**
 * Lesson 1 of the beginner method course: posture, hand shape, and finding
 * your way around the keyboard by sight before any note-reading is
 * introduced — the standard opening lesson in Faber, Alfred's, and RCM
 * prep-level material alike.
 */
export const postureHandPosition: Lesson = {
  id: 'posture-hand-position',
  title: 'Posture, Hand Position & Keyboard Geography',
  tier: 'beginner',
  order: 1,
  summary:
    'How to sit at the keyboard, shape your hands correctly, and find Middle C by reading the black-key groups — the foundation every later lesson builds on.',
  sections: [
    {
      heading: 'Sitting at the Instrument',
      body: 'Sit centered on the bench facing Middle C (the note roughly in the middle of the keyboard — you will learn to find it below), with your body far enough back that your elbows can hang naturally at your sides without touching your ribs. Your forearms should be roughly level with the keys, sloping neither steeply up nor down; if your bench is too low your wrists will droop, and if it is too high your elbows will lift awkwardly. Feet rest flat on the floor or a footstool if they do not yet reach, and your back stays upright but relaxed, not rigid.',
    },
    {
      heading: 'Hand Shape',
      body: 'Let your hand hang loosely at your side, then bring it up to the keys without changing its natural curve — you should end up with a relaxed, rounded shape, as if gently holding a small ball. Fingertips (not flat pads, and not fingernails) make contact with the keys. The thumb rests on its side, not flat on top. Wrists stay level with the knuckles, neither collapsed downward nor pushed up and stiff. This rounded shape is what lets each finger move independently with a controlled, even touch instead of the whole hand slapping down together.',
    },
    {
      heading: 'The Repeating Pattern of Black Keys',
      body: 'Look at the black keys: instead of being evenly spaced, they are grouped in a repeating pattern of two black keys, then three black keys, then a gap, then two again, and so on all the way up and down the keyboard. This pattern is your map. You never need to count white keys one by one to find a note by name — you find the black-key group next to it and read off the white key beside that group.',
    },
    {
      heading: 'Finding Middle C',
      body: 'Middle C is the white key immediately to the left of any group of two black keys, roughly at the center of the keyboard (on a standard 88-key piano, it is the white key just left of the two-black-key group nearest the middle). Practice finding it: locate any group of two black keys, then place a finger on the white key directly to its left. Do this in several different two-black-key groups across the keyboard until it is automatic, then narrow in on the one nearest the center — that one is Middle C, and it is the anchor note every hand position in this course starts from.',
    },
    {
      heading: 'Practice: Landing on C Without Looking',
      body: 'With your eyes closed or looking away from the keys, reach for a group of two black keys and land your thumb on the C beside it. Repeat this ten times, moving to a different two-black-key group each time. The goal is not speed but accuracy — a confident, physical sense of where C sits relative to the black-key pattern, since every hand position you learn from here on is described relative to a starting note found the same way.',
    },
  ],
}
