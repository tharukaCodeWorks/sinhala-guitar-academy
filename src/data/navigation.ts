/**
 * Single source of truth for the app's main sections, grouped by
 * instrument (Guitar / Keyboard) plus a standalone Home link. Consumed by
 * the Navbar (nav dropdowns/accordion) and the Home + Keyboard hub pages
 * (section links), and mirrored by the <Route> declarations in App.tsx.
 * Keep this in sync with App.tsx when adding/removing sections.
 */
export interface NavLeaf {
  label: string
  path: string
}

export interface NavGroup {
  label: string
  items: NavLeaf[]
}

/** Kept outside the instrument groups — always shown as a top-level link. */
export const homeItem: NavLeaf = { label: 'Home', path: '/' }

export const navGroups: NavGroup[] = [
  {
    label: 'Guitar',
    items: [
      { label: 'Chord Library', path: '/chords' },
      { label: 'Chord Families', path: '/chord-families' },
      { label: 'Capo Tool', path: '/capo-tool' },
      { label: 'Fingering Practice', path: '/fingering-practice' },
      { label: 'Strumming Practice', path: '/strumming-practice' },
      { label: 'Strum Builder', path: '/strum-builder' },
      { label: 'Songs', path: '/songs' },
    ],
  },
  {
    label: 'Keyboard',
    items: [
      { label: 'Lessons', path: '/keyboard/lessons' },
      { label: 'Chord Library', path: '/keyboard/chords' },
      { label: 'Chord Families', path: '/keyboard/chord-families' },
      { label: 'Scale Explorer', path: '/keyboard/scales' },
      { label: 'Technique Drills', path: '/keyboard/technique' },
      { label: 'Songs', path: '/keyboard/songs' },
    ],
  },
]
