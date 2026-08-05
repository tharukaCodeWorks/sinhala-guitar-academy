import type { Song } from './types'

const N = null

/**
 * The 2021 viral cover that became one of the most-streamed Sri Lankan
 * songs internationally. Taught here the way most tutorials teach it: capo
 * on the 4th fret, playing the Am/G/Em open shapes plus one barre chord (F)
 * rather than the barre chords the song's actual key (C# minor) would
 * otherwise require throughout. That one unavoidable barre chord is why
 * this is catalogued as intermediate rather than beginner — see `notes`.
 */
export const manikeMageHithe: Song = {
  id: 'manike-mage-hithe',
  title: 'Manike Mage Hithe',
  artist: 'Yohani, Satheeshan & Chamath Sangeeth',
  key: 'C#',
  difficulty: 'intermediate',
  capoFret: 4,
  chordProgression: [
    { name: 'Verse', chordIds: ['a-minor', 'f-major', 'g-major', 'e-minor'] },
    {
      name: 'Chorus',
      chordIds: ['a-minor', 'f-major', 'c-major', 'g-major'],
    },
  ],
  strummingPatternId: 'pop-folk-ddu-udu',
  tab: {
    title: 'Intro Hook (Am arpeggio, capo 4)',
    description:
      'An original fingerstyle arpeggio through the Am shape used for the intro hook — a teaching arrangement, not a note-for-note transcription of the recording.',
    tempoBpm: 96,
    timeSignature: { beatsPerMeasure: 4, beatUnit: 4 },
    measures: [
      {
        positions: [
          { frets: [N, 0, N, N, N, N] },
          { frets: [N, N, 2, N, N, N] },
          { frets: [N, N, N, 2, N, N] },
          { frets: [N, N, N, N, 1, N] },
          { frets: [N, N, N, N, N, 0] },
          { frets: [N, N, N, N, 1, N] },
          { frets: [N, N, N, 2, N, N] },
          { frets: [N, N, 2, N, N, N] },
        ],
      },
    ],
  },
  notes:
    'Capo on the 4th fret lets you play the shapes Am-F-G-Em while the song still sounds in C# minor — the version most tutorials teach. F is the only barre chord needed (everything else is open), but that one barre chord is why this is classed intermediate rather than beginner.',
}
