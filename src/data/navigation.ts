/**
 * Single source of truth for the app's main sections: label + route path.
 * Consumed by the Navbar (nav links) and the Home page (section links), and
 * mirrored by the <Route> declarations in App.tsx. Keep this in sync with
 * App.tsx when adding/removing top-level sections.
 */
export interface NavItem {
  label: string
  path: string
}

export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Chord Library', path: '/chords' },
  { label: 'Chord Families', path: '/chord-families' },
  { label: 'Capo Tool', path: '/capo-tool' },
  { label: 'Fingering Practice', path: '/fingering-practice' },
  { label: 'Strumming Practice', path: '/strumming-practice' },
  { label: 'Strum Builder', path: '/strum-builder' },
  { label: 'Songs', path: '/songs' },
]
